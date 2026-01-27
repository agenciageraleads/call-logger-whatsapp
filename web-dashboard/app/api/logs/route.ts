import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { deviceId, contactName, duration, type, status, timestamp } = body;

    if (!deviceId) {
      return NextResponse.json({ error: 'Device ID is required' }, { status: 400 });
    }

    // Upsert device (create if not exists)
    const device = await prisma.device.upsert({
      where: { id: deviceId },
      update: { updatedAt: new Date() },
      create: {
        id: deviceId,
        name: `Device ${deviceId.substring(0, 6)}`, // Default name
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
   } catch (error) {
     return NextResponse.json({ error: 'Error fetching logs' }, { status: 500 });
   }
}
