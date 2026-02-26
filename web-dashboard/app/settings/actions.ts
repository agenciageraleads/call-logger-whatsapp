'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { connectEvolutionInstance, createEvolutionInstance, logoutEvolutionInstance, setEvolutionWebhook } from '@/lib/evolution';
import crypto from 'crypto';
import { getCurrentUser } from '@/lib/auth-helpers';

function newWebhookSecret() {
    return crypto.randomBytes(32).toString('hex');
}

export async function getDevices() {
    const user = await getCurrentUser();
    if (!user) throw new Error('Não autorizado');

    return await prisma.device.findMany({
        where: { companyId: user.companyId },
        orderBy: { lastSeen: 'desc' },
        include: {
            evolutionInstance: true
        }
    });
}

export async function getInstances() {
    const user = await getCurrentUser();
    if (!user) throw new Error('Não autorizado');

    return await prisma.evolutionInstance.findMany({
        where: { companyId: user.companyId },
        orderBy: { name: 'asc' },
        include: {
            device: true
        }
    });
}

export async function createInstance(data: FormData) {
    const user = await getCurrentUser();
    if (!user) throw new Error('Não autorizado');

    const name = data.get('name') as string;
    let instanceId = data.get('instanceId') as string;
    const phoneNumber = data.get('phoneNumber') as string;

    if (!name) {
        throw new Error('O nome é obrigatório');
    }

    if (!instanceId) {
        instanceId = name.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]/g, '_')
            + '_' + Math.floor(Math.random() * 1000);
    }

    await prisma.evolutionInstance.upsert({
        where: { instanceId },
        update: {
            name,
            phoneNumber: phoneNumber || null,
            companyId: user.companyId
        },
        create: {
            name,
            instanceId,
            phoneNumber: phoneNumber || null,
            webhookSecret: newWebhookSecret(),
            companyId: user.companyId
        },
    });

    revalidatePath('/settings');
    return { success: true };
}

export async function linkDeviceToInstance(instanceId: string, deviceId: string) {
    const user = await getCurrentUser();
    if (!user) throw new Error('Não autorizado');

    // Validação cruzada de segurança
    const instance = await prisma.evolutionInstance.findFirst({
        where: { id: instanceId, companyId: user.companyId }
    });
    const device = await prisma.device.findFirst({
        where: { id: deviceId, companyId: user.companyId }
    });

    if (!instance || !device) throw new Error('Recurso não encontrado ou acesso negado');

    await prisma.$transaction([
        prisma.evolutionInstance.updateMany({
            where: { deviceId },
            data: { deviceId: null },
        }),
        prisma.evolutionInstance.update({
            where: { id: instanceId },
            data: { deviceId },
        }),
    ]);

    revalidatePath('/settings');
    return { success: true };
}

export async function unlinkDevice(instanceId: string) {
    const user = await getCurrentUser();
    if (!user) throw new Error('Não autorizado');

    const instance = await prisma.evolutionInstance.findFirst({
        where: { id: instanceId, companyId: user.companyId }
    });

    if (!instance) throw new Error('Acesso negado');

    try {
        await prisma.evolutionInstance.update({
            where: { id: instanceId },
            data: { deviceId: null }
        });
        revalidatePath('/settings');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Falha ao desvincular dispositivo.' };
    }
}

export async function logoutInstance(evolutionInstanceDbId: string) {
    const user = await getCurrentUser();
    if (!user) throw new Error('Não autorizado');

    const instance = await prisma.evolutionInstance.findFirst({
        where: { id: evolutionInstanceDbId, companyId: user.companyId }
    });

    if (!instance) {
        return { success: false, error: 'Instância não encontrada ou acesso negado.' };
    }

    const endpointUrl = instance.endpointUrl || process.env.EVOLUTION_SERVER_URL || '';
    const apiKey = instance.apiKey || process.env.EVOLUTION_API_KEY || '';

    if (endpointUrl && apiKey) {
        try {
            await logoutEvolutionInstance({
                endpointUrl,
                apiKey,
                instanceName: instance.instanceId,
            });
        } catch (e) {
            console.error('[Actions] Erro ao fazer logout na Evolution:', e);
        }
    }

    revalidatePath('/settings');
    return { success: true };
}

