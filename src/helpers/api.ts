const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

// Messages safe to show to the user (from backend validation)
const USER_FACING_PREFIXES = [
  'Código postal', 'Dimensiones', 'Datos del cliente', 'Datos del producto',
  'Datos de envío', 'Email', 'Se requieren', 'Ancho debe', 'Alto debe',
  'El monto total', 'Seleccioná', 'Ingresá', 'Tipo de producto',
  'No se pudo cotizar', 'Envío no disponible',
];

function sanitizeErrorMessage(message: string | undefined, fallback: string): string {
  if (!message) return fallback;
  if (USER_FACING_PREFIXES.some(p => message.startsWith(p))) return message;
  return fallback;
}

async function handleResponse<T>(res: Response): Promise<T> {
  let data: any;
  try {
    data = await res.json();
  } catch {
    throw new Error('Error de conexión. Intentá de nuevo.');
  }

  if (!res.ok || !data.success) {
    const fallback = res.status >= 500
      ? 'Error del servidor. Intentá de nuevo en unos minutos.'
      : 'No se pudo procesar la solicitud. Intentá de nuevo.';
    throw new Error(sanitizeErrorMessage(data.message, fallback));
  }

  return data.data;
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
  return handleResponse<T>(res);
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(res);
}
