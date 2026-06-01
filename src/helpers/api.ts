// Cliente HTTP para hablar con el backend a través del proxy BFF (/api/proxy/*).
// El proxy vive en src/app/api/proxy/[...path]/route.ts y agrega la x-api-key
// server-side. Esto evita exponer la API key en el bundle del browser.
//
// Convención: el caller pasa el path "lógico" (`/api/orders`, `/api/shipping/quote`)
// y este helper lo reescribe a `/api/proxy/orders`, `/api/proxy/shipping/quote`.

const API_PROXY_BASE = '/api/proxy';

// Mensajes que nacen en el backend y son seguros de mostrar al usuario.
// El resto se reemplaza con un mensaje genérico para no leakear detalles internos.
const USER_FACING_PREFIXES = [
  'Código postal', 'Dimensiones', 'Datos del cliente', 'Datos del producto',
  'Datos de envío', 'Email', 'Se requieren', 'Ancho debe', 'Alto debe',
  'El monto total', 'Seleccioná', 'Ingresá', 'Tipo de producto',
  'No se pudo cotizar', 'Envío no disponible', 'DNI inválido',
  'El peso del paquete', 'La altura máxima de pared',
];

function sanitizeErrorMessage(message: string | undefined, fallback: string): string {
  if (!message) return fallback;
  if (USER_FACING_PREFIXES.some(p => message.startsWith(p))) return message;
  return fallback;
}

// Convierte path lógico ("/api/orders/abc") en URL del proxy ("/api/proxy/orders/abc").
function toProxyUrl(path: string): string {
  const cleaned = path.startsWith('/api/') ? path.slice('/api/'.length) : path.replace(/^\//, '');
  return `${API_PROXY_BASE}/${cleaned}`;
}

async function handleResponse<T>(res: Response): Promise<T> {
  let data: any;
  try {
    data = await res.json();
  } catch {
    throw new Error('Error de conexión. Intentá de nuevo.');
  }

  if (!res.ok || !data.success) {
    let fallback: string;
    if (res.status === 429) {
      fallback = 'Demasiados intentos. Esperá un minuto y volvé a probar.';
    } else if (res.status >= 500) {
      fallback = 'Error del servidor. Intentá de nuevo en unos minutos.';
    } else {
      fallback = 'No se pudo procesar la solicitud. Intentá de nuevo.';
    }
    throw new Error(sanitizeErrorMessage(data.message, fallback));
  }

  return data.data;
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(toProxyUrl(path), {
    signal: AbortSignal.timeout(15_000),
  });
  return handleResponse<T>(res);
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(toProxyUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(20_000),
  });
  return handleResponse<T>(res);
}

// Versión "raw" para cuando solo querés el response sin desempacar `{success, data}`.
// Útil en hooks que polleen y prefieran chequear el status directo.
export function apiUrl(path: string): string {
  return toProxyUrl(path);
}
