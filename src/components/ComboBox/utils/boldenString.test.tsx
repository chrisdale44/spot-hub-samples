import boldenString from "./boldenString";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

describe("UTIL: boldenString", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return the original string if boldStr is empty", () => {
    const result = boldenString("Hello World", "");
    expect(result).toBe("Hello World");
  });

  it("should return the original string if boldStr is not found", () => {
    const result = boldenString("Hello World", "Test");
    expect(result).toBe("Hello World");
  });

  it("should return the original string if boldStr is null", () => {
    const result = boldenString("Hello World", null);
    expect(result).toBe("Hello World");
  });

  it("should bold the matching substring in the string", () => {
    render(
      <div data-testid="bolden-test">
        {boldenString("Hello World", "World")}
      </div>
    );
    const container = screen.getByTestId("bolden-test");
    expect(container).toHaveTextContent("Hello World");
    expect(container.querySelector("strong")).toBeInTheDocument();
    expect(container.querySelector("strong")).toHaveTextContent("World");
  });

  it("should handle case insensitivity when bolding", () => {
    render(
      <div data-testid="bolden-test">
        {boldenString("Hello World", "world")}
      </div>
    );
    const container = screen.getByTestId("bolden-test");
    expect(container).toHaveTextContent("Hello World");
    expect(container.querySelector("strong")).toBeInTheDocument();
    expect(container.querySelector("strong")).toHaveTextContent("World");
  });
});
