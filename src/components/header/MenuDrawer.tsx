"use client"

import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '../ui/button'
import Image from 'next/image'
import { X } from 'lucide-react'
import SidebarLinks from '../sidebar/SidebarLinks'
import { sidebarLinks } from '@/constants'
import { Separator } from '@radix-ui/react-separator'


const MenuDrawer = () => {
    return (
        <>
            <Drawer >
                <DrawerTrigger asChild>
                    <div className="menuTrigger w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                        <Image src={"/icons/menu.svg"} width={30} height={30} alt="menu" />
                    </div>
                </DrawerTrigger>
                <DrawerContent className='mx-4 min-h-[90vh]'>
                    <DrawerHeader>
                        <DrawerTitle className='sr-only'>
                            Menu Options
                        </DrawerTitle>
                        <DrawerClose className='w-10'>
                            <div className='bg-(--color-secondary-green) w-10 h-10 flex-center rounded-full'>
                                <X strokeWidth={1} size={24} />
                            </div>
                        </DrawerClose>
                        <SidebarLinks item={sidebarLinks[0]} className='mt-4' isMobileLink={true}/>
                        <Separator className='bg-side-stroke h-[1px]' />
                        <SidebarLinks item={sidebarLinks[1]} className='mt-5' isMobileLink={true}/>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default MenuDrawer