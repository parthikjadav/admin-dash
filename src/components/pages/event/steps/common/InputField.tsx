"use client"

import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Asterisk } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InputFieldProps {
    control: any,
    name: string,
    label: string,
    type?: string,
    placeholder?: string,
    required?: boolean,
    className?: string
}

const InputField = ({control, name, label, type, placeholder, required, className}:InputFieldProps) => {
  return (
    <>
      <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className='w-1/3'>
              <FormLabel className='text-[14px] text-side-blue font-normal'>{label} {required &&  <Asterisk color="red" size={14} />}</FormLabel>
              <FormControl> 
                <Input type={type || "text"} placeholder={placeholder || "Type here"} className={cn('rounded-full text-[12px]! px-4 py-5', className)} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    </>
  )
}

export default InputField