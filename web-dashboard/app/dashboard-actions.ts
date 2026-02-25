'use server'

import { prisma } from '@/lib/prisma';
import { startOfDay, endOfDay } from 'date-fns';
import { DashboardData, KPIData, MetricWithInstance } from '@/lib/types';
import { getCurrentUser } from '@/lib/auth-helpers';

export async function getDashboardData(date?: Date): Promise<DashboardData> {
    const user = await getCurrentUser();
    if (!user) throw new Error('Não autorizado');

    const targetDate = date || new Date();
    const start = startOfDay(targetDate);
    const end = endOfDay(targetDate);

    // Busca métricas do dia por instância (Filtrado por Empresa)
    const dailyMetrics = await prisma.dailyMetric.findMany({
        where: {
            date: {
                gte: start,
                lte: end
            },
            instance: {
                companyId: user.companyId
            }
        },
        include: {
            instance: true
        },
        orderBy: {
            instance: {
                name: 'asc'
            }
        }
    }) as MetricWithInstance[];

    // Totais Gerais
    const initialTotals: KPIData = {
        callsMade: 0,
        callsReceived: 0,
        callDuration: 0,
        messagesSent: 0,
        messagesReceived: 0,
        activeConversations: 0,
        newContacts: 0
    };

    const totals = dailyMetrics.reduce((acc: KPIData, curr: MetricWithInstance) => ({
        callsMade: acc.callsMade + curr.callsMade,
        callsReceived: acc.callsReceived + curr.callsReceived,
        callDuration: acc.callDuration + curr.callDuration,
        messagesSent: acc.messagesSent + curr.messagesSent,
        messagesReceived: acc.messagesReceived + curr.messagesReceived,
        activeConversations: acc.activeConversations + curr.activeConversations,
        newContacts: acc.newContacts + curr.newContacts,
    }), initialTotals);

    // Busca atividade por hora (Filtrado por Empresa)
    const processedMessages = await prisma.processedMessage.findMany({
        where: {
            timestamp: {
                gte: start,
                lte: end
            },
            instance: {
                companyId: user.companyId
            }
        },
        select: {
            timestamp: true,
            instanceId: true
        }
    });

    const calls = await prisma.callLog.findMany({
        where: {
            timestamp: {
                gte: start,
                lte: end
            },
            device: {
                evolutionInstance: {
                    companyId: user.companyId
                }
            }
        },
        include: {
            device: {
                include: {
                    evolutionInstance: true
                }
            }
        }
    });

    // Agrupa por hora geral
    const hourlyActivity = Array.from({ length: 24 }, (_, i) => ({
        name: `${String(i).padStart(2, '0')}:00`,
        msgs: 0,
        calls: 0
    }));

    // Agrupa por hora por instancia
    const hourlyByInstance: Record<string, { name: string, msgs: number, calls: number }[]> = {};

    function getHourlyArray() {
        return Array.from({ length: 24 }, (_, i) => ({
            name: `${String(i).padStart(2, '0')}:00`,
            msgs: 0,
            calls: 0
        }));
    }

    for (const msg of processedMessages) {
        const hour = msg.timestamp.getHours();
        hourlyActivity[hour].msgs++;

        if (!hourlyByInstance[msg.instanceId]) {
            hourlyByInstance[msg.instanceId] = getHourlyArray();
        }
        hourlyByInstance[msg.instanceId][hour].msgs++;
    }

    for (const call of calls) {
        const hour = call.timestamp.getHours();
        hourlyActivity[hour].calls++;

        const instanceId = call.device?.evolutionInstance?.id;
        if (instanceId) {
            if (!hourlyByInstance[instanceId]) {
                hourlyByInstance[instanceId] = getHourlyArray();
            }
            hourlyByInstance[instanceId][hour].calls++;
        }
    }

    return { dailyMetrics, totals, hourlyActivity, hourlyByInstance, date: targetDate };
}
