import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth-options'
import { LoginCard } from '@/components/login-card'

export default async function SignInPage() {
  const session = await getServerSession(authOptions)
  if (session?.user) {
    redirect('/')
  }
  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <LoginCard />
    </div>
  )
}
