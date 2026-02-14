'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { connectEvolutionInstance, createEvolutionInstance, setEvolutionWebhook } from '@/lib/evolution';
import crypto from 'crypto';

function newWebhookSecret() {
    // Hex string: easy to pass as header; 32 bytes is enough for shared secret.
    return crypto.randomBytes(32).toString('hex');
}

export async function getDevices() {
    return await prisma.device.findMany({
        orderBy: { lastSeen: 'desc' },
        include: {
            evolutionInstance: true // Inclui se já está vinculado
        }
    });
}

export async function getInstances() {
    return await prisma.evolutionInstance.findMany({
        orderBy: { name: 'asc' },
        include: {
            device: true
        }
    });
}

export async function createInstance(data: FormData) {
    const name = data.get('name') as string;
    const instanceId = data.get('instanceId') as string;
    const endpointUrlInput = ((data.get('endpointUrl') as string) || '').trim();
    const apiKeyInput = ((data.get('apiKey') as string) || '').trim();

    if (!name || !instanceId) {
        throw new Error('Nome e ID da instância são obrigatórios');
    }

    const existing = await prisma.evolutionInstance.findUnique({ where: { instanceId } });

    const instance = await prisma.evolutionInstance.upsert({
        where: { instanceId },
        update: {
            name,
            // Only overwrite stored values if user explicitly provided new ones.
            endpointUrl: endpointUrlInput ? endpointUrlInput : existing?.endpointUrl ?? null,
            apiKey: apiKeyInput ? apiKeyInput : existing?.apiKey ?? null,
            webhookSecret: existing?.webhookSecret ?? newWebhookSecret(),
        },
        create: {
            name,
            instanceId,
            endpointUrl: endpointUrlInput || null,
            apiKey: apiKeyInput || null,
            webhookSecret: newWebhookSecret(),
        },
    });

    revalidatePath('/settings');
    return { success: true };
}

export async function linkDeviceToInstance(instanceId: string, deviceId: string) {
    // Primeiro remove qualquer vínculo existente para este device ou instância para evitar erros de unique
    // (Opcional, mas seguro para garantir 1:1)

    await prisma.$transaction([
        // Unlink device from any other instance first (deviceId is unique)
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
    await prisma.evolutionInstance.update({
        where: { id: instanceId },
        data: { deviceId: null }
    });

    revalidatePath('/settings');
    return { success: true };
}

export async function provisionEvolutionInstance(evolutionInstanceDbId: string) {
    const instance = await prisma.evolutionInstance.findUnique({ where: { id: evolutionInstanceDbId } });

    if (!instance) {
        throw new Error('Instância não encontrada');
    }

    const endpointUrl = instance.endpointUrl || process.env.EVOLUTION_SERVER_URL || '';
    const apiKey = instance.apiKey || process.env.EVOLUTION_API_KEY || '';

    if (!endpointUrl || !apiKey) {
        throw new Error('endpointUrl e apiKey são obrigatórios para provisionar na Evolution');
    }

    const ensured = instance.webhookSecret
        ? instance
        : await prisma.evolutionInstance.update({
            where: { id: instance.id },
            data: { webhookSecret: newWebhookSecret() },
        });

    const baseUrl = process.env.WEBHOOK_PUBLIC_BASE_URL;
    const warnings: string[] = [];
    const webhookUrl = baseUrl ? `${baseUrl.replace(/\/+$/, '')}/api/webhooks/evolution` : '';

    // Create instance (ignore errors if already exists)
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
    } else {
        warnings.push('WEBHOOK_PUBLIC_BASE_URL não configurado; webhook não foi setado (QR ainda funciona).');
    }

    const connect = await connectEvolutionInstance({
        endpointUrl,
        apiKey,
        instanceName: instance.instanceId,
    });

    revalidatePath('/settings');
    return { success: true, connect, warnings };
}
