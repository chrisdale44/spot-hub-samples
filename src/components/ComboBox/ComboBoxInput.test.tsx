import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ComboBoxInput from "./ComboBoxInput";
import { useFormContext } from "react-hook-form";

vi.mock("react-hook-form", async () => {
  const actual = await vi.importActual<any>("react-hook-form");

  return {
    ...actual,
    useFormContext: vi.fn(),
  };
});

describe("ComboBoxInput Component", () => {
  const mockChangeHandler = vi.fn();
  const mockFocusHandler = vi.fn();
  const mockBlurHandler = vi.fn();
  const mockKeyDownHandler = vi.fn();

  const defaultProps = {
    name: "combobox",
    inputRef: React.createRef<HTMLInputElement>(),
    value: "",
    handleInputChange: mockChangeHandler,
    handleOnKeyDown: mockKeyDownHandler,
    setIsFocused: mockFocusHandler,
    handleOnBlur: mockBlurHandler,
    placeholder: "Select an option",
  };

  beforeEach(() => {
    (useFormContext as any).mockReturnValue({
      register: vi.fn(),
    });
    vi.clearAllMocks();
  });

  const comboBoxInputFactory = (props = {}) => {
    return render(<ComboBoxInput {...defaultProps} {...props} />);
  };

  it("renders the input with the correct placeholder", () => {
    const placeholderText = "Select an option";
    comboBoxInputFactory({ placeholder: placeholderText });

    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
  });

  it("calls the change handler on input change", () => {
    comboBoxInputFactory();

    const inputElement = screen.getByTestId(
      "combobox-input"
    ) as HTMLInputElement;
    const testValue = "Test Input";

    fireEvent.change(inputElement, { target: { value: testValue } });

    expect(mockChangeHandler).toHaveBeenCalled();
  });

  it("calls the focus handler on input focus", () => {
    comboBoxInputFactory();

    const inputElement = screen.getByTestId(
      "combobox-input"
    ) as HTMLInputElement;

    fireEvent.focus(inputElement);
    expect(mockFocusHandler).toHaveBeenCalledWith(true);
  });

  it("calls the blur handler on input blur", () => {
    comboBoxInputFactory();
    const inputElement = screen.getByTestId(
      "combobox-input"
    ) as HTMLInputElement;

    fireEvent.blur(inputElement);
    expect(mockBlurHandler).toHaveBeenCalled();
  });
});
