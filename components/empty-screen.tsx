import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'

import { Icons } from './icons'

const exampleMessages = [
  {
    heading: 'Explain technical concepts',
    message: `What is a "serverless function?"`,
    disabled: false,
  },
  {
    heading: 'Summarize an article',
    message: `Summarize the article "How to Build a Chatbot in 3 Steps"`,
    disabled: false,
  },
  {
    heading: 'Draft an email',
    message: 'Draft an email about frontend position at Vercel',
    disabled: false,
  },
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to Sadge AI Chatbot!
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          This is an open source AI chatbot app template built with{' '}
          <ExternalLink href="https://nextjs.org" className="text-primary">
            Next.js
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink href="https://upstash.com" className="text-primary">
            Upstash Redis
          </ExternalLink>
          .
        </p>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              disabled={message.disabled}
              className="h-auto p-0 text-base"
              onClick={() => !message.disabled && setInput(message.message)}
            >
              <Icons.arrowRight className="mr-2 h-4 w-4 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
