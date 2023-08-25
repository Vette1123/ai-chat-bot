import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Providers } from '@/providers'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  appleWebApp: {
    title: siteConfig.name,
  },
  description: siteConfig.description,
  creator: siteConfig.links.github,
  openGraph: {
    locale: siteConfig.openGraph.locale,
    siteName: siteConfig.name,
    url: siteConfig.links.github,
    type: 'website',
    title: siteConfig.name,
    description: siteConfig.description,
    ttl: 604800,
    emails: siteConfig.email,
  },
  twitter: {
    card: 'summary_large_image',
    creator: siteConfig.twitterTag,
    site: siteConfig.twitterTag,
    images: [
      {
        url: siteConfig.image,
        alt: siteConfig.name,
      },
    ],
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-96x96.png',
    apple: '/apple-touch-icon.png',
    hash: '/safari-pinned-tab.svg',
    hostname: '/browserconfig.xml',
    username: '/manifest.json',
  },
  publisher: siteConfig.links.github,
  applicationName: siteConfig.name,
  colorScheme: 'light dark',
  keywords: siteConfig.keywords,
  appLinks: {
    web: [
      {
        url: siteConfig.links.websiteUrl,
      },
    ],
  },
  metadataBase: new URL('https://www.chatgptegy.com'),
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn('bg-background font-sans antialiased', fontSans.variable)}
      >
        <div
          style={{
            position: 'fixed',
            zIndex: 9999,
            top: 16,
            left: 16,
            right: 16,
            bottom: 16,
            pointerEvents: 'none',
          }}
        />
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 flex-col bg-muted/30">
              <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
                <div className="group w-full overflow-auto pl-0 duration-300 animate-in">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
