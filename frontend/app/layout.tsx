import type { Metadata } from 'next'
import '../src/index.css'
import { ProgressProvider } from '../src/store/progress-context'

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
    <html lang="en">
      <body>
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  )
}