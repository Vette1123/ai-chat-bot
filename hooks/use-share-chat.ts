import React from 'react'
import { toast } from 'sonner'

import { Chat } from '@/types/chat'

export const useCopyShareLink = (
  setShareDialogOpen: (open: boolean) => void
) => {
  const copyShareLink = React.useCallback(async (chat: Chat) => {
    if (!chat.sharePath) {
      return toast.error('Could not copy share link to clipboard')
    }

    const url = new URL(window.location.href)
    url.pathname = chat.sharePath
    navigator.clipboard.writeText(url.toString())
    setShareDialogOpen(false)
    toast.success('Share link copied to clipboard', {
      style: {
        background: '#333',
        color: '#fff',
        borderRadius: '8px',
        borderColor: '#333',
      },
    })
  }, [])

  return { copyShareLink }
}
