import { CANCELLATION_CHARGE_TYPE, CAPACITY_TYPE, COUNTDOWN_TIME, EARLY_REGISTRATION_DISCOUNT_TYPE, EVENT_TYPES, PRICING_TYPE, REGISTRATION_TYPE } from "@/constants"
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

export const DateFormSchema = z.object({
  timezone: z.string().min(1, "timezone is required"),
  eventType: z.enum([EVENT_TYPES.SINGLE, EVENT_TYPES.MULTIPLE]),
  countDownTimer: z.enum([COUNTDOWN_TIME.ENABLED, COUNTDOWN_TIME.DISABLED]),
  timings: z.array(z.object({
    startDate: z.date(),
    startTime: z.string().min(1, "start time is required"),
    endDate: z.date(),
    endTime: z.string().min(1, "end time is required"),
  }))
})

export type DateFormSchemaType = z.infer<typeof DateFormSchema>

export const PricingFormSchema = z.object({
    paymentType: z.enum([PRICING_TYPE.FREE, PRICING_TYPE.PAID]),
    ticketPrice: z.string().min(1, "ticket price is required").transform((val) => Number(val)).optional(),
    onlineTicketDiscount: z.string().max(100, "discount must be less than 100%").transform((val) => Number(val)).optional(),
    refundPolicy: z.boolean().default(false),
    cancellationChargeType: z.enum([CANCELLATION_CHARGE_TYPE.PERCENTAGE, CANCELLATION_CHARGE_TYPE.FIXED]).optional(),
    collectionCharge: z.string().min(1, "collection charge is required").optional(),
    earlyRegistrationDiscount: z.boolean().default(false),
    earlyRegistrationDiscountType: z.enum([EARLY_REGISTRATION_DISCOUNT_TYPE.PERCENTAGE, EARLY_REGISTRATION_DISCOUNT_TYPE.FIXED]).optional(),
    earlyRegistrationAmount: z.string().min(1, "early registration amount is required").transform((val) => Number(val)).optional(),
    // discountEndDateAndTime: z.object({
    //   endDate: z.date(),
    //   endTime: z.string().min(1, "end time is required"),
    // }),
    registrationType: z.enum([REGISTRATION_TYPE.ONLINE, REGISTRATION_TYPE.OFFLINE]),
    capacityType: z.enum([CAPACITY_TYPE.LIMITED, CAPACITY_TYPE.UNLIMITED]).default(CAPACITY_TYPE.UNLIMITED),
    // totalTickets: z.number().min(1, "total tickets is required").optional(),
})

export type PricingFromType = z.infer<typeof PricingFormSchema>
