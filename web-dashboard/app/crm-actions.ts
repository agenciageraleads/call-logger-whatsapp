'use server'

import { prisma } from '@/lib/prisma';
import { CRMData, LeadWithContact } from '@/lib/types';
import { LeadStatus } from '@/lib/interpreter';
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
            notes: true,
            attachments: true,
            messages: {
                orderBy: { createdAt: 'desc' },
                take: 1
            }
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
        pipelineTotal: pipeline?._sum?.value || 0,
        revenueTotal: sales?._sum?.value || 0
    };
}

/**
 * Atualiza diversos detalhes de um lead a partir do modal de edição
 */
export async function updateLeadDetailsAction(leadId: string, data: {
    status?: LeadStatus;
    value?: number;
    contextSummary?: string;
}) {
    const prevLead = await prisma.lead.findUnique({ where: { id: leadId }, include: { contact: true } });
    if (!prevLead) return { success: false, error: 'Lead não encontrado' };

    await prisma.lead.update({
        where: { id: leadId },
        data: {
            ...data,
            updatedAt: new Date()
        }
    });

    // Se a venda foi fechada por essa atualização e antes não era
    if (data.status === 'FECHADO' && prevLead.status !== 'FECHADO' && (data.value || prevLead.value)) {
        await prisma.saleRecord.create({
            data: {
                contactId: prevLead.contactId,
                value: data.value ?? prevLead.value,
                instanceId: prevLead.contact.instanceId
            }
        });
    }

    revalidatePath('/crm');
    return { success: true };
}

/**
 * Adiciona um anexo ao lead (ex: Orçamento em Base64 ou Link)
 */
export async function uploadAttachmentAction(leadId: string, fileData: { fileName: string, fileUrl: string, fileType: string, fileSize: number }) {
    await prisma.attachment.create({
        data: {
            leadId,
            fileName: fileData.fileName,
            fileUrl: fileData.fileUrl,
            fileType: fileData.fileType,
            fileSize: fileData.fileSize
        }
    });

    revalidatePath('/crm');
    return { success: true };
}

/**
 * Retorna os Insights de Gestão da Plataforma baseando-se no tempo de resposta
 */
export async function getManagerInsights() {
    // 1. Achar Tempo Médio de Resposta (SLA)
    // Calculado encontrando a diferença entre a mensagem do cliente e a PRIMEIRA mensagem subsequente do vendedor
    const allLeadsWithMessages = await prisma.lead.findMany({
        include: {
            messages: {
                orderBy: { createdAt: 'asc' }
            }
        }
    });

    let totalResponseTimeMs = 0;
    let responseCount = 0;

    for (const lead of allLeadsWithMessages) {
        let lastCustomerMessageDate: Date | null = null;

        for (const msg of lead.messages) {
            if (!msg.fromMe) {
                // Cliente falou
                if (!lastCustomerMessageDate) {
                    lastCustomerMessageDate = msg.createdAt;
                }
            } else {
                // Vendedor falou
                if (lastCustomerMessageDate) {
                    const diffMs = msg.createdAt.getTime() - lastCustomerMessageDate.getTime();
                    totalResponseTimeMs += diffMs;
                    responseCount++;
                    lastCustomerMessageDate = null; // Reseta até o cliente falar de novo
                }
            }
        }
    }

    const averageResponseTimeMs = responseCount > 0 ? totalResponseTimeMs / responseCount : 0;
    const averageResponseTimeMinutes = Math.round(averageResponseTimeMs / 1000 / 60);

    return {
        averageResponseTimeMinutes
    };
}
