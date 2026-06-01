import { NextRequest, NextResponse } from 'next/server';

// BFF (Backend For Frontend): el browser llama a /api/proxy/<algo> en este Next server,
// que agrega la x-api-key server-side y reenvía al backend Express. La key vive solo
// en variables de entorno del server (sin NEXT_PUBLIC_) — no se expone al cliente.
//
// Endpoints permitidos: solo paths bajo /api/* del backend, sin admin (que usa otra key).
// Métodos: GET y POST (los únicos que usa el flujo de compra hoy).

const BACKEND_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

// Falla en build si las env vars del server no están definidas — evita deploys silenciosos
// donde el proxy redirige a undefined.
if (!BACKEND_URL || !API_KEY) {
  // Solo loggeamos en runtime — no rompemos build de páginas no API.
  console.warn('[proxy] API_URL o API_KEY no definidas. Las llamadas al backend van a fallar.');
}

// Endpoints públicos que el front puede usar a través del proxy. Todo lo que no
// matchee acá se rechaza para no exponer admin u otros endpoints sensibles.
const ALLOWED_PATH_PREFIXES = [
  'orders',          // POST /orders, GET /orders/:token, /payment-status, /tracking
  'shipping',        // GET /shipping/quote, /shipping/locality
  'config',          // GET /config/pricing
  'health',          // GET /health (debug)
];

function isAllowedPath(parts: string[]): boolean {
  if (parts.length === 0) return false;
  return ALLOWED_PATH_PREFIXES.includes(parts[0]);
}

async function proxy(req: NextRequest, params: { path: string[] }): Promise<Response> {
  if (!BACKEND_URL || !API_KEY) {
    return NextResponse.json(
      { success: false, message: 'Backend no configurado' },
      { status: 503 },
    );
  }
  if (!isAllowedPath(params.path)) {
    return NextResponse.json(
      { success: false, message: 'Endpoint no permitido' },
      { status: 404 },
    );
  }

  const targetPath = params.path.join('/');
  const search = req.nextUrl.search;
  const targetUrl = `${BACKEND_URL.replace(/\/$/, '')}/api/${targetPath}${search}`;

  const headers: Record<string, string> = {
    'x-api-key': API_KEY,
    'X-Requested-With': 'XMLHttpRequest',
  };
  const contentType = req.headers.get('content-type');
  if (contentType) headers['Content-Type'] = contentType;

  let body: string | undefined;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    body = await req.text();
  }

  try {
    const upstream = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      // Timeout razonable para evitar quedar colgado si el back no responde.
      signal: AbortSignal.timeout(20_000),
      cache: 'no-store',
    });

    const respBody = await upstream.text();
    const respContentType = upstream.headers.get('content-type') || 'application/json';
    return new Response(respBody, {
      status: upstream.status,
      headers: { 'Content-Type': respContentType },
    });
  } catch (err) {
    console.error('[proxy] backend fetch failed:', err);
    return NextResponse.json(
      { success: false, message: 'Error de conexión con el backend' },
      { status: 502 },
    );
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, await params);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, await params);
}
