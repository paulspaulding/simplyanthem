'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Camera, Menu, Search, X } from 'lucide-react'

const categories = ['All stories', 'Southern Nevada', 'Real estate', 'Economy', 'Music', 'Culture', 'Conversations', 'Field notes']

// Keep the report metrics in one place so the editorial brief is easy to refresh.
const reportData = {
  lastUpdated: 'August 2026 housing report',
  metrics: [
    { value: '953%', label: 'Projected data center capacity growth by 2030' },
    { value: '40.8M', label: 'Annual Clark County visitors' },
    { value: '$479K', label: 'Southern Nevada trailing 12-month median sale price' },
    { value: '#1', label: 'Las Vegas MSA ranking for business expansion' },
  ],
  population: [
    ['20.5%', 'Move for family'],
    ['39.1%', 'Incoming residents age 65+'],
    ['19.9%', 'Relocate for jobs'],
  ],
  trades: [
    ['Electricians', '9.5%', 'Data center, residential, and commercial buildout'],
    ['HVAC technicians', '8.1%', 'New construction and aging housing stock'],
    ['Plumbers', '4.5%', 'Residential expansion and hospitality upgrades'],
    ['Carpenters', '4.5%', 'Residential and commercial construction'],
  ],
  housing: [
    ['$475K', 'Single-family median closing price; down 1.0% year over year'],
    ['1,803', 'Single-family units sold in August; down 1.7% year over year'],
    ['4.2 months', 'Single-family effective availability; up 7.2% year over year'],
    ['6.0 months', 'Condo/townhouse effective availability; up 14.5% year over year'],
  ],
  signals: [
    ['71%', 'U.S. employers struggling to find skilled talent'],
    ['$110K', 'Actual Southern Nevada household income'],
    ['$125,323', 'Income needed to live comfortably'],
    ['5.2%', 'Unemployment rate cited in the report'],
  ],
}

const stories = [
  {
    category: 'Music',
    title: 'The beautiful mess of making something from nothing',
    excerpt: 'Inside the rooms, rituals, and restless ideas shaping the next wave of independent sound.',
    author: 'Maya Chen',
    date: 'Sep 04, 2024',
    read: '7 min read',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=85',
    slug: 'the-beautiful-mess-of-making-something-from-nothing',
    featured: true,
  },
  {
    category: 'Real estate',
    title: 'August 2026 Las Vegas Housing Market Update: Charts, Trends & What It Means For You',
    excerpt: 'Market conditions continue to favor informed buyers and sellers in Southern Nevada. Here is what August 2026 data says about prices, inventory, buyer leverage, and the path ahead.',
    author: 'The Spaulding Team',
    date: 'September 2026',
    read: '8–10 min read',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=85',
    slug: 'august-2026-housing-market-update',
  },
  {
    category: 'Southern Nevada',
    title: 'A market finding its balance',
    excerpt: 'What stable prices, more inventory, and a little negotiating room mean for Southern Nevada buyers and sellers.',
    author: 'Anthem Desk',
    date: 'Sep 08, 2026',
    read: '9 min read',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=85',
    slug: 'a-market-finding-its-balance',
  },
  {
    category: 'Economy',
    title: 'The jobs story behind the valley outlook',
    excerpt: 'Southern Nevada keeps adding jobs, even as higher costs and slower wage growth reshape household decisions.',
    author: 'Anthem Desk',
    date: 'Sep 03, 2026',
    read: '6 min read',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85',
    slug: 'the-jobs-story-behind-the-valley-outlook',
  },
  {
    category: 'Real estate',
    title: 'What four months of supply changes',
    excerpt: 'Inventory is giving buyers more leverage across the Las Vegas Valley, without making affordability simple.',
    author: 'Anthem Desk',
    date: 'Aug 29, 2026',
    read: '7 min read',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85',
    slug: 'what-four-months-of-supply-changes',
  },
  {
    category: 'Conversations',
    title: 'A quiet revolution, in her own words',
    excerpt: 'A conversation with Laila Hart about staying curious when everyone wants a formula.',
    author: 'Jon Bell',
    date: 'Aug 28, 2024',
    read: '12 min read',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=85',
  },
  {
    category: 'Culture',
    title: 'Why we keep coming back to the record store',
    excerpt: 'On collecting, community, and the small joy of finding the exact right thing.',
    author: 'Eli Moreno',
    date: 'Aug 21, 2024',
    read: '5 min read',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=900&q=85',
  },
  {
    category: 'Field notes',
    title: 'A field guide to listening closely',
    excerpt: 'Five places where the city sounds most like itself, from first light to last call.',
    author: 'Rina Okafor',
    date: 'Aug 15, 2024',
    read: '4 min read',
    image: 'https://images.unsplash.com/photo-1519671282429-b44660ead0a7?auto=format&fit=crop&w=900&q=85',
  },
  {
    category: 'Music',
    title: 'The long way around to a first album',
    excerpt: 'Some records take years to arrive. That may be the point.',
    author: 'Maya Chen',
    date: 'Aug 08, 2024',
    read: '8 min read',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=85',
  },
  {
    category: 'Culture',
    title: 'Objects with a life of their own',
    excerpt: 'A studio visit with the makers giving familiar materials a stranger future.',
    author: 'Jon Bell',
    date: 'Jul 30, 2024',
    read: '6 min read',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85',
  },
]

