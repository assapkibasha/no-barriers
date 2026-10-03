import App from '../src/App'
import { absoluteUrl, organization, publicMetadata, serializeJsonLd } from '../src/lib/seo'

export const metadata = publicMetadata(
  'Learn Rwandan Sign Language',
  'Learn Rwandan Sign Language with NoBarriers. Explore our learning approach and course topics while we prepare our new sign language learning experience.',
  '/',
)

export default function Page() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({
      '@context': 'https://schema.org', '@graph': [organization, {
        '@type': 'WebSite', '@id': absoluteUrl('/#website'), name: 'NoBarriers',
        url: absoluteUrl('/'), inLanguage: 'en', publisher: { '@id': organization['@id'] },
      }],
    }) }} />
    <App />
  </>
}
