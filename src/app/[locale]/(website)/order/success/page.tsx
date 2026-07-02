import type { Metadata } from 'next';
import { OrderSuccessClient } from '@/components/order/OrderSuccessClient';

// Página post-pago con magicToken en URL — privada, no debe indexarse.
export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  referrer: 'no-referrer',
};

interface Props {
  searchParams: Promise<{
    token?: string;
    // MP redirige con estos params. Los usamos para detectar cancelación
    // (usuario apretó "Volver al sitio" sin pagar) — MP en ese caso manda
    // status="null" y payment_id="null" por back_urls.pending.
    status?: string;
    payment_id?: string;
    collection_status?: string;
  }>;
}

export default async function OrderSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const token = params.token || '';
  // Cancelación pura del checkout MP: status/payment_id llegan como "null" string.
  // Distinto de un pending REAL (Rapipago/Pago Fácil), que trae status="pending" +
  // payment_id numérico válido.
  const cancelledPreCheckout =
    (params.status === 'null' || !params.status) &&
    (params.payment_id === 'null' || !params.payment_id) &&
    (params.collection_status === 'null' || !params.collection_status);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto px-4 py-24 lg:py-48">
        <OrderSuccessClient token={token} cancelledPreCheckout={cancelledPreCheckout} />
      </div>
    </main>
  );
}