export default function Page() {
  const [activeCategory, setActiveCategory] = useState('All stories')
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const faq = [
    ['What does Simply Anthem cover?', 'Simply Anthem covers Southern Nevada economic conditions, Las Vegas Valley real estate, housing affordability, jobs, population, investment, and culture.'],
    ['What is the current Southern Nevada housing outlook?', 'The report snapshot describes a more balanced market with elevated prices, roughly four months of resale inventory, and more room for buyers to compare and negotiate.'],
    ['How often is the Southern Nevada report updated?', 'The editorial data brief is designed to be refreshed frequently as new economic and real estate indicators become available.'],
  ]

  const filteredStories = useMemo(
    () => activeCategory === 'All stories' ? stories : stories.filter((story) => story.category === activeCategory),
    [activeCategory],
  )

  function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="announcement">Stories for the curious <span>•</span> New essays every week</div>
      <header className="site-header">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
          <button className="menu-button lg:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
          <a className="wordmark" href="#top" aria-label="Simply Anthem home">simply<span>anthem</span></a>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            <a href="#stories" onClick={() => setMenuOpen(false)}>Stories</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#newsletter" onClick={() => setMenuOpen(false)}>Newsletter</a>
          </nav>
          <button className="search-button" aria-label="Search stories"><Search aria-hidden="true" /></button>
        </div>
      </header>

      <section id="top" className="hero mx-auto max-w-7xl px-5 pb-16 pt-16 lg:px-10 lg:pb-24 lg:pt-24">
        <div className="hero-copy">
          <p className="eyebrow">The Simply Anthem Journal</p>
          <h1>For the ones<br /><em>making</em> noise.</h1>
          <p className="hero-intro">A journal about music, culture, and the people shaping Southern Nevada&apos;s economy, neighborhoods, and everyday life.</p>
        </div>
        <div className="hero-mark" aria-hidden="true"><span>SA</span><small>Vol. 01<br />Est. 2024</small></div>
      </section>

      <section id="stories" className="mx-auto max-w-7xl px-5 pb-24 lg:px-10">
        <div className="market-brief" aria-labelledby="market-brief-title">
          <div><p className="eyebrow">Southern Nevada brief · September 2026</p><h2 id="market-brief-title">A steadier market,<br /><em>still under pressure.</em></h2></div>
          <div className="market-brief-copy"><p>Home prices remain near record highs while a four-month supply of listings is giving buyers more room to negotiate. The region continues to add jobs, but 5.4% unemployment, slower wage growth, inflation, and mortgage rates near 6.7% are keeping affordability in focus.</p><p className="source-note">A Simply Anthem editorial snapshot of current economic and real estate conditions.</p></div>
        </div>

        <section className="report-dashboard" aria-labelledby="report-dashboard-title">
          <div className="report-heading"><div><p className="eyebrow">Nevada 2026 economic playbook</p><h2 id="report-dashboard-title">The numbers<br /><em>behind the noise.</em></h2></div><p>Based on the latest Simply Anthem report: 100+ signals across population, jobs, housing, visitors, and investment. This brief is designed to be refreshed as new data arrives.</p></div>
          <div className="report-actions"><div><strong>August 2026 Housing Market Report</strong><span>Las Vegas REALTORS® · Southern Nevada</span></div><div className="report-action-links"><Link className="text-link" href="/stories/august-2026-housing-market-update">Read the analysis <ArrowUpRight aria-hidden="true" /></Link><a className="text-link" href="/august-2026-housing-market-update.pdf" target="_blank" rel="noreferrer">Open full PDF <ArrowUpRight aria-hidden="true" /></a></div></div>
          <div className="report-metrics">{reportData.metrics.map((metric) => <div className="report-metric" key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>
          <div className="report-columns">
            <div><p className="eyebrow">Population pull</p><div className="report-list">{reportData.population.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div>
            <div><p className="eyebrow">Skilled trades outlook</p><div className="report-table">{reportData.trades.map(([trade, growth, implication]) => <div className="report-table-row" key={trade}><strong>{trade}</strong><span>{growth}</span><small>{implication}</small></div>)}</div></div>
          </div>
          <div className="report-housing"><div><p className="eyebrow">Southern Nevada housing snapshot</p><p className="report-note">Prices remain elevated while inventory and rate movement are creating a more nuanced market for buyers, sellers, and investors.</p></div><div className="housing-grid">{reportData.housing.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div>
          <div className="report-signals"><p className="eyebrow">Pressure points to watch</p><div className="housing-grid">{reportData.signals.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div>
          <p className="source-note report-source">Source: Las Vegas REALTORS® August 2026 Monthly Housing Market Update · Last updated {reportData.lastUpdated} · <a href="/august-2026-housing-market-update.pdf" target="_blank" rel="noreferrer">View the full report</a> · Refresh the reportData object in this file when new metrics are available.</p>
        </section>

        <article className="featured-story">
          <div className="featured-image-wrap"><img src={stories[0].image} alt="Musician performing under warm stage lights" className="featured-image" /></div>
          <div className="featured-content">
            <div className="story-meta"><span>{stories[0].category}</span><span>{stories[0].date}</span></div>
            <h2>{stories[0].title}</h2>
            <p>{stories[0].excerpt}</p>
            <Link className="text-link" href={`/stories/${stories[0].slug}`}>Read story <ArrowUpRight aria-hidden="true" /></Link>
          </div>
        </article>

        <div className="stories-heading"><p className="eyebrow">The latest</p><div className="category-list" role="tablist" aria-label="Filter stories">
          {categories.map((category) => <button key={category} role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}
        </div></div>

        <div className="story-grid">
          {filteredStories.slice(1).map((story) => <article className="story-card" key={story.title}>
            <Link href={`/stories/${story.slug ?? story.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="story-image-wrap"><img src={story.image} alt="" className="story-image" /></Link>
            <div className="story-meta"><span>{story.category}</span><span>{story.date}</span></div>
            <h3><Link href={`/stories/${story.slug ?? story.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{story.title}</Link></h3>
            <p>{story.excerpt}</p>
            <div className="story-footer"><span>{story.author}</span><span>{story.read}</span></div>
          </article>)}
        </div>
      </section>

      <section className="faq-section mx-auto max-w-7xl px-5 lg:px-10" aria-labelledby="faq-title"><div className="faq-heading"><p className="eyebrow">Quick answers</p><h2 id="faq-title">Southern Nevada,<br /><em>in plain language.</em></h2></div><div className="faq-list">{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

      <section id="newsletter" className="newsletter mx-auto max-w-7xl px-5 lg:px-10"><div className="newsletter-inner">
        <div><p className="eyebrow">The Sunday signal</p><h2>A little something<br /><em>worth opening.</em></h2></div>
        <div className="newsletter-form-wrap">{mounted && (subscribed ? <p className="success-message">You&apos;re on the list. See you Sunday.</p> : <form onSubmit={handleSubscribe}><label htmlFor="email">A weekly note for your inbox.</label><div className="form-row"><input id="email" name="newsletter-email" type="email" autoComplete="off" data-lpignore="true" data-1p-ignore="true" required placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} /><button type="submit">Sign me up <ArrowUpRight aria-hidden="true" /></button></div></form>)}</div>
      </div></section>

      <footer id="about" className="site-footer mx-auto max-w-7xl px-5 py-8 lg:px-10"><a className="wordmark" href="#top">simply<span>anthem</span></a><p>Independent stories for a louder, kinder world.</p><a className="instagram-link" href="#instagram"><Camera aria-hidden="true" /> Instagram</a><small>© 2024 Simply Anthem</small></footer>
    </main>
  )
}
