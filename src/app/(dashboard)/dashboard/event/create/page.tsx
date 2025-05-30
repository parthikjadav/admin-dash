import NewEventHeader from '@/components/pages/event/NewEventHeader'
import Stepper from '@/components/pages/event/Stepper'
import DetailsStep from '@/components/pages/event/steps/DetailsStep'
import { Step } from '@/types'
import React from 'react'
import AddressStep from '@/components/pages/event/steps/AddressStep'

const page = () => {

    const steps: Step[] = [
        {
            label: 'Details',
            description: 'Add the basic details of your event',
            content: <DetailsStep />,
        },
        {
            label: "Location",
            description: "Add the location of your event",
            content: <AddressStep/>
        },
        {
            label: "Date & Time",
            description: "Add the date of your event",
            content: <div>Event date</div>
        },
        {
            label: "Ticket & Pricing",
            description: "Add the ticket and pricing of your event",
            content: <div>Event ticket</div>
        },
        {
            label: "Images",
            description: "Add the images of your event",
            content: <div>Event images </div>
        },
        {
            label: "Policies & Terms",
            description: "Add the policies and terms of your event",
            content: <div>Event policies</div>
        }
    ]

    return (
        <div>
            <NewEventHeader />
            <Stepper steps={steps} />
        </div>
    )
}

export default page