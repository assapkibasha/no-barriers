import assert from 'node:assert/strict'

const base = process.argv[2] || 'http://localhost:3000'
const canonical = process.env.SITE_URL || 'https://nobarriers.co.rw'
const paths = ['/', '/sign-language', '/rwandan-sign-language', '/courses']
const titles = new Set()
for (const path of paths) {
  const response = await fetch(new URL(path, base))
  assert.equal(response.status, 200, `${path} must be public`)
  const html = await response.text()
  const title = html.match(/<title>(.*?)<\/title>/)?.[1]
  assert.ok(title?.includes('Sign Language') || title?.includes('sign language'), `${path}: descriptive title`)
  assert.ok(!titles.has(title), `${path}: unique title`)
  titles.add(title)
  const canonicalTag = html.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0]
  assert.ok(canonicalTag?.includes(new URL(path, canonical).href.replace(/\/$/, '')), `${path}: canonical origin/path`)
  assert.match(html, /<meta name="robots" content="index, follow"/)
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path}: one visible primary heading`)
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)]
  assert.ok(jsonLd.length > 0, `${path}: structured data`)
  jsonLd.forEach(match => JSON.parse(match[1]))
  console.log(`PASS ${path}: public HTML, metadata, canonical and JSON-LD`)
}
const sitemapResponse = await fetch(new URL('/sitemap.xml', base))
assert.equal(sitemapResponse.status, 200)
const sitemap = await sitemapResponse.text()
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])
assert.deepEqual(sitemapUrls.sort(), paths.map(path => new URL(path, canonical).href).sort())
const robots = await (await fetch(new URL('/robots.txt', base))).text()
assert.ok(robots.includes(`Sitemap: ${new URL('/sitemap.xml', canonical).href}`))
assert.ok(!robots.includes('Disallow: /\n'), 'Production robots must allow public crawling')
for (const path of ['/login', '/register']) {
  const response = await fetch(new URL(path, base))
  assert.equal(response.status, 200)
  assert.match(await response.text(), /<meta name="robots" content="noindex, follow"/)
}
const protectedResponse = await fetch(new URL('/learn', base), { redirect: 'manual' })
assert.equal(protectedResponse.status, 307)
assert.ok(protectedResponse.headers.get('location')?.includes('/login'))
const image = await fetch(new URL('/images/social-card.png', base))
assert.equal(image.status, 200)
assert.ok(image.headers.get('content-type')?.includes('image/png'))
const bytes = Buffer.from(await image.arrayBuffer())
assert.equal(bytes.subarray(1, 4).toString(), 'PNG')
assert.equal(bytes.readUInt32BE(16), 1200)
assert.equal(bytes.readUInt32BE(20), 630)
console.log('PASS sitemap, robots, account noindex, lesson protection and sharing image')
