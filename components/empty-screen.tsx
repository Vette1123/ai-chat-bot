import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'

import { Icons } from './icons'

const exampleMessages = [
  {
    heading: 'Explain technical concepts',
    message: `What is a "serverless function"?`,
  },
  {
    heading: 'Summarize an article',
    message: 'Summarize the following article for a 2nd grader: \n',
  },
  {
    heading: 'Draft an email',
    message: `Draft an email to my boss about the following: \n`,
  },
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="bg-background rounded-lg border p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to Sadge AI Chatbot!
        </h1>
        <p className="text-muted-foreground mb-2 leading-normal">
          This is an open source AI chatbot app template built with{' '}
          <ExternalLink href="https://nextjs.org" className="text-primary">
            Next.js
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink
            href="https://vercel.com/storage/kv"
            className="text-primary"
          >
            Vercel KV
          </ExternalLink>
          .
        </p>
        <p className="text-muted-foreground leading-normal">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <Icons.arrowRight className="text-muted-foreground mr-2" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
