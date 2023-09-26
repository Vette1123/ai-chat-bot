import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat/main-chat'

export const runtime = 'edge'
export const preferredRegion = 'home'

export default async function IndexPage() {
  const id = nanoid()
  return <Chat id={id} />
}
