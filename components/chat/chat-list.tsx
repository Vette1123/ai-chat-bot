import React from 'react'
import { Message } from 'ai'

import { Separator } from '@/components/ui/separator'
import ChatMessage from '@/components/chat/chat-message'

export interface ChatList {
  messages: Message[]
}

function ChatList({ messages }: ChatList) {
  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} />
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
    </div>
  )
}

export default ChatList
