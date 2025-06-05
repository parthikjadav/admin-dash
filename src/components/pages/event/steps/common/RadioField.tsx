import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, TimingGroupItem } from '@/components/ui/radio-group'
import { Asterisk } from 'lucide-react'
import React from 'react'

interface RadioFieldProps {
    control: any
    label: string
    values: string[]
    name: string
    description?: string
}

const RadioField = ({ control, label, values, name, description }: RadioFieldProps) => {
    return (
        <>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <div className='space-y-0.5'>
                            <FormLabel className="text-[14px] text-side-blue font-normal">
                                {label} <Asterisk color="red" size={14} />
                            </FormLabel>
                            {description && <FormDescription className='e-desc'>{description}</FormDescription>}
                        </div>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-5"
                        >
                            {values.map((val: string, ind: number) => (
                                <FormItem key={ind} className="flex items-center gap-3">
                                    <FormControl className="p-3!">
                                        <TimingGroupItem value={val} />
                                    </FormControl>
                                    <FormLabel className="font-normal text-xs capitalize">
                                        {val}
                                    </FormLabel>
                                </FormItem>
                            ))}
                        </RadioGroup>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}

export default RadioField