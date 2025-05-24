"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import SalesMenuItems from "./SalesMenuItems"

export function MenuDemo() {
    return (
        <div className="ps-5 sm:p-2 md:bg-white rounded-full relative mb-2 transition duration-300 max-w-full">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-[80px] sm:w-[120px]")} asChild>
                            <Link href={"/dashboard"}>
                                Dashboard
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="w-[60px] sm:w-[80px] text-[12px]">Sale</NavigationMenuTrigger>
                        <NavigationMenuContent className="">
                            <ul className="w-[300px] md:w-[400px] lg:w-[600px]">
                                <li>
                                    <NavigationMenuLink asChild >
                                        <SalesMenuItems />  
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="w-[80px] sm:w-[120px] text-[12px]">Members</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="w-[300px] md:w-[400px] lg:w-[600px]">
                                <li>
                                    <NavigationMenuLink asChild >
                                        <SalesMenuItems />
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-[80px] sm:w-[100px]")}>
                            Schedule
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "w-[80px] sm:w-[100px]")}>
                            Check In
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}