import { Button } from '@/components/ui/button'
import useStepsStore from '@/store/stepper'
import React from 'react'

const BackButton = () => {
    const currentStep = useStepsStore((state) => state.stepCount)

    const setCurrentStep = useStepsStore((state) => state.setStepCount)
    const setCanContinue = useStepsStore((state) => state.setCanContinue)
    
    const handleBackStep = () => {
        if (currentStep && currentStep > 1) {
            setCurrentStep(currentStep - 1)
            setCanContinue(true)
        }
    }

    return (
        <>
            <Button variant={"lightGray"} size={"normal"} onClick={handleBackStep} className={`${currentStep === 1 ? 'hidden' : ''}`}>Back</Button>
        </>
    )
}

export default BackButton