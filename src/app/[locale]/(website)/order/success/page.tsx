import { OrderSuccessClient } from '@/components/order/OrderSuccessClient';

interface Props {
  searchParams: Promise<{ token?: string }>;
}

export default async function OrderSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const token = params.token || '';

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto px-4 py-16">
        <OrderSuccessClient token={token} />
      </div>
    </main>
  );
}
