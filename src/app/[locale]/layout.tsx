import type { Metadata } from "next";
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { GoogleAnalytics } from "@next/third-parties/google";
import { ClarityTracker, Collapse, Navbar } from "@/components";
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import './globals.css';

const gillSans = localFont({
  src: [
    {
      path: '../../assets/fonts/Gill_Sans_Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Gill_Sans.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Gill_Sans_Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Gill_Sans_Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Gill_Sans_Heavy.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--gillsans'
});

const truetypewritter = localFont({
  src: '../../assets/fonts/True_Typewritter_2.ttf',
  display: 'auto',
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

  return (
    <html lang={locale}>
      <body className={`${gillSans.className} ${gillSans.variable} ${truetypewritter.variable} w-full min-h-svh flex flex-col items-center`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar/>
          <Collapse/>
          {children}
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_G_A_ID || ""}/>
          <ClarityTracker/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
