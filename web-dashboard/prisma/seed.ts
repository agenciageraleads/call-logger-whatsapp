import { PrismaClient } from '../lib/generated/prisma';
import bcrypt from 'bcryptjs';
import { fakerPT_BR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Iniciando processo de Seed do Banco de Dados...');

    if (process.env.NODE_ENV === 'production') {
        console.error('❌ ERRO: Seed não deve ser rodado em produção.');
        process.exit(1);
    }

    // Limpar o banco primeiro
    console.log('🧹 Limpando dados existentes...');
    await prisma.user.deleteMany();
    await prisma.company.deleteMany();
    await prisma.lead.deleteMany();
    await prisma.contact.deleteMany();
    await prisma.processedMessage.deleteMany();
    await prisma.dailyConversation.deleteMany();
    await prisma.dailyMetric.deleteMany();
    await prisma.saleRecord.deleteMany();
    await prisma.callLog.deleteMany();
    await prisma.evolutionInstance.deleteMany();
    await prisma.device.deleteMany();

    // 1. Criar Empresa Headquarter
    console.log('🏢 Criando Empresa...');
    const company = await prisma.company.create({
        data: {
            name: 'Acme Corp - Filial Brasil',
            cnpj: '00.000.000/0001-00',
            address: 'Av. Paulista, 1000 - São Paulo, SP',
            billingEmail: 'financeiro@acme.com.br'
        }
    });

    // 2. Criar Usuário Admin Mocado
    console.log('👤 Criando Usuário Admin (admin@demo.com / senha123)...');
    const hashedPassword = await bcrypt.hash('senha123', 10);
    const adminUser = await prisma.user.create({
        data: {
            companyId: company.id,
            name: 'Administrador Demo',
            email: 'admin@demo.com',
            password: hashedPassword,
            role: 'ADMIN'
        }
    });

    // 3. Criar 3 Dispositivos e Instâncias
    console.log('📱 Criando Instâncias do WhatsApp e Devices...');
    const instancesData = [
        { name: 'Vendas SP (Principal)', instanceIf: 'vendas_sp_inst', phoneId: 'device-sp' },
        { name: 'Vendas RJ', instanceIf: 'vendas_rj_inst', phoneId: 'device-rj' },
        { name: 'Suporte Nível 1', instanceIf: 'suporte_inst', phoneId: 'device-sup' }
    ];

    const instances = [];
    for (const inst of instancesData) {
        const device = await prisma.device.create({
            data: {
                id: inst.phoneId,
                name: `iPhone - ${inst.name}`,
                lastSeen: new Date()
            }
        });

        const instance = await prisma.evolutionInstance.create({
            data: {
                companyId: company.id,
                name: inst.name,
                instanceId: inst.instanceIf,
                deviceId: device.id,
                phoneNumber: '551199999000' + instances.length
            }
        });
        instances.push(instance);

        // Criar Logs de Chamadas (10 por device)
        for (let j = 0; j < 10; j++) {
            await prisma.callLog.create({
                data: {
                    person: faker.person.fullName(),
                    duration: faker.number.int({ min: 10, max: 900 }),
                    type: ['INCOMING', 'OUTGOING', 'MISSED'][faker.number.int({ min: 0, max: 2 })],
                    status: ['COMPLETED', 'MISSED', 'BUSY'][faker.number.int({ min: 0, max: 2 })],
                    timestamp: faker.date.recent({ days: 10 }),
                    deviceId: device.id
                }
            });
        }
    }

    // 4. Criar Métricas Diárias dos últimos 30 dias para os gráficos ficarem cheios
    console.log('📊 Gerando Métricas de Atividade de 30 dias...');
    const now = new Date();
    for (const instance of instances) {
        for (let i = 0; i < 30; i++) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);

            await prisma.dailyMetric.create({
                data: {
                    instanceId: instance.id,
                    date: date,
                    activeConversations: faker.number.int({ min: 20, max: 150 }),
                    newContacts: faker.number.int({ min: 5, max: 40 }),
                    messagesSent: faker.number.int({ min: 100, max: 800 }),
                    messagesReceived: faker.number.int({ min: 50, max: 600 }),
                    callsMade: faker.number.int({ min: 2, max: 20 }),
                    callsReceived: faker.number.int({ min: 1, max: 15 }),
                    callDuration: faker.number.int({ min: 0, max: 5000 })
                }
            });
        }
    }

    // 5. Criar Contatos e Leads
    console.log('👥 Gerando massa de Contatos e Leads...');
    const statuses = ['NOVO', 'ATENDIMENTO', 'FECHADO', 'PERDIDO'];

    for (const instance of instances) {
        // Quantidade de leads baseada no tipo para ficar realista
        const totalLeads = instance.name.includes('SP') ? 45 : instance.name.includes('RJ') ? 25 : 15;

        for (let i = 0; i < totalLeads; i++) {
            const jid = `55119${faker.string.numeric(8)}@s.whatsapp.net`;

            const contact = await prisma.contact.create({
                data: {
                    instanceId: instance.id,
                    jid,
                    pushName: faker.person.firstName() + ' ' + faker.person.lastName(),
                    firstSeen: faker.date.recent({ days: 60 })
                }
            });

            const status = statuses[faker.number.int({ min: 0, max: 3 })];
            const isClosed = status === 'FECHADO';
            const valueIfClosed = faker.number.float({ min: 150, max: 4500, fractionDigits: 2 });
            const value = isClosed ? valueIfClosed : faker.number.float({ min: 0, max: 3000, fractionDigits: 2 });

            const lead = await prisma.lead.create({
                data: {
                    contactId: contact.id,
                    status: status,
                    value: value,
                    score: faker.number.int({ min: 0, max: 100 }),
                    contextSummary: faker.lorem.sentence(8),
                    lastInteraction: faker.date.recent({ days: 15 })
                }
            });

            // Criar Anexos Opcionais
            if (faker.datatype.boolean({ probability: 0.3 })) {
                await prisma.attachment.create({
                    data: {
                        leadId: lead.id,
                        fileName: 'Orcamento_' + faker.string.alphanumeric(5).toUpperCase() + '.pdf',
                        fileType: 'application/pdf',
                        fileSize: faker.number.int({ min: 1024, max: 5000000 }),
                        fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
                    }
                });
            }

            // Notas
            if (faker.datatype.boolean({ probability: 0.5 })) {
                await prisma.note.create({
                    data: {
                        leadId: lead.id,
                        content: faker.hacker.phrase()
                    }
                });
            }

            // Gerar Mensagens para os Insights (SLA)
            const numMessages = faker.number.int({ min: 2, max: 10 });
            let lastMessageDate = faker.date.recent({ days: 5 });

            for (let m = 0; m < numMessages; m++) {
                const fromMe = faker.datatype.boolean();
                // Aumenta a data cronologicamente
                lastMessageDate = new Date(lastMessageDate.getTime() + faker.number.int({ min: 60000, max: 3600000 }));

                await prisma.message.create({
                    data: {
                        leadId: lead.id,
                        content: faker.lorem.sentence(),
                        fromMe,
                        createdAt: lastMessageDate
                    }
                });
            }

            // Criar Saídas de Vendas se estiver fechado
            if (isClosed) {
                await prisma.saleRecord.create({
                    data: {
                        contactId: contact.id,
                        instanceId: instance.id,
                        value: valueIfClosed,
                        closedAt: faker.date.recent({ days: 25 })
                    }
                });
            }
        }
    }

    console.log('✅ Base de dados perfeitamente mocado para apresentação!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
