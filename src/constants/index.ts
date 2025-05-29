import { sidebarLinksType } from "@/types";

export const sidebarLinks: sidebarLinksType[] = [
    {
        title: "Events",
        links: [
            {
                icon: "/icons/ticket.svg",
                title: "Events",
                href: "/events"
            },
            {
                icon: "/icons/settings.svg",
                title: "Events Settings",
                href: "/settings"
            }
        ]
    },
    {
        title: "Sales",
        links: [
            {
                icon: "/icons/funnel.svg",
                title: "Event Sales",
                href: "/sales"
            },
            {
                icon: "/icons/booking.svg",
                title: "Event Booking",
                href: "/booking"
            }
        ] 
    }
]

export const config = {
    CLOUDINARY_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
    CLOUDINARY_API_SECRET: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET!,
    CLOUDINARY_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!
}

export const EventStatus = {
    DRAFT: "DRAFT",
    PUBLISHED: "PUBLISHED",
}

export const textEditorLinks = [
    "File",
    "Edit",
    "Insert",
    "Format",
    "Tools",
    "Table"
]