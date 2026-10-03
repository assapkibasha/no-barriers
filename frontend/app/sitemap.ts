import type { MetadataRoute } from 'next'
import { absoluteUrl, indexingEnabled, publicPages } from '../src/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  // Only public, canonical information pages; authenticated lessons are omitted.
  // Do not publish a changing timestamp unless the page content actually changed.
  return indexingEnabled ? publicPages.map(({ path }) => ({ url: absoluteUrl(path) })) : []
}
