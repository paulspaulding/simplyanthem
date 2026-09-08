import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

const articles: Record<string, { category: string; title: string; excerpt: string; author: string; date: string; read: string; image: string; body: string[] }> = {
  'a-market-finding-its-balance': {
    category: 'Southern Nevada',
    title: 'A market finding its balance',
    excerpt: 'What stable prices, more inventory, and a little negotiating room mean for Southern Nevada buyers and sellers.',
    author: 'Anthem Desk', date: 'Sep 08, 2026', read: '9 min read',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=85',
    body: ['Southern Nevada real estate is entering a more nuanced chapter. Prices remain elevated, but a larger supply of listings is giving buyers more room to compare, negotiate, and make decisions without the same urgency.', 'That does not make affordability simple. Mortgage rates, household income, and the cost of living continue to shape who can move and where. For sellers, preparation and pricing matter more than momentum alone.', 'The useful signal is balance: a market with opportunity on both sides, provided buyers and sellers read the conditions rather than the headlines.'],
  },
  'the-jobs-story-behind-the-valley-outlook': {
    category: 'Economy', title: 'The jobs story behind the valley outlook', excerpt: 'Southern Nevada keeps adding jobs, even as higher costs and slower wage growth reshape household decisions.', author: 'Anthem Desk', date: 'Sep 03, 2026', read: '6 min read', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=85', body: ['The Southern Nevada economy is broadening beyond its familiar strengths. Tourism remains a powerful engine, while logistics, construction, technology, and professional services add new layers to the regional story.', 'The tension is that growth does not always arrive evenly. Employers are still searching for skilled workers while households weigh higher costs against slower wage gains.', 'That gap is where the next chapter will be written: in training programs, new investment, and the neighborhoods that can support the people powering the region forward.'],
  },
  'what-four-months-of-supply-changes': {
    category: 'Real estate', title: 'What four months of supply changes', excerpt: 'Inventory is giving buyers more leverage across the Las Vegas Valley, without making affordability simple.', author: 'Anthem Desk', date: 'Aug 29, 2026', read: '7 min read', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85', body: ['Inventory is one of the clearest ways to understand the shift in Southern Nevada housing. More available homes can soften the pace of competition and create time for due diligence.', 'For buyers, that can mean stronger inspection conversations and more choice. For sellers, it means the details of a listing—condition, price, and presentation—carry more weight.', 'Four months of supply is not a collapse. It is a reminder that the market is moving toward a more deliberate rhythm.'],
  },
}

const fallback = { category: 'Simply Anthem', title: 'An editorial from Simply Anthem', excerpt: 'A story for the curious.', author: 'Anthem Desk', date: 'Sep 2026', read: '5 min read', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=85', body: ['This story is being prepared for the Simply Anthem journal.', 'Return to the blog for the latest stories, reporting, and Southern Nevada economic and real estate conditions.'] }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug] ?? fallback
  return { title: article.title, description: article.excerpt, alternates: { canonical: `/stories/${slug}` }, openGraph: { type: 'article', title: article.title, description: article.excerpt, url: `/stories/${slug}`, images: [{ url: article.image }] } }
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug] ?? fallback

  const articleSchema = { '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description: article.excerpt, image: [article.image], author: { '@type': 'Organization', name: article.author }, publisher: { '@type': 'Organization', name: 'Simply Anthem', url: 'https://simplyanthem.com' }, datePublished: article.date, mainEntityOfPage: `https://simplyanthem.com/stories/${slug}` }

  return <main className="story-page min-h-screen bg-background text-foreground"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <header className="story-header mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10"><Link className="wordmark" href="/">simply<span>anthem</span></Link><Link className="back-link" href="/"><ArrowLeft aria-hidden="true" /> Back to journal</Link></header>
    <article className="article-detail mx-auto max-w-7xl px-5 pb-24 lg:px-10">
      <div className="article-kicker"><span>{article.category}</span><span>{article.date}</span></div>
      <h1>{article.title}</h1><p className="article-dek">{article.excerpt}</p>
      <div className="article-byline"><span>By {article.author}</span><span>{article.read}</span></div>
      <img className="article-hero" src={article.image} alt="" />
      <div className="article-body">{article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      <Link className="article-return" href="/"><ArrowLeft aria-hidden="true" /> Return to all stories <ArrowUpRight aria-hidden="true" /></Link>
    </article>
  </main>
}

export function generateStaticParams() { return Object.keys(articles).map((slug) => ({ slug })) }
