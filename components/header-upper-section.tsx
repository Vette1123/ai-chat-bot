import React from 'react'
import Link from 'next/link'
import { auth } from '@/auth'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { Sidebar } from '@/components/sidebar/sidebar'
import { ClearHistory } from '@/components/sidebar/sidebar-clear-history'
import { SidebarFooter } from '@/components/sidebar/sidebar-footer'
import { SidebarList } from '@/components/sidebar/sidebar-list'
import { UserMenu } from '@/components/user-menu'
import { clearChats } from '@/app/actions'

export const HeaderUpperSection = async () => {
  const session = await auth()

  return (
    <section className="flex items-center">
      {session?.user ? (
        <Sidebar>
          <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
            <SidebarList userId={session?.user?.id} />
          </React.Suspense>
          <SidebarFooter>
            <Button variant="link">
              <Link
                target="_blank"
                rel="noreferrer"
                href="https://www.mohamedgado.info"
              >
                Portfolio
              </Link>
            </Button>
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
    </section>
  )
}
