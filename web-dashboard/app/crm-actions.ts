'use server'

import { prisma } from '@/lib/prisma';
import { CRMData, LeadWithContact, LeadStatus } from '@/lib/types';
import { revalidatePath } from 'next/cache';

/**
 * Busca todos os dados necessários para o CRM
 */
export async function getCRMData(): Promise<CRMData> {
    const leads = await prisma.lead.findMany({
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

    return { leads, instances };
}

/**
 * Atualiza o status de um lead (usado pelo Kanban)
 */
export async function updateLeadStatusAction(leadId: string, status: LeadStatus) {
    await prisma.lead.update({
        where: { id: leadId },
        data: {
            status,
            updatedAt: new Date()
        }
    });

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
