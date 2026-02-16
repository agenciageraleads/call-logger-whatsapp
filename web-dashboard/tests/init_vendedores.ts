import { PrismaClient } from '../app/generated/prisma/index';
const prisma = new PrismaClient();

async function main() {
    const vendedores = [
        { name: 'Vendedor 1', instanceId: 'vendedor_1', phoneNumber: '62982435286' },
        { name: 'Vendedor 2', instanceId: 'vendedor_2', phoneNumber: '62993984600' },
        { name: 'Vendedor 3', instanceId: 'vendedor_3', phoneNumber: '62935011506' },
    ];

    for (const v of vendedores) {
        await prisma.evolutionInstance.upsert({
            where: { instanceId: v.instanceId },
            update: { name: v.name, phoneNumber: v.phoneNumber },
            create: {
                name: v.name,
                instanceId: v.instanceId,
                phoneNumber: v.phoneNumber,
                webhookSecret: Math.random().toString(36).substring(7)
            },
        });
        console.log(`✅ Instance [${v.name}] (ID: ${v.instanceId}) ready in DB.`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
