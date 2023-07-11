import React from 'react'
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
  return (
    <div
      className={cn('my-5 mr-2', {
        'flex items-end justify-end': isUser,
      })}
    >
      <Card className='w-1/4 border-0'>
        <CardHeader>
          <CardTitle>{isUser ? 'You' : 'Assistant'}</CardTitle>
          <CardDescription>{text}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

export default UserAssistantCard
