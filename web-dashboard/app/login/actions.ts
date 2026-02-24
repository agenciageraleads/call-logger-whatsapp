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
        cookies().set('admin_session', user.id, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24,
            sameSite: 'lax'
        });

        return { success: true };

    } catch (e) {
        console.error("Login Error:", e);
        return { error: 'Ocorreu um erro interno. Tente novamente.' };
    }
}

export async function logoutAction() {
    cookies().delete('admin_session');
    return { success: true };
}
