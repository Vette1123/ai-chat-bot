import { Analytics } from '@vercel/analytics/react'

import { TooltipProvider } from '@/components/ui/tooltip'

import { Toaster as NextToastProvider } from './sonner-provider'
import { ThemeProvider as NextThemeProvider } from './theme-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextToastProvider />
      <Analytics />
      <TooltipProvider>{children}</TooltipProvider>
    </NextThemeProvider>
  )
}
