import TickIcon from "@/icons/TickIcon";
import type { Step } from "./types";

type ProgressDotProps = {
  step: Step;
  index: number;
  currentStep: number;
  stepsLength: number;
  handleStepClick: (index: number) => void;
};

const ProgressDot = ({
  step,
  index,
  currentStep,
  stepsLength,
  handleStepClick,
}: ProgressDotProps) => {
  return (
    <>
      <div
        className={`flex flex-col items-center z-10 transition-all duration-500 ease-in-out cursor-pointer 
                  ${index <= currentStep ? "text-white" : "text-gray-700"}
                  `}
        onClick={() => handleStepClick(index)}
        data-testid="progress-dot"
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-md border-2 border-gray-300 font-semibold
                    ${
                      index < currentStep
                        ? "bg-gray-700 border-gray-700"
                        : index === currentStep
                        ? "bg-[#1e6cab] border-[#1e6cab]"
                        : "bg-white"
                    }
                    transition-colors duration-500 ease-in-out`}
        >
          {index < currentStep ? (
            <TickIcon className="w-4 h-4 text-white" />
          ) : (
            index + 1
          )}
        </div>
        <span
          className={`absolute top-10 text-sm text-center w-24 text-gray-700 
                    ${index <= currentStep ? "font-semibold" : ""}
                    transition-colors duration-500 ease-in-out`}
        >
          {step.label}
        </span>
      </div>

      {index < stepsLength - 1 && (
        <div
          className={`flex-1 h-1 rounded-full mx-2 transition-colors duration-500 ease-in-out
                    ${index < currentStep ? "bg-gray-700" : "bg-gray-300"}`}
        ></div>
      )}
    </>
  );
};

ProgressDot.displayName = "ProgressDot";

export default ProgressDot;
