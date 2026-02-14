import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name } = body;

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const device = await prisma.device.update({
            where: { id },
            data: { name },
        });

        return NextResponse.json({ success: true, device });
    } catch (error) {
        console.error('Error updating device:', error);
        return NextResponse.json({ error: 'Failed to update device' }, { status: 500 });
    }
}
