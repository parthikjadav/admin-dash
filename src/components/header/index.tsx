import React from 'react'
import HeaderInfo from './HeaderInfo'
import { MenuDemo } from './HeaderLinks'
import MobileHeader from './MobileHeader'

const Header = () => {
    return (
        <div className='relative z-10'>
            {/* mobile header */}
            <MobileHeader />
            <div className='flex md:justify-between justify-center  items-center w-full mt-6'>
                <div className='hidden md:block'>
                <MenuDemo />
                </div>
                <HeaderInfo />
            </div>
        </div>
    )
}

export default Header