'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth-helpers';
import { revalidatePath } from 'next/cache';

/**
 * Busca a lista de contatos com paginação e filtro.
 */
export async function getContactsAction(params: {
    page?: number;
    pageSize?: number;
    search?: string;
}) {
    const session = await getCurrentUser();
    if (!session?.companyId) {
        return { success: false, error: 'Não autorizado' };
    }

    const { page = 1, pageSize = 20, search = '' } = params;
    const skip = (page - 1) * pageSize;

    try {
        const whereClause: any = {
            instance: {
                companyId: session.companyId
            }
        };

        if (search) {
            whereClause.OR = [
                { jid: { contains: search } },
                { pushName: { contains: search } }
            ];
        }

        const [contacts, total] = await Promise.all([
            prisma.contact.findMany({
                where: whereClause,
                include: {
                    lead: true,
                    instance: {
                        select: { name: true, instanceId: true }
                    }
                },
                orderBy: { firstSeen: 'desc' },
                skip,
                take: pageSize,
            }),
            prisma.contact.count({ where: whereClause })
        ]);

        return {
            success: true,
            contacts,
            total,
            page,
            totalPages: Math.ceil(total / pageSize)
        };
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return { success: false, error: 'Erro ao buscar contatos' };
    }
}

/**
 * Busca detalhes profundos de um contato específico.
 */
export async function getContactDetailsAction(contactId: string) {
    const session = await getCurrentUser();
    if (!session?.companyId) {
        return { success: false, error: 'Não autorizado' };
    }

    try {
        const contact = await prisma.contact.findFirst({
            where: {
                id: contactId,
                instance: { companyId: session.companyId }
            },
            include: {
                lead: {
                    include: {
                        notes: { orderBy: { createdAt: 'desc' } },
                        messages: { orderBy: { createdAt: 'desc' }, take: 50 },
                        attachments: true
                    }
                },
                instance: true,
                sales: true
            }
        });

        if (!contact) {
            return { success: false, error: 'Contato não encontrado' };
        }

        return { success: true, contact };
    } catch (error) {
        console.error('Error fetching contact details:', error);
        return { success: false, error: 'Erro ao buscar detalhes do contato' };
    }
}
