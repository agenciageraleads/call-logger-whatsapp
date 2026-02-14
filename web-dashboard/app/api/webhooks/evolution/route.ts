import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type EvolutionWebhookPayload = {
  event?: string;
  instance?: string;
  data?: any;
};

function normalizeEvent(event: string) {
  return event.trim().toUpperCase().replace(/\./g, '_');
}

function parseMessageTimestamp(ts: unknown): Date {
  if (ts == null) return new Date();
  const n = typeof ts === 'string' ? Number(ts) : (ts as number);
  if (!Number.isFinite(n)) return new Date();
  // Baileys often uses seconds.
  return new Date(n < 1e12 ? n * 1000 : n);
}

function getDayStart(d: Date) {
  const day = new Date(d);
  day.setHours(0, 0, 0, 0);
  return day;
}

function isUniqueViolation(e: unknown) {
  // Avoid importing Prisma namespace (can be missing depending on client build output).
  return Boolean(e && typeof e === 'object' && 'code' in e && (e as any).code === 'P2002');
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as EvolutionWebhookPayload;
    const event = payload?.event || '';
    const instanceIdExternal = payload?.instance || '';
    const data = payload?.data;

    if (!event || !instanceIdExternal) {
      return NextResponse.json({ status: 'invalid_payload' }, { status: 400 });
    }

    const eventNorm = normalizeEvent(event);
    if (eventNorm !== 'MESSAGES_UPSERT') {
      // Return 200 to avoid retries for events we don't handle yet.
      return NextResponse.json({ status: 'ignored_event', event: eventNorm });
    }

    const evolutionInstance = await prisma.evolutionInstance.findUnique({
      where: { instanceId: instanceIdExternal },
    });

    if (!evolutionInstance) {
      return NextResponse.json({ status: 'ignored_instance_unknown' });
    }

    // Optional auth:
    // - Prefer per-instance webhookSecret if stored.
    // - Otherwise, allow global WEBHOOK_SECRET from server env.
    const expectedSecret = evolutionInstance.webhookSecret || process.env.WEBHOOK_SECRET || '';
    if (expectedSecret) {
      const headerSecret = req.headers.get('x-webhook-secret') || '';
      if (!headerSecret || headerSecret !== expectedSecret) {
        return NextResponse.json({ status: 'unauthorized' }, { status: 401 });
      }
    }

    const messages: any[] = Array.isArray(data?.messages)
      ? data.messages
      : data
        ? [data]
        : [];

    if (!messages.length) {
      return NextResponse.json({ status: 'no_messages' });
    }

    // Group by day start, in case Evolution batches old messages.
    const groups = new Map<number, any[]>();
    for (const msg of messages) {
      const ts = parseMessageTimestamp(msg?.messageTimestamp ?? msg?.timestamp ?? msg?.t ?? msg?.data?.messageTimestamp);
      const day = getDayStart(ts).getTime();
      const arr = groups.get(day) || [];
      arr.push(msg);
      groups.set(day, arr);
    }

    const results: any[] = [];

    for (const [dayMs, msgs] of groups.entries()) {
      const day = new Date(dayMs);

      const outcome = await prisma.$transaction(async (tx: any) => {
        let sentCount = 0;
        let receivedCount = 0;
        let newContacts = 0;
        let newConversations = 0;

        for (const msg of msgs) {
          const key = msg?.key;
          const remoteJid = key?.remoteJid || key?.jid || msg?.remoteJid;
          const messageId = key?.id || msg?.id;

          if (!remoteJid || !messageId) continue;
          // Ignore groups.
          if (String(remoteJid).endsWith('@g.us')) continue;

          const fromMe = Boolean(key?.fromMe);
          const direction = fromMe ? 'SENT' : 'RECEIVED';
          const ts = parseMessageTimestamp(msg?.messageTimestamp ?? msg?.timestamp);

          // Idempotency: if we already processed this message id, skip counts.
          try {
            await tx.processedMessage.create({
              data: {
                instanceId: evolutionInstance.id,
                messageId: String(messageId),
                jid: String(remoteJid),
                direction,
                timestamp: ts,
              },
            });
          } catch (e) {
            if (isUniqueViolation(e)) continue;
            throw e;
          }

          if (fromMe) sentCount += 1;
          else receivedCount += 1;

          // New contact (ever)
          try {
            await tx.contact.create({
              data: {
                instanceId: evolutionInstance.id,
                jid: String(remoteJid),
              },
            });
            newContacts += 1;
          } catch (e) {
            if (!isUniqueViolation(e)) throw e;
          }

          // Active conversation (per day)
          try {
            await tx.dailyConversation.create({
              data: {
                instanceId: evolutionInstance.id,
                date: day,
                jid: String(remoteJid),
              },
            });
            newConversations += 1;
          } catch (e) {
            if (!isUniqueViolation(e)) throw e;
          }
        }

        if (sentCount === 0 && receivedCount === 0 && newContacts === 0 && newConversations === 0) {
          return { processed: 0, day };
        }

        await tx.dailyMetric.upsert({
          where: {
            date_instanceId: {
              date: day,
              instanceId: evolutionInstance.id,
            },
          },
          update: {
            messagesSent: sentCount ? { increment: sentCount } : undefined,
            messagesReceived: receivedCount ? { increment: receivedCount } : undefined,
            activeConversations: newConversations ? { increment: newConversations } : undefined,
            newContacts: newContacts ? { increment: newContacts } : undefined,
          },
          create: {
            date: day,
            instanceId: evolutionInstance.id,
            messagesSent: sentCount,
            messagesReceived: receivedCount,
            activeConversations: newConversations,
            newContacts,
          },
        });

        return { processed: sentCount + receivedCount, sentCount, receivedCount, newContacts, newConversations, day };
      });

      results.push(outcome);
    }

    return NextResponse.json({ status: 'success', results });
  } catch (error) {
    console.error('Erro no processamento do webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
