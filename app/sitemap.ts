import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const stories = ['august-2026-housing-market-update', 'a-market-finding-its-balance', 'the-jobs-story-behind-the-valley-outlook', 'what-four-months-of-supply-changes']
  const lastModified = new Date('2026-09-14T00:00:00.000Z')
  return [
    { url: 'https://simplyanthem.com', lastModified, changeFrequency: 'weekly', priority: 1 },
    ...stories.map((slug) => ({ url: `https://simplyanthem.com/stories/${slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 })),
  ]
}
