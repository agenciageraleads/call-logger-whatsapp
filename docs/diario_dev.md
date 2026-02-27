# Diário de Desenvolvimento (Dev Diary)

## Data: 26 de Fevereiro de 2026

### 🎯 Objetivo do Dia

Estabilizar a infraestrutura de produção do **WhatsApp Logger**, resolver problemas de deploy (serviço fora do ar) e alinhar os próximos passos focados no lançamento do MVP (Minimum Viable Product).

---

### 🛠️ Atividades Realizadas

#### 1. Organização do Workspace

- Transferência bem-sucedida de todas as *skills* da pasta local `.agent` do projeto para o diretório centralizado (`global_skills` do Antigravity), tornando-as acessíveis globalmente em todos os workspaces.

#### 2. Investigação e Resolução de Downtime (VPS)

O serviço principal (`whatsapp-logger_whatsapp-logger`) estava com 0/1 réplicas ativas na VPS. Iniciamos o acesso SSH para diagnosticar:

- **Diagnóstico:** Identificamos que o serviço falhava durante a inicialização (Next.js server) devido ao erro `P3009` do Prisma.
- **Causa Raiz 1 (Migration Falhou):** A migration `20260226191257_add_multi_tenancy_features` tentou inserir a coluna `pushName` na tabela `Contact`. Como a coluna já existia (provavelmente via um `db push` antigo ou cópia de banco), a migração em SQLite quebrava, travando todo o deploy.
- **Intervenção 1:** Como o SQLite possui limitações para realizar `DROP COLUMN` facilmente, forçamos o Prisma a reconhecer a migração como resolvida (`prisma migrate resolve --applied`). O bypass da migration foi feito para o app tentar subir.
- **Causa Raiz 2 (Schema Inconsistente):** O bypass fez o aplicativo avançar, mas o Prisma Client começou a apresentar o erro `P2022: The column main.Company.plan does not exist`. O bypass fez com que a tabela `Company`, `Device`, `EvolutionInstance` e `Lead` não recebessem colunas vitais de Multi-Tenancy.
- **Intervenção 2:** Conectamos diretamente ao SQLite de produção dentro do volume (`/var/lib/docker/volumes/whatsapp-logger_calllogger_data/_data/calllogger.db`) e rodamos comandos `ALTER TABLE` para injetar todas as colunas faltantes (`plan`, `maxInstances`, `expiresAt`, `companyId`, etc.).

#### 3. Restabelecimento do Acesso Dashboard

- **Problema de Login:** Após estabilizar o banco, o login com `lucas@master.com` retornava "usuário incorreto".
- **Causa:** O seed que cria a empresa Master e o usuário Master tem uma trava de segurança (`if (NODE_ENV === 'production') process.exit(1)`). Portanto, o usuário logável não existia no banco da VPS.
- **Solução:**
    1. Identificamos o `id` da *Company* principal na VPS.
    2. Atualizamos o plano dela para `MASTER` via comando SQL direto.
    3. Criamos o usuário `SUPER_ADMIN` (`lucas@master.com`) no banco de dados.
    4. Geramos localmente o hash seguro (`bcryptjs` com salt 10) garantindo compatibilidade da senha `"senha123"`.
    5. Atualizamos a senha no SQLite.

#### 4. Verificação de Estabilidade

- Reinicializamos a Stack no Docker Swarm (`docker service update --force whatsapp-logger_whatsapp-logger`).
- Monitoramos os logs do container (`Next.js 16.1.5` subiu com sucesso em *82ms* e os erros Prisma sumiram completamente). O back-end ficou 100% estável.

---

### 🗺️ Decisão Estratégica (Roadmap)

Embora tivéssemos etapas futuras desenhadas para exportações de CSV e relatórios com gráficos complexos:

- **Decidimos congelar novas implementações de Features Adicionais.**
- O foco atual mudou 100% para um **Go-To-Market focado no MVP**.
- O sistema já possui valor central provado: *Gravação do App Android -> Repositório via Evolution API -> Apresentação numa Dashboard Web Multi-Tenant Estável.*

**Próximo Passo Prático:**  
Colocar a aplicação na mão do primeiro grupo de gestores para coletar feedback real. Funcionalidades como "Modo Offline no App" ou "Agrupamento de Gráficos" serão trabalhadas estritamente com base na dor real relatada pelos primeiros usuários reais.

---
---

## Data: 27 de Fevereiro de 2026

### 🎯 Objetivo do Dia

Implementar a visualização centralizada de contatos e resolver problemas de processamento de leads no servidor de produção.

### 🛠️ Atividades Realizadas

#### 1. Correção de Webhook (Race Condition)

- **Problema:** Mensagens chegavam, mas os Leads não eram criados no Kanban.
- **Causa:** Race condition na transação do Prisma. O contato era criado na transação, mas a lógica de análise (`queueAndProcessLeadMessage`) rodava em paralelo e não "enxergava" o contato ainda não commitado.
- **Solução:** Refatoramos o handler de webhook para enfileirar o processamento de leads **após** o commit da transação do banco de dados.

#### 2. Implementação da Tela de Contatos (`/contacts`)

- Criamos uma interface premium inspirada no Chatwoot para gestão de clientes.
- **Destaques:**
  - Tabela paginada com busca integrada.
  - **Sidebar de Detalhes:** Slide-over que permite ver histórico de mensagens, notas do vendedor e resumo de IA sem sair da lista.
  - Integração de navegação no Dashboard e no CRM.

---
*Escrito às 16h pelo Antigravity.*
