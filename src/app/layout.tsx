import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local'
import { Collapse, Navbar } from "@/components";
import "./globals.css";
import { NavLinkHome } from "@/interfaces";

export const metadata: Metadata = {
  title:{
    template: '%s | Mercedes Costal',
    default: 'Mercedes Costal',
  },
  description: "Mercedes Costal Landing Page.",
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
      // 'es-AR': '/es',
      // 'es-ES': '/es',
      // 'pt-BR': '/br',
      // 'en-US': '/en',
      // 'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: 'Mercedes Costal',
    description: 'Mercedes Costal.',
    url: 'https://mercedescostal.com.ar',
    siteName: 'Mercedes Costal',
    locale: 'es_AR',
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
    description: 'Mercedes Costal.',
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

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  interactiveWidget: 'resizes-visual',
}

const gillSans = localFont({
  src: [
    {
      path: '../assets/fonts/Gill_Sans_Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Gill_Sans.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Gill_Sans_Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Gill_Sans_Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Gill_Sans_Heavy.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--gillsans'
});

const truetypewritter = localFont({
  src: '../assets/fonts/True_Typewritter_2.ttf',
  display: 'auto',
  variable: '--truetypewritter'
})

const links:Array<NavLinkHome> = [
  {
      title:'Wallpapers',
      href:'/collections',
  },
  {
      title:'Studio',
      menu: true,
      links: [
          {
              title:'Meet the makers',
              href:'/meet-the-makers'
          }
      ]
  },
  {
      title:'Highlights',
      menu: true,
      links: [
          {
              title:'Buen diseño',
              href:'/highlights/good-design'
          },
          {
              title:'Ateneo Splendid',
              href:'/highlights/ateneo-splendid'
          },
          {
              title:'UK',
              href:'/highlights/london-design-festival'
          },
          {
              title:'Manantiales Popup',
              href:'/highlights/manantiales-popup'
          },
          {
              title:'Feria Habitat Valencia',
              href:'/highlights/feria-habitat-valencia'
          },
      ]
  },
  {
      title:'MC Universe',
      menu: true,
      links: [
          {
              title:'Fragrances',
              href:'/mc-universe/fragrances'
          },
          {
              title:'The Book',
              href:'/mc-universe/the-book'
          },
          {
              title:'Costal Café',
              href:'/mc-universe/costal-coffee'
          },
      ]
  },
  {
      title:'Contact',
      menu: true,
      links: [
          {
              title:'Trabaja con nosotros',
              href:'/work-with-us'
          },
          {
              title:'Vende M.C.',
              href:'/sell-mc'
          },
      ]
  },
  {
      title:'Cotizar',
      href:'/quote',
  },
];

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="es">
      <body className={`${gillSans.className} ${gillSans.variable} ${truetypewritter.variable} w-full min-h-svh flex flex-col items-center`}>
        <Navbar links={links}/>
        <Collapse links={links}/>
        {children}
      </body>
    </html>
  );
}