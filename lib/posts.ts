import fs from 'node:fs'
import path from 'node:path'

// Reads markdown files from the /posts folder at build time.
// Each file starts with a front matter block like:
// ---
// title: "My Post"
// excerpt: "One-line summary"
// date: "2026-10-22"
// category: "Real estate"
// author: "The Spaulding Team"
// ---

export type PostBlock =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }

export type Post = {
  slug: string
  title: string
  excerpt: string
  author: string
  category: string
  sortDate: string // ISO date, used for ordering
  date: string // display date, e.g. "Oct 22, 2026"
  read: string
  image: string
  body: PostBlock[]
}

const POSTS_DIR = path.join(process.cwd(), 'posts')
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=85'

function stripQuotes(value: string) {
  return value.trim().replace(/^["']|["']$/g, '')
}

function stripInlineMarkdown(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\[(.+?)\]\((.+?)\)/g, '$1')
    .trim()
}

function parseBody(markdown: string): PostBlock[] {
  const blocks: PostBlock[] = []
  const chunks = markdown.split(/\n\s*\n/)

  for (const chunk of chunks) {
    const lines = chunk.split('\n').map((line) => line.trim()).filter(Boolean)
    if (lines.length === 0) continue

    // The first "# Title" line repeats the post title, so skip it.
    if (lines.length === 1 && lines[0].startsWith('# ')) continue

    if (lines.every((line) => line.startsWith('- '))) {
      blocks.push({ type: 'ul', items: lines.map((line) => stripInlineMarkdown(line.slice(2))) })
      continue
    }

    if (lines.length === 1 && lines[0].startsWith('## ')) {
      blocks.push({ type: 'h2', text: stripInlineMarkdown(lines[0].slice(3)) })
      continue
    }

    if (lines.length === 1 && lines[0] === '---') continue

    blocks.push({ type: 'p', text: stripInlineMarkdown(lines.join(' ')) })
  }

  return blocks
}

function formatDisplayDate(isoDate: string) {
  const parsed = new Date(`${isoDate}T12:00:00Z`)
  if (Number.isNaN(parsed.getTime())) return isoDate
  return parsed.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', timeZone: 'UTC' })
}

function estimateRead(blocks: PostBlock[]) {
  const words = blocks
    .map((block) => (block.type === 'ul' ? block.items.join(' ') : block.text))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 220))
  return `${minutes} min read`
}

function parsePost(slug: string, raw: string): Post {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  const frontMatter: Record<string, string> = {}
  let markdown = raw

  if (match) {
    for (const line of match[1].split('\n')) {
      const index = line.indexOf(':')
      if (index === -1) continue
      frontMatter[line.slice(0, index).trim()] = stripQuotes(line.slice(index + 1))
    }
    markdown = match[2]
  }

  const body = parseBody(markdown)
  const sortDate = frontMatter.date || '1970-01-01'

  return {
    slug,
    title: frontMatter.title || slug,
    excerpt: frontMatter.excerpt || '',
    author: frontMatter.author || 'Simply Anthem',
    category: frontMatter.category || 'Real estate',
    sortDate,
    date: formatDisplayDate(sortDate),
    read: estimateRead(body),
    image: frontMatter.image || DEFAULT_IMAGE,
    body,
  }
}

export function getPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      return parsePost(slug, fs.readFileSync(path.join(POSTS_DIR, file), 'utf8'))
    })
    .sort((a, b) => Date.parse(b.sortDate) - Date.parse(a.sortDate))
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug)
}
