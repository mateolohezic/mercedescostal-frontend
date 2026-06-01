import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { CloseIcon } from '@/icons';

export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function OrderFailurePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'purchase.failure' });

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 mx-auto mb-8 rounded-full border-2 border-black/20 flex items-center justify-center text-black/40">
          <CloseIcon className="w-7 h-7" />
        </div>

        <h1 className="font-gillsans text-2xl font-medium uppercase tracking-wider mb-4">
          {t('title')}
        </h1>

        <p className="text-sm text-black/50 mb-10">{t('description')}</p>

        <div className="space-y-3">
          <Link
            href={`/${locale}/buy`}
            className="block w-full py-4 bg-black text-white font-gillsans font-medium uppercase tracking-wider hover:bg-black/85 transition-colors text-center"
          >
            {t('retry')}
          </Link>

          <a
            href="https://wa.me/5491160208460"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 border border-black/20 font-gillsans font-medium uppercase tracking-wider text-black/60 hover:border-black hover:text-black transition-all duration-200 text-center"
          >
            {t('contact')}
          </a>
        </div>
      </div>
    </main>
  );
}
