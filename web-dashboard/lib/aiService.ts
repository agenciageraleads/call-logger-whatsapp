import { GoogleGenerativeAI } from '@google/generative-ai';
import { LeadStatus } from './interpreter';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * Analisa o contexto das mensagens usando IA para determinar o status do lead.
 * Implementa o algoritmo TOON (Token Oriented Object Notation) para compressão.
 */
export async function analyzeWithAI(
    newMessages: string[],
    currentToonContext: string | null
): Promise<{ statusChanged: boolean, status: LeadStatus; newToonContext: string } | null> {
    if (!process.env.GEMINI_API_KEY) {
        console.warn('GEMINI_API_KEY não configurada. IA Fallback ignorada.');
        return null;
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash', generationConfig: { responseMimeType: "application/json" } });

    const prompt = `
    Você é um assistente de CRM analisando o histórico de um lead do WhatsApp.
    O objetivo é compilar o histórico de forma estritamente resumida em Token Oriented Object Notation (TOON) e decidir qual o estágio da negociação atual.

    Possíveis status de CRM:
    - NOVO: Interesse inicial, perguntas básicas.
    - ATENDIMENTO: Conversa fluindo, lead tirando dúvidas técnicas, esperando respostas, negociando.
    - FECHADO: O lead confirmou a compra, enviou PIX/comprovante ou concordou enfaticamente.
    - PERDIDO: O lead disse que não tem interesse, que está caro ou desistiu claramente.

    CONTEXTO TOON ANTERIOR DO LEAD:
    """
    ${currentToonContext || 'Nenhum contexto anterior. Início da conversa.'}
    """

    NOVAS MENSAGENS TROCADAS (Último Lote):
    """
    ${newMessages.join('\n')}
    """

    RESPONDA EM JSON NO SEGUINTE FORMATO ESTRITO:
    {
      "statusChanged": boolean, // Devolva true apenas se as novas mensagens justificam mudança do status inferido do contexto anterior para o NOVO status.
      "status": "STATUS_AQUI", // O status atual (uma das 4 opções acimas)
      "newToonContext": "Histórico resumido em no máximo 40 palavras, focando no intent da venda, valor discutido e próximo passo."
    }
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            // Ensure statusChanged property exists in case AI hallucinates
            if (typeof parsed.statusChanged !== 'boolean') parsed.statusChanged = true;
            return parsed;
        }
        return null;
    } catch (error) {
        console.error('Erro ao chamar Gemini API no batch processing:', error);
        return null;
    }
}
