'use client'

import React, { useState } from 'react'
import { useChat, type Message } from 'ai/react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { EmptyScreen } from '../empty-screen'
import ChatList from './chat-list'
import { ChatPanel } from './chat-panel'
import { ChatScrollAnchor } from './chat-scroll-anchor'

export interface ChatProps extends React.ComponentProps<'div'> {
  id?: string
  initialMessages?: Message[]
}

function Chat({ id, initialMessages, className, ...props }: ChatProps) {
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
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
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

export default Chat
