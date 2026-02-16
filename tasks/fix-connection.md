# Tarefa: Corrigir Conexão Android e Feedback de QR Code

## 1. Problema

O app Android não consegue enviar logs para o servidor devido a IP/porta incorretos. O dashboard não confirma a conexão após o scan.

## 2. Ações

- [x] Atualizar `RetrofitClient.kt` com IP `192.168.100.120` e porta `4000`.
- [x] Configurar `WEBHOOK_PUBLIC_BASE_URL` no `.env` com a URL do ngrok.
- [ ] Atualizar UI de Configurações para exibir status de conexão. (Já aplicado)
- [ ] Re-provisionar instâncias no Dashboard para atualizar o Webhook na Evolution.
- [ ] Validar funcionamento do endpoint de logs.

## 3. Verificação

- [ ] Verificar logs do servidor ao enviar teste pelo Android.
- [ ] Verificar sumiço do QR e mensagem de sucesso no Dashboard.
