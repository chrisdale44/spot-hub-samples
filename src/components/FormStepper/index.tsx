import React, { useState } from "react";
import { FieldErrors } from "react-hook-form";
import ProgressDot from "./ProgressDot";
import FormStepperNav from "./FormStepperNav";
import type { Step } from "./types";

type FormStepperProps<
  TFormValues extends Record<string, any> = Record<string, any>
> = {
  steps: Step[];
  isLoading: boolean;
  errors: FieldErrors<TFormValues>;
};

const FormStepper = ({ steps, isLoading, errors }: FormStepperProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const hasErrors: boolean = Object.keys(errors).length > 0;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleStepClick = (index: number) => {
    if (index !== currentStep) {
      setCurrentStep(index);
    }
  };

  return (
    <div className="w-full h-full" data-testid="form-stepper">
      <div className="relative flex items-center justify-between mx-2 mb-14">
        {steps.map((step, index) => (
          <ProgressDot
            key={`dot-${index}`}
            step={step}
            index={index}
            currentStep={currentStep}
            stepsLength={steps.length}
            handleStepClick={handleStepClick}
          />
        ))}
      </div>

      <div className="relative mb-8 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentStep * 100}%)` }}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full overflow-hidden"
              data-testid="step"
            >
              {step.content}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <FormStepperNav
          currentStep={currentStep}
          stepsLength={steps.length}
          isLoading={isLoading}
          hasErrors={hasErrors}
          handleNext={handleNext}
        />
      </div>
    </div>
  );
};

FormStepper.displayName = "FormStepper";

export default FormStepper;
