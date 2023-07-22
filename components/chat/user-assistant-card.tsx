import { Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'
import MarkDown from '@/components/markdown'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { SkeletonCard } from '../skeleton-card'

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

  if (!isMounted) return <SkeletonCard isLoading={true} />
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
              <MarkDown text={text} />
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
