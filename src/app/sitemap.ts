import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vitalpredict.ai';
  
  // Define the main routes of the site
  const routes = [
    '',
    '/how-it-works',
    '/privacy-policy',
    '/terms',
    '/thank-you'
  ];

  return [
    ...routes.map(route => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
  ];
}
