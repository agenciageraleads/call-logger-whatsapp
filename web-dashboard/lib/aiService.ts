import { GoogleGenerativeAI } from '@google/generative-ai';
import { LeadStatus } from './interpreter';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * Analisa o contexto das mensagens usando IA para determinar o status do lead.
 */
export async function analyzeWithAI(content: string): Promise<{ status: LeadStatus; summary: string } | null> {
    if (!process.env.GEMINI_API_KEY) {
        console.warn('GEMINI_API_KEY não configurada. IA Fallback ignorada.');
        return null;
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
    Analise as seguintes mensagens de uma conversa de vendas no WhatsApp e determine o status do lead.
    Possíveis status:
    - NOVO: Interesse inicial, perguntas básicas.
    - ATENDIMENTO: Conversa fluindo, lead tirando dúvidas técnicas ou de preço.
    - FECHADO: O lead confirmou a compra, enviou comprovante ou aceitou o fechamento.
    - PERDIDO: O lead disse que não tem interesse, que está caro ou parou de responder negativamente.

    Retorne APENAS um JSON no formato:
    {
      "status": "STATUS_AQUI",
      "summary": "Breve resumo do motivo da decisão (máx 15 palavras)"
    }

    Conversa:
    "${content}"
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Tenta extrair o JSON da resposta (Gemini as vezes coloca ```json)
        const jsonMatch = text.match(/\{.*\}/s);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return null;
    } catch (error) {
        console.error('Erro ao chamar Gemini API:', error);
        return null;
    }
}
