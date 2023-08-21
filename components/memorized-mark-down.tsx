import React from 'react'
import { type Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { MemoizedReactMarkdown } from '@/components/markdown'

import { CodeBlock } from './code-block'

interface MemorizedMarkDownProps {
  message: Message
}

function MemorizedMarkDown({ message }: MemorizedMarkDownProps) {
  return (
    <MemoizedReactMarkdown
      className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>
        },
        code({ node, inline, className, children, ...props }) {
          if (children.length) {
            if (children[0] == '▍') {
              return (
                <span className="mt-1 animate-pulse cursor-default">▍</span>
              )
            }

            children[0] = (children[0] as string).replace('`▍`', '▍')
          }

          const match = /language-(\w+)/.exec(className || '')

          if (inline) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }

          return (
            <CodeBlock
              key={Math.random()}
              language={(match && match[1]) || ''}
              value={String(children).replace(/\n$/, '')}
              {...props}
            />
          )
        },
      }}
    >
      {message.content}
    </MemoizedReactMarkdown>
  )
}

MemorizedMarkDown.displayName = 'MemorizedMarkDown'

export default MemorizedMarkDown
