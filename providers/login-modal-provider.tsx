'use client'

import { ReactNode } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function ModalProvider({
  modal,
  children,
}: {
  modal: ReactNode
  children: ReactNode
}) {
  const segment = useSelectedLayoutSegment()
  return (
    <>
      {/* Only show stats modal if it's on the home page */}
      {!segment && modal}
      {children}
    </>
  )
}
