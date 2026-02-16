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
    return { status: 'ATENDIMENTO', score: 20, reason: 'Inconclusivo via Regex', useAI: true };
}

/**
 * Atualiza o status do lead baseado na interpretação
 */
export async function updateLeadStatus(instanceId: string, jid: string, content: string) {
    const interpretation = await interpretLeadAction(instanceId, jid, content);

    const contact = await prisma.contact.findUnique({
        where: { instanceId_jid: { instanceId, jid } },
        include: { lead: true }
    });

    if (!contact) return;

    let finalStatus = interpretation.status;
    let summary = interpretation.reason;

    // Fallback para IA se necessário
    if (interpretation.useAI) {
        try {
            const aiResult = await analyzeWithAI(content);
            if (aiResult) {
                finalStatus = aiResult.status;
                summary = aiResult.summary;
            }
        } catch (error) {
            console.error('Erro no fallback de IA:', error);
        }
    }

    await prisma.lead.upsert({
        where: { contactId: contact.id },
        update: {
            status: finalStatus,
            contextSummary: summary,
            lastInteraction: new Date()
        },
        create: {
            contactId: contact.id,
            status: finalStatus,
            contextSummary: summary
        }
    });
}
