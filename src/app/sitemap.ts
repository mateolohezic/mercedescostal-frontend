import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { collections, getCollections, getCollaborations } from '@/data/collections';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mercedescostal.com.ar';

  const routes = [
    '',
    '/collections',
    '/collections/collaborations',
    '/quote',
    '/work-with-us',
    '/sell-mc',
    '/meet-the-makers',
    '/press',
    '/search',
    '/highlights/good-design',
    '/highlights/ateneo-splendid',
    '/highlights/london-design-festival',
    '/highlights/manantiales-popup',
    '/highlights/feria-habitat-valencia',
    '/mc-universe/fragrances',
    '/mc-universe/the-book',
    '/mc-universe/costal-coffee',
    '/mc-universe/landmark',
  ];

  const buildAlternates = (route: string) => ({
    languages: Object.fromEntries(
      routing.locales.map(loc => [loc, `${baseUrl}/${loc}${route}`])
    ),
  });

  const staticPages = routes.flatMap(route =>
    routing.locales.map(locale => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : route === '/collections' || route === '/quote' ? 0.9 : 0.8,
      alternates: buildAlternates(route),
    }))
  );

  const allCollections = getCollections();
  const collectionPages = allCollections.flatMap(col =>
    routing.locales.map(locale => ({
      url: `${baseUrl}/${locale}/collections/${col.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: buildAlternates(`/collections/${col.id}`),
    }))
  );

  // Páginas individuales por mural — son los SKUs reales y la página
  // más importante a indexar (compite por queries long-tail tipo
  // "mural botánico verde", "wallpaper artisan", etc.).
  const muralPages = collections.flatMap(col =>
    col.murales.flatMap(mural =>
      routing.locales.map(locale => ({
        url: `${baseUrl}/${locale}/collections/${col.id}/${mural.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: buildAlternates(`/collections/${col.id}/${mural.id}`),
      }))
    )
  );

  // Páginas por categoría (keyword) — hoy son páginas huérfanas pero
  // existen estáticamente generadas. Las incluimos para que entren al
  // crawler como entry points SEO.
  const allKeywords = new Set<string>();
  collections.forEach(col => col.murales.forEach(m => m.keywords.forEach(k => allKeywords.add(k))));
  const categoryPages = Array.from(allKeywords).flatMap(category =>
    routing.locales.map(locale => ({
      url: `${baseUrl}/${locale}/categories/${category}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: buildAlternates(`/categories/${category}`),
    }))
  );

  const collaborations = getCollaborations();
  const collaborationPages = collaborations.flatMap(col =>
    routing.locales.map(locale => ({
      url: `${baseUrl}/${locale}/collections/collaborations/${col.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: buildAlternates(`/collections/collaborations/${col.id}`),
    }))
  );

  return [
    ...staticPages,
    ...collectionPages,
    ...muralPages,
    ...categoryPages,
    ...collaborationPages,
  ];
}
