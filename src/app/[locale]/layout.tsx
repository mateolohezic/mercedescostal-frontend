import type { Metadata } from "next";
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { GoogleAnalytics } from "@next/third-parties/google";
import { ClarityTracker, Collapse, MetaPixel, Navbar, ViewTransitionsRouter } from "@/components";
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import './globals.css';

const gillSans = localFont({
  src: [
    {
      path: '../../assets/fonts/Gill_Sans_Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Gill_Sans.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Gill_Sans_Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Gill_Sans_Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Gill_Sans_Heavy.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--gillsans'
});

const truetypewritter = localFont({
  src: '../../assets/fonts/True_Typewritter_2.woff2',
  display: 'swap',
  variable: '--truetypewritter'
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Omit<Props, 'children'>): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'metadata.home'});

  return {
    title: {
      template: '%s | Mercedes Costal',
      default: 'Mercedes Costal',
    },
    description: t('description'),
    generator: 'Mercedes Costal',
    applicationName: 'Mercedes Costal',
    referrer: 'origin-when-cross-origin',
    keywords: ['diseño', 'Mercedes Costal'],
    authors: [{ name: 'Mercedes Costal', url: 'https://mercedescostal.com.ar' }],
    creator: 'Mercedes Costal',
    publisher: 'Mercedes Costal',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    metadataBase: new URL('https://mercedescostal.com.ar'),
    alternates: {
      canonical: '/',
      languages: {
        'x-default': '/',
        'es': '/es',
        'en': '/en',
      },
    },
    openGraph: {
      title: 'Mercedes Costal',
      description: t('description'),
      url: 'https://mercedescostal.com.ar',
      siteName: 'Mercedes Costal',
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    manifest: 'https://mercedescostal.com.ar/manifest.webmanifest',
    twitter: {
      card: 'summary_large_image',
      site: 'https://mercedescostal.com.ar',
      creator: 'Mercedes Costal',
      title: 'Mercedes Costal',
      description: t('description'),
      images: {
        url: 'https://mercedescostal.com.ar/assets/logo.png',
        alt: 'Mercedes Costal Logo',
      },
    },
    appleWebApp: {
      title: 'Mercedes Costal',
      statusBarStyle: 'black-translucent',
      startupImage: [
        '/src/app/apple-icon.png',
        {
          url: '/src/app/apple-icon.jpg',
          media: '(device-width: 768px) and (device-height: 1024px)',
        },
      ],
    },
    category: 'design',
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const messages = await getMessages();

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mercedes Costal',
    alternateName: 'Mercedes Costal Prints & Patterns',
    url: 'https://mercedescostal.com.ar',
    logo: 'https://mercedescostal.com.ar/assets/logo.png',
    description: locale === 'es'
      ? 'Estudio creativo argentino especializado en murales y empapelados de autor. Hecho a medida con tintas ecológicas y procesos artesanales.'
      : 'Argentine creative studio specialized in author murals and wallpapers. Made to order with eco-friendly inks and artisanal processes.',
    foundingLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressCountry: 'AR' },
    },
    sameAs: [
      'https://www.instagram.com/mercedes.costal/',
      'https://web.facebook.com/costal.mercedes/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+54-9-11-60208460',
      contactType: 'customer service',
      email: 'info@mercedescostal.com.ar',
      availableLanguage: ['Spanish', 'English'],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://mercedescostal.com.ar',
    name: 'Mercedes Costal',
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://mercedescostal.com.ar/${locale}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang={locale}>
      <body className={`${gillSans.className} ${gillSans.variable} ${truetypewritter.variable} w-full min-h-svh flex flex-col items-center`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Navbar/>
          <Collapse/>
          {/* Intercepta clicks en <a> internos y envuelve la navegación
              con document.startViewTransition() para activar el CSS de
              ::view-transition-old/new. En browsers sin soporte es
              no-op silencioso. */}
          <ViewTransitionsRouter/>
          {children}
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_G_A_ID || ""}/>
          <ClarityTracker/>
          <MetaPixel/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
