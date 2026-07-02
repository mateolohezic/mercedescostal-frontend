import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

// /order/failure existe SOLO por retrocompatibilidad con las `back_urls.failure`
// registradas en preferencias de Mercado Pago viejas. Redirige a /order/success
// para unificar toda la UX post-checkout bajo el mismo componente (que ya polea
// el estado del pago y muestra rejected/cancelled/approved diferenciados).
//
// Sin esto, MP redirigía a una page estática divergente (título/CTA distintos,
// sin polling, sin token) — mala experiencia y confusa vs /success.

export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function OrderFailurePage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  // Preservamos TODOS los query params (token, status, external_reference, etc.)
  // así /success puede identificar la orden y polear el estado real.
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(sp)) {
    if (typeof value === 'string') qs.set(key, value);
  }
  const query = qs.toString();
  redirect(`/${locale}/order/success${query ? `?${query}` : ''}`);
}
