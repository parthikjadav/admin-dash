"use client"

import React, { useState } from 'react'
import { Separator } from '../../ui/separator'
import { ChevronUp } from 'lucide-react'
import Image from 'next/image'
import MenuDrawer from './MenuDrawer'
import { cn } from '@/lib/utils'
import { MenuDemo } from './HeaderLinks'

const MobileHeader = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleIsOpen = () => setIsOpen(!isOpen)
    return (
        <>
            <div className='lg:hidden bg-white py-[10px] px-[16px] max-w-full transition duration-300 mt-2 rounded-4xl flex justify-center items-center flex-col'>
                <div className='flex-center justify-between w-full z-10'>
                    <div>
                        <MenuDrawer />
                    </div>
                    <div className="logo">
                        <Image src={"/logo.svg"} width={100} height={30} alt="logo" className='xs:w-10 lg:w-40' />
                    </div>
                    <div>
                        <div onClick={handleIsOpen} className={cn(isOpen ? "bg-(--color-secondary-green) rotate-180" : "bg-(--color-light-gray)", "flex w-9 h-9 transition duration-500 md:hidden justify-center items-center rounded-full")}>
                            <ChevronUp size={16} className='text-side-blue' />
                        </div>
                    </div>
                </div>
                <div
                    className={cn(
                        "transition-all duration-300 ease-in-out transform md:hidden w-full",
                        isOpen
                            ? "opacity-100 scale-100 pointer-events-auto"
                            : "opacity-0 scale-95 pointer-events-none max-h-0"
                    )}
                >
                    <Separator className="my-4" />
                    <div className="flex justify-center">
                        <MenuDemo />
                    </div>
                </div>


            </div>
        </>
    )
}

export default MobileHeader