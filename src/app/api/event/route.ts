import { getUser } from "@/actions/auth";
import { decrypt } from "@/lib/auth";
import connectDB from "@/lib/mongoose";
import EventDetails from "@/models/eventDetails";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const { data, user, eventId = '' } = await request.json()
        
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 })
        }

        let event;
        const { title, description, danceStyle, danceLevel, socialTags, amenities, parkingFacilities } = data;

        if (eventId && eventId !== "") {
            // update event
            event = await EventDetails.findByIdAndUpdate(eventId, {
                userId: user._id,
                title,
                description,
                danceStyle,
                danceLevel,
                socialTags,
                amenities,
                parkingFacilities,
            })
        } else {
            event = await EventDetails.create({
                userId: user._id,
                title,
                description,
                danceStyle,
                danceLevel,
                socialTags,
                amenities,
                parkingFacilities,
            })
        }
        const id = event._id;
        return NextResponse.json({ message: "Event created successfully", success: true, id }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error creating event", success: false }, { status: 500 })
    }
}
