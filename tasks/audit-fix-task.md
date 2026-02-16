# Tarefa: Correção de Auditoria de Qualidade

**Status:** 🔄 Em Progresso
**Prioridade:** Alta

## Descrição

Corrigir as falhas apontadas pelo comando `/verify`:

- TypeScript Coverage: 17% (Meta: >80%)
- GEO Score: 20% (Meta: >70%)
- i18n: Strings hardcoded e falta de arquivos de locale.

## Checklist de Tarefas

- [ ] Definir interfaces globais em `lib/types.ts`
- [ ] Implementar sistema de tradução básico
- [ ] Corrigir `dashboard-client.tsx`:
  - [ ] Tipagem completa
  - [ ] Extração de strings para i18n
  - [ ] Ajuste de hierarquia H1/H2
- [ ] Corrigir `settings/client-page.tsx`:
  - [ ] Tipagem completa
  - [ ] Extração de strings para i18n
  - [ ] Adição de JSON-LD e H1
- [ ] Ajustar `loading.tsx` com H1 oculto para GEO
- [ ] Executar scripts de validação e confirmar fix

## Comentários

Substituindo `any` por tipos específicos e preparando o dashboard para SEO/GEO avançado.
