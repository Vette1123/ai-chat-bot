import { OpenAIStream, StreamingTextResponse } from 'ai'
import { getServerSession } from 'next-auth'
import { Configuration, OpenAIApi } from 'openai-edge'

import { authOptions } from '@/lib/auth-options'
import { redis } from '@/lib/upstash-redis'
import { nanoid } from '@/lib/utils'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  if (previewToken) {
    configuration.apiKey = previewToken
  }

  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
    stream: true,
  })

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant',
          },
        ],
      }
      await redis.hmset(`chat:${id}`, payload)
      await redis.zadd(`user:chat:${userId}`, {
        score: createdAt,
        member: `chat:${id}`,
      })
    },
  })

  return new StreamingTextResponse(stream)
}
