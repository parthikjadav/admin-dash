import { EventDetailsFormInputs } from "@/components/pages/event/steps/DetailsStep";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type EventFormState = {
    eventID: string | null
    form: EventDetailsFormInputs | null
    setForm: (form: EventDetailsFormInputs) => void
    setEventID: (id: string) => void
}
const useEventFormStore = create<EventFormState>()(
    persist(
        (set) => ({
            eventID: null,
            form: {
                title: '',
                description: '',
                danceStyle: [],
                danceLevel: [],
                socialTags: '',
                amenities: '',
                parkingFacilities: '',
            },
            setForm: (data: EventDetailsFormInputs) => set({ form: data }),
            setEventID: (id: string | null) => set({ eventID: id })
        }), {
        name: 'event-form-storage'
    }))

export default useEventFormStore