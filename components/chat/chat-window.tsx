import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import UserInput from './user-input-form'

function ChatWindow() {
  return (
    <section className='mx-auto max-w-6xl gap-4 flex flex-col'>
      <ScrollArea className='p-4 mt-12 sm:mt-20 rounded-md border'>
        hi
      </ScrollArea>
      <UserInput />
    </section>
  )
}

export default ChatWindow
