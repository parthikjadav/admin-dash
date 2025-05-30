import Image from 'next/image'
import React from 'react'
import SidebarLinks from './SidebarLinks'
import { Separator } from '../../ui/separator'
import { sidebarLinks } from '@/constants'

const SidebarHead = () => {
    return (
        <div className='w-full flex flex-col items-center justify-center px-3 py-5 bg-white rounded-br-[32px]'>
            <div className="logo">
                <Image src="/logo.svg" width={127} height={20} alt="logo" />
            </div>
            <div className="links w-full">
                <SidebarLinks item={sidebarLinks[0]} className='mt-8' />
                <Separator className='bg-side-stroke p-0 m-0' />
                <SidebarLinks item={sidebarLinks[1]} className='mt-5' />
            </div>
        </div>
    )
}

export default SidebarHead