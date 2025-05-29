import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className='flex overflow-x-hidden'>
                <Sidebar />
                <div className='me-3 ms-3 sm:ms-6 lg:ms-50 sm:me-6 w-full'>
                    <Header />
                    <div className='sm:mt-5 lg:mt-8 rounded-t-4xl bg-white h-auto p-6'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default layout