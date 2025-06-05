import { EventDetailsFormInputs } from "@/components/pages/event/steps/DetailsStep";
import { COUNTDOWN_TIME, EVENT_TYPES, EventStatus } from "@/constants";
import { DateFormSchemaType } from "@/validation";
import mongoose from "mongoose";

interface EventDetails extends EventDetailsFormInputs, mongoose.Document, DateFormSchemaType {
    userId: mongoose.Types.ObjectId;
    status: "DRAFT" | "PUBLISHED";
    address: mongoose.Types.ObjectId;
}

const timingDateSchema = new mongoose.Schema({
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    }
})

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
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    },
    timezone: {
        type: String,
    },
    eventType: {
        type: String,
        enum: [EVENT_TYPES.SINGLE, EVENT_TYPES.MULTIPLE],
    },
    countDownTimer: {
        type: String,
        enum: [COUNTDOWN_TIME.ENABLED,COUNTDOWN_TIME.DISABLED]
    },
    timings: {
        type: [timingDateSchema]
    },
    status: {
        type: String,
        enum: [EventStatus.DRAFT,EventStatus.PUBLISHED],
        default: "DRAFT",
    },
}, {timestamps: true})

const EventDetails = mongoose.models.EventDetails || mongoose.model<EventDetails>('EventDetails', eventDetailsSchema);

export default EventDetails;