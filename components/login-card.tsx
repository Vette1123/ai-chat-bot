'use client'

import { useReducer } from 'react'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Icons } from '@/components/icons'

import { FooterText } from './chat/chat-prompt-footer'

const initialState = {
  isGithubLoading: false,
  isGoogleLoading: false,
}

export function LoginCard() {
  const [loadingStates, updateLoadingStates] = useReducer<
    React.Reducer<typeof initialState, Partial<typeof initialState>>
  >((oldStates, newState) => ({ ...oldStates, ...newState }), initialState)

  return (
    <Card className="mx-4">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Choose your preferred authentication method to login.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-6">
          <Button
            variant="outline"
            onClick={() => {
              updateLoadingStates({ isGithubLoading: true })
              // next-auth signIn() function doesn't work yet at Edge Runtime due to usage of BroadcastChannel
              signIn('github', { callbackUrl: `/` })
            }}
          >
            {loadingStates.isGithubLoading ? (
              <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />
            ) : (
              <Icons.gitHub className="mr-2 h-6 w-6" />
            )}
            Github
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              updateLoadingStates({ isGoogleLoading: true })
              // next-auth signIn() function doesn't work yet at Edge Runtime due to usage of BroadcastChannel
              signIn('google', { callbackUrl: `/` })
            }}
          >
            {loadingStates.isGoogleLoading ? (
              <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-6 w-6" />
            )}
            Google
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <FooterText />
      </CardFooter>
    </Card>
  )
}
