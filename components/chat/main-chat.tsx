'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Message, useChat } from 'ai/react'

import { cn } from '@/lib/utils'
import ChatList from '@/components/chat/chat-list'
import { ChatPanel } from '@/components/chat/chat-panel'
import { ChatScrollAnchor } from '@/components/chat/chat-scroll-anchor'
import { EmptyScreen } from '@/components/empty-screen'
import { useAlertModal } from '@/components/modals/not-logged-in-modal'

export interface ChatProps extends React.ComponentProps<'div'> {
  id?: string
  initialMessages?: Message[]
}

export function Chat({ id, initialMessages, className, ...props }: ChatProps) {
  const { AlertModal, setIsAlertModalOpen, isGuest } = useAlertModal()
  const isHomePage = usePathname() === '/'
  const router = useRouter()
  const { messages, append, reload, stop, isLoading, input, setInput, error } =
    useChat({
      initialMessages,
      id,
      body: {
        id,
        isGuest,
      },
      onResponse(response) {
        if (response.status === 401) {
          setIsAlertModalOpen(true)
        }
      },
      onFinish() {
        if (messages.length) {
          setInput('')
        }
        if (isHomePage && !error && !isGuest) {
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
