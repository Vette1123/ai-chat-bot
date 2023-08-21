import * as React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { siteConfig } from '@/config/site'
import { authOptions } from '@/lib/auth-options'
import { Button, buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { Sidebar } from '@/components/sidebar/sidebar'
import { ClearHistory } from '@/components/sidebar/sidebar-clear-history'
import { SidebarFooter } from '@/components/sidebar/sidebar-footer'
import { SidebarList } from '@/components/sidebar/sidebar-list'
import { UserMenu } from '@/components/user-menu'
import { clearChats } from '@/app/actions'

import { ThemeToggle } from './theme-toggle'

export async function Header() {
  const session = await getServerSession(authOptions)
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        {session?.user ? (
          <Sidebar>
            <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
              <SidebarList userId={session?.user?.id} />
            </React.Suspense>
            <SidebarFooter>
              <ClearHistory clearChats={clearChats} />
            </SidebarFooter>
          </Sidebar>
        ) : (
          <Link href="/" target="_blank" rel="nofollow">
            <Icons.nextChat className="mr-2 h-6 w-6 dark:hidden" inverted />
            <Icons.nextChat className="mr-2 hidden h-6 w-6 dark:block" />
          </Link>
        )}
        <div className="flex items-center">
          <Icons.separator className="h-6 w-6 text-muted-foreground/50" />
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <Button variant="link" asChild className="-ml-2">
              <Link href="/login?callbackUrl=/">Login</Link>
            </Button>
          )}
        </div>
      </div>
      <div>
        <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
          <div
            className={buttonVariants({
              size: 'icon',
              variant: 'ghost',
            })}
          >
            <Icons.gitHub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </div>
        </Link>
        <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
          <div
            className={buttonVariants({
              size: 'icon',
              variant: 'ghost',
            })}
          >
            <Icons.twitter className="h-5 w-5 fill-current" />
            <span className="sr-only">Twitter</span>
          </div>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
