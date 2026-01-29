"use client";
import React, { useState } from "react";
import { ModeSelection } from "./ModeSelection";
import { TitleStep, AuthorStep, ISBNStep, ExtraFieldsStep, CameraStep } from "./steps";
import  { FileLinkStep } from "./steps/FileLinkStep";
import StepsOverview from "./StepsOverview";


const AddBookFlow = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState('camera');
  const [formData, setFormData] = useState({
    title: "", authors: [], isbn: "", extras: {}, importUrl: ""
  });

// Define which components render for which mode in which order
const FLOWS = {
  manual: [TitleStep, AuthorStep, ISBNStep, ExtraFieldsStep],
  camera: [CameraStep, TitleStep, AuthorStep, ExtraFieldsStep],
  link:   [FileLinkStep, TitleStep, AuthorStep, ExtraFieldsStep],
};

const STEP_NAMES = {
  manual: ['Title', 'Author', 'ISBN', 'Extra Fields'],
  camera: ['Camera', 'Title', 'Author', 'Extra Fields'],
  link:   ['File Link', 'Title', 'Author', 'Extra Fields'],
};

  const currentFlow = FLOWS[mode] || [];
  const CurrentStepComponent = currentFlow[step - 1];

  const handleNext = () => {
    if (step < currentFlow.length) setStep(step + 1);
    else submitData();
  };

  const submitData = async () => {
    console.log("Final Data:", formData);
    onComplete();
    setStep(0);
    setMode(null);
    setFormData({
      title: "", authors: [], isbn: "", extras: {}, importUrl: ""
    }); 
    // Reset logic...
  };

  return (
    <div className="p-[16px] pt-0">
      {/* {step === 0 && mode != 'camera'? (
        <ModeSelection 
          onSelect={(m) => { setMode(m); setStep(1); }} 
          onCancel={onComplete} 
        />
      ) : ( */}
        <div className="flex flex-col gap-2 flow-step-container">
          {/* Dynamic Step Rendering */}
          
<StepsOverview setStep={setStep} currentStep={step} totalSteps={currentFlow.length} stepNames={STEP_NAMES[mode]} />

          {CurrentStepComponent && (
            <CurrentStepComponent 
              formData={formData} 
              setFormData={setFormData} // Or a specialized update function
            />
          )}

          {/* Navigation Bar */}
          <div className="flex justify-between mt-4">

            <button onClick={() => setStep(step - 1)} className="px-6 py-2 bg-gray-100 rounded-full text-black">
              {step === 1 ? "Cancel" : "Back"}
            </button>

            <div className="flex gap-[8px]">
              <button
              
                onClick={() => {
                  console.log("jeg er info ift. step: " + step);
                }}
                className="px-4 py-2 bg-gray-100 rounded-3xl font-bold text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-info-icon lucide-info"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </button>
            
            <button onClick={handleNext} className="px-6 py-2 bg-slate-900 text-white rounded-full">
              {step === currentFlow.length ? "Finish" : "Next"}
            </button>
          </div>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default AddBookFlow;