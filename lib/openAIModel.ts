import { ChatOpenAI } from 'langchain/chat_models/openai'
import { CallbackManager } from 'langchain/callbacks'

export const openAIModel = (
  isStreaming: boolean = true,
  stream: TransformStream<any, any>,
  isShowCallBacks: boolean = true
) => {
  const encoder = new TextEncoder()
  const writer = stream.writable.getWriter()

  return new ChatOpenAI({
    modelName: process.env.OPEN_AI_MODEL as string,
    openAIApiKey: process.env.OPEN_AI_API_KEY as string,
    verbose: true,
    streaming: isStreaming,
    ...(isShowCallBacks
      ? {
          callbacks: CallbackManager.fromHandlers({
            handleLLMNewToken: async (token: string) => {
              await writer.ready
              await writer.write(encoder.encode(`data: ${token}\n\n`))
            },
            handleLLMEnd: async () => {
              await writer.ready
              await writer.close()
            },
            handleLLMError: async (error: string) => {
              await writer.ready
              await writer.abort(error)
            },
          }),
        }
      : {}),
  })
}
