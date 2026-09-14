import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl = 'https://simplyanthem.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Simply Anthem | Southern Nevada Economy & Real Estate',
    template: '%s | Simply Anthem',
  },
  description: 'Independent reporting and practical analysis on Southern Nevada economic conditions, Las Vegas Valley real estate, housing, jobs, and culture.',
  applicationName: 'Simply Anthem',
  alternates: { canonical: '/' },
  keywords: ['Southern Nevada economy', 'Las Vegas real estate', 'Nevada housing market', 'Las Vegas economy', 'Clark County housing'],
  authors: [{ name: 'Simply Anthem' }],
  creator: 'Simply Anthem',
  publisher: 'Simply Anthem',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Simply Anthem',
    title: 'Simply Anthem | Southern Nevada Economy & Real Estate',
    description: 'Reporting and analysis on Southern Nevada economic conditions, housing, jobs, real estate, and culture.',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title: 'Simply Anthem | Southern Nevada Economy & Real Estate', description: 'Reporting and analysis on Southern Nevada economic conditions, housing, jobs, real estate, and culture.' },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f4f3ef',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Simply Anthem', url: siteUrl, description: 'Independent reporting and practical analysis on Southern Nevada economic conditions, Las Vegas Valley real estate, housing, jobs, and culture.', publisher: { '@type': 'Organization', name: 'Simply Anthem', url: siteUrl } }) }} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
