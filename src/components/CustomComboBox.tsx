"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxDemoProps {
    value: string,
    label: string
}

export function CustomComboBox({ values, defaultValue, label, onChange, width = "full" }: { values: ComboboxDemoProps[], defaultValue: string, label: string, onChange: (value: string) => void, width?: string }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(defaultValue)

    React.useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full rounded-full py-5 text-[12px] text-side-blue justify-between "
                >
                    {value
                        ? values.find((framework) => framework.value === value)?.label 
                        : <span className="text-[12px] text-gray-500">Select</span>}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn("w-[200px] p-0",width)}>
                <Command>
                    <CommandInput placeholder={`Search ${label}...`} />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {values.map((framework: ComboboxDemoProps) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        onChange(currentValue === value ? "" : currentValue)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
