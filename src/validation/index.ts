import { z } from "zod"

export const signUpFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "password must be at least 6 characters long")
})

export type signUpFormSchemaType = z.infer<typeof signUpFormSchema>

export const signInFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "password must be at least 6 characters long")
})

export type signInFormSchemaType = z.infer<typeof signInFormSchema>