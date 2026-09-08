'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, Camera, Menu, Search, X } from 'lucide-react'

const categories = ['All stories', 'Music', 'Culture', 'Conversations', 'Field notes']

const stories = [
  {
    category: 'Music',
    title: 'The beautiful mess of making something from nothing',
    excerpt: 'Inside the rooms, rituals, and restless ideas shaping the next wave of independent sound.',
    author: 'Maya Chen',
    date: 'Sep 04, 2024',
    read: '7 min read',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=85',
    featured: true,
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

  const filteredStories = useMemo(
    () => activeCategory === 'All stories' ? stories : stories.filter((story) => story.category === activeCategory),
    [activeCategory],
  )

  function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
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
          <p className="hero-intro">A journal about music, culture, and the people making the world feel a little more alive.</p>
        </div>
        <div className="hero-mark" aria-hidden="true"><span>SA</span><small>Vol. 01<br />Est. 2024</small></div>
      </section>

      <section id="stories" className="mx-auto max-w-7xl px-5 pb-24 lg:px-10">
        <article className="featured-story">
          <div className="featured-image-wrap"><img src={stories[0].image} alt="Musician performing under warm stage lights" className="featured-image" /></div>
          <div className="featured-content">
            <div className="story-meta"><span>{stories[0].category}</span><span>{stories[0].date}</span></div>
            <h2>{stories[0].title}</h2>
            <p>{stories[0].excerpt}</p>
            <a className="text-link" href="#read">Read story <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </article>

        <div className="stories-heading"><p className="eyebrow">The latest</p><div className="category-list" role="tablist" aria-label="Filter stories">
          {categories.map((category) => <button key={category} role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}
        </div></div>

        <div className="story-grid">
          {filteredStories.slice(1).map((story) => <article className="story-card" key={story.title}>
            <a href="#read" className="story-image-wrap"><img src={story.image} alt="" className="story-image" /></a>
            <div className="story-meta"><span>{story.category}</span><span>{story.date}</span></div>
            <h3><a href="#read">{story.title}</a></h3>
            <p>{story.excerpt}</p>
            <div className="story-footer"><span>{story.author}</span><span>{story.read}</span></div>
          </article>)}
        </div>
      </section>

      <section id="newsletter" className="newsletter mx-auto max-w-7xl px-5 lg:px-10"><div className="newsletter-inner">
        <div><p className="eyebrow">The Sunday signal</p><h2>A little something<br /><em>worth opening.</em></h2></div>
        <div className="newsletter-form-wrap">{subscribed ? <p className="success-message">You&apos;re on the list. See you Sunday.</p> : <form onSubmit={handleSubscribe}><label htmlFor="email">A weekly note for your inbox.</label><div className="form-row"><input id="email" type="email" required placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} /><button type="submit">Sign me up <ArrowUpRight aria-hidden="true" /></button></div></form>}</div>
      </div></section>

      <footer id="about" className="site-footer mx-auto max-w-7xl px-5 py-8 lg:px-10"><a className="wordmark" href="#top">simply<span>anthem</span></a><p>Independent stories for a louder, kinder world.</p><a className="instagram-link" href="#instagram"><Camera aria-hidden="true" /> Instagram</a><small>© 2024 Simply Anthem</small></footer>
    </main>
  )
}
