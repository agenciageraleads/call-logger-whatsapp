# Plano de Implementação - Correção de Auditoria (Tipagem, i18n e GEO)

Este plano descreve as ações necessárias para corrigir os erros apontados pela verificação completa (`/verify`), focando em Cobertura de Tipagem (TypeScript), Internacionalização (i18n) e Otimização para Motores de IA (GEO).

## 1. Tipagem (TypeScript)
**Objetivo:** Aumentar a cobertura de tipos para >80% e eliminar o uso de `any`.

- [ ] Criar arquivo `web-dashboard/lib/types.ts` com interfaces para todos os modelos de dados.
- [ ] Refatorar `web-dashboard/app/dashboard-client.tsx` para usar as novas interfaces e remover `any`.
- [ ] Refatorar `web-dashboard/app/settings/client-page.tsx` para remover `any` nas props e funções.
- [ ] Refatorar `web-dashboard/app/dashboard-actions.ts` (se necessário) para garantir retornos tipados.

## 2. Internacionalização (i18n)
**Objetivo:** Remover strings hardcoded e estabelecer uma estrutura básica de localização.

- [ ] Criar diretório `web-dashboard/locales/`.
- [ ] Criar arquivo `web-dashboard/locales/pt-BR.json` com todas as strings atuais.
- [ ] Implementar um hook simples ou helper para tradução.
- [ ] Substituir strings hardcoded em `dashboard-client.tsx` e `client-page.tsx`.

## 3. Otimização GEO (AI Citation Readiness)
**Objetivo:** Melhorar a pontuação de GEO para >70%.

- [ ] **SEO Central:** Garantir que todas as páginas tenham tags meta-data completas.
- [ ] **Estrutura Semântica:** Adicionar H1 faltantes e garantir hierarquia de H2/H3.
- [ ] **Dados Estruturados:** Adicionar ou expandir o JSON-LD em todas as páginas principais.
- [ ] **Acessibilidade:** Garantir que elementos tenham ARIA labels corretos (já está parcialmente bom, mas vamos revisar).

## 4. Ordem de Execução
1. Criação das interfaces de tipo.
2. Refatoração de `dashboard-client.tsx` (Tipagem + i18n + GEO).
3. Refatoração de `client-page.tsx` (Tipagem + i18n + GEO).
4. Ajustes em `loading.tsx` e `layout.tsx`.
5. Validação final com cronômetro de scripts.

---
*Nota: Todos os comentários de código serão mantidos em PT/BR seguindo as regras globais.*
