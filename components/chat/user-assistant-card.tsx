import { Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Props {
  isUser: boolean
  text: string
}

function UserAssistantCard({
  isUser,
  text = isUser ? 'Please help me' : 'How may I help you?',
}: Props) {
  const [isMounted, setIsMounted] = React.useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null
  return (
    <div
      className={cn('my-5 mr-2', {
        'flex items-end justify-end': isUser,
      })}
    >
      <Card
        className={cn('border-0', {
          'w-full flex justify-end': isUser,
        })}
      >
        <CardHeader>
          <CardTitle>{isUser ? 'You' : 'Assistant'}</CardTitle>
          <CardDescription>
            {text ? (
              <ReactMarkdown
                components={{
                  pre: ({ node, ...props }) => (
                    <div className='my-2 w-full overflow-auto rounded-lg bg-black/10 p-2'>
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ node, ...props }) => (
                    <code className='rounded-lg bg-black/10 p-1' {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a className='text-blue-500 hover:underline' {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className='list-disc ml-4' {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className='list-decimal ml-4' {...props} />
                  ),
                  article: ({ node, ...props }) => (
                    <article
                      className='text-blue-500 hover:underline'
                      {...props}
                    />
                  ),
                }}
                className='overflow-hidden text-sm leading-7'
              >
                {text || ''}
              </ReactMarkdown>
            ) : (
              <Loader2 className='w-6 h-6 border-4 border-gray-400 rounded-full animate-spin' />
            )}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

export default UserAssistantCard
