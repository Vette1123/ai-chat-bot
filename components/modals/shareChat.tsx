import React from 'react'
import Link from 'next/link'
import { toast } from 'sonner'

import { Chat } from '@/types/chat'
import { cn, formatDate } from '@/lib/utils'
import { useCopyShareLink } from '@/hooks/use-share-chat'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { shareChat } from '@/app/actions'

import { Icons } from '../icons'
import { badgeVariants } from '../ui/badge'
import { Button } from '../ui/button'

interface ShareChatModalProps {
  chat: Chat
  shareDialogOpen: boolean
  setShareDialogOpen: (open: boolean) => void
}

function ShareChatModal({
  chat,
  shareDialogOpen,
  setShareDialogOpen,
}: ShareChatModalProps) {
  const [isSharePending, startShareTransition] = React.useTransition()
  const { copyShareLink } = useCopyShareLink(setShareDialogOpen)

  return (
    <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share link to chat</DialogTitle>
          <DialogDescription>
            Anyone with the URL will be able to view the shared chat.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1 rounded-md border p-4 text-sm">
          <div className="font-medium">{chat.title}</div>
          <div className="text-muted-foreground">
            {formatDate(chat.createdAt)} · {chat.messages.length} messages
          </div>
        </div>
        <DialogFooter className="items-center">
          {chat.sharePath && (
            <Link
              href={chat.sharePath}
              className={cn(badgeVariants({ variant: 'secondary' }), 'mr-auto')}
              target="_blank"
            >
              <Icons.user className="mr-2" />
              {chat.sharePath}
            </Link>
          )}
          <Button
            disabled={isSharePending}
            onClick={() => {
              startShareTransition(async () => {
                if (chat.sharePath) {
                  await new Promise((resolve) => setTimeout(resolve, 500))
                  copyShareLink(chat)
                  return
                }

                const result = await shareChat(chat)

                if (result && 'error' in result) {
                  toast.error(result.error)
                  return
                }

                copyShareLink(result)
              })
            }}
          >
            {isSharePending ? (
              <>
                <Icons.spinner className="mr-2 animate-spin" />
                Copying...
              </>
            ) : (
              <>Copy link</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ShareChatModal
