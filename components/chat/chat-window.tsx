'use client'
import React from 'react'
import UserAssistantCard from '@/components/chat/user-assistant-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useChat } from '@/hooks/useChat'
import UserInput from './user-input-form'

function ChatWindow() {
  const messages = useChat((state) => state.messages)
  return (
    <section className='mx-auto max-w-6xl gap-4 flex flex-col'>
      <ScrollArea className='p-4 mt-6 sm:mt-10 rounded-md border'>
        {messages?.map((message, index) =>
          message?.sender === 'assistant' ? (
            <UserAssistantCard
              key={index}
              text={message?.text}
              isUser={false}
            />
          ) : (
            <UserAssistantCard key={index} text={message?.text} isUser />
          )
        )}
      </ScrollArea>
      <UserInput />
    </section>
  )
}

export default ChatWindow
