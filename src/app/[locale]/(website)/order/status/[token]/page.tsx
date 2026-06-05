import type { Metadata } from 'next';
import { OrderStatusView } from '@/components/order/OrderStatusView';

// La URL contiene un magicToken que da acceso a datos del pedido — no indexable.
// referrer: no-referrer evita que el token aparezca en el Referer cuando el usuario
// hace click a Andreani u otros links externos desde esta página.
export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  referrer: 'no-referrer',
};

interface Props {
  params: Promise<{ token: string }>;
}

export default async function OrderStatusPage({ params }: Props) {
  const { token } = await params;

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto px-4 py-24 lg:py-48">
        <OrderStatusView token={token} />
      </div>
    </main>
  );
}
