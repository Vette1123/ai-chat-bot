import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'

import { Chat } from '@/components/chat/main-chat'
import { getChat } from '@/app/actions'

export const runtime = 'edge'
export const preferredRegion = 'home'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params,
}: ChatPageProps): Promise<Metadata> {
  const session = await auth()

  if (!session?.user) {
    return {}
  }
  const chat = await getChat(params.id)
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat',
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth()

  if (!session?.user) {
    // redirect(`/login?next=/chat/${params.id}`)
    return
  }

  const chat = await getChat(params?.id)

  if (!chat) {
    notFound()
  }

  // if (chat?.userId !== session?.user?.id) {
  //   notFound()
  // }

  return <Chat id={chat.id} initialMessages={chat.messages} />
}
