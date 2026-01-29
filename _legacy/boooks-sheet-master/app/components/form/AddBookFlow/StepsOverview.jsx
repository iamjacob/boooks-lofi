import React from 'react'
import StepsBtn from './StepsBtn'

const StepsOverview = ({ setStep, currentStep, totalSteps, stepNames = [] }) => {
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNum) => (
        <StepsBtn
          key={stepNum}
          variant={stepNum === currentStep ? 'chosen' : stepNum < currentStep ? 'filled' : 'empty'}
          onClick={() => setStep(stepNum)}
        >
          {stepNames[stepNum - 1] || `Step ${stepNum}`}
        </StepsBtn>
      ))}
    </div>
  )
}

export default StepsOverview