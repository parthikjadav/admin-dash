import { sidebarLinksType } from "@/types";

export const sidebarLinks: sidebarLinksType[] = [
    {
        title: "Events",
        links: [
            {
                icon: "./icons/ticket.svg",
                title: "Events",
                href: "/events"
            },
            {
                icon: "./icons/settings.svg",
                title: "Events Settings",
                href: "/settings"
            }
        ]
    },
    {
        title: "Sales",
        links: [
            {
                icon: "./icons/funnel.svg",
                title: "Event Sales",
                href: "/sales"
            },
            {
                icon: "./icons/booking.svg",
                title: "Event Booking",
                href: "/booking"
            }
        ] 
    }
]
