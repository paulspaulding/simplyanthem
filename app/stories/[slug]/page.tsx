import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

const articles: Record<string, { category: string; title: string; excerpt: string; author: string; date: string; read: string; image: string; body: string[] }> = {
  'august-2026-housing-market-update': {
    category: 'Real estate', title: 'August housing report: more inventory, slower closings', excerpt: 'The latest Las Vegas REALTORS report shows 4.2 months of single-family availability, a $475,000 median closing price, and a softer pace of sales across Southern Nevada.', author: 'Simply Anthem Desk', date: 'August 2026', read: '8 min read', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=85',
    body: ['The August 2026 Las Vegas REALTORS® Monthly Housing Market Update points to a Southern Nevada market with more available homes and a slower pace of closings. Single-family units sold totaled 1,803, down 1.7% from August 2025, while new listings reached 3,238, up 1.4% year over year.', 'The single-family median closing price was $475,000, down 1.0% from the prior year. Availability excluding offers stood at 7,590 units, up 5.3% year over year, producing 4.2 effective months of availability. That is up 7.2% from August 2025 and 15.7% from July.', 'The condo and townhouse segment shows a different price point and more supply: 449 units sold at a $299,900 median closing price, with 2,714 units available excluding offers and 6.0 effective months of availability. Condo and townhouse availability was up 14.5% year over year.', 'These figures describe MLS activity from Las Vegas REALTORS® and cover its reporting territory. They do not include every new home, for-sale-by-owner listing, or non-MLS property. Read the full August 2026 report for methodology and definitions.'],
  },
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
      <div className="article-body">{article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{slug === 'august-2026-housing-market-update' && <p><a className="text-link" href="/august-2026-housing-market-update.pdf" target="_blank" rel="noreferrer">Read the full Las Vegas REALTORS® report <ArrowUpRight aria-hidden="true" /></a></p>}</div>
      <Link className="article-return" href="/"><ArrowLeft aria-hidden="true" /> Return to all stories <ArrowUpRight aria-hidden="true" /></Link>
    </article>
  </main>
}

export function generateStaticParams() { return Object.keys(articles).map((slug) => ({ slug })) }
