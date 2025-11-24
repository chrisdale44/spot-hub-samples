import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import FormStepperNav from "./FormStepperNav";

const defaultProps = {
  currentStep: 0,
  stepsLength: 3,
  isLoading: false,
  hasErrors: false,
  handleNext: () => {},
};

const formStepperNavFactory = (props = {}) => {
  return render(<FormStepperNav {...defaultProps} {...props} />);
};

describe("COMPONENT: FormStepperNav", () => {
  it("should render Next button when not on last step", () => {
    const screen = formStepperNavFactory();
    expect(screen.getByTestId("next-button")).toBeInTheDocument();
    expect(screen.asFragment()).toMatchSnapshot();
  });

  it("should render Submit button when on last step", () => {
    const screen = formStepperNavFactory({ currentStep: 2 });
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    expect(screen.asFragment()).toMatchSnapshot();
  });

  it("should disable Submit button when there are errors", () => {
    const screen = formStepperNavFactory({ currentStep: 2, hasErrors: true });
    expect(screen.getByTestId("submit-button")).toBeDisabled();
    expect(screen.asFragment()).toMatchSnapshot();
  });

  it("should show loading spinner when isLoading is true", () => {
    const screen = formStepperNavFactory({ currentStep: 2, isLoading: true });
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.asFragment()).toMatchSnapshot();
  });
});
