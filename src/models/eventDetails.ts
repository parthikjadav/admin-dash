import { EventDetailsFormInputs } from "@/components/pages/event/steps/DetailsStep";
import { EventStatus } from "@/constants";
import mongoose from "mongoose";

interface EventDetails extends EventDetailsFormInputs, mongoose.Document {
    userId: mongoose.Types.ObjectId;
    status: "DRAFT" | "PUBLISHED";
}

const eventDetailsSchema = new mongoose.Schema<EventDetails>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    danceStyle: {
        required: true,
        type: [String],
    },
    danceLevel: {
        required: true,
        type: [String],
    },
    socialTags: {
        type: String,
    },
    amenities: {
        type: String,
    },
    parkingFacilities: {
        type: String,
    },
    status: {
        type: String,
        enum: [EventStatus.DRAFT,EventStatus.PUBLISHED],
        default: "DRAFT",
    },
})

const EventDetails = mongoose.models.EventDetails || mongoose.model<EventDetails>('EventDetails', eventDetailsSchema);

export default EventDetails;