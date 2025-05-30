import React from 'react'
interface SalesMenuItemProps {
    icon: string,
    title: string,
    description: string
}
const SalesMenuItem = ({ icon, title, description }: SalesMenuItemProps) => {
    return (
        <div className='flex items-center'>
            <div className='px-4 py-2.5'>
                <span className='text-2xl'>{icon}</span>
            </div>
            <div className=''>
                <h3 className='text-xs font-normal text-side-blue'>{title}</h3>
                <p className='text-xs text-side-blue font-light'>{description}</p>
            </div>
        </div>
    )
}

export default SalesMenuItem