import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ComboBox from "./index";

describe.skip("COMPONENT: ComboBox", () => {
  beforeEach(() => {
    render(<ComboBox />);
  });

  it("should render the combobox component", () => {
    expect(screen.getByTestId("combobox")).toBeInTheDocument();
  });

  it("should display the correct number of options", () => {
    const options = screen.getAllByTestId("combobox-option");
    expect(options.length).toBe(5); // Adjust this based on your actual number of options
  });

  it("should display the correct content in each option", () => {
    const options = screen.getAllByTestId("combobox-option");
    expect(options[0].textContent).toBe("Option 1"); // Adjust this based on your actual option content
    expect(options[1].textContent).toBe("Option 2");
    expect(options[2].textContent).toBe("Option 3");
  });
});
