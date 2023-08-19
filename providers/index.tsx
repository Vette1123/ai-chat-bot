import { Analytics } from '@vercel/analytics/react'

import { Toaster as NextToastProvider } from './sonner-provider'
import { ThemeProvider as NextThemeProvider } from './theme-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextToastProvider />
      <Analytics />
      {children}
    </NextThemeProvider>
  )
}
