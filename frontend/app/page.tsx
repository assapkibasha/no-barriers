import PublicWebsite from './PublicWebsite'
import { absoluteUrl, organization, publicMetadata, serializeJsonLd } from '../src/lib/seo'

export const metadata = publicMetadata(
  'Learn Rwandan Sign Language',
  'Learn Rwandan Sign Language with No Barriers. Explore video lessons, practice, and a clear learning path to more inclusive communication.',
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
    <PublicWebsite />
  </>
}
