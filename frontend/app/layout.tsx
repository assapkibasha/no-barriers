import type { Metadata } from 'next'
import '../src/index.css'
import { ProgressProvider } from '../src/store/progress-context'
import { ThemeProvider } from '../src/components/theme-provider'
import { ErrorBoundary } from '../src/components/ErrorBoundary'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import { DM_Mono, DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'], display: 'swap', variable: '--font-dm-sans' })
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], display: 'swap', variable: '--font-dm-mono' })

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta')
  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: '/images/logo.png',
      shortcut: '/images/logo.png',
      apple: '/images/logo.png',
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${dmSans.variable} ${dmMono.variable} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ProgressProvider>
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </ProgressProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
