'use client'
import { Forward, Loader2 } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Message, useChat } from '@/hooks/useChat'
import { APPLICATION_JSON, ASSISTANT, USER } from '@/lib/constants'
import { ChatMessage, formSchema, initialFormValues } from '@/lib/form-utils'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { fetchEventSource } from '@microsoft/fetch-event-source'

function UserInput() {
  const isLoading = useChat((state) => state.isLoading)
  const setLoading = useChat((state) => state.setLoading)
  const messages = useChat((state) => state.messages)
  const setMessages = useChat((state) => state.setMessages)
  const scrollAreaRef = useRef<HTMLTextAreaElement>(null)

  const form = useForm<ChatMessage>({
    resolver: zodResolver(formSchema),
    defaultValues: initialFormValues,
  })

  const onTextAreaKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === 'Enter' && !event.shiftKey && !isLoading) {
      event.preventDefault()
      form.handleSubmit(onSubmit)()
    }
  }

  const onMessageSend = async (userInput: string) => {
    let currentStreamedText = ''
    if (isLoading)
      return toast.error(
        'Please wait for the current message to finish streaming.'
      )
    if (userInput.length < 3 && !isLoading) {
      return toast.error('Message must be at least 3 characters long.')
    }
    setLoading(true)

    setMessages((prevMessages: Message[]) => [
      ...prevMessages,
      { sender: USER, text: userInput.trim() },
      { sender: ASSISTANT, text: '' },
    ])

    const messagesClone = [
      ...messages,
      { sender: ASSISTANT, text: '' },
      { sender: USER, text: userInput.trim() },
    ]

    const userMessages = messagesClone
      .filter((message) => message.sender === USER)
      .map((message) => message.text)

    const assistantMessages = messagesClone
      .filter((message) => message.sender === ASSISTANT)
      .map((message) => message.text)

    await fetchEventSource('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        assistantMessages: JSON.stringify(assistantMessages),
        userMessages: JSON.stringify(userMessages),
      }),
      headers: { 'Content-Type': APPLICATION_JSON },
      onmessage(ev) {
        if (ev.data) {
          currentStreamedText += ev.data
        } else {
          currentStreamedText += '\n'
        }

        setMessages((prevMessages: Message[]) => {
          const newMessages = [...prevMessages]
          const lastMessageIndex = newMessages.length - 1

          newMessages[lastMessageIndex] = {
            ...newMessages[lastMessageIndex],
            text: currentStreamedText,
          }

          return newMessages
        })
      },

      onerror(err) {
        toast.error(
          'An error occurred while sending your message. Please try again later.',
          err.message
        )
        setLoading(false)
      },
      onclose() {
        setMessages((prevMessages: Message[]) => {
          const newMessages = [...prevMessages]
          const lastMessageIndex = newMessages.length - 1

          newMessages[lastMessageIndex] = {
            ...newMessages[lastMessageIndex],
          }
          setLoading(false)
          return newMessages
        })
      },
    })
    form.setValue('label', '')
    scrollAreaRef?.current?.focus()
  }

  const onSubmit = (data: ChatMessage) => {
    onMessageSend(data?.label)
  }

  useEffect(() => {
    if (isLoading && scrollAreaRef.current) {
      scrollAreaRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading])

  useEffect(() => {
    scrollAreaRef?.current?.focus()
  }, [])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex items-center justify-center relative'
      >
        <FormField
          control={form.control}
          name='label'
          render={({ field }) => (
            <FormItem className={cn('w-full')}>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder='Type your message here...'
                  className='resize-none pr-12 md:pr-16 m-0 w-full overflow-y-auto overflow-x-hidden'
                  {...field}
                  onKeyDown={onTextAreaKeyDown}
                  ref={scrollAreaRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className='absolute p-1 rounded-md md:p-2 md:right-3 right-2 top-1/2 transform -translate-y-1/2'
          variant='secondary'
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className='w-6 h-6 border-4 border-gray-400 rounded-full animate-spin' />
          ) : (
            <Forward />
          )}
        </Button>
      </form>
    </Form>
  )
}

export default UserInput
