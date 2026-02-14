type EvolutionWebhookConfig = {
  endpointUrl: string;
  apiKey: string;
  instanceName: string;
  webhookUrl: string;
  events: string[];
  webhookSecret?: string;
};

function stripTrailingSlashes(url: string) {
  return url.replace(/\/+$/, "");
}

export function getRequestBaseUrl(req: Request) {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "http";
  if (!host) throw new Error("Missing host header");
  return `${proto}://${host}`;
}

export async function createEvolutionInstance(args: {
  endpointUrl: string;
  apiKey: string;
  instanceName: string;
}) {
  const base = stripTrailingSlashes(args.endpointUrl);
  const url = `${base}/instance/create`;

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      apikey: args.apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      instanceName: args.instanceName,
      integration: "WHATSAPP-BAILEYS",
    }),
  });

  const text = await resp.text().catch(() => "");
  if (!resp.ok) {
    throw new Error(`Evolution instance create failed: HTTP ${resp.status} ${text.slice(0, 300)}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

export async function connectEvolutionInstance(args: {
  endpointUrl: string;
  apiKey: string;
  instanceName: string;
}) {
  const base = stripTrailingSlashes(args.endpointUrl);
  const url = `${base}/instance/connect/${encodeURIComponent(args.instanceName)}`;

  const resp = await fetch(url, {
    method: "GET",
    headers: {
      apikey: args.apiKey,
    },
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(`Evolution instance connect failed: HTTP ${resp.status} ${text.slice(0, 300)}`);
  }

  return await resp.json().catch(() => ({}));
}

export async function setEvolutionWebhook(config: EvolutionWebhookConfig) {
  const base = stripTrailingSlashes(config.endpointUrl);
  const url = `${base}/webhook/set/${encodeURIComponent(config.instanceName)}`;

  const headers: Record<string, string> = {};
  if (config.webhookSecret) {
    // Evolution forwards custom headers in webhook delivery.
    headers["x-webhook-secret"] = config.webhookSecret;
  }

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      apikey: config.apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      webhook: {
        enabled: true,
        url: config.webhookUrl,
        headers,
        byEvents: false,
        base64: false,
        events: config.events,
      },
    }),
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(`Evolution webhook set failed: HTTP ${resp.status} ${text.slice(0, 300)}`);
  }

  return await resp.json().catch(() => ({}));
}
