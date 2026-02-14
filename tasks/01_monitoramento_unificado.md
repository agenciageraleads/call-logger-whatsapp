# Plano de Execução: Monitoramento Unificado (Chamadas + WhatsApp)

## 1. Visão Geral
Este documento descreve a implementação da arquitetura de **Hub de Eventos Centralizado** para unificar logs de chamadas (Android) e métricas de mensagens do WhatsApp (via Evolution API). O objetivo é permitir que o gestor visualize em uma única tela o volume de ligações e a eficácia das conversas no WhatsApp por instância/atendente.

## 2. Arquitetura Proposta
A solução transformará o backend Next.js atual em um centralizador de eventos.

```text
[ App Android ] --(POST /api/calls)--> [ Backend Next.js ] <--(Webhooks)-- [ Evolution API ]
                                              |
                                              v
                                       [ Banco de Dados ]
                                     (SQLite/Postgres)
                                              |
                                              v
                                     [ Dashboard Unificado ]
```

### Principais Componentes
1.  **Backend (Next.js)**: Recebe logs de chamadas e webhooks da Evolution API. Processa as regras de negócio (o que é uma conversa "ativada"?).
2.  **Banco de Dados**: Armazena logs brutos e tabelas agregadas (`DailyMetrics`) para performance.
3.  **Evolution API**: Envia eventos de mensagem (`MESSAGE_SENT`, `MESSAGE_RECEIVED`).

## 3. Banco de Dados (Schema Prisma)
Precisamos expandir o `schema.prisma` para suportar as novas métricas.

### Novos Modelos Propostos

#### `EvolutionInstance`
Vínculo entre o dispositivo físico (celular) e a instância do WhatsApp.
- `id`: PK
- `name`: Nome da instância (ex: "Vendas 01")
- `instanceId`: ID na Evolution API
- `deviceId`: FK para `Device` (opcional, para vincular quem faz a ligação com quem manda msg)

#### `DailyMetric`
Tabela agregada por dia e por instância para relatórios rápidos.
- `id`: PK
- `date`: DateTime (apenas data)
- `instanceId`: FK `EvolutionInstance`
- `activeConversations`: Int (Conversas onde houve troca de msg hoje)
- `newContacts`: Int (Novos contatos criados hoje)
- `messagesSent`: Int
- `messagesReceived`: Int
- `callsMade`: Int (Vindo do Android)
- `callsReceived`: Int (Vindo do Android)
- `callsDuration`: Int (Segundos acumulados)

#### `ConversationContext` (Opcional - Fase 2)
Para rastrear "Conversas Ativadas" com precisão (ex: cliente inativo há 7 dias que respondeu).

---

## 4. Etapas de Implementação

### Fase 1: Preparação do Backend (Prioridade Alta)
1.  **Atualizar Schema Prisma**: Criar `EvolutionInstance` e `DailyMetric`.
2.  **Endpoint de Configuração**: Criar API para cadastrar instâncias da Evolution API e vincular a `Device`.
3.  **Endpoint de Webhook (`/api/webhooks/evolution`)**:
    -   Receber eventos `MESSAGES_UPSERT`.
    -   Validar `api-key` da Evolution.
    -   **Lógica de Processamento**:
        -   Se msg enviada (`fromMe: true`): Incrementa `messagesSent`. Se for primeira msg do dia para aquele número, incrementa `activeConversations`.
        -   Se msg recebida (`fromMe: false`): Incrementa `messagesReceived`.
        -   *Regra de Conversa Ativada*: Se última msg do contato foi há > X dias e houve resposta hoje -> `activatedConversations++`.

### Fase 2: Integração Android (Logs de Chamadas)
1.  **Atualizar API de Chamadas (`/api/calls`)**:
    -   Ao receber um log de chamada, buscar o `Device` associado.
    -   Atualizar a `DailyMetric` do dia correspondente (incrementar `callsMade`/`callsReceived` e `duration`).
2.  **Android SyncWorker**:
    -   Garantir que o envio de logs inclua corretamente o `deviceId` (já existente).
    -   Validar se o timestamp do log está correto para atribuição ao dia certo.

### Fase 3: Dashboard e Relatórios
1.  **Tela de Configuração**:
    -   Interface para inserir URL e Token da Evolution API.
    -   Interface para mapear `Device` (Android) <-> `Instance` (WhatsApp).
2.  **Tela de Dashboard**:
    -   Gráfico de Barras: "Atividade Diária" (Msgs Enviadas vs Recebidas vs Ligações).
    -   Card de KPIs:
        -   Conversas Iniciadas.
        -   Conversas Ativadas (Recuperadas).
        -   Duração Total de Chamadas.

## 5. Regras de Negócio (Detalhamento)

### Definição de Métricas
-   **Conversa Iniciada**: Primeira mensagem enviada do dia para um contato.
-   **Conversa Ativada**: Quando um contato responde uma mensagem após um período de inatividade (ex: 24h).
-   **Novo Contato**: Quando uma mensagem é trocada com um número que não existia na base.

---

## 6. Checklist de Validação
- [ ] Schema do Prisma atualizado e migrado.
- [ ] Webhook recebendo eventos da Evolution API com sucesso.
- [ ] Logs de chamadas do Android atualizando `DailyMetrics`.
- [ ] Dashboard exibindo dados unificados em tempo real.
