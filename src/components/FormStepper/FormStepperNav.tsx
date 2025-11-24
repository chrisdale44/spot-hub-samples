import LoadingSpinner from "@/icons/LoadingSpinner";
import { cn } from "@/utils/cn";

type FormStepperNavProps = {
  currentStep: number;
  stepsLength: number;
  isLoading: boolean;
  hasErrors: boolean;
  handleNext: (e: React.MouseEvent) => void;
};

const FormStepperNav = ({
  currentStep,
  stepsLength,
  isLoading,
  hasErrors,
  handleNext,
}: FormStepperNavProps) => {
  return currentStep === stepsLength - 1 ? (
    <button
      type="submit"
      className={cn(
        `px-8 py-2 font-bold text-white  rounded  focus:outline-none focus:shadow-outline bg-[#5cb85c] hover:bg-[#449C44]`,
        {
          "cursor-not-allowed": isLoading || hasErrors,
          "opacity-50": hasErrors,
        }
      )}
      disabled={hasErrors}
      data-testid="submit-button"
    >
      {isLoading ? <LoadingSpinner className="w-5 h-5 text-white" /> : "Submit"}
    </button>
  ) : (
    <button
      type="button"
      onClick={handleNext}
      className="px-8 py-2 font-bold text-white  rounded  focus:outline-none focus:shadow-outline bg-[#1e6cab] hover:bg-[#387db6]"
      data-testid="next-button"
    >
      Next
    </button>
  );
};

FormStepperNav.displayName = "FormStepperNav";

export default FormStepperNav;
