import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vitalpredict.dev';
  
  // Define the main routes of the site
  const routes = [
    '',
    '/features',
    '/how-it-works',
    '/how-it-works/guide',
    '/testimonials',
    '/faqs',
    '/early-access',
    '/privacy',
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
