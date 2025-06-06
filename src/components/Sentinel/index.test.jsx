import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Sentinel from ".";

vi.mock("react-intersection-observer", () => ({
  InView: ({ children, onChange }) => {
    window.__inViewHandler = onChange;
    return children({ ref: vi.fn() });
  },
}));

describe("Sentinel Component", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.__inViewHandler = null;
    render(<Sentinel onChange={mockOnChange} />);
  });

  it("renders the sentinel element", () => {
    expect(screen.getByTestId("sentinel")).toBeInTheDocument();
  });

  it("calls onChange when coming into view", () => {
    // Simulate coming into view
    window.__inViewHandler(true);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("does not call onChange when going out of view", () => {
    // Simulate going out of view
    window.__inViewHandler(false);
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
