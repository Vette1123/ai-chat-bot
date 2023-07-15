import formatMessages from '@/lib/LLMFormatter'
import { ACCEPT_HEADERS, APPLICATION_JSON, PROMPT } from '@/lib/constants'
import { openAIModel } from '@/lib/openAIModel'
import { NextRequest, NextResponse } from 'next/server'
import { toast } from 'sonner'

export const runtime = 'edge'
export const preferredRegion = 'auto'

export const POST = async (request: NextRequest) => {
  if (!request.body)
    return new NextResponse(JSON.stringify({ error: 'No body provided' }), {
      status: 400,
    })

  if (request.method !== 'POST')
    return new NextResponse(
      JSON.stringify({ error: 'Only POST requests are allowed' }),
      {
        status: 400,
      }
    )
  try {
    const { userMessages, assistantMessages } = await request.json()

    const formattedMessages = formatMessages(
      JSON.parse(userMessages),
      JSON.parse(assistantMessages),
      PROMPT
    )
    const stream = new TransformStream()
    const isStreaming = request.headers.get('accept') === ACCEPT_HEADERS

    if (isStreaming) {
      const model = openAIModel(isStreaming, stream, true)

      model.call(formattedMessages).catch((error: Error) => {
        toast.error(error.message)
      })

      return new NextResponse(stream.readable, {
        headers: {
          'Content-Type': ACCEPT_HEADERS,
        },
      })
    } else {
      const model = openAIModel(isStreaming, stream, false)

      try {
        const completion = await model.call(formattedMessages)
        return new NextResponse(JSON.stringify(completion), {
          headers: { 'Content-Type': APPLICATION_JSON },
        })
      } catch (error) {
        return new NextResponse(
          JSON.stringify({ error: 'Something went wrong with the model' }),
          {
            status: 500,
            headers: { 'Content-Type': APPLICATION_JSON },
          }
        )
      }
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Something went wrong with the model' }),
      {
        status: 500,
        headers: { 'Content-Type': APPLICATION_JSON },
      }
    )
  }
}
