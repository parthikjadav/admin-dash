import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Asterisk } from 'lucide-react'
import React from 'react'

interface SelectFieldProps {
    control: any
    values: string[]
    label: string,
    name: string
    placeholder?: string
    required?: boolean
    className?: string
}

const SelectField = ({ name, control, values, label, placeholder, className, required }: SelectFieldProps) => {
    return (
        <>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className='text-[14px] font-normal text-side-blue'>{label} {required && <Asterisk size={12} className='text-red-500'/>}</FormLabel>
                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className={cn("text-xs capitalize shadow-none text-side-blue w-1/3 border-gray-300 border-1 flex justify-between px-5 py-5 rounded-full", className)}>
                                <SelectValue placeholder={placeholder || "Select"} />
                            </SelectTrigger>
                            <SelectContent className='rounded-lg p-1'>
                                <SelectGroup>
                                    {
                                        values.map((value, i) => (
                                            <SelectItem key={i} className="capitalize" value={value} >{value}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select >
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </>
    )
}

export default SelectField