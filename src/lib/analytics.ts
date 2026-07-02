// Helper único para tracking de eventos. Hace fan-out a GA4 + Meta Pixel + Clarity.
//
// Reglas:
// - NUNCA mandes PII (email, DNI, calle, teléfono). Solo IDs opacos + agregados.
// - Nombres de eventos GA4 en snake_case (spec). Meta usa PascalCase para los estándar.
// - Silent-fail: si el analytics no está cargado (adblock, dev sin config), no throwea.

// Tipos globales
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

type CommonParams = Record<string, string | number | boolean | undefined>;

interface CartItem {
  item_id: string;                   // muralId
  item_name: string;                  // muralTitle
  item_category?: string;             // collectionTitle
  item_variant?: string;              // variantColorName
  quantity?: number;                  // 1 (por diseño)
  price?: number;                     // subtotal producto ARS
}

interface CheckoutParams {
  value?: number;
  currency?: 'ARS';
  items?: CartItem[];
  coupon?: string;                    // 'LANZAMIENTO' cuando aplica
  shipping_tier?: 'delivery' | 'pickup';
  province?: string;                  // agregado, no dirección exacta
  area_m2?: number;
}

// Log auxiliar en dev
const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost';
const log = (...args: unknown[]) => { if (isDev) console.log('[analytics]', ...args); };

// ─── Eventos custom genéricos ───────────────────────────────────────────

export function trackEvent(name: string, params: CommonParams = {}): void {
  if (typeof window === 'undefined') return;
  try {
    window.gtag?.('event', name, params);
    window.clarity?.('event', name);
    log(name, params);
  } catch { /* silent */ }
}

// ─── Eventos e-commerce estándar (GA4 + Meta Enhanced Ecommerce) ────────

// Usuario ve un mural (equivale a view_item de GA4 / ViewContent de Meta).
export function trackViewItem(item: CartItem): void {
  if (typeof window === 'undefined') return;
  try {
    window.gtag?.('event', 'view_item', {
      currency: 'ARS',
      value: item.price,
      items: [item],
    });
    window.fbq?.('track', 'ViewContent', {
      content_ids: [item.item_id],
      content_type: 'product',
      content_name: item.item_name,
      value: item.price,
      currency: 'ARS',
    });
    log('view_item', item);
  } catch { /* silent */ }
}

// Usuario apretó "Continuar a envío" (paso 1 → 2). GA4 add_to_cart + Meta AddToCart.
export function trackAddToCart(params: CheckoutParams): void {
  if (typeof window === 'undefined') return;
  try {
    window.gtag?.('event', 'add_to_cart', {
      currency: 'ARS',
      value: params.value,
      items: params.items,
    });
    window.fbq?.('track', 'AddToCart', {
      content_ids: params.items?.map(i => i.item_id),
      content_type: 'product',
      value: params.value,
      currency: 'ARS',
    });
    log('add_to_cart', params);
  } catch { /* silent */ }
}

// Usuario apretó "Revisar pedido" (paso 2 → 3). GA4 add_shipping_info.
export function trackAddShippingInfo(params: CheckoutParams): void {
  if (typeof window === 'undefined') return;
  try {
    window.gtag?.('event', 'add_shipping_info', {
      currency: 'ARS',
      value: params.value,
      shipping_tier: params.shipping_tier,
      items: params.items,
    });
    log('add_shipping_info', params);
  } catch { /* silent */ }
}

// Usuario apretó "Pagar con MP" (redirect a MP). GA4 begin_checkout + Meta InitiateCheckout.
export function trackBeginCheckout(params: CheckoutParams): void {
  if (typeof window === 'undefined') return;
  try {
    window.gtag?.('event', 'begin_checkout', {
      currency: 'ARS',
      value: params.value,
      coupon: params.coupon,
      items: params.items,
    });
    window.fbq?.('track', 'InitiateCheckout', {
      content_ids: params.items?.map(i => i.item_id),
      content_type: 'product',
      num_items: params.items?.length ?? 1,
      value: params.value,
      currency: 'ARS',
    });
    log('begin_checkout', params);
  } catch { /* silent */ }
}

// Pago aprobado — evento MÁS importante. GA4 purchase + Meta Purchase.
// Se usa `transaction_id` para dedup (Meta) y para tirar el evento una sola vez.
export function trackPurchase(params: {
  transaction_id: string;             // orderNumber (opaco, seguro)
  value: number;                      // totalARS
  shipping?: number;
  currency?: 'ARS';
  coupon?: string;
  items?: CartItem[];
  shipping_tier?: 'delivery' | 'pickup';
  province?: string;
}): void {
  if (typeof window === 'undefined') return;
  try {
    window.gtag?.('event', 'purchase', {
      transaction_id: params.transaction_id,
      value: params.value,
      currency: params.currency ?? 'ARS',
      shipping: params.shipping ?? 0,
      coupon: params.coupon,
      items: params.items,
      shipping_tier: params.shipping_tier,
      // agregados (no PII)
      province: params.province,
    });
    window.fbq?.('track', 'Purchase', {
      content_ids: params.items?.map(i => i.item_id),
      content_type: 'product',
      value: params.value,
      currency: params.currency ?? 'ARS',
      // dedup key para evitar duplicados con Meta Conversions API (fase 2)
      eventID: params.transaction_id,
    });
    log('purchase', params);
  } catch { /* silent */ }
}

// Pago rechazado (custom). Solo GA4 — Meta no tiene evento estándar de rechazo.
export function trackPaymentRejected(params: { transaction_id: string; value?: number }): void {
  trackEvent('payment_rejected', {
    transaction_id: params.transaction_id,
    value: params.value,
    currency: 'ARS',
  });
}

// Pago cancelado pre-checkout (usuario volvió de MP sin pagar).
export function trackPaymentCancelledPrecheckout(params: { transaction_id?: string }): void {
  trackEvent('payment_cancelled_precheckout', {
    transaction_id: params.transaction_id,
  });
}
