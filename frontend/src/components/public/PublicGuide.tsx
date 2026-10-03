import Link from 'next/link'
import type { ReactNode } from 'react'
import { absoluteUrl, publicPages, serializeJsonLd } from '../../lib/seo'

export default function PublicGuide({ title, intro, path, children }: { title: string; intro: string; path: string; children: ReactNode }) {
  return <div className="public-guide" lang="en">
    <a className="guide-skip" href="#guide-content">Skip to content</a>
    <header className="guide-header">
      <Link className="brand-lockup" href="/">
        <span className="brand-badge"><img className="brand-mark" src="/images/logo.png" alt="" /></span>NoBarriers
      </Link>
      <nav aria-label="Learning resources">{publicPages.filter(page => page.path !== '/').map(page =>
        <Link key={page.path} href={page.path} aria-current={path === page.path ? 'page' : undefined}>{page.name}</Link>,
      )}</nav>
    </header>
    <main id="guide-content" className="guide-content">
      <p className="guide-eyebrow">Sign language learning / Rwanda</p>
      <h1>{title}</h1>
      <p className="guide-intro">{intro}</p>
      <aside className="guide-launch-note">NoBarriers is preparing a new learning experience. These guides and course outlines are available while we rebuild.</aside>
      <div className="guide-body">{children}</div>
    </main>
    <footer className="guide-footer"><p>NoBarriers · Learning Rwandan Sign Language</p><Link href="/">See the launch countdown</Link></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'NoBarriers', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: title, item: absoluteUrl(path) },
      ],
    }) }} />
  </div>
}
