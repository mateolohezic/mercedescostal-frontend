import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

const XIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default async function OrderFailurePage({ params }: Props) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 mx-auto mb-8 rounded-full border-2 border-black/20 flex items-center justify-center text-black/40">
          <XIcon />
        </div>

        <h1 className="font-gillsans text-2xl font-medium uppercase tracking-wider mb-4">
          Error en el pago
        </h1>

        <p className="text-sm text-black/50 mb-10">
          Hubo un problema al procesar tu pago. No se realizó ningún cobro.
        </p>

        <div className="space-y-3">
          <Link
            href={`/${locale}/buy`}
            className="block w-full py-4 bg-black text-white font-gillsans font-medium uppercase tracking-wider hover:bg-black/85 transition-colors text-center"
          >
            Reintentar compra
          </Link>

          <a
            href="https://wa.me/5491160208460"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 border border-black/20 font-gillsans font-medium uppercase tracking-wider text-black/60 hover:border-black hover:text-black transition-all duration-200 text-center"
          >
            Contactar soporte
          </a>
        </div>
      </div>
    </main>
  );
}
