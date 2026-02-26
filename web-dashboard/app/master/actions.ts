'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getMasterData() {
    const companies = await prisma.company.findMany({
        include: {
            _count: {
                select: {
                    users: true,
                    instances: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const totalUsers = await prisma.user.count();
    const totalInstances = await prisma.evolutionInstance.count();
    const totalMessages = await prisma.processedMessage.count();

    return {
        companies,
        stats: {
            totalCompanies: companies.length,
            totalUsers,
            totalInstances,
            totalMessages
        }
    };
}

import bcrypt from 'bcryptjs';

export async function createCompanyWithAdminAction(data: {
    name: string,
    cnpj: string,
    plan: string,
    maxInstances: number,
    adminEmail: string,
    adminName: string,
    adminPass: string
}) {
    const { adminEmail, adminName, adminPass, ...companyData } = data;

    const company = await prisma.company.create({
        data: companyData
    });

    const hashedPassword = await bcrypt.hash(adminPass, 10);

    await prisma.user.create({
        data: {
            companyId: company.id,
            name: adminName,
            email: adminEmail,
            password: hashedPassword,
            role: 'ADMIN'
        }
    });

    revalidatePath('/master');
    return { success: true, company };
}

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function impersonateCompanyAction(companyId: string) {
    const adminUser = await prisma.user.findFirst({
        where: {
            companyId: companyId,
            role: 'ADMIN' // Ou qualquer role que permita acesso ao dashboard da empresa
        }
    });

    if (!adminUser) {
        throw new Error('Nenhum usuário administrador encontrado para esta empresa.');
    }

    const cookieStore = await cookies();

    // Substitui a sessão atual pela sessão do admin da empresa cliente
    cookieStore.set('admin_session', adminUser.id, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 dia
        sameSite: 'lax'
    });

    cookieStore.set('user_role', adminUser.role, {
        path: '/',
        httpOnly: false,
        maxAge: 60 * 60 * 24,
        sameSite: 'lax'
    });

    // Redireciona para o dashboard do cliente
    redirect('/');
}

export async function deleteCompanyAction(id: string) {
    await prisma.company.delete({
        where: { id }
    });
    revalidatePath('/master');
    return { success: true };
}
