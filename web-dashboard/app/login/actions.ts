'use server'

import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function loginAction(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'Preencha todos os campos.' };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: { company: true }
        });

        if (!user) {
            return { error: 'Usuário ou senha incorretos.' };
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return { error: 'Usuário ou senha incorretos.' };
        }

        // Criar o Cookie Seguro (1 dia)
        const cookieStore = await cookies();

        cookieStore.set('admin_session', user.id, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24,
            sameSite: 'lax'
        });

        // Cookie de conveniência para o middleware (opcional, mas ajuda no roteamento)
        cookieStore.set('user_role', user.role, {
            path: '/',
            httpOnly: false, // Permitido ler no middleware
            maxAge: 60 * 60 * 24,
            sameSite: 'lax'
        });

        return { success: true, role: user.role };

    } catch (e) {
        console.error("Login Error:", e);
        return { error: 'Ocorreu um erro interno. Tente novamente.' };
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    cookieStore.delete('user_role');
    return { success: true };
}
