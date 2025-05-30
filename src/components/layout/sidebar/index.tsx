import React from 'react'
import SidebarHead from './SidebarHead'
import SidebarFooter from './SidebarFooter'

const Sidebar = () => {
    return (
        <div className='max-w-[180px] h-screen lg:block hidden fixed top-0 left-0'>
            <SidebarHead />
            <SidebarFooter />
        </div>
    )
}

export default Sidebar