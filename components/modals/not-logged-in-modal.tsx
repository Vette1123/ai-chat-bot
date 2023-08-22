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

interface NotLoggedInAlertProps {
  open: boolean
  setOpen: (open: boolean) => void
}

function NotLoggedInAlert({ open, setOpen }: NotLoggedInAlertProps) {
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You&apos;re not logged in!</AlertDialogTitle>
          <AlertDialogDescription>
            You need to be logged in to chat with our ai. If you don&apos;t have
            an account, you can create one for free.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
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

  const AlertModal = React.useCallback(() => {
    return <NotLoggedInAlert open={open} setOpen={setOpen} />
  }, [open, setOpen])

  return React.useMemo(
    () => ({ AlertModal, setOpen, open }),
    [AlertModal, setOpen, open]
  )
}
