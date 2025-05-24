"use client"

import { signOut } from '@/actions/auth'
import { useUserStore } from '@/store/user'
import { State } from '@/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import Events from './_components/Events'

const page = () => {
  const router = useRouter()
  const user = useUserStore((state: State) => state.user)
  const loading = useUserStore((state: State) => state.loading)

  const handleSignOut = async () => {
    await signOut()
    toast("Successfully Signed Out")
    router.push('/sign-in')
  }

  return (
    <div className='lg:mt-8 rounded-t-4xl bg-white h-screen p-6'>
      <Events/>
    </div>
  )
}

export default page