export async function deleteInstance(evolutionInstanceDbId: string) {
    const user = await getCurrentUser();
    if (!user) throw new Error('Não autorizado');

    const instance = await prisma.evolutionInstance.findFirst({
        where: { id: evolutionInstanceDbId, companyId: user.companyId }
    });

    if (!instance) {
        return { success: false, error: 'Instância não encontrada ou acesso negado.' };
    }

    const endpointUrl = instance.endpointUrl || process.env.EVOLUTION_SERVER_URL || '';
    const apiKey = instance.apiKey || process.env.EVOLUTION_API_KEY || '';

    if (endpointUrl && apiKey) {
        try {
            const { deleteEvolutionInstance } = await import('@/lib/evolution');
            await deleteEvolutionInstance({
                endpointUrl,
                apiKey,
                instanceName: instance.instanceId,
            });
        } catch (e) { }
    }

    await prisma.evolutionInstance.delete({
        where: { id: evolutionInstanceDbId }
    });

    revalidatePath('/settings');
    revalidatePath('/');
    return { success: true };
}

export async function provisionEvolutionInstance(evolutionInstanceDbId: string, frontendUrl?: string) {
    const user = await getCurrentUser();
    if (!user) throw new Error('Não autorizado');

    const instance = await prisma.evolutionInstance.findFirst({
        where: { id: evolutionInstanceDbId, companyId: user.companyId }
    });

    if (!instance) throw new Error('Instância não encontrada');

    const endpointUrl = instance.endpointUrl || process.env.EVOLUTION_SERVER_URL || '';
    const apiKey = instance.apiKey || process.env.EVOLUTION_API_KEY || '';

    if (!endpointUrl || !apiKey) {
        throw new Error('endpointUrl e apiKey são obrigatórios');
    }

    const ensured = instance.webhookSecret
        ? instance
        : await prisma.evolutionInstance.update({
            where: { id: instance.id },
            data: { webhookSecret: newWebhookSecret() },
        });

    const baseUrl = frontendUrl || process.env.WEBHOOK_PUBLIC_BASE_URL;
    const warnings: string[] = [];
    const webhookUrl = baseUrl ? `${baseUrl.replace(/\/+$/, '')}/api/webhooks/evolution` : '';

    try {
        await createEvolutionInstance({
            endpointUrl,
            apiKey,
            instanceName: instance.instanceId,
        });
    } catch { }

    if (webhookUrl) {
        await setEvolutionWebhook({
            endpointUrl,
            apiKey,
            instanceName: instance.instanceId,
            webhookUrl,
            events: ['MESSAGES_UPSERT'],
            webhookSecret: ensured.webhookSecret || undefined,
        });
    }

    const connect = await connectEvolutionInstance({
        endpointUrl,
        apiKey,
        instanceName: instance.instanceId,
    });

    revalidatePath('/settings');
    return { success: true, connect, warnings };
}

export async function checkInstanceConnectionState(evolutionInstanceDbId: string) {
    const user = await getCurrentUser();
    if (!user) throw new Error('Não autorizado');

    const instance = await prisma.evolutionInstance.findFirst({
        where: { id: evolutionInstanceDbId, companyId: user.companyId }
    });

    if (!instance) {
        return { success: false, state: 'disconnected' };
    }

    const endpointUrl = instance.endpointUrl || process.env.EVOLUTION_SERVER_URL || '';
    const apiKey = instance.apiKey || process.env.EVOLUTION_API_KEY || '';

    if (!endpointUrl || !apiKey) {
        return { success: false, state: 'disconnected' };
    }

    try {
        const { getEvolutionConnectionState } = await import('@/lib/evolution');
        const stateData = await getEvolutionConnectionState({
            endpointUrl,
            apiKey,
            instanceName: instance.instanceId,
        });
        return { success: true, state: stateData.state };
    } catch (e) {
        return { success: false, state: 'disconnected' };
    }
}
