import { cookies } from 'next/headers';
import { prisma } from './prisma';

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('admin_session')?.value;

    if (!userId) return null;

    return await prisma.user.findUnique({
        where: { id: userId },
        include: { company: true }
    });
}
