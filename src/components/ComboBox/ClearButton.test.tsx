import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import ClearButton from "./ClearButton";

describe("ClearButton Component", () => {
  const mockClearHandler = vi.fn();

  it("renders the ClearButton component", () => {
    render(<ClearButton handleClear={mockClearHandler} />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();

    const iconElement = screen.getByTestId("close-icon");
    expect(iconElement).toBeInTheDocument();
  });

  it("calls the clear handler when clicked", () => {
    render(<ClearButton handleClear={mockClearHandler} />);

    const buttonElement = screen.getByRole("button");
    buttonElement.click();

    expect(mockClearHandler).toHaveBeenCalledTimes(1);
  });
});
