'use server'

import { prisma } from '@/lib/prisma';
import { CRMData, LeadWithContact, LeadStatus } from '@/lib/types';
import { revalidatePath } from 'next/cache';

/**
 * Busca todos os dados necessários para o CRM
 */
export async function getCRMData(): Promise<CRMData> {
    const leads = await prisma.lead.findMany({
        where: {
            contact: {
                isIgnored: false
            }
        },
        include: {
            contact: {
                include: {
                    instance: true
                }
            },
            notes: true
        },
        orderBy: {
            updatedAt: 'desc'
        }
    }) as unknown as LeadWithContact[];

    const instances = await prisma.evolutionInstance.findMany({
        orderBy: { name: 'asc' }
    });

    const financialMetrics = await getFinancialMetrics();

    return { leads, instances, financialMetrics };
}

/**
 * Atualiza o status de um lead (usado pelo Kanban)
 */
export async function updateLeadStatusAction(leadId: string, status: LeadStatus) {
    const lead = await prisma.lead.update({
        where: { id: leadId },
        data: {
            status,
            updatedAt: new Date()
        },
        include: {
            contact: true
        }
    });

    // Se a venda foi fechada, registra no histórico financeiro
    if (status === 'FECHADO' && lead.value > 0) {
        await prisma.saleRecord.create({
            data: {
                contactId: lead.contactId,
                value: lead.value,
                instanceId: lead.contact.instanceId
            }
        });
    }

    revalidatePath('/crm');
    return { success: true };
}

/**
 * Atualiza o valor monetário de um lead
 */
export async function updateLeadValueAction(leadId: string, value: number) {
    await prisma.lead.update({
        where: { id: leadId },
        data: { value }
    });

    revalidatePath('/crm');
    return { success: true };
}

/**
 * Ignora um contato globalmente (por JID)
 */
export async function toggleIgnoreContactAction(jid: string, isIgnored: boolean) {
    await prisma.contact.updateMany({
        where: { jid },
        data: { isIgnored }
    });

    // Remove do CRM se estiver sendo ignorado
    if (isIgnored) {
        const contacts = await prisma.contact.findMany({
            where: { jid }
        });

        const contactIds = contacts.map(c => c.id);

        await prisma.lead.deleteMany({
            where: {
                contactId: { in: contactIds }
            }
        });
    }

    revalidatePath('/crm');
    return { success: true };
}

/**
 * Adiciona uma nota manual ao lead
 */
export async function addNote(leadId: string, content: string) {
    if (!content.trim()) return { success: false };

    await prisma.note.create({
        data: {
            leadId,
            content
        }
    });

    revalidatePath('/crm');
    return { success: true };
}

/**
 * Busca métricas financeiras (Pipeline e Receita)
 */
export async function getFinancialMetrics() {
    const pipeline = await prisma.lead.aggregate({
        where: {
            status: { in: ['NOVO', 'ATENDIMENTO'] },
            contact: { isIgnored: false }
        },
        _sum: { value: true }
    });

    const sales = await prisma.saleRecord.aggregate({
        _sum: { value: true }
    });

    return {
        pipelineTotal: pipeline._sum.value || 0,
        revenueTotal: sales._sum.value || 0
    };
}
