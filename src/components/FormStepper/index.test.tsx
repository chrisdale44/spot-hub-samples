import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import FormStepper from ".";

const defaultProps = {
  steps: [
    {
      label: "Step 1",
      content: <div>Step 1</div>,
    },
    {
      label: "Step 2",
      content: <div>Step 2</div>,
    },
    {
      label: "Step 3",
      content: <div>Step 3</div>,
    },
  ],
  isLoading: false,
  errors: {},
};

const formStepperFactory = (props = {}) => {
  return render(<FormStepper {...defaultProps} {...props} />);
};

describe("COMPONENT: FormStepper", () => {
  it("should render", () => {
    const screen = formStepperFactory();
    expect(screen.getByTestId("form-stepper")).toBeInTheDocument();
    expect(screen.asFragment()).toMatchSnapshot();
  });

  it("should render correct number of steps", () => {
    const screen = formStepperFactory();
    const steps = screen.getAllByTestId(`step`);
    expect(steps.length).toEqual(defaultProps.steps.length);
  });

  it("should render correct number of progress dots", () => {
    const screen = formStepperFactory();
    const progressDots = screen.getAllByTestId(`progress-dot`);
    expect(progressDots.length).toEqual(defaultProps.steps.length);
  });

  it("should render a next button when not at the last step", async () => {
    const screen = formStepperFactory();
    expect(screen.getByTestId("next-button")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("next-button"));
    expect(screen.getByTestId("next-button")).toBeInTheDocument();
  });

  it("should render a submit button when on the last step", () => {
    const screen = formStepperFactory();
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("should disable submit button when there are errors", () => {
    const screen = formStepperFactory({
      errors: { field1: "Error" },
    });
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();
  });

  it("should show loading spinner when isLoading is true", () => {
    const screen = formStepperFactory({
      isLoading: true,
    });
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("should navigate to step when progress dot is clicked", () => {
    const screen = formStepperFactory();
    const progressDots = screen.getAllByTestId("progress-dot");
    const steps = screen.getAllByTestId(`step`);
    fireEvent.click(progressDots[2]);
    expect(steps[2]).toBeVisible();
  });

  it("should navigate through steps in correct order", () => {
    const screen = formStepperFactory();
    const nextButton = screen.getByTestId("next-button");
    const steps = screen.getAllByTestId(`step`);

    // Step 1
    expect(steps[0]).toBeVisible();

    // Step 2
    fireEvent.click(nextButton);
    expect(steps[1]).toBeVisible();

    // Step 3
    fireEvent.click(nextButton);
    expect(steps[2]).toBeVisible();
  });
});
