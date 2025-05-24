"use client"

import { useUserStore } from '@/store/user'
import { Skeleton } from "@/components/ui/skeleton"
import { State } from '@/types'
import React from 'react'
import { AvatarComp } from './HeaderInfo'

const UserInfo = () => {
    const user = useUserStore((state: State) => state.user)
    const shorter = (str: string) => {
        return str.length > 15 ? str.slice(0, 15) + '...' : str
    }
    if (!user) {
        return <UserInfoSkeleton />
    }
    const name = shorter(user?.name || '')
    const email = shorter(user?.email || '')
    return (
        <>
            <AvatarComp />
            <div className='flex flex-col items-start ml-2'>
                <p className='text-sm font-semibold'>
                    {name}
                </p>
                <p className='text-xs text-gray-500'>
                    {email}
                </p>
            </div>
        </>
    )
}


export function UserInfoSkeleton() {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="w-[38px] h-[38px] rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[110px]" />
                <Skeleton className="h-4 w-[110px]" />
            </div>
        </div>
    )
}


export default UserInfo