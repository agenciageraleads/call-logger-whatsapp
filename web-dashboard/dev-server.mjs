import http from "node:http";
import { URL } from "node:url";
import crypto from "node:crypto";
import prismaPkg from "./app/generated/prisma/index.js";

const { PrismaClient } = prismaPkg;
const prisma = new PrismaClient();

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 3000);
const EVO_URL = process.env.EVOLUTION_SERVER_URL || "";
const EVO_KEY = process.env.EVOLUTION_API_KEY || "";
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "";

function newWebhookSecret() {
  return crypto.randomBytes(32).toString("hex");
}

function send(res, statusCode, body, headers = {}) {
  res.writeHead(statusCode, {
    "content-length": Buffer.byteLength(body),
    ...headers,
  });
  res.end(body);
}

function sendJson(res, statusCode, obj) {
  send(res, statusCode, JSON.stringify(obj), {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return {};
  return JSON.parse(raw);
}

function dayBounds(date = new Date()) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

function renderHtml() {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>WhatsApp Call Monitor (Lite)</title>
    <style>
      :root { color-scheme: light; }
      body { margin: 0; font: 14px/1.4 ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; background: #0b0f14; color: #e7eef7; }
      a { color: #7dd3fc; }
      header { padding: 20px 20px 14px; border-bottom: 1px solid #1f2a37; background: radial-gradient(1200px 500px at 10% -20%, #134e4a 0%, transparent 60%), radial-gradient(1200px 500px at 90% -20%, #1d4ed8 0%, transparent 60%); }
      h1 { margin: 0 0 6px; font-size: 18px; letter-spacing: 0.2px; }
      .sub { color: #a5b4c7; font-size: 12px; }
      main { padding: 18px 20px 30px; max-width: 1200px; margin: 0 auto; }
      .grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
      @media (min-width: 1000px) { .grid { grid-template-columns: 1.2fr 1fr; } }
      .card { background: #0f1720; border: 1px solid #1f2a37; border-radius: 12px; overflow: hidden; }
      .card h2 { margin: 0; padding: 12px 14px; font-size: 13px; border-bottom: 1px solid #1f2a37; color: #cbd5e1; }
      .card .body { padding: 12px 14px; }
      .row { display: grid; grid-template-columns: 1fr; gap: 10px; }
      @media (min-width: 700px) { .row { grid-template-columns: 1fr 1fr; } }
      label { display: block; font-size: 12px; color: #a5b4c7; margin: 0 0 4px; }
      input { width: 100%; box-sizing: border-box; padding: 10px 10px; border-radius: 10px; border: 1px solid #2b3a4d; background: #0b1220; color: #e7eef7; }
      button { padding: 10px 12px; border-radius: 10px; border: 1px solid #2b3a4d; background: #122034; color: #e7eef7; cursor: pointer; }
      button:hover { background: #152844; }
      .muted { color: #94a3b8; font-size: 12px; }
      .kpis { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
      @media (min-width: 700px) { .kpis { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
      .kpi { padding: 10px 12px; border-radius: 12px; background: #0b1220; border: 1px solid #1f2a37; }
      .kpi .t { font-size: 11px; color: #a5b4c7; }
      .kpi .v { font-size: 22px; font-weight: 700; margin-top: 4px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 9px 10px; border-bottom: 1px solid #1f2a37; vertical-align: top; text-align: left; }
      th { font-size: 11px; color: #a5b4c7; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
      td { font-size: 13px; }
      code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 12px; }
      .pill { display: inline-block; padding: 2px 8px; border-radius: 999px; border: 1px solid #2b3a4d; color: #cbd5e1; background: #0b1220; }
      .err { color: #fecaca; }
    </style>
  </head>
  <body>
    <header>
      <h1>WhatsApp Call Monitor (Lite)</h1>
      <div class="sub">
        Servidor de teste para receber <code>/api/logs</code> do app Android e visualizar dados sem Next.js dev.
      </div>
    </header>
    <main>
      <div class="grid">
        <section class="card">
          <h2>Status</h2>
          <div class="body">
            <div class="kpis" id="kpis"></div>
            <div class="muted" style="margin-top: 10px">
              Dica: para contabilizar metricas, crie uma instancia e vincule o <code>deviceId</code> do Android.
            </div>
            <div class="muted" style="margin-top: 6px">
              App Android esta apontando para: <code>http://10.100.1.72:3000/</code> (ajuste em <code>RetrofitClient.kt</code> se seu IP mudar).
            </div>
          </div>
        </section>

        <section class="card">
          <h2>Configuracao Rapida</h2>
          <div class="body">
            <form id="instanceForm">
              <div class="row">
                <div>
                  <label>Nome da Instancia</label>
                  <input name="name" placeholder="Ex: Vendas 01" required />
                </div>
                <div>
                  <label>Instance ID (Evolution)</label>
                  <input name="instanceId" placeholder="Ex: comercial_01" required />
                </div>
                <div>
                  <label>Device ID (Android) para vincular</label>
                  <input name="deviceId" placeholder="Ex: a1b2c3d4e5f6..." />
                </div>
                <div>
                  <label>Endpoint URL (opcional)</label>
                  <input name="endpointUrl" placeholder="https://..." />
                </div>
              </div>
              <div style="display:flex; gap:10px; margin-top: 10px;">
                <button type="submit">Criar/Atualizar Instancia</button>
                <button type="button" id="refreshBtn">Recarregar</button>
              </div>
              <div class="muted" id="formMsg" style="margin-top: 8px"></div>
            </form>
          </div>
        </section>
      </div>

      <section class="card" style="margin-top: 14px;">
        <h2>Metricas de Hoje (por Instancia)</h2>
        <div class="body">
          <div id="metricsWrap"></div>
        </div>
      </section>

      <section class="card" style="margin-top: 14px;">
        <h2>Dispositivos</h2>
        <div class="body">
          <div id="devicesWrap"></div>
        </div>
      </section>

      <section class="card" style="margin-top: 14px;">
        <h2>Ultimas Chamadas</h2>
        <div class="body">
          <div id="logsWrap"></div>
        </div>
      </section>
    </main>
    <script>
      const kpis = document.getElementById('kpis');
      const metricsWrap = document.getElementById('metricsWrap');
      const devicesWrap = document.getElementById('devicesWrap');
      const logsWrap = document.getElementById('logsWrap');
      const form = document.getElementById('instanceForm');
      const formMsg = document.getElementById('formMsg');
      const refreshBtn = document.getElementById('refreshBtn');

      function esc(s) {
        return String(s ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',\"'\":'&#39;'}[c]));
      }

      function fmtDuration(seconds) {
        seconds = Number(seconds || 0);
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        if (h > 0) return h + "h " + m + "m";
        if (m > 0) return m + "m " + s + "s";
        return s + "s";
      }

      async function load() {
        const r = await fetch('/api/state', { cache: 'no-store' });
        const data = await r.json();

        const totals = data.totals || {};
        kpis.innerHTML = [
          ['Conversas Ativas', totals.activeConversations ?? 0],
          ['Novos Contatos', totals.newContacts ?? 0],
          ['Msgs (Env + Rec)', (totals.messagesSent ?? 0) + (totals.messagesReceived ?? 0)],
          ['Chamadas (Feitas + Rec)', (totals.callsMade ?? 0) + (totals.callsReceived ?? 0)],
        ].map(([t, v]) => '<div class="kpi"><div class="t">' + esc(t) + '</div><div class="v">' + esc(v) + '</div></div>').join('');

        const metrics = data.dailyMetrics || [];
        if (metrics.length === 0) {
          metricsWrap.innerHTML = '<div class="muted">Nenhuma metrica registrada hoje. Vincule um device a uma instancia e envie um log.</div>';
        } else {
          metricsWrap.innerHTML = '<table><thead><tr>' +
            '<th>Instancia</th><th>Conversas</th><th>Novos</th><th>Msgs (E/R)</th><th>Ligacoes (F/R)</th><th>Duracao</th>' +
            '</tr></thead><tbody>' +
            metrics.map(m => (
              '<tr>' +
              '<td><div><strong>' + esc(m.instance?.name || '-') + '</strong></div><div class="muted"><code>' + esc(m.instance?.instanceId || '-') + '</code></div></td>' +
              '<td>' + esc(m.activeConversations) + '</td>' +
              '<td>' + esc(m.newContacts) + '</td>' +
              '<td><span class="pill">' + esc(m.messagesSent) + '</span> / <span class="pill">' + esc(m.messagesReceived) + '</span></td>' +
              '<td><span class="pill">' + esc(m.callsMade) + '</span> / <span class="pill">' + esc(m.callsReceived) + '</span></td>' +
              '<td><code>' + esc(fmtDuration(m.callDuration)) + '</code></td>' +
              '</tr>'
            )).join('') +
            '</tbody></table>';
        }

        const devices = data.devices || [];
        devicesWrap.innerHTML = '<table><thead><tr><th>Device</th><th>Nome</th><th>Last Seen</th><th>Vinculo</th></tr></thead><tbody>' +
          (devices.length ? devices.map(d => (
            '<tr>' +
            '<td><code>' + esc(d.id) + '</code></td>' +
            '<td>' + esc(d.name || '-') + '</td>' +
            '<td>' + esc(d.lastSeen ? new Date(d.lastSeen).toLocaleString() : '-') + '</td>' +
            '<td>' + esc(d.evolutionInstance ? (d.evolutionInstance.name + ' (' + d.evolutionInstance.instanceId + ')') : '-') + '</td>' +
            '</tr>'
          )).join('') : '<tr><td colspan="4" class="muted">Nenhum device ainda. Envie um log do Android.</td></tr>') +
          '</tbody></table>';

        const logs = data.logs || [];
        logsWrap.innerHTML = '<table><thead><tr><th>Quando</th><th>Device</th><th>Contato</th><th>Tipo</th><th>Status</th><th>Duracao</th></tr></thead><tbody>' +
          (logs.length ? logs.map(l => (
            '<tr>' +
            '<td>' + esc(new Date(l.timestamp).toLocaleString()) + '</td>' +
            '<td>' + esc(l.device?.name || l.deviceId) + '</td>' +
            '<td>' + esc(l.person) + '</td>' +
            '<td><span class="pill">' + esc(l.type) + '</span></td>' +
            '<td><span class="pill">' + esc(l.status) + '</span></td>' +
            '<td><code>' + esc((l.duration ?? 0) + 's') + '</code></td>' +
            '</tr>'
          )).join('') : '<tr><td colspan="6" class="muted">Nenhum log ainda.</td></tr>') +
          '</tbody></table>';
      }

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        formMsg.textContent = 'Enviando...';
        formMsg.className = 'muted';
        const fd = new FormData(form);
        const payload = Object.fromEntries(fd.entries());
        if (!payload.deviceId) delete payload.deviceId;
        if (!payload.endpointUrl) delete payload.endpointUrl;
        try {
          const r = await fetch('/api/setup/instance', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(payload),
          });
          const j = await r.json();
          if (!r.ok) throw new Error(j?.error || 'Erro');
          formMsg.textContent = 'OK: instancia salva. Envie um log do Android para atualizar metricas.';
          await load();
        } catch (err) {
          formMsg.textContent = String(err?.message || err);
          formMsg.className = 'muted err';
        }
      });

      refreshBtn.addEventListener('click', load);
      load();
      setInterval(load, 5000);
    </script>
  </body>
</html>`;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    const path = url.pathname;
    const method = (req.method || "GET").toUpperCase();

    if (method === "GET" && path === "/health") {
      return sendJson(res, 200, { ok: true });
    }

    if (method === "GET" && path === "/") {
      return send(res, 200, renderHtml(), { "content-type": "text/html; charset=utf-8" });
    }

    if (path === "/api/logs" && method === "GET") {
      const logs = await prisma.callLog.findMany({
        orderBy: { timestamp: "desc" },
        take: 100,
        include: { device: true },
      });
      return sendJson(res, 200, { logs });
    }

    if (path === "/api/logs" && method === "POST") {
      const body = await readJson(req);
      const { deviceId, contactName, duration, type, status, timestamp } = body || {};
      if (!deviceId) return sendJson(res, 400, { error: "Device ID is required" });

      const now = new Date();
      const device = await prisma.device.upsert({
        where: { id: String(deviceId) },
        update: { lastSeen: now },
        create: {
          id: String(deviceId),
          name: `Device ${String(deviceId).slice(0, 6)}`,
          lastSeen: now,
        },
      });

      const log = await prisma.callLog.create({
        data: {
          person: contactName || "Unknown",
          duration: Number(duration) || 0,
          type: type || "UNKNOWN",
          status: status || "UNKNOWN",
          timestamp: new Date(Number(timestamp) || Date.now()),
          deviceId: device.id,
        },
      });

      const evolutionInstance = await prisma.evolutionInstance.findUnique({
        where: { deviceId: device.id },
      });

      if (evolutionInstance) {
        const callDate = new Date(Number(timestamp) || Date.now());
        callDate.setHours(0, 0, 0, 0);
        const isOutgoing = String(type || "").toUpperCase() === "OUTGOING";
        const callDuration = Number(duration) || 0;

        await prisma.dailyMetric.upsert({
          where: {
            date_instanceId: {
              date: callDate,
              instanceId: evolutionInstance.id,
            },
          },
          update: {
            callsMade: isOutgoing ? { increment: 1 } : undefined,
            callsReceived: !isOutgoing ? { increment: 1 } : undefined,
            callDuration: { increment: callDuration },
          },
          create: {
            date: callDate,
            instanceId: evolutionInstance.id,
            callsMade: isOutgoing ? 1 : 0,
            callsReceived: !isOutgoing ? 1 : 0,
            callDuration: callDuration,
          },
        });
      }

      return sendJson(res, 200, { success: true, logId: log.id });
    }

    if (path === "/api/setup/instance" && method === "POST") {
      const body = await readJson(req);
      const { name, instanceId, deviceId } = body || {};
      const endpointUrl = body?.endpointUrl || EVO_URL;
      const apiKey = body?.apiKey || EVO_KEY;
      if (!instanceId || !name) return sendJson(res, 400, { error: "Missing instanceId or name" });

      const existing = await prisma.evolutionInstance.findUnique({ where: { instanceId: String(instanceId) } });

      const instance = await prisma.evolutionInstance.upsert({
        where: { instanceId: String(instanceId) },
        update: {
          name: String(name),
          deviceId: deviceId ? String(deviceId) : null,
          apiKey: apiKey ? String(apiKey) : null,
          endpointUrl: endpointUrl ? String(endpointUrl) : null,
          webhookSecret: existing?.webhookSecret || newWebhookSecret(),
        },
        create: {
          name: String(name),
          instanceId: String(instanceId),
          deviceId: deviceId ? String(deviceId) : null,
          apiKey: apiKey ? String(apiKey) : null,
          endpointUrl: endpointUrl ? String(endpointUrl) : null,
          webhookSecret: newWebhookSecret(),
        },
      });

      // Best-effort: create + set webhook on Evolution.
      if (endpointUrl && apiKey) {
        const baseUrl = String(process.env.WEBHOOK_PUBLIC_BASE_URL || `http://${req.headers.host || "localhost"}`);
        const webhookUrl = `${baseUrl.replace(/\/+$/, "")}/api/webhooks/evolution`;
        const evoBase = String(endpointUrl).replace(/\/+$/, "");

        try {
          await fetch(`${evoBase}/instance/create`, {
            method: "POST",
            headers: { apikey: String(apiKey), "content-type": "application/json" },
            body: JSON.stringify({ instanceName: String(instanceId), integration: "WHATSAPP-BAILEYS" }),
          });
        } catch {}

        try {
          await fetch(`${evoBase}/webhook/set/${encodeURIComponent(String(instanceId))}`, {
            method: "POST",
            headers: { apikey: String(apiKey), "content-type": "application/json" },
            body: JSON.stringify({
              webhook: {
                enabled: true,
                url: webhookUrl,
                headers: instance.webhookSecret ? { "x-webhook-secret": instance.webhookSecret } : {},
                byEvents: false,
                base64: false,
                events: ["MESSAGES_UPSERT"],
              },
            }),
          });
        } catch {}
      }

      return sendJson(res, 200, { status: "success", instance });
    }

    // Evolution webhook receiver (lite mode). Mirrors app/api/webhooks/evolution.
    if (path === "/api/webhooks/evolution" && method === "POST") {
      const payload = await readJson(req);
      const event = String(payload?.event || "");
      const instanceExternal = String(payload?.instance || "");
      const data = payload?.data;

      if (!event || !instanceExternal) return sendJson(res, 400, { status: "invalid_payload" });
      const eventNorm = event.trim().toUpperCase().replace(/\./g, "_");
      if (eventNorm !== "MESSAGES_UPSERT") return sendJson(res, 200, { status: "ignored_event", event: eventNorm });

      const instance = await prisma.evolutionInstance.findUnique({ where: { instanceId: instanceExternal } });
      if (!instance) return sendJson(res, 200, { status: "ignored_instance_unknown" });

      const expectedSecret = instance.webhookSecret || WEBHOOK_SECRET;
      if (expectedSecret) {
        const headerSecret = String(req.headers["x-webhook-secret"] || "");
        if (!headerSecret || headerSecret !== expectedSecret) return sendJson(res, 401, { status: "unauthorized" });
      }

      const msgs = Array.isArray(data?.messages) ? data.messages : data ? [data] : [];
      if (!msgs.length) return sendJson(res, 200, { status: "no_messages" });

      const groups = new Map();
      for (const msg of msgs) {
        const n = Number(msg?.messageTimestamp ?? msg?.timestamp ?? Date.now());
        const dt = new Date(n < 1e12 ? n * 1000 : n);
        dt.setHours(0, 0, 0, 0);
        const k = dt.getTime();
        const arr = groups.get(k) || [];
        arr.push(msg);
        groups.set(k, arr);
      }

      const results = [];
      for (const [dayMs, dayMsgs] of groups.entries()) {
        const day = new Date(dayMs);
        const outcome = await prisma.$transaction(async (tx) => {
          let sentCount = 0;
          let receivedCount = 0;
          let newContacts = 0;
          let newConversations = 0;

          for (const msg of dayMsgs) {
            const key = msg?.key;
            const remoteJid = key?.remoteJid || msg?.remoteJid;
            const messageId = key?.id || msg?.id;
            if (!remoteJid || !messageId) continue;
            if (String(remoteJid).endsWith("@g.us")) continue;

            const fromMe = Boolean(key?.fromMe);
            const direction = fromMe ? "SENT" : "RECEIVED";
            const tsn = Number(msg?.messageTimestamp ?? msg?.timestamp ?? Date.now());
            const ts = new Date(tsn < 1e12 ? tsn * 1000 : tsn);

            try {
              await tx.processedMessage.create({
                data: {
                  instanceId: instance.id,
                  messageId: String(messageId),
                  jid: String(remoteJid),
                  direction,
                  timestamp: ts,
                },
              });
            } catch (e) {
              if (e?.code === "P2002") continue;
              throw e;
            }

            if (fromMe) sentCount += 1;
            else receivedCount += 1;

            try {
              await tx.contact.create({ data: { instanceId: instance.id, jid: String(remoteJid) } });
              newContacts += 1;
            } catch (e) {
              if (e?.code !== "P2002") throw e;
            }

            try {
              await tx.dailyConversation.create({ data: { instanceId: instance.id, date: day, jid: String(remoteJid) } });
              newConversations += 1;
            } catch (e) {
              if (e?.code !== "P2002") throw e;
            }
          }

          if (sentCount || receivedCount || newContacts || newConversations) {
            await tx.dailyMetric.upsert({
              where: { date_instanceId: { date: day, instanceId: instance.id } },
              update: {
                messagesSent: sentCount ? { increment: sentCount } : undefined,
                messagesReceived: receivedCount ? { increment: receivedCount } : undefined,
                activeConversations: newConversations ? { increment: newConversations } : undefined,
                newContacts: newContacts ? { increment: newContacts } : undefined,
              },
              create: {
                date: day,
                instanceId: instance.id,
                messagesSent: sentCount,
                messagesReceived: receivedCount,
                activeConversations: newConversations,
                newContacts,
              },
            });
          }

          return { day, processed: sentCount + receivedCount, sentCount, receivedCount, newContacts, newConversations };
        });
        results.push(outcome);
      }

      return sendJson(res, 200, { status: "success", results });
    }

    if (path === "/api/state" && method === "GET") {
      const { start, end } = dayBounds(new Date());

      const [devices, instances, logs, dailyMetrics] = await Promise.all([
        prisma.device.findMany({
          orderBy: { lastSeen: "desc" },
          include: { evolutionInstance: true },
        }),
        prisma.evolutionInstance.findMany({
          orderBy: { name: "asc" },
          include: { device: true },
        }),
        prisma.callLog.findMany({
          orderBy: { timestamp: "desc" },
          take: 100,
          include: { device: true },
        }),
        prisma.dailyMetric.findMany({
          where: { date: { gte: start, lte: end } },
          include: { instance: true },
          orderBy: { instance: { name: "asc" } },
        }),
      ]);

      const totals = dailyMetrics.reduce(
        (acc, curr) => ({
          callsMade: acc.callsMade + curr.callsMade,
          callsReceived: acc.callsReceived + curr.callsReceived,
          callDuration: acc.callDuration + curr.callDuration,
          messagesSent: acc.messagesSent + curr.messagesSent,
          messagesReceived: acc.messagesReceived + curr.messagesReceived,
          activeConversations: acc.activeConversations + curr.activeConversations,
          newContacts: acc.newContacts + curr.newContacts,
        }),
        {
          callsMade: 0,
          callsReceived: 0,
          callDuration: 0,
          messagesSent: 0,
          messagesReceived: 0,
          activeConversations: 0,
          newContacts: 0,
        }
      );

      return sendJson(res, 200, { devices, instances, logs, dailyMetrics, totals, date: new Date() });
    }

    // PATCH /api/devices/:id { name }
    if (method === "PATCH" && path.startsWith("/api/devices/")) {
      const id = path.replace("/api/devices/", "");
      if (!id) return sendJson(res, 400, { error: "Missing id" });
      const body = await readJson(req);
      const { name } = body || {};
      if (!name) return sendJson(res, 400, { error: "Name is required" });

      const device = await prisma.device.update({
        where: { id },
        data: { name: String(name) },
      });
      return sendJson(res, 200, { success: true, device });
    }

    return sendJson(res, 404, { error: "Not found" });
  } catch (err) {
    // Keep stack in server logs, but return a generic JSON error to callers.
    console.error(err);
    return sendJson(res, 500, { error: "Internal Server Error" });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[lite] listening on http://${HOST}:${PORT}`);
});

process.on("SIGINT", async () => {
  try {
    await prisma.$disconnect();
  } finally {
    process.exit(0);
  }
});
