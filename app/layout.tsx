import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Fraunces } from 'next/font/google'
import { AppShell } from '@/components/shell/app-shell'
import { ToastProvider } from '@/components/ui/toast'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'SeekhSetu — Small steps can open new paths',
    template: '%s · SeekhSetu',
  },
  description:
    'SeekhSetu helps students from Class 9 onwards discover interests, explore education and career options, practise skills, complete small projects and find learning opportunities.',
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
  generator: 'SeekhSetu',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFF9F0',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="antialiased">
        <ToastProvider>
          <AppShell>{children}</AppShell>
        </ToastProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
