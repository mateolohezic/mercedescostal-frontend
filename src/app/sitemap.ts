import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getCollections, getCollaborations } from '@/data/collections';

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
    '/search',
    '/highlights/good-design',
    '/highlights/ateneo-splendid',
    '/highlights/london-design-festival',
    '/highlights/manantiales-popup',
    '/highlights/feria-habitat-valencia',
    '/mc-universe/fragrances',
    '/mc-universe/the-book',
    '/mc-universe/costal-coffee',
  ];

  const staticPages = routes.flatMap(route =>
    routing.locales.map(locale => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : route === '/collections' || route === '/quote' ? 0.9 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map(loc => [
            loc,
            `${baseUrl}/${loc}${route}`
          ])
        )
      }
    }))
  );

  const collections = getCollections();
  const collectionPages = collections.flatMap(col =>
    routing.locales.map(locale => ({
      url: `${baseUrl}/${locale}/collections/${col.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map(loc => [
            loc,
            `${baseUrl}/${loc}/collections/${col.id}`
          ])
        )
      }
    }))
  );

  const collaborations = getCollaborations();
  const collaborationPages = collaborations.flatMap(col =>
    routing.locales.map(locale => ({
      url: `${baseUrl}/${locale}/collections/collaborations/${col.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map(loc => [
            loc,
            `${baseUrl}/${loc}/collections/collaborations/${col.id}`
          ])
        )
      }
    }))
  );

  return [...staticPages, ...collectionPages, ...collaborationPages];
}
