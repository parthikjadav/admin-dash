"use server"

import { EventDetailsFormInputs } from "@/components/pages/event/steps/DetailsStep";
import { getUser } from "./auth";
import connectDB from "@/lib/mongoose";
import api from "@/lib/axios";
import { AddressFormSchemaType } from "@/components/pages/event/steps/AddressStep";
import { DateFormSchemaType } from "@/validation";

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

export const addAddress = async (data: AddressFormSchemaType,eventId: string) => {
  try {
    await connectDB();
    const user = await getUser()

    const res = await api.post("/event/address", { data, user, eventId })
    if (res.status !== 200) {
      return false;
    }
    const savedAddress: AddressFormSchemaType = res.data;
    return savedAddress.address;
  } catch (error) {
    console.log(error, "error");
    return false;
  }
}

export async function getSavedAddresses() {
  try {
    await connectDB();
    const user = await getUser()
    if(!user._id){
      return false
    }
    const res = await api.post(`/event/address/saved`, { userId: user._id })
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.log(error, "error");
    return false;
  }
}

export async function createEventTiming(data: DateFormSchemaType, eventId: string) {
  try {
    await connectDB();
    const user = await getUser()
    if(!user._id){  
      return false
    }
    const res = await api.post(`/event/timing`, { data,userId: user._id, eventId })
    
    if (res.status !== 200) {
      return false;
    }
    return res.data.timing;
  } catch (error) {
    console.log(error, "error");
    return false;
  }
}