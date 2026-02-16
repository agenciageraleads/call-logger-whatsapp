'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { connectEvolutionInstance, createEvolutionInstance, logoutEvolutionInstance, setEvolutionWebhook } from '@/lib/evolution';
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
    let instanceId = data.get('instanceId') as string;
    const phoneNumber = data.get('phoneNumber') as string;

    if (!name) {
        throw new Error('O nome é obrigatório');
    }

    // Se não tiver ID, gera um baseado no nome e timestamp
    if (!instanceId) {
        instanceId = name.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
            .replace(/[^a-z0-9]/g, '_') // remove especiais
            + '_' + Math.floor(Math.random() * 1000);
    }

    await prisma.evolutionInstance.upsert({
        where: { instanceId },
        update: { name, phoneNumber: phoneNumber || null },
        create: {
            name,
            instanceId,
            phoneNumber: phoneNumber || null,
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
    console.log(`[Actions] Desvinculando dispositivo da instância ${instanceId}...`);
    try {
        await prisma.evolutionInstance.update({
            where: { id: instanceId },
            data: { deviceId: null }
        });
        console.log(`[Actions] Dispositivo desvinculado com sucesso.`);
        revalidatePath('/settings');
        return { success: true };
    } catch (error) {
        console.error(`[Actions] Erro ao desvincular dispositivo:`, error);
        return { success: false, error: 'Falha ao desvincular dispositivo no banco de dados.' };
    }
}

export async function logoutInstance(evolutionInstanceDbId: string) {
    console.log(`[Actions] Iniciando logout da instância ${evolutionInstanceDbId}...`);
    try {
        const instance = await prisma.evolutionInstance.findUnique({ where: { id: evolutionInstanceDbId } });

        if (!instance) {
            return { success: false, error: 'Instância não encontrada.' };
        }

        const endpointUrl = instance.endpointUrl || process.env.EVOLUTION_SERVER_URL || '';
        const apiKey = instance.apiKey || process.env.EVOLUTION_API_KEY || '';

        if (endpointUrl && apiKey) {
            try {
                console.log(`[Actions] Chamando logout na Evolution API para ${instance.instanceId}...`);
                await logoutEvolutionInstance({
                    endpointUrl,
                    apiKey,
                    instanceName: instance.instanceId,
                });
                console.log(`[Actions] Logout na Evolution API concluído.`);
            } catch (e) {
                console.error('[Actions] Erro ao fazer logout na Evolution (prosseguindo):', e);
            }
        }

        revalidatePath('/settings');
        return { success: true };
    } catch (error) {
        console.error(`[Actions] Erro ao realizar logout:`, error);
        return { success: false, error: 'Falha ao processar logout da instância.' };
    }
}

export async function deleteInstance(evolutionInstanceDbId: string) {
    console.log(`[Actions] Deletando instância ${evolutionInstanceDbId}...`);
    try {
        const instance = await prisma.evolutionInstance.findUnique({ where: { id: evolutionInstanceDbId } });
        if (!instance) {
            return { success: false, error: 'Instância não encontrada.' };
        }

        const endpointUrl = instance.endpointUrl || process.env.EVOLUTION_SERVER_URL || '';
        const apiKey = instance.apiKey || process.env.EVOLUTION_API_KEY || '';

        // Tenta deletar na Evolution API primeiro
        if (endpointUrl && apiKey) {
            try {
                console.log(`[Actions] Deletando instância na Evolution API: ${instance.instanceId}...`);
                const { deleteEvolutionInstance } = await import('@/lib/evolution');
                await deleteEvolutionInstance({
                    endpointUrl,
                    apiKey,
                    instanceName: instance.instanceId,
                });
                console.log(`[Actions] Instância deletada na Evolution API com sucesso.`);
            } catch (e) {
                console.error('[Actions] Erro ao deletar na Evolution (prosseguindo):', e);
            }
        }

        // Deleta do banco local. O Cascading Delete cuidará do resto.
        await prisma.evolutionInstance.delete({
            where: { id: evolutionInstanceDbId }
        });

        console.log(`[Actions] Instância deletada com sucesso do banco de dados.`);
        revalidatePath('/settings');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error(`[Actions] Erro ao deletar instância:`, error);
        return { success: false, error: 'Falha ao excluir instância. Verifique logs do servidor.' };
    }
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

    console.log(`Provisionando instância ${instance.instanceId} na Evolution...`);
    const connect = await connectEvolutionInstance({
        endpointUrl,
        apiKey,
        instanceName: instance.instanceId,
    });

    console.log('Resposta da Evolution (connect):', JSON.stringify(connect, null, 2));

    revalidatePath('/settings');
    return { success: true, connect, warnings };
}
