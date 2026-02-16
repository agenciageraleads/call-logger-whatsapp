import { describe, it, expect, vi } from 'vitest';
import { interpretLeadAction } from '../lib/interpreter';

describe('Lead Interpreter - Regex Logic', () => {
    it('deve detectar venda fechada via Regex', async () => {
        const result = await interpretLeadAction('inst_1', 'user_1', 'Segue o comprovante do pix enviado agora');
        expect(result.status).toBe('FECHADO');
        expect(result.useAI).toBe(false);
    });

    it('deve detectar interesse e solicitar IA como fallback', async () => {
        const result = await interpretLeadAction('inst_1', 'user_1', 'Quanto custa esse serviço? Tem desconto no pix?');
        expect(result.status).toBe('ATENDIMENTO');
        expect(result.useAI).toBe(true);
    });

    it('deve detectar desinteresse/perda via Regex', async () => {
        const result = await interpretLeadAction('inst_1', 'user_1', 'Não tenho interesse, achei muito caro');
        expect(result.status).toBe('PERDIDO');
        expect(result.useAI).toBe(false);
    });

    it('deve sinalizar fallback de IA para frases ambíguas', async () => {
        const result = await interpretLeadAction('inst_1', 'user_1', 'Vou pensar e te falo depois');
        expect(result.status).toBe('ATENDIMENTO'); // Default status
        expect(result.useAI).toBe(true);
    });
});
