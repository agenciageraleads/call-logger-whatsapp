import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Force this route to be dynamic (runtime-only)
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { deviceId, contactName, duration, type, status, timestamp } = body;

    if (!deviceId) {
      return NextResponse.json({ error: 'Device ID is required' }, { status: 400 });
    }

    // Upsert device (create if not exists)
    // Upsert device (create if not exists, update lastSeen)
    const device = await prisma.device.upsert({
      where: { id: deviceId },
      update: { lastSeen: new Date() },
      create: {
        id: deviceId,
        name: `Device ${deviceId.substring(0, 6)}`, // Default name for new devices
        lastSeen: new Date(),
      },
    });

    // Create call log
    const log = await prisma.callLog.create({
      data: {
        person: contactName || 'Unknown',
        duration: Number(duration) || 0,
        type: type || 'UNKNOWN',
        status: status || 'UNKNOWN',
        timestamp: new Date(Number(timestamp) || Date.now()),
        deviceId: device.id,
      },
    });

    // --- Integar com DailyMetric (Monitoramento Unificado) ---
    // Verifica se este dispositivo está vinculado a uma instância de WhatsApp
    const evolutionInstance = await prisma.evolutionInstance.findUnique({
      where: { deviceId: device.id },
    });

    if (evolutionInstance) {
      const callDate = new Date(Number(timestamp) || Date.now());
      callDate.setHours(0, 0, 0, 0);

      const isOutgoing = (type || '').toUpperCase() === 'OUTGOING';
      const callDuration = Number(duration) || 0;

      await prisma.dailyMetric.upsert({
        where: {
          date_instanceId: {
            date: callDate,
            instanceId: evolutionInstance.id
          }
        },
        update: {
          callsMade: isOutgoing ? { increment: 1 } : undefined,
          callsReceived: !isOutgoing ? { increment: 1 } : undefined,
          callDuration: { increment: callDuration }
        },
        create: {
          date: callDate,
          instanceId: evolutionInstance.id,
          callsMade: isOutgoing ? 1 : 0,
          callsReceived: !isOutgoing ? 1 : 0,
          callDuration: callDuration,
          // Outros campos iniciam com 0
        }
      });
    }

    return NextResponse.json({ success: true, logId: log.id });
  } catch (error) {
    console.error('Error saving log:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const logs = await prisma.callLog.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100,
      include: { device: true }
    });
    return NextResponse.json({ logs });
  } catch (error: any) {
    console.error('Error fetching logs:', error);
    return NextResponse.json({ error: 'Error fetching logs', details: error.message }, { status: 500 });
  }
}
