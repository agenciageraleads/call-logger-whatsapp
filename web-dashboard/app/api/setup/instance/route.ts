import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createEvolutionInstance, getRequestBaseUrl, setEvolutionWebhook } from '@/lib/evolution';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, instanceId, deviceId } = body;
        const endpointUrlInput = String(body?.endpointUrl || '').trim();
        const apiKeyInput = String(body?.apiKey || '').trim();

        const endpointUrl = endpointUrlInput || process.env.EVOLUTION_SERVER_URL;
        const apiKey = apiKeyInput || process.env.EVOLUTION_API_KEY;

        if (!instanceId || !name) {
            return NextResponse.json({ error: 'Missing instanceId or name' }, { status: 400 });
        }

        // Cria ou atualiza a instância
        const existing = await prisma.evolutionInstance.findUnique({ where: { instanceId } });

        const instance = await prisma.evolutionInstance.upsert({
            where: { instanceId },
            update: {
                name,
                deviceId, // Pode ser null se ainda não soubermos
                // Avoid persisting server env secrets to DB unless explicitly provided in the request.
                apiKey: apiKeyInput ? apiKeyInput : existing?.apiKey ?? null,
                endpointUrl: endpointUrlInput ? endpointUrlInput : existing?.endpointUrl ?? null,
                webhookSecret: existing?.webhookSecret || crypto.randomBytes(32).toString('hex'),
            },
            create: {
                name,
                instanceId,
                deviceId,
                apiKey: apiKeyInput || null,
                endpointUrl: endpointUrlInput || null,
                webhookSecret: crypto.randomBytes(32).toString('hex'),
            }
        });

        // (Opcional) Se endpoint + apiKey foram informados, configura webhook na Evolution automaticamente.
        // Para isso, precisamos de um base URL publico deste servidor.
        if (endpointUrl && apiKey) {
            const baseUrl = process.env.WEBHOOK_PUBLIC_BASE_URL || getRequestBaseUrl(req);
            const webhookUrl = `${baseUrl}/api/webhooks/evolution`;

            // Ensure the instance exists on Evolution API (idempotency depends on Evolution behavior;
            // if it already exists, Evolution may return an error; we ignore and continue).
            try {
                await createEvolutionInstance({
                    endpointUrl,
                    apiKey,
                    instanceName: instanceId,
                });
            } catch (e) {
                const msg = e instanceof Error ? e.message : String(e);
                console.warn('Evolution createInstance skipped/failed (continuing):', msg);
            }

            await setEvolutionWebhook({
                endpointUrl,
                apiKey,
                instanceName: instanceId,
                webhookUrl,
                events: ['MESSAGES_UPSERT'],
                webhookSecret: instance.webhookSecret || undefined,
            });
        }

        return NextResponse.json({
            status: 'success',
            instance,
            message: 'Instância configurada. Agora os webhooks e logs serão contabilizados para ela.'
        });

    } catch (error) {
        console.error('Error setup instance:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
