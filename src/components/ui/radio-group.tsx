"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon, MapPin, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Label } from "@radix-ui/react-label"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export function TimingGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input p-2 text-primary data-[state=checked]:border-green-600 focus:border-green-500 focus-visible:border-green-500 focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center "
      >
        <CircleIcon className="fill-green-500 absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2" strokeWidth={0}/>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export function AddressRadioGroupItem({
  className,
  text,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  text: string
}
) {
  return (
    <div className="border flex justify-between items-center border-gray-300 w-full rounded-full">
      <RadioGroupPrimitive.Item
        data-slot="radio-group-item"
        className={cn(
          "w-full! text-start text-primary p-2 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 rounded-full transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      > 
       <div className="flex items-center py-1">
        <MapPin size={16} strokeWidth={1.5} className="mx-2" />
        <Label htmlFor="option-one" className="w-full text-[12px] text-gray-500">{text}</Label>
       </div>
      </RadioGroupPrimitive.Item>
      <div className="">
        <Trash2 onClick={() => console.log('delete')} className="text-red-500 mx-4 w-4 sm:w-auto" size={20} strokeWidth={1.5}/>
      </div>
    </div>
  )
}

export { RadioGroup, RadioGroupItem }
