"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface MultiSelectComboboxProps {
  items: string[]
  value: string[]
  onChange: (value: string[]) => void
}

export function MultiSelectCombobox({ items, value, onChange }: MultiSelectComboboxProps) {
  const [open, setOpen] = useState(false)

  const toggleItem = (item: string) => {
    const newValue = value.includes(item)
      ? value.filter(i => i !== item)
      : [...value, item]
    onChange(newValue)
  }

  const checkLength = (values: string[]) => {
     if(values.length === 0) return "Select"
     if(values.length > 2) {
      return values.slice(0, 1).join(", ") + " + " + (values.length - 2) + " more" 
     }else {
      return values.join(", ")
     }
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" className="max-w-full flex-1 justify-between rounded-full p-5 border-gray-200">
            <span className="text-side-gray text-sm font-normal ms-2">
              {checkLength(value)}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 me-2 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              {items.map((item) => (
                <CommandItem key={item} onSelect={() => toggleItem(item)}>
                  <div className="flex items-center justify-between w-full text-side-blue text-sm font-normal ms-2">
                    {item}
                    {value.includes(item) && <Check className="h-4 w-4" />}
                  </div>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
