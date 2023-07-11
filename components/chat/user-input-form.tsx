import { Forward } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

function UserInput() {
  return (
    <div className='flex items-center justify-center relative'>
      <Textarea
        className={cn(
          'm-0 w-full pr-12 md:pr-16 resize-none overflow-y-auto overflow-x-hidden',
          {}
        )}
        placeholder='Type your message here...'
        // value={inputText}
        // onChange={(e) => setInputText(e.target.value)}
        // onKeyDown={handleKeyDown}
        // disabled={isDisabled || isLoading}
      />
      <Button
        className='absolute p-1 rounded-md md:p-2 md:right-3 right-2 bottom-1'
        variant='secondary'
        // onClick={handleSendMessage}
        // disabled={isDisabled || isLoading}
      >
        <Forward />
      </Button>
    </div>
  )
}

export default UserInput
