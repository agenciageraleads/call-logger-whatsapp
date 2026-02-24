import { prisma } from './prisma';
import { analyzeWithAI } from './aiService';

export type LeadStatus = 'NOVO' | 'ATENDIMENTO' | 'FECHADO' | 'PERDIDO';

interface InterpretationResult {
    status: LeadStatus;
    score: number;
    reason: string;
    useAI: boolean;
}

// Padrões de Regex para detecção rápida e baixo custo
const PATTERNS = {
    FECHADO: [
        /venda (concluída|fechada)/i,
        /pagamento (confirmado|recebido|feito)/i,
        /comprovante enviado/i,
        /fechamos/i,
        /pix enviado/i,
        /obrigado pela compra/i
    ],
    INTERESSE: [
        /quanto custa/i,
        /qual o valor/i,
        /preço/i,
        /como funciona/i,
        /aceita pix/i,
        /tem desconto/i,
        /me interessa/i
    ],
    PERDIDO: [
        /não tenho interesse/i,
        /muito caro/i,
        /agora não/i,
        /pode cancelar/i,
        /não quero/i
    ]
};

/**
 * Interpreta o conteúdo de uma mensagem ou pacote de mensagens.
 */
export async function interpretLeadAction(
    instanceId: string,
    jid: string,
    content: string
): Promise<InterpretationResult> {
    // 1. Tentar Regex (Custo Zero)
    for (const pattern of PATTERNS.FECHADO) {
        if (pattern.test(content)) {
            return { status: 'FECHADO', score: 100, reason: 'Regex: Venda detectada', useAI: false };
        }
    }

    for (const pattern of PATTERNS.INTERESSE) {
        if (pattern.test(content)) {
            return { status: 'ATENDIMENTO', score: 50, reason: 'Regex: Interesse detectado', useAI: true }; // Aciona AI para confirmar contexto
        }
    }

    for (const pattern of PATTERNS.PERDIDO) {
        if (pattern.test(content)) {
            return { status: 'PERDIDO', score: 10, reason: 'Regex: Desinteresse detectado', useAI: false };
        }
    }

    // 2. Se não houver match claro de fechamento/perda, ou se for interesse ambíguo, sinaliza uso de AI como fallback
    return { status: 'ATENDIMENTO', score: 20, reason: '', useAI: true };
}

/**
 * Adiciona uma mensagem na fila do Lead e avalia se o lote deve ser processado.
 */
export async function queueAndProcessLeadMessage(
    instanceId: string,
    jid: string,
    content: string,
    fromMe: boolean
) {
    // 1. Assegurar Contact e Lead
    const contact = await prisma.contact.findUnique({
        where: { instanceId_jid: { instanceId, jid } },
        include: { lead: true }
    });

    if (!contact || contact.isIgnored) return;

    const leadId = contact.lead?.id;

    if (!leadId) {
        // Create default lead if not exists
        const newLead = await prisma.lead.create({
            data: {
                contactId: contact.id,
                status: 'NOVO',
                unprocessedMessages: 1,
            }
        });
        await prisma.message.create({
            data: { leadId: newLead.id, content, fromMe }
        });
        return;
    }

    // 2. Queue Message and Increment Counters
    await prisma.$transaction([
        prisma.message.create({
            data: { leadId, content, fromMe }
        }),
        prisma.lead.update({
            where: { id: leadId },
            data: {
                unprocessedMessages: { increment: 1 },
                lastInteraction: new Date()
            }
        })
    ]);

    // 3. Checar Gatilho de Processamento
    const BATCH_SIZE = 10;
    const currentLead = await prisma.lead.findUnique({ where: { id: leadId } });

    // Avaliação via REGEX imediata (High Priority)
    let shouldForceFlush = false;
    let forceStatus: LeadStatus | null = null;
    let forceReason = '';

    if (!fromMe) {
        for (const pattern of PATTERNS.FECHADO) {
            if (pattern.test(content)) {
                shouldForceFlush = true; forceStatus = 'FECHADO'; forceReason = 'Expressão de Compra Detectada'; break;
            }
        }
        if (!shouldForceFlush) {
            for (const pattern of PATTERNS.PERDIDO) {
                if (pattern.test(content)) {
                    shouldForceFlush = true; forceStatus = 'PERDIDO'; forceReason = 'Expressão de Recusa Detectada'; break;
                }
            }
        }
    }

    if (shouldForceFlush || (currentLead && currentLead.unprocessedMessages >= BATCH_SIZE)) {
        // Run Async processing so we don't block the webhook
        processBatch(leadId, forceStatus, forceReason).catch(err =>
            console.error('Erro no processamento em Lote (TOON):', err)
        );
    }
}

async function processBatch(leadId: string, forceStatus: LeadStatus | null, forceReason: string) {
    const lead = await prisma.lead.findUnique({
        where: { id: leadId },
        include: { contact: true }
    });

    if (!lead || lead.contact.isIgnored) return;

    // Buscar as mensagens não processadas (as ultimas criadas)
    // Se o contador diz 10, pegamos as 10 mais novas
    const amountToFetch = lead.unprocessedMessages > 0 ? lead.unprocessedMessages : 10;

    const messages = await prisma.message.findMany({
        where: { leadId: lead.id },
        orderBy: { createdAt: 'desc' },
        take: amountToFetch
    });

    // Ordenar cronologicamente para enviar à IA
    const orderedMessages = messages.reverse().map(m => `[${m.fromMe ? 'MEU' : 'CLIENTE'}]: ${m.content}`);

    let finalStatus = (lead.status as LeadStatus);
    let newToonContext = lead.toonContext;
    let statusWasChangedByAI = false;

    // Se houve Força Ativa por Regex, nós assumimos ela
    if (forceStatus) {
        finalStatus = forceStatus;
        newToonContext = `[MUDANÇA FORÇADA POR REGEX: ${forceReason}]. ` + (lead.toonContext || '');
    } else {
        // Se Não houve Força pela Regex, e o lote atingiu limite, chamamos a IA-TOON
        const aiResult = await analyzeWithAI(orderedMessages, lead.toonContext);

        if (aiResult) {
            if (aiResult.statusChanged) {
                finalStatus = aiResult.status;
                statusWasChangedByAI = true;
            }
            newToonContext = aiResult.newToonContext;
        }
    }

    // Regra de Ouro: Proteger o Pipeline contra ruido inicial
    const totalMessagesHistoryCount = await prisma.message.count({ where: { leadId } });
    if (totalMessagesHistoryCount <= 3 && finalStatus !== 'PERDIDO') {
        finalStatus = 'NOVO';
    }

    // Lógica Circular para fechar e reabrir Leads
    if ((lead.status === 'FECHADO' || lead.status === 'PERDIDO') && statusWasChangedByAI) {
        if (finalStatus !== 'FECHADO' && finalStatus !== 'PERDIDO') {
            // Ai detectou volta da conversa e interesse novamente
            finalStatus = 'ATENDIMENTO';
            await prisma.lead.update({
                where: { id: lead.id },
                data: { value: 0 } // zera valor
            });
        }
    }

    // Atualiza BD e ZERA contador de lote
    await prisma.lead.update({
        where: { id: lead.id },
        data: {
            status: finalStatus,
            toonContext: newToonContext,
            contextSummary: newToonContext ? newToonContext.substring(0, 100) + '...' : null, // Retro-compatibilidade do card principal
            unprocessedMessages: 0
        }
    });

}
