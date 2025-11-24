import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ProgressDot from "./ProgressDot";

const defaultProps = {
  step: { label: "Step 1", content: <div>Step 1</div> },
  index: 0,
  currentStep: 0,
  stepsLength: 3,
  handleStepClick: () => {},
};

const progressDotFactory = (props = {}) => {
  return render(<ProgressDot {...defaultProps} {...props} />);
};

describe("COMPONENT: ProgressDot", () => {
  it("should render", () => {
    const screen = progressDotFactory();
    expect(screen.getByTestId("progress-dot")).toBeInTheDocument();
    expect(screen.asFragment()).toMatchSnapshot();
  });

  it("should display tick icon for completed steps", () => {
    const screen = progressDotFactory({ currentStep: 2, index: 0 });
    expect(
      screen.getByTestId("progress-dot").querySelector("svg")
    ).toBeInTheDocument();
  });

  it("should display step number for current and upcoming steps", () => {
    const screen = progressDotFactory({ currentStep: 1, index: 1 });
    expect(screen.getByTestId("progress-dot").textContent).toContain("2");
  });
});
