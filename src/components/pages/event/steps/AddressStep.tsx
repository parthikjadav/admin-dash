"use client"

import { CustomComboBox } from '@/components/CustomComboBox'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { countries, indianCities, indianStates } from '@/constants'
import useAddressStore from '@/store/address'
import { zodResolver } from '@hookform/resolvers/zod'
import { Asterisk } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AddressRadioGroupItem, RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { z } from 'zod'
import BackButton from '../BackButton'
import { addAddress, getSavedAddresses } from '@/actions/event'
import useEventFormStore from '@/store/eventForm'
import useStepsStore from '@/store/stepper'

export const AddressFormSchema = z.object({
    address: z.string().min(3, { message: 'Address should be at least 3 characters' }).max(100, { message: 'Address can not be more than 100 characters' }),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    zip: z.string().min(4, { message: 'Zip need to be greater then 4 digits' }).max(10, { message: 'Zip can not be more than 10 digits' }).regex(/^\d+$/, { message: 'Zip must contain only numbers' }),
    country: z.string().min(1, { message: 'Country is required' }),
    saveAddress: z.boolean().default(false).optional(),
})

export type AddressFormSchemaType = z.infer<typeof AddressFormSchema>

const AddressStep = () => {

    const [savedAddress, setSavedAddress] = useState([])
    const fetchAddresses = async () => {
        const res = await getSavedAddresses()
        if(res){
            setSavedAddress(res.addresses)
        }   
    }
    useEffect(()=>{
        fetchAddresses()
    },[])

    const addedAddress = useAddressStore((state) => state.address)
    const eventID = useEventFormStore((state) => state.eventID)
    const currentStep = useStepsStore((state) => state.stepCount)
    const setAddress = useAddressStore((state) => state.setAddress)
    const setCurrentStep = useStepsStore((state) => state.setStepCount)

    const form = useForm<AddressFormSchemaType>({
        resolver: zodResolver(AddressFormSchema),
        defaultValues: addedAddress || {
            address: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            saveAddress: false,
        }
    })

    const handleSelectedAddress = (addressIndex: string) => {
        const {address, city, state, zip, country, saveAddress} = savedAddress[parseInt(addressIndex)]
        form.setValue("address", address)
        form.setValue("city", city)
        form.setValue("state", state)
        form.setValue("zip", zip)
        form.setValue("country", country)
        form.setValue("saveAddress", saveAddress)
    }

    const onSubmit = async (data: AddressFormSchemaType) => {
        console.log(data)   
        if(!eventID) return
        const response: any = await addAddress(data, eventID)

        if(response && currentStep) {
            setAddress(response)
            setCurrentStep(currentStep + 1)
        }
    }
    return (
        <>
            <div className='py-8'>
                <Form {...form}>
                    <form id="address-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <div className="event-heading">
                            <h3 className='font-semibold text-lg tracking-wide text-side-blue'> Address Information </h3>
                        </div>
                        <div className='md:flex space-y-5 gap-4 items-start justify-between'>
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className='w-full md:w-2/3'>
                                        <FormLabel className='e-formt font-normal'>Address<Asterisk color='red' size={14} /></FormLabel>
                                        <FormControl>
                                            <Input className='rounded-full p-5 border-gray-200' placeholder="Type here" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="zip"
                                render={({ field }) => (
                                    <FormItem className='w-full md:w-1/3'>
                                        <FormLabel className='e-formt font-normal'>Zip Code<Asterisk color='red' size={14} /></FormLabel>
                                        <FormControl>
                                            <Input className='rounded-full p-5 border-gray-200' placeholder="Enter Zip Code eg. 90210" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div className='md:flex space-y-5 gap-4 items-start justify-between'>
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem className='w-full md:w-1/3'>
                                        <FormLabel className='e-formt font-normal'>City<Asterisk color='red' size={14} /></FormLabel>
                                        <div className='flex gap-2 w-full'>
                                            <FormControl>
                                                <CustomComboBox label="City" defaultValue={field.value} onChange={field.onChange} values={indianCities} />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem className='w-full md:w-1/3'>
                                        <FormLabel className='e-formt font-normal'>State<Asterisk color='red' size={14} /></FormLabel>
                                        <div className='flex gap-2 w-full'>
                                            <FormControl>
                                                <CustomComboBox label="State" defaultValue={field.value} onChange={field.onChange} values={indianStates} />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem className='w-full md:w-1/3'>
                                        <FormLabel className='e-formt font-normal'>Country<Asterisk color='red' size={14} /></FormLabel>
                                        <div className='flex gap-2 w-full'>
                                            <FormControl>
                                                <CustomComboBox label="Country" defaultValue={field.value} onChange={field.onChange} values={countries} />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="saveAddress"
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormControl>
                                            <div className='flex-center justify-start gap-2'>
                                                <Checkbox
                                                    className='w-7 h-7 rounded-lg data-[state=checked]:bg-green-success!'
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                                <span className='text-[12px] text-side-blue'>Save this address for future use</span>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
                <Separator className='my-6' />
                <div className='mb-10'>
                    <h4 className='text-[14px] text-side-blue font-semibold py-4'>Saved Addresses</h4>
                    <div>
                        <RadioGroup defaultValue="option-1" onValueChange={handleSelectedAddress}>
                            {
                                savedAddress.map((item: AddressFormSchemaType, index: number) => {
                                    return <div key={index} className="flex items-center space-x-2">
                                        <AddressRadioGroupItem value={`${index}`} id={`option-${index}`} text={item.address}/>
                                    </div>
                                })
                            }
                        </RadioGroup>
                    </div>
                </div>
                <div className="flex w-full justify-end">
                    <div className='space-x-8'>
                        <BackButton />
                        <Button variant={"normal"} className='w-full sm:w-auto' form="address-form" type='submit' size={"normal"} disabled={false}>Next</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddressStep