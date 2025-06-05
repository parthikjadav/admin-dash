import connectDB from "@/lib/mongoose";
import EventDetails from "@/models/eventDetails";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const data = await request.json();
        const { data: timing, userId, eventId } = data;
        console.log(timing);
        if (!userId || !timing || !eventId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 })
        }

        const event = await EventDetails.findByIdAndUpdate(eventId, {
            timezone: timing.timezone,
            eventType: timing.eventType,
            countDownTimer: timing.countDownTimer,
            timings: timing.timings
        }, { new: true });
        console.log(event, "e");

        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 })
        }

        const { timezone, eventType, countDownTimer, timings } = event

        return NextResponse.json({
            message: "Timing updated successfully", timing: {
                timezone,
                eventType,
                countDownTimer,
                timings,
            }
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}