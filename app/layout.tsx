import './globals.css'
import { Inter } from 'next/font/google'
import Toaster from '@/providers/sonner-provider'
import ThemeProvider from '@/providers/theme-provider'

import type { Metadata } from 'next'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sadge Chat',
  description: 'Sadge AI Chatbot',
  keywords: ['sadge', 'chat', 'bot', 'ai', 'artificial', 'intelligence'],
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
      </body>
    </html>
  )
}