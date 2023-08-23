import React from 'react'
import { usePathname } from 'next/navigation'
import { UseChatHelpers } from 'ai/react'

import { Chat } from '@/types/chat'
import { Button } from '@/components/ui/button'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { FooterText } from '@/components/chat/chat-prompt-footer'
import { PromptForm } from '@/components/chat/chat-prompt-form'
import { Icons } from '@/components/icons'
import { useShareModal } from '@/components/modals/share-chat-modal'
import { getChat } from '@/app/actions'

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
}: ChatPanelProps) {
  const [chat, setChat] = React.useState<Chat>({} as Chat)
  const { setIsShareModalOpen, ShareChatModal } = useShareModal({ chat })
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <div className="fixed inset-x-0 bottom-0 shrink-0 bg-gradient-to-b from-muted/50 to-muted/80 to-50% pt-2">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <Icons.stop className="mr-2 h-4 w-4" />
              Stop generating
            </Button>
          ) : (
            messages?.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => reload()}
                  className="bg-background"
                >
                  <Icons.refresh className="mr-2 h-4 w-4" />
                  Regenerate response
                </Button>
                {!isHomePage && (
                  <Button
                    variant="outline"
                    onClick={async () => {
                      const chat = await getChat(id!)
                      if (chat) {
                        setChat(chat)
                        setIsShareModalOpen(true)
                      }
                    }}
                    className="bg-background"
                  >
                    <Icons.share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                )}
              </div>
            )
          )}
        </div>
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async (value) => {
              try {
                await append({
                  id,
                  content: value,
                  role: 'user',
                })
              } catch (error) {
                console.error(error)
              }
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
          <FooterText className="hidden sm:block" />
        </div>
        <ShareChatModal />
      </div>
    </div>
  )
}
