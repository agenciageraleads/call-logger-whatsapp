import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prismaMock } from '@/tests/mocks/prisma';

vi.mock('@/lib/prisma', () => ({
    prisma: prismaMock,
}));

import { POST } from '@/app/api/webhooks/evolution/route';
import { NextResponse } from 'next/server';
import { Prisma } from '@/app/generated/prisma/index';

describe('Evolution API Webhook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve ignorar eventos que não sejam MESSAGES_UPSERT', async () => {
        const payload = {
            event: 'messages.delete',
            instance: 'test-instance',
            data: {}
        };

        const req = new Request('http://localhost/api/webhooks/evolution', {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        const response = await POST(req);
        const result = await response.json();

        expect(result.status).toBe('ignored_event');
        expect(prismaMock.evolutionInstance.findUnique).not.toHaveBeenCalled();
    });

    it('deve processar mensagens corretamente e atualizar métricas', async () => {
        // Setup mocks
        prismaMock.evolutionInstance.findUnique.mockResolvedValue({
            id: 'inst_123',
            instanceId: 'test-instance',
            apiKey: null,
        });

        prismaMock.processedMessage.findUnique.mockResolvedValue(null);
        prismaMock.contact.findUnique.mockResolvedValue(null); // Novo contato
        prismaMock.dailyConversation.findUnique.mockResolvedValue(null); // Nova conversa

        const payload = {
            event: 'messages.upsert',
            instance: 'test-instance',
            data: {
                messages: [
                    {
                        key: {
                            id: 'msg_001',
                            remoteJid: '5511999999999@s.whatsapp.net',
                            fromMe: false,
                        },
                        message: { conversation: 'Olá!' },
                        messageTimestamp: Math.floor(Date.now() / 1000),
                    }
                ]
            }
        };

        const req = new Request('http://localhost/api/webhooks/evolution', {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        const response = await POST(req);
        const result = await response.json();

        expect(result.status).toBe('success');
        expect(prismaMock.dailyMetric.upsert).toHaveBeenCalledWith(
            expect.objectContaining({
                create: expect.objectContaining({
                    messagesReceived: 1,
                    newContacts: 1,
                    activeConversations: 1,
                }),
            })
        );
    });

    it('deve evitar processamento duplicado de mensagens (idempotência)', async () => {
        prismaMock.evolutionInstance.findUnique.mockResolvedValue({
            id: 'inst_123',
            instanceId: 'test-instance',
        });

        // Simula erro de restrição única (P2002) no create do ProcessedMessage
        // Como o Prisma isUniqueViolation depende da classe Prisma, vamos mockar o comportamento esperado do catch
        const uniqueError = new Prisma.PrismaClientKnownRequestError('Unique check failed', {
            code: 'P2002',
            clientVersion: '5.x',
        });

        prismaMock.processedMessage.create.mockRejectedValueOnce(uniqueError);

        const payload = {
            event: 'messages.upsert',
            instance: 'test-instance',
            data: {
                messages: [
                    {
                        key: { id: 'msg_already_seen', remoteJid: '123@s.whatsapp.net', fromMe: true },
                        message: { conversation: 'Teste' },
                    }
                ]
            }
        };

        const req = new Request('http://localhost/api/webhooks/evolution', {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        const response = await POST(req);
        const result = await response.json();

        expect(result.status).toBe('success');
        // Verificamos se o dailyMetric não foi chamado para incremento pois a msg foi pulada
        expect(prismaMock.dailyMetric.upsert).not.toHaveBeenCalled();
    });
});
