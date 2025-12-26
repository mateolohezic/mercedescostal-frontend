// src/lib/gemini-utils.ts

export class GeminiRateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeminiRateLimitError";
  }
}

export async function callGeminiWithRetry<T>(
  fn: () => Promise<T>,
  maxWaitTime = 60000 // 60 segundos máximo
): Promise<T> {
  const startTime = Date.now();
  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (error: any) {
      const isRateLimit = error?.status === 429 || error?.message?.includes("429") || error?.message?.includes("RESOURCE_EXHAUSTED");
      const elapsed = Date.now() - startTime;

      if (!isRateLimit) {
        throw error;
      }

      // Si ya pasamos el tiempo máximo, tirar error de sobrecarga
      if (elapsed >= maxWaitTime) {
        throw new GeminiRateLimitError("El servicio está sobrecargado. Por favor intentá de nuevo en unos segundos.");
      }

      // Backoff exponencial: 2s, 4s, 8s, 16s... hasta max 30s
      const baseDelay = Math.min(Math.pow(2, attempt + 1) * 1000, 30000);
      const remainingTime = maxWaitTime - elapsed;
      const delay = Math.min(baseDelay, remainingTime);

      console.log(`[Visualizer] Rate limited (attempt ${attempt + 1}), retry in ${delay}ms...`);
      await new Promise(r => setTimeout(r, delay));
      attempt++;
    }
  }
}