'use client'

import React from 'react'
import { Message, useChat } from 'ai/react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import ChatList from '@/components/chat/chat-list'
import { ChatPanel } from '@/components/chat/chat-panel'
import { ChatScrollAnchor } from '@/components/chat/chat-scroll-anchor'
import { EmptyScreen } from '@/components/empty-screen'

export interface ChatProps extends React.ComponentProps<'div'> {
  id?: string
  initialMessages?: Message[]
}

export function Chat({ id, initialMessages, className, ...props }: ChatProps) {
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id,
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      },
    })
  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)} {...props}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </>
  )
}
