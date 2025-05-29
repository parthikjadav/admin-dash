"use server"

import { EventDetailsFormInputs, EventDetailsFormSchema } from "@/components/pages/event/steps/DetailsStep";
import { getUser } from "./auth";
import assert from "node:assert";
import connectDB from "@/lib/mongoose";
import EventDetails from "@/models/eventDetails";

export const createEvent = async (data: EventDetailsFormInputs, eventId: string | null) => {
  try {
    await connectDB();
    const user = await getUser()
    assert(user, "User not found or not authenticated");
    let event;
    const { title, description, danceStyle, danceLevel, socialTags, amenities, parkingFacilities } = data;
    console.log(eventId,"id");
    
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
    console.log(event, "event");
    const id = event._id;
    console.log(id.toString(), "id");
    
    return id.toString();
  } catch (error) {
    console.log(error, "error");
    return false;
  }
}