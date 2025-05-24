import Image from 'next/image'
import React, { Suspense } from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { ChevronDown } from 'lucide-react'
import UserInfo, { UserInfoSkeleton } from './UserInfo'


const HeaderInfo = () => {
    return (
        <div className='flex py-1 items-center justify-between gap-4'>
            <div className='hidden xl:flex items-center gap-4'>
                <IconsMap />
            </div>
            <div className='hidden md:flex items-center px-2 gap-x-4'>
                <UserInfo />
                <ChevronDown size={16} />
            </div>
        </div>
    )
}

const IconsMap = () => {
    const icons = [
        {
            path: "/icons/search.svg"
        },
        {
            path: "/icons/settings.svg"
        },
        {
            path: "/icons/notifications.svg"
        }
    ]
    return (<>
        {
            icons.map((icon: any, ind: number) => {
                return <div key={ind} className='p-2 bg-white shadow-sm hover:bg-gray-100 rounded-full cursor-pointer w-10 h-10 flex items-center justify-center'>
                    <Image src={icon.path} alt="icons" width={25} height={25} />
                </div>
            })
        }
    </>)
}
export function AvatarComp() {
    return (
        <Avatar className='w-[38px] h-[38px]'>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
    )
}

export default HeaderInfo