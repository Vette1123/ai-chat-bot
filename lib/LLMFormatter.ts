import { HumanMessage, SystemMessage, AIMessage } from 'langchain/schema'

function formatMessages(
  userMessageList: string[],
  assistantMessageList: string[],
  PROMPT: string
) {
  const FORMATTED_MESSAGES: (HumanMessage | SystemMessage | AIMessage)[] = [
    new SystemMessage(PROMPT),
  ]

  for (let i = 0; i < assistantMessageList.length; i++) {
    FORMATTED_MESSAGES.push(new AIMessage(assistantMessageList[i]))
    if (i < userMessageList.length) {
      FORMATTED_MESSAGES.push(new HumanMessage(userMessageList[i]))
    }
  }

  if (userMessageList.length > assistantMessageList.length) {
    FORMATTED_MESSAGES.push(
      new HumanMessage(userMessageList[userMessageList.length - 1])
    )
  }

  return FORMATTED_MESSAGES
}
export default formatMessages
