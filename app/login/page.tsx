import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth-options'
import { LoginButton } from '@/components/login-button'

export default async function SignInPage() {
  const session = await getServerSession(authOptions)
  // redirect to home if user is already logged in
  // console.log('session', session)
  if (session?.user) {
    redirect('/')
  }
  return (
    <div className="flex items-center justify-center py-10">
      <LoginButton className="flex items-center justify-center" />
    </div>
  )
}