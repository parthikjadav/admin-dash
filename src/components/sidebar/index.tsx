import React from 'react'
import SidebarHead from './SidebarHead'
import SidebarFooter from './SidebarFooter'

const Sidebar = () => {
    return (
        <div className='max-w-[180px] h-screen lg:block hidden'>
            <SidebarHead />
            <SidebarFooter />
        </div>
    )
}

export default Sidebar