import React from 'react'
import { Message } from 'ai'

import { cn } from '@/lib/utils'
import { ChatMessageActions } from '@/components/chat/chat-message-actions'
import { Icons } from '@/components/icons'
import MemorizedMarkDown from '@/components/markdown/memorized-mark-down'

export interface ChatMessageProps {
  message: Message
}

function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div className="group relative mb-4 flex items-start md:-ml-12" {...props}>
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          message.role === 'user'
            ? 'bg-background'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {message.role === 'user' ? <Icons.user /> : <Icons.openAI />}
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <MemorizedMarkDown message={message} />
        <ChatMessageActions message={message} />
      </div>
    </div>
  )
}

export default ChatMessage
