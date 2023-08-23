'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Message, useChat } from 'ai/react'

import { cn } from '@/lib/utils'
import ChatList from '@/components/chat/chat-list'
import { ChatPanel } from '@/components/chat/chat-panel'
import { ChatScrollAnchor } from '@/components/chat/chat-scroll-anchor'
import { EmptyScreen } from '@/components/empty-screen'

import { useAlertModal } from '../modals/not-logged-in-modal'

export interface ChatProps extends React.ComponentProps<'div'> {
  id?: string
  initialMessages?: Message[]
}

export function Chat({ id, initialMessages, className, ...props }: ChatProps) {
  const { AlertModal, setOpen } = useAlertModal()
  const isHomePage = usePathname() === '/'
  const router = useRouter()
  const { messages, append, reload, stop, isLoading, input, setInput, error } =
    useChat({
      initialMessages,
      id,
      body: {
        id,
      },
      onResponse(response) {
        if (response.status === 401) {
          setOpen(true)
        }
      },
      onFinish(message) {
        console.log('onFinish', message)
        if (isHomePage && !error) {
          router.refresh()
          router.push(`/chat/${id}`)
        }
      },
    })
  return (
    <>
      <div className={cn('pb-[250px] pt-4 md:pt-10', className)} {...props}>
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
      <AlertModal />
    </>
  )
}
