'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Icons } from '@/components/icons'

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

interface NotLoggedInAlertProps {
  isAlertModalOpen: boolean
  setIsAlertModalOpen: (isAlertModalOpen: boolean) => void
  setIsGuest: (isGuest: boolean) => void
}

function NotLoggedInAlert({
  isAlertModalOpen,
  setIsAlertModalOpen,
  setIsGuest,
}: NotLoggedInAlertProps) {
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  return (
    <AlertDialog open={isAlertModalOpen} onOpenChange={setIsAlertModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You&apos;re not logged in!</AlertDialogTitle>
          <AlertDialogDescription>
            You need to be logged in to save your chat history. if you
            don&apos;t have an account, you can create one for free. you can
            also chat as a guest but your chat history will not be saved.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogAction
                disabled={isPending}
                onClick={() => {
                  startTransition(async () => {
                    setIsGuest(true)
                    setIsAlertModalOpen(false)
                  })
                }}
              >
                Continue as guest
              </AlertDialogAction>
            </TooltipTrigger>
            <TooltipContent>
              Once you click on this button, you will be able to chat with our
              AI. with no limitations. but your chat history will not be saved.
            </TooltipContent>
          </Tooltip>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                router.push('/login')
              })
            }}
          >
            {isPending && <Icons.spinner className="mr-2 animate-spin" />}
            Log in
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const useAlertModal = () => {
  const [isAlertModalOpen, setIsAlertModalOpen] = React.useState(false)
  const [isGuest, setIsGuest] = React.useState(false)

  const AlertModal = React.useCallback(() => {
    return (
      <NotLoggedInAlert
        isAlertModalOpen={isAlertModalOpen}
        setIsAlertModalOpen={setIsAlertModalOpen}
        setIsGuest={setIsGuest}
      />
    )
  }, [isAlertModalOpen, setIsAlertModalOpen])

  return React.useMemo(
    () => ({
      AlertModal,
      setIsAlertModalOpen,
      isAlertModalOpen,
      setIsGuest,
      isGuest,
    }),
    [AlertModal, setIsAlertModalOpen, isAlertModalOpen, setIsGuest, isGuest]
  )
}
