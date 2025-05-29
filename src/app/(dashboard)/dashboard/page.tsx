"use client"

import { signOut } from '@/actions/auth'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { EventsTable } from '@/components/pages/dashboard/EventsTable'

const page = () => {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    toast("Successfully Signed Out")
    router.push('/sign-in')
  }

  return (
    <div>
      <EventsTable/>
    </div>
  )
}

export default page