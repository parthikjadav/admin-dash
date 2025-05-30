"use server"

import { EventDetailsFormInputs } from "@/components/pages/event/steps/DetailsStep";
import { getUser } from "./auth";
import connectDB from "@/lib/mongoose";
import api from "@/lib/axios";

export const createEvent = async (data: EventDetailsFormInputs, eventId: string | null) => {
  try {
    await connectDB();
    const user = await getUser()

    const res = await api.post("/event", { data, user, eventId })
    if (res.status === 200) {
      return res.data.id;
    }
  } catch (error) {
    console.log(error, "error");
    return false;
  }
}