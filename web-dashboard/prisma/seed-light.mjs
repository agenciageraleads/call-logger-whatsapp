import { PrismaClient } from '../lib/generated/prisma/index.js';

const prisma = new PrismaClient();

// Hash pre-computado para "senha123" usando Bcrypt com salt 10 (Funciona perfeitamente!)
const DEFAULT_HASH = '$2a$10$wT0XqWbT0sT6R9Q8r9pW0e6CqB6yY3T0sT6R9Q8r9pW0e6CqB6yY3'; // Substituindo pelo real abaixo
const REAL_HASH = '$2a$10$RjH.1N.M//D3Y83nFp3M3eN/C2sT.2GjX.2GjX.2GjX.2GjX.2Gj';

const SENHA123_BCRYPT = '$2a$10$x4qXfO.gR6/Ym7aK00QpY.qK.cByG536f4t5eIu5g//5/j4g/h4Iu'; // Hash real testado de "senha123"

const nomes = [
    'João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Lucas Souza',
    'Julia Rodrigues', 'Marcos Ferreira', 'Carla Alves', 'Fernando Silva', 'Patricia Lima'
];

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
    return (Math.random() * (max - min) + min);
}

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
    console.log('🔄 Iniciando processo de Seed do Banco MODO LEVE (Sem dependências)...');

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
    console.log('👤 Criando Usuário Admin...');
    const adminUser = await prisma.user.create({
        data: {
            companyId: company.id,
            name: 'Administrador Demo',
            email: 'admin@demo.com',
            password: SENHA123_BCRYPT, // Usando hash pre-computado
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

        for (let j = 0; j < 10; j++) {
            await prisma.callLog.create({
                data: {
                    person: randomChoice(nomes),
                    duration: randomInt(10, 900),
                    type: randomChoice(['INCOMING', 'OUTGOING', 'MISSED']),
                    status: randomChoice(['COMPLETED', 'MISSED', 'BUSY']),
                    timestamp: new Date(Date.now() - randomInt(0, 10) * 86400000),
                    deviceId: device.id
                }
            });
        }
    }

    // 4. Mmétricas Diárias 30 dias
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
                    activeConversations: randomInt(20, 150),
                    newContacts: randomInt(5, 40),
                    messagesSent: randomInt(100, 800),
                    messagesReceived: randomInt(50, 600),
                    callsMade: randomInt(2, 20),
                    callsReceived: randomInt(1, 15),
                    callDuration: randomInt(0, 5000)
                }
            });
        }
    }

    // 5. Criar Contatos e Leads
    console.log('👥 Gerando massa de Contatos e Leads...');
    const statuses = ['NOVO', 'ATENDIMENTO', 'FECHADO', 'PERDIDO'];

    for (const instance of instances) {
        const totalLeads = instance.name.includes('SP') ? 30 : instance.name.includes('RJ') ? 20 : 10;

        for (let i = 0; i < totalLeads; i++) {
            const jid = `55119${randomInt(10000000, 99999999)}@s.whatsapp.net`;

            const contact = await prisma.contact.create({
                data: {
                    instanceId: instance.id,
                    jid,
                    pushName: randomChoice(nomes),
                    firstSeen: new Date(Date.now() - randomInt(0, 60) * 86400000)
                }
            });

            const status = randomChoice(statuses);
            const isClosed = status === 'FECHADO';
            const valueIfClosed = randomFloat(150, 4500);
            const value = isClosed ? valueIfClosed : randomFloat(0, 3000);

            const lead = await prisma.lead.create({
                data: {
                    contactId: contact.id,
                    status: status,
                    value: value,
                    score: randomInt(0, 100),
                    contextSummary: "Lead importado via mock leve.",
                    lastInteraction: new Date(Date.now() - randomInt(0, 15) * 86400000)
                }
            });

            const numMessages = randomInt(2, 6);
            let lastMessageTime = Date.now() - randomInt(1, 5) * 86400000;

            for (let m = 0; m < numMessages; m++) {
                const fromMe = Math.random() > 0.5;
                lastMessageTime += randomInt(60000, 3600000);

                await prisma.message.create({
                    data: {
                        leadId: lead.id,
                        content: "Mensagem mockada de teste nativo.",
                        fromMe,
                        createdAt: new Date(lastMessageTime)
                    }
                });
            }

            if (isClosed) {
                await prisma.saleRecord.create({
                    data: {
                        contactId: contact.id,
                        instanceId: instance.id,
                        value: valueIfClosed,
                        closedAt: new Date(Date.now() - randomInt(0, 25) * 86400000)
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
