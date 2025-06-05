"use client"

import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Control } from 'react-hook-form';
import { CustomSwitch, Switch } from '@/components/ui/switch';

interface SwitchFieldProps {
    control: any;
    name: string;
    label: string;
    description?: string;
}

const SwitchField = ({ control, name, label, description }: SwitchFieldProps) => {
    return (
        <>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem className="space-y-4">
                        <div className="space-y-0.5">
                            <FormLabel>
                                <h3 className='eh3'>{label}</h3>
                            </FormLabel>
                            <FormDescription>
                                <span className='e-desc'>{description}</span>
                            </FormDescription>
                        </div>
                        <FormControl className='mb-0'>
                            <CustomSwitch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
        </>
    )
}

export default SwitchField