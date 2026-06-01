import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const ONE_YEAR = 60 * 60 * 24 * 365;

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Habilita el componente <ViewTransition> de React 19.2 — el wrapper
  // del layout no es estrictamente necesario para nuestras transiciones
  // (las maneja ViewTransitionsRouter con document.startViewTransition
  // puro), pero deja la puerta abierta para usarlo más adelante.
  experimental: {
    viewTransition: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: ONE_YEAR,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default withNextIntl(nextConfig);
