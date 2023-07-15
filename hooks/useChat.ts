import { create } from 'zustand'

export type Message = {
  sender: 'assistant' | 'user'
  text: string
}

interface ChatStore {
  messages: Message[]
  setMessages: (fn: (messages: Message[]) => Message[]) => void
  isLoading: boolean
  setLoading: (isLoading: boolean) => void
}

export const useChat = create<ChatStore>((set) => ({
  messages: [
    {
      sender: 'assistant',
      text: 'Hello, I am an AI assistant. I am here to help you with your questions.',
    },
  ],
  setMessages: (fn) => set((state) => ({ messages: fn(state.messages) })),
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}))
