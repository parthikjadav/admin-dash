import { Button } from '@/components/ui/button'
import { ListFilter, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DataTableDemo } from './EventsTable'

const Events = () => {
    return (
        <>
            {/* <EventsHeader /> */}
            {/* <EventsTable /> */}
            <DataTableDemo/>
        </>
    )
}

const EventsHeader = () => {
    return (<>
        <div className='flex-center justify-between z-auto'>
            <div>
                <h1 className='e-h1'>Events</h1>
            </div>
            <div className='flex-center gap-4'>
                <button className="filter shadow-sm flex-center w-9 h-9 rounded-full ">
                    <ListFilter strokeWidth={1} size={18} />
                </button>
                <EventSearchBar />
                <Link href={"/events/create"}>
                    <Button variant={"secondary"} className='text-[12px] font-light p-[10px]! sm:px-3 sm:py-2'>
                        <span className='hidden sm:block'>Add Event </span>
                        <Plus strokeWidth={1.5} size={18} className='text-white' />
                    </Button>
                </Link>
            </div>
        </div>
        {/* Mobile search bar */}
        <div className="relative mt-6 sm:hidden">
            <Image src={"/icons/search.svg"} width={20} height={20} alt='search-icon' className='absolute top-1/2 left-4 -translate-y-1/2' />
            <input type="text" placeholder="Search" className="search-input w-full border-[#DCDCDC] py-[10px] px-[16px] text-sm rounded-full ps-10 bg-(--color-light-gray)" />
        </div>
    </>)
}

const EventSearchBar = () => {
    return (<>
        <div className="relative hidden sm:block">
            <Image src={"/icons/search.svg"} width={20} height={20} alt='search-icon' className='absolute top-1/2 left-4 -translate-y-1/2' />
            <input type="text" placeholder="Search" className="search-input w-[260px] border-[#DCDCDC] py-[10px] px-[16px] text-sm rounded-full ps-10 bg-(--color-light-gray)" />
        </div>
    </>)
}

export default Events