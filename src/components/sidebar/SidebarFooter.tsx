import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

const SidebarFooter = () => {
    return (
        <div className='bg-white flex flex-col content-between max-h-1/2 mt-6 rounded-tr-[32px] px-3 py-6 relative'>
            <div>
                <div className='flex flex-col gap-2'>
                    <Button variant="primary" className='mb-2'>Free Trial</Button>
                    <span className='text-xs text-side-gray font-light'>Offer expiring April 2025</span>
                    <Image src={"/dance.svg"} width={70} height={100} alt="Dance" className='absolute z-10 -top-2 -right-1' />
                    <p className='text-xs font-light pt-3'>
                        3 months <span className='text-primary-orange'>FREE</span> + 2025 <span className='text-primary-orange'>50% OFF</span> + Enjoy Early user’s privileges
                    </p>
                </div>
                <div className='mt-2'>
                    <p className='text-xs font-light mb-2'>Subscribe to unlock all features </p>
                    <Button variant="secondary" className='py-6 px-8 text-xs font-light'>Unlock Features</Button>
                </div>
            </div>
            {/* <div>need help?</div> */}
        </div>
    )
}

export default SidebarFooter