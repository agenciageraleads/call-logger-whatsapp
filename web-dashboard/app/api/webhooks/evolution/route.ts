import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PrismaClient } from '@/lib/generated/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type EvolutionWebhookPayload = {
  event?: string;
  instance?: string;
  data?: unknown;
};

interface WebhookMessage {
  key?: {
    remoteJid?: string;
    jid?: string;
    fromMe?: boolean;
    id?: string;
  };
  remoteJid?: string;
  id?: string;
  messageTimestamp?: number | string;
  timestamp?: number | string;
  t?: number | string;
  data?: {
    messageTimestamp?: number | string;
  };
}

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
  return Boolean(e && typeof e === 'object' && 'code' in e && (e as Record<string, unknown>).code === 'P2002');
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
      return NextResponse.json({ status: 'ignored_event', event: eventNorm });
    }

    const evolutionInstance = await prisma.evolutionInstance.findUnique({
      where: { instanceId: instanceIdExternal },
    });

    if (!evolutionInstance) {
      return NextResponse.json({ status: 'ignored_instance_unknown' });
    }

    const expectedSecret = evolutionInstance.webhookSecret || process.env.WEBHOOK_SECRET || '';
    if (expectedSecret) {
      const headerSecret = req.headers.get('x-webhook-secret') || '';
      if (!headerSecret || headerSecret !== expectedSecret) {
        return NextResponse.json({ status: 'unauthorized' }, { status: 401 });
      }
    }

    const messages: WebhookMessage[] = Array.isArray((data as any)?.messages)
      ? (data as any).messages
      : data
        ? [data as WebhookMessage]
        : [];

    if (!messages.length) {
      return NextResponse.json({ status: 'no_messages' });
    }

    const groups = new Map<number, WebhookMessage[]>();
    for (const msg of messages) {
      const ts = parseMessageTimestamp(msg?.messageTimestamp ?? msg?.timestamp ?? msg?.t ?? msg?.data?.messageTimestamp);
      const day = getDayStart(ts).getTime();
      const arr = groups.get(day) || [];
      arr.push(msg);
      groups.set(day, arr);
    }

    const results: unknown[] = [];

    for (const [dayMs, msgs] of groups.entries()) {
      const day = new Date(dayMs);

      const outcome = await prisma.$transaction(async (tx) => {
        let sentCount = 0;
        let receivedCount = 0;
        let newContacts = 0;
        let newConversations = 0;

        for (const msg of msgs) {
          const key = msg?.key;
          const remoteJid = key?.remoteJid || key?.jid || msg?.remoteJid;
          const messageId = key?.id || msg?.id;

          if (!remoteJid || !messageId) continue;
          if (String(remoteJid).endsWith('@g.us')) continue;

          const fromMe = Boolean(key?.fromMe);
          const direction = fromMe ? 'SENT' : 'RECEIVED';
          const ts = parseMessageTimestamp(msg?.messageTimestamp ?? msg?.timestamp);

          try {
            await (tx as any).processedMessage.create({
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

          try {
            await (tx as any).contact.create({
              data: {
                instanceId: evolutionInstance.id,
                jid: String(remoteJid),
              },
            });
            newContacts += 1;
          } catch (e) {
            if (!isUniqueViolation(e)) throw e;
          }

          try {
            await (tx as any).dailyConversation.create({
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

        await (tx as any).dailyMetric.upsert({
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
