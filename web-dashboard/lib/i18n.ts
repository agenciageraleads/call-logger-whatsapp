/**
 * @file i18n.ts
 * @description Sistema simplificado de internacionalização para o dashboard.
 */

import ptBR from '../locales/pt-BR.json';

type LocaleData = typeof ptBR;

/**
 * Traduz uma chave do arquivo de locale.
 * Suporta interpolação básica usando {{key}}.
 */
export function t(key: string, variables: Record<string, string | number> = {}): string {
    const keys = key.split('.');
    let value: unknown = ptBR;

    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = (value as Record<string, unknown>)[k];
        } else {
            return key; // Retorna a chave se não encontrar
        }
    }

    if (typeof value !== 'string') return key;

    // Interpola variáveis
    let translated = value;
    Object.entries(variables).forEach(([k, v]) => {
        translated = translated.replace(new RegExp(`{{${k}}}`, 'g'), String(v));
    });

    return translated;
}
