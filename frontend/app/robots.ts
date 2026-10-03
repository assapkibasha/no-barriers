import type { MetadataRoute } from 'next'
import { absoluteUrl, indexingEnabled, siteUrl } from '../src/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    // Allow crawling pages carrying noindex; blocking them would hide that directive.
    rules: indexingEnabled
      ? { userAgent: '*', allow: '/', disallow: ['/api/'] }
      : { userAgent: '*', disallow: '/' },
    ...(indexingEnabled ? { sitemap: absoluteUrl('/sitemap.xml'), host: siteUrl } : {}),
  }
}
