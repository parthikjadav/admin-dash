import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className='flex overflow-x-hidden'>
                <Sidebar />
                <div className='mx-3 sm:mx-6 w-full'>
                    <Header />
                    {children}
                </div>
            </div>
        </>
    )
}

export default layout