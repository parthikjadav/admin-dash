"use client"

import { signIn } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signInFormSchema, signInFormSchemaType } from '@/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const SignIn = () => {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: signInFormSchemaType) => {
        console.log(data)
        const success = await signIn(data)
        if (!success) {
            toast("Error signing in")
        }else{
            toast("Successfully signed in")
            router.push("/dashboard")
        }
    }

    return (
        <div className='flex flex-col items-center gap-4 p-8 rounded-lg shadow-lg w-100'>
            <h1 className='text-2xl font-bold text-center '>Sign In</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <FormField name="email" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='email@example.com' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="password" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder='123456' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button type='submit' disabled={form.formState.isSubmitting} className='w-full'>{form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}</Button>
                </form>
            </Form>
        </div>
    )
}

export default SignIn