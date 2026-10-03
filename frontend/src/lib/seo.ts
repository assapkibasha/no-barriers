import type { Metadata } from 'next'

// One canonical origin for metadata, structured data and the sitemap.
const configuredUrl = new URL(process.env.SITE_URL || 'https://nobarriers.co.rw')
export const siteUrl = configuredUrl.origin
export const indexingEnabled = process.env.VERCEL_ENV !== 'preview'
export const siteDescription = 'NoBarriers is a platform for learning Rwandan Sign Language, with lessons covering greetings, the alphabet, numbers and everyday communication.'

export const publicPages = [
  { path: '/', name: 'NoBarriers' },
  { path: '/sign-language', name: 'Learn sign language' },
  { path: '/rwandan-sign-language', name: 'Rwandan Sign Language' },
  { path: '/courses', name: 'Sign language courses' },
] as const

export function absoluteUrl(path: string) {
  return new URL(path, `${siteUrl}/`).toString()
}

export function publicMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: { absolute: `${title} | NoBarriers` },
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: { index: indexingEnabled, follow: true },
    openGraph: {
      type: 'website', siteName: 'NoBarriers', locale: 'en_US',
      title, description, url: absoluteUrl(path),
      images: [{ url: absoluteUrl('/images/social-card.png'), width: 1200, height: 630, alt: 'NoBarriers — Learn Rwandan Sign Language' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [absoluteUrl('/images/social-card.png')] },
  }
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

export const organization = {
  '@type': 'Organization', '@id': absoluteUrl('/#organization'),
  name: 'NoBarriers', url: siteUrl,
  logo: absoluteUrl('/images/logo.png'), description: siteDescription,
}
