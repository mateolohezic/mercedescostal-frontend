import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PurchaseFlow } from '@/components/purchase/PurchaseFlow';

// /buy es un flujo transaccional con datos personales — no queremos que aparezca
// en buscadores ni que se compartan miniaturas con datos del checkout.
export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

interface Props {
  searchParams: Promise<{ mural?: string }>;
}

export default async function BuyPage({ searchParams }: Props) {
  const params = await searchParams;
  const preselectedMuralId = params.mural || '';
  const t = await getTranslations('purchase');

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-gillsans text-3xl md:text-4xl font-medium uppercase tracking-wider text-center mb-2">
          {t('title')}
        </h1>
        <p className="text-center text-sm text-black/40 mb-10">{t('subtitle')}</p>

        <PurchaseFlow preselectedMuralId={preselectedMuralId} />
      </div>
    </main>
  );
}
