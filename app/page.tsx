import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat/main-chat'

export default async function IndexPage() {
  const id = nanoid()
  return <Chat id={id} />
}
