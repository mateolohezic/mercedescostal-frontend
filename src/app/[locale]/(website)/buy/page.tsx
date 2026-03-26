import { PurchaseFlow } from '@/components/purchase/PurchaseFlow';

interface Props {
  searchParams: Promise<{ mural?: string }>;
}

export default async function BuyPage({ searchParams }: Props) {
  const params = await searchParams;
  const preselectedMuralId = params.mural || '';

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-gillsans text-3xl md:text-4xl font-medium uppercase tracking-wider text-center mb-2">
          Comprar empapelado
        </h1>
        <p className="text-center text-sm text-black/40 mb-10">
          Seleccioná tu mural, ingresá las medidas de tus paredes y pagá online.
        </p>

        <PurchaseFlow preselectedMuralId={preselectedMuralId} />
      </div>
    </main>
  );
}
