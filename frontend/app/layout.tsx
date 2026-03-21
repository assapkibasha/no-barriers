import type { Metadata } from 'next'
import '../src/index.css'
import { ProgressProvider } from '../src/store/progress-context'

import { ThemeProvider } from '../src/components/theme-provider'

export const metadata: Metadata = {
  title: 'NoBarriers',
  description: 'NoBarriers language learning platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ProgressProvider>
            <div id="app-wrapper">
              {children}
            </div>
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}