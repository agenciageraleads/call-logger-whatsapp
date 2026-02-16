import { describe, it, expect, beforeAll } from 'vitest';
import { prisma } from '@/lib/prisma';
import { POST } from '@/app/api/webhooks/evolution/route';

describe('Simulação de Fluxo Real - Vendedores', () => {
    const vendedores = [
        { name: 'Vendedor 1', number: '62982435286', instanceId: 'vendedor_1' },
        { name: 'Vendedor 2', number: '62993984600', instanceId: 'vendedor_2' },
        { name: 'Vendedor 3', number: '62935011506', instanceId: 'vendedor_3' },
    ];

    beforeAll(async () => {
        // Limpa dados de teste anteriores se necessário (opcional)
        // await prisma.evolutionInstance.deleteMany({ where: { instanceId: { in: vendedores.map(v => v.instanceId) } } });
    });

    it('deve criar as instâncias e simular atividade de mensagens', async () => {
        for (const v of vendedores) {
            console.log(`Configurando ${v.name}...`);

            // 1. Cria a instância no banco (simulando o clique em "Salvar" do gestor)
            await prisma.evolutionInstance.upsert({
                where: { instanceId: v.instanceId },
                update: { name: v.name },
                create: {
                    name: v.name,
                    instanceId: v.instanceId,
                    webhookSecret: 'test-secret-' + v.instanceId
                }
            });

            // 2. Simula o recebimento de mensagens via Webhook
            // Vamos simular 5 mensagens recebidas e 3 enviadas para cada um, com JIDs diferentes para contar conversas ativas.
            const totalMsgs = 8;
            for (let i = 0; i < totalMsgs; i++) {
                const isFromMe = i < 3; // 3 enviadas, 5 recebidas
                const remoteJid = `${v.number}_customer_${i % 3}@s.whatsapp.net`; // 3 conversas diferentes

                const payload = {
                    event: 'messages.upsert',
                    instance: v.instanceId,
                    data: {
                        messages: [
                            {
                                key: {
                                    id: `msg_sim_${v.instanceId}_${i}`,
                                    remoteJid: remoteJid,
                                    fromMe: isFromMe,
                                },
                                message: { conversation: `Mensagem de teste ${i} para ${v.name}` },
                                messageTimestamp: Math.floor(Date.now() / 1000),
                            }
                        ]
                    }
                };

                const req = new Request('http://localhost/api/webhooks/evolution', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'x-webhook-secret': 'test-secret-' + v.instanceId
                    },
                    body: JSON.stringify(payload),
                });

                const resp = await POST(req);
                expect(resp.status).toBe(200);
            }
        }

        // 3. Validação final no banco de dados
        for (const v of vendedores) {
            const instance = await prisma.evolutionInstance.findUnique({
                where: { instanceId: v.instanceId },
                include: { metrics: true }
            });

            expect(instance).toBeDefined();
            const todayMetric = instance?.metrics[0];

            console.log(`Métricas para ${v.name}:`, {
                enviadas: todayMetric?.messagesSent,
                recebidas: todayMetric?.messagesReceived,
                conversas: todayMetric?.activeConversations,
                novosContatos: todayMetric?.newContacts
            });

            expect(todayMetric?.messagesSent).toBe(3);
            expect(todayMetric?.messagesReceived).toBe(5);
            expect(todayMetric?.activeConversations).toBeGreaterThanOrEqual(1);
        }
    });
});
