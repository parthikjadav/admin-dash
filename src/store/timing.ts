import { COUNTDOWN_TIME, EVENT_TYPES } from "@/constants";
import { DateFormSchemaType } from "@/validation";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TimingStore {
    timing: DateFormSchemaType | null
    setTiming: (timing: DateFormSchemaType | null) => void
}

const useTimingStore = create<TimingStore>()(persist((set) => ({
    timing: {
        timezone: "",
        eventType: EVENT_TYPES.SINGLE,
        countDownTimer: COUNTDOWN_TIME.ENABLED,
        timings: [
            {
                startDate: new Date(),
                startTime: "12:00",
                endDate: new Date(),
                endTime: "12:00",
            },
        ],
    },
    setTiming: (timing) => set({ timing })
}), {
    name: "timing"
}
))

export default useTimingStore

