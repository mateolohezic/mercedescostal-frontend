import { OrderStatusView } from '@/components/order/OrderStatusView';

interface Props {
  params: Promise<{ token: string }>;
}

export default async function OrderStatusPage({ params }: Props) {
  const { token } = await params;

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto px-4 py-12">
        <OrderStatusView token={token} />
      </div>
    </main>
  );
}
