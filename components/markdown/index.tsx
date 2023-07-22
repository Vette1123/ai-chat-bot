import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

function MarkDown({ text }: { text: string }) {
  return (
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
          <article className='text-blue-500 hover:underline' {...props} />
        ),
        h1: ({ node, ...props }) => (
          <h1 className='text-2xl font-bold' {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className='text-xl font-bold' {...props} />
        ),
      }}
      className='overflow-hidden text-sm leading-7'
    >
      {text || ''}
    </ReactMarkdown>
  )
}

export default MarkDown
