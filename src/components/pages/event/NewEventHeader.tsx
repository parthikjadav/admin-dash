import { Button } from '@/components/ui/button'
import React from 'react'

const NewEventHeader = () => {
    return (
        <div>
            <div className="flex-center justify-between">
                <h1 className="e-h1">New Event</h1>
                <button className='px-4 rounded-full py-3 text-xs font-normal bg-(--color-light-gray) text-black hover:bg-gray-300/50'>Save as Draft</button>
            </div>
        </div>
    )
}

export default NewEventHeader