import './globals.css'
import { Inter } from 'next/font/google'
import Toaster from '@/providers/sonner-provider'
import ThemeProvider from '@/providers/theme-provider'
import { Analytics } from '@vercel/analytics/react'

import type { Metadata } from 'next'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sadge Chat - Natural Conversational AI',
  description:
    'Have natural conversations with Sadge, an empathetic AI chatbot created by Anthropic. Ask Sadge anything!',

  // Keywords
  keywords: [
    'ai chatbot',
    'conversational ai',
    'anthropic',
    'natural language',
    'empathetic ai',
    'talk to ai',
    'ai assistant',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.chatgptegy.com/',
    title: 'Sadge Chat - Natural Conversational AI',
    description:
      'Have natural conversations with Sadge, an empathetic AI chatbot created by Anthropic. Ask Sadge anything!',
  },
  twitter: {
    // Twitter
    title: 'Sadge Chat - Natural Conversational AI',
    description:
      'Have natural conversations with Sadge, an empathetic AI chatbot created by Anthropic. Ask Sadge anything!',
    site: 'https://www.chatgptegy.com/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
