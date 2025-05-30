import { sidebarLinksType, sidebarLinkType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { cn } from "@/lib/utils"

const SidebarLinks = ({ item, className, isMobileLink = false }: { item: sidebarLinksType, className?: string, isMobileLink?: boolean }) => {
    return (
        <div className={cn(className ? className : ' ', "px-4")}>
            <div>
                <div className='w-full'>
                    <span className={cn(isMobileLink ? 'text-[12px]' : 'text-[10px]', ' uppercase w-full text-side-gray')}> {item.title} </span>
                    {
                        item.links.map((link: sidebarLinkType, index: number) => (
                            <Link href={link.href} key={index} className={cn(isMobileLink ? 'text-[12px]' : 'text-[10px]')}>
                                <div className="py-4 flex items-center gap-x-2">
                                    <Image src={link.icon} alt={link.title} width={20} height={20} className='inline-block' />
                                    <p className='text-side-blue'>{link.title}</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SidebarLinks