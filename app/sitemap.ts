import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const stories = ['a-market-finding-its-balance', 'the-jobs-story-behind-the-valley-outlook', 'what-four-months-of-supply-changes']
  return [
    { url: 'https://simplyanthem.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...stories.map((slug) => ({ url: `https://simplyanthem.com/stories/${slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 })),
  ]
}
