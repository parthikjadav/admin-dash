import { AddressFormSchemaType } from "@/components/pages/event/steps/AddressStep";
import mongoose from "mongoose";

interface AddressModel {
    userId: mongoose.Types.ObjectId;
    eventId: mongoose.Types.ObjectId;
}

const addressSchema = new mongoose.Schema<AddressModel & AddressFormSchemaType>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    saveAddress: { type: Boolean, default: false },
}, { timestamps: true })

const Address = mongoose.models.Address || mongoose.model<AddressFormSchemaType & AddressModel>('Address', addressSchema)

export default Address;