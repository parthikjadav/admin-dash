"use client"

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useStepsStore from '@/store/stepper'
import { Step } from '@/types'
import { Check, LoaderCircleIcon } from 'lucide-react'
import React from 'react'

const Stepper = ({ steps }: { steps: Step[] }) => {
  // const [currentStep, setCurrentStep] = React.useState(1)
  const currentStep = useStepsStore((state) => state.stepCount) || 1
  const canContinue = useStepsStore((state) => state.canContinue)
  const isError = useStepsStore((state) => state.isError)

  const setCurrentStep = useStepsStore((state) => state.setStepCount)
  const setCanContinue = useStepsStore((state) => state.setCanContinue)

  // if (!currentStep) {
  //   return (<div className='py-25 mx-auto'>
  //     <LoaderCircleIcon className='mx-auto animate-spin' />
  //   </div>)
  // }

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      setCanContinue(false)
    }
  }
  
  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setCanContinue(true)
    }
  }

  return (
    <div className='py-8'>
      <div>
        <div className="flex-center gap-1 sm:gap-x-0 lg:gap-x-5 md:gap-x-0 ">
          {
            steps.map((step, index) => (
              <div key={index} className='flex-center flex-col relative w-[50px] sm:w-[120px] text-sm text-center font-semibold'>
                <div className={`w-7 h-7 rounded-full flex-center border ${currentStep > index + 1 ? 'bg-green-500' : 'border-gray-300'} ${currentStep === index + 1 ? 'text-primary-orange -(--color-primary-orange)' : 'text-side-gray'}`}>
                  {currentStep > index + 1 ? <Check className='text-white' size={14} /> : index + 1} 
                </div>
                <span className='mt-3 hidden md:block'>{step.label}</span>
                {index !== steps.length - 1 && <div className="line w-3 sm:w-4 md:w-8 h-[1px] bg-red-200 md:bg-gray-200 absolute right-[-5px] sm:right-[-10px] md:right-[-22px] sm:top-4"></div>}
              </div>
            ))
          }
        </div>
      </div>
      <Separator className='mt-10'/>
      <div className=''>
        <div className="content">
          {steps[currentStep - 1].content}
        </div>
        {/* <div className="btns flex gap-8 w-full justify-end">
        </div> */}
      </div>
    </div>
  )
}

export default Stepper