'use server'

import { prisma } from '@/lib/prisma';
import { startOfDay, endOfDay } from 'date-fns';

export async function getDashboardData(date?: Date) {
    const targetDate = date || new Date();
    const start = startOfDay(targetDate);
    const end = endOfDay(targetDate);

    // Busca métricas do dia por instância
    const dailyMetrics = await prisma.dailyMetric.findMany({
        where: {
            date: {
                gte: start,
                lte: end
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
    });

    // Totais Gerais
    const initialTotals = {
        callsMade: 0,
        callsReceived: 0,
        callDuration: 0,
        messagesSent: 0,
        messagesReceived: 0,
        activeConversations: 0,
        newContacts: 0
    };

    const totals = dailyMetrics.reduce((acc: typeof initialTotals, curr: any) => ({
        callsMade: acc.callsMade + curr.callsMade,
        callsReceived: acc.callsReceived + curr.callsReceived,
        callDuration: acc.callDuration + curr.callDuration,
        messagesSent: acc.messagesSent + curr.messagesSent,
        messagesReceived: acc.messagesReceived + curr.messagesReceived,
        activeConversations: acc.activeConversations + curr.activeConversations,
        newContacts: acc.newContacts + curr.newContacts,
    }), initialTotals);

    return { dailyMetrics, totals, date: targetDate };
}
