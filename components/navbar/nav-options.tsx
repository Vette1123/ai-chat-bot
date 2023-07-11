import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'

function NavOptions({ className }: { className?: string }) {
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      <Link href='/' className='flex space-x-3'>
        <p className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
          Sadge Chat
        </p>
      </Link>
    </nav>
  )
}

export default NavOptions
