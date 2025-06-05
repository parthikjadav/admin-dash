"use client"

import useStepsStore from '@/store/stepper'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MultiSelectCombobox } from '@/components/Multiselect'
import { Asterisk, Info, Plus } from 'lucide-react'
import TextEditor from '../Editor/TextEditor'
import { createEvent } from '@/actions/event'
import { toast } from 'sonner'
import useEventFormStore from '@/store/eventForm'

export const EventDetailsFormSchema = z.object({
    title: z.string().min(3, { message: 'Please enter a name greater than 3 characters' }).max(60, { message: 'Name is too long' }),
    description: z.string().min(30, { message: 'Please enter a description greater than 30 characters' }).max(3000, { message: 'Description is too long' }),
    danceStyle: z.array(z.string()).min(1, { message: 'Please enter a dance style' }),
    danceLevel: z.array(z.string()).min(1, { message: 'Please enter a dance level' }),
    socialTags: z.string().optional(),
    amenities: z.string().optional(),
    parkingFacilities: z.string().optional(),
})

export type EventDetailsFormInputs = z.infer<typeof EventDetailsFormSchema>

const DetailsStep = () => {
    const setCanContinue = useStepsStore((state) => state.setCanContinue)
    const setCurrentStep = useStepsStore((state) => state.setStepCount)
    const setForm = useEventFormStore((state) => state.setForm)
    const setEventID = useEventFormStore((state) => state.setEventID)
    const formData = useEventFormStore((state) => state.form)
    const eventID = useEventFormStore((state) => state.eventID)
    const currentStep = useStepsStore((state) => state.stepCount)
    const isError = useStepsStore((state) => state.isError)
    const canContinue = useStepsStore((state) => state.canContinue)

    const form = useForm({
        resolver: zodResolver(EventDetailsFormSchema),
        defaultValues: formData || {
            title: '',
            description: '',
            danceStyle: [],
            danceLevel: [],
            socialTags: '',
            amenities: '',
            parkingFacilities: '',
        }
    })

    if (!currentStep) return null

    const onSubmit = async (data: z.infer<typeof EventDetailsFormSchema>) => {
        console.log(data)
        const saved = await createEvent(data, eventID)
        if (!saved) {
            toast("Error creating event")
            return
        }
        if (currentStep) {
            setForm(data)
            setEventID(saved)
            setCurrentStep(currentStep + 1)
        }
    }

    return (
        <>
            <div className='py-8'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="event-heading">
                            <h3 className='font-semibold text-lg tracking-wide text-side-blue'> Event Details </h3>
                        </div>
                        <div className='md:flex space-y-5 gap-4 items-start justify-between'>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className='w-full md:w-1/3'>
                                        <FormLabel className='e-formt font-normal'>Event Title <Asterisk color='red' size={14} /></FormLabel>
                                        <FormControl>
                                            <Input className='rounded-full p-5 border-gray-200' placeholder="Type here" {...field} />
                                        </FormControl>
                                        <FormDescription className='e-formd text-side-blue text-[12px]'>
                                            Event Title must be between 3 and 60 characters.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="danceStyle"
                                render={({ field }) => (
                                    <FormItem className='w-full md:w-1/3'>
                                        <FormLabel className='e-formt font-normal'>Dance Style<Asterisk color='red' size={14} /></FormLabel>
                                        <div className='flex gap-2 max-w-full'>
                                            <FormControl>
                                                <MultiSelectCombobox
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    items={["Ballet", "Hip Hop", "Jazz", "Lyrical", "Modern", "Tap"]} />
                                            </FormControl>
                                            <div className='rounded-full flex-center w-10 h-10 bg-(--color-secondary-green) hover:bg-(--color-secondary-green)/80 text-black'>
                                                <Plus strokeWidth={1.5} size={20} />
                                            </div>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="danceLevel"
                                render={({ field }) => (
                                    <FormItem className='w-full md:w-1/3'>
                                        <FormLabel className='e-formt font-normal'>Dance Style<Asterisk color='red' size={14} /></FormLabel>
                                        <div className='flex gap-2 w-full'>
                                            <FormControl>
                                                <MultiSelectCombobox
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    items={["Beginner", "Intermediate", "Advanced"]} />
                                            </FormControl>
                                            <div className='rounded-full flex-center w-10 h-10 bg-(--color-secondary-green) hover:bg-(--color-secondary-green)/80 text-black'>
                                                <Plus strokeWidth={1.5} size={20} />
                                            </div>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel className='e-formt font-normal'>Description<Asterisk color='red' size={14} /></FormLabel>
                                        <FormControl>
                                            <TextEditor value={field.value} onChange={field.onChange} />
                                        </FormControl>
                                        <FormDescription className='e-formd text-side-blue text-[12px]'>
                                            (30 - 3000 characters)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="event-heading">
                            <h3 className='font-semibold text-lg tracking-wide text-side-blue'>Conveniences & Perks</h3>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <FormField
                                control={form.control}
                                name="socialTags"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel className='e-formt font-normal'>Social Tag <Info color='gray' size={14} strokeWidth={3} /></FormLabel>
                                        <FormControl>
                                            <Input className='rounded-full p-5 border-gray-200' placeholder="Type here" {...field} />
                                        </FormControl>
                                        <FormDescription className='e-formd text-side-blue text-[12px]'>
                                            Use comma (,) to separate multiple Keywords
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amenities"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel className='e-formt font-normal'>Amenities <Info color='gray' size={14} strokeWidth={3} /></FormLabel>
                                        <FormControl>
                                            <Input className='rounded-full p-5 border-gray-200' placeholder="Type here" {...field} />
                                        </FormControl>
                                        <FormDescription className='e-formd text-side-blue text-[12px]'>
                                            Use comma (,) to separate multiple Keywords
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="parkingFacilities"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel className='e-formt font-normal'>Parking facilities <Info color='gray' size={14} strokeWidth={3} /></FormLabel>
                                        <FormControl>
                                            <Input className='rounded-full p-5 border-gray-200' placeholder="Type here" {...field} />
                                        </FormControl>
                                        <FormDescription className='e-formd text-side-blue text-[12px]'>
                                            Use comma (,) to separate multiple Keywords
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex w-full justify-end">
                            <Button variant={"normal"} className='w-full sm:w-auto' type='submit' size={"normal"}>Next</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default DetailsStep