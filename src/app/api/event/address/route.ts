// import { AddressFormSchema } from "@/components/pages/event/steps/AddressStep";
import connectDB from "@/lib/mongoose";
import Address from "@/models/address";
import EventDetails from "@/models/eventDetails";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const data = await request.json();
        const { user, eventId, data: AddressData } = data;
        const AddressFormSchema = z.object({
            address: z.string().min(1),
            city: z.string().min(1),
            state: z.string().min(1),
            zip: z.string().min(1),
            country: z.string().min(1),
            saveAddress: z.boolean().optional(),
        });
        const parse = AddressFormSchema.parse(AddressData);

        const isAlreadyExistsAddress = await Address.findOneAndUpdate({ eventId }, { $set: {...parse} }, { new: true })

        if (!isAlreadyExistsAddress) {

            const address = await Address.create({
                address: parse.address,
                city: parse.city,
                state: parse.state,
                zip: parse.zip,
                country: parse.country,
                saveAddress: parse.saveAddress,
                userId: user._id,
                eventId
            })

            if (!address) {
                throw new Error("Address not saved")
            }

            const updateEvent = await EventDetails.updateOne({ _id: eventId }, { address: address._id })
            if (!updateEvent) {
                throw new Error("Event not updated")
            }
            return NextResponse.json({ message: "Address Saved", address, event: updateEvent }, { status: 200 });
        }

        return NextResponse.json({ message: "Address already exists", address: isAlreadyExistsAddress }, { status: 200 });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

