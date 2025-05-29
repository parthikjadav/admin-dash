import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { StepStoreType } from '@/types'

const useStepsStore = create<StepStoreType>()(
  persist(
    (set) => ({
      stepCount: null,
      isError: false,
      canContinue: false,
      setStepCount: (stepCount: number) => set({ stepCount }),
      setIsError: (isError: boolean) => set({ isError }),
      setCanContinue: (canContinue: boolean) => set({ canContinue }),
    }),
    {
      name: 'steps-store', // Unique key in localStorage
    }
  )
)

export default useStepsStore
