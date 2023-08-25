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
  open: boolean
  setOpen: (open: boolean) => void
  setIsGuest: (isGuest: boolean) => void
}

function NotLoggedInAlert({
  open,
  setOpen,
  setIsGuest,
}: NotLoggedInAlertProps) {
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
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
                    setOpen(false)
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
  const [open, setOpen] = React.useState(false)
  const [isGuest, setIsGuest] = React.useState(false)

  const AlertModal = React.useCallback(() => {
    return (
      <NotLoggedInAlert open={open} setOpen={setOpen} setIsGuest={setIsGuest} />
    )
  }, [open, setOpen])

  return React.useMemo(
    () => ({ AlertModal, setOpen, open, setIsGuest, isGuest }),
    [AlertModal, setOpen, open, setIsGuest, isGuest]
  )
}
