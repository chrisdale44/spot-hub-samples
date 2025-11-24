import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ComboBox from ".";
import { Option } from "./types";

describe("COMPONENT: ComboBox", () => {
  const mockOptions: Option[] = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
    { id: 4, name: "Pineapple" },
  ];

  const mockOnSelection = vi.fn();
  const mockOnSubmit = vi.fn();
  const mockOnClear = vi.fn();

  const comboBoxFactory = (props = {}) => {
    const defaultProps = {
      allOptions: mockOptions,
      onSelection: mockOnSelection,
      onSubmit: mockOnSubmit,
      placeholder: "Search...",
      notFoundMessage: "No results found",
      name: "combobox",
    };

    return render(<ComboBox {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the combobox component", () => {
    const screen = comboBoxFactory();
    expect(screen.getByTestId("combobox")).toBeInTheDocument();
    expect(screen.asFragment()).toMatchSnapshot();
  });

  it("renders the input field with placeholder", () => {
    const screen = comboBoxFactory();
    const input = screen.getByTestId("combobox-input");
    expect(input).toBeInTheDocument();
  });

  it("shows options when input is focused", () => {
    const screen = comboBoxFactory();
    const input = screen.getByTestId("combobox-input");
    fireEvent.focus(input);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(mockOptions.length);
  });

  it("filters options based on input value", () => {
    const screen = comboBoxFactory();
    const input = screen.getByTestId("combobox-input");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "app" } });

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2); // Apple and Pineapple
    expect(items[0]).toHaveTextContent("Apple");
    expect(items[1]).toHaveTextContent("Pineapple");
  });

  it("shows not found message when no options match", () => {
    const screen = comboBoxFactory();
    const input = screen.getByTestId("combobox-input");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "xyz" } });

    expect(screen.getByText("No results found")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("calls onSelection when an option is clicked", () => {
    const screen = comboBoxFactory();
    const input = screen.getByTestId("combobox-input");
    fireEvent.focus(input);
    fireEvent.click(screen.getAllByRole("listitem")[0]);

    expect(mockOnSelection).toHaveBeenCalledWith(mockOptions[0]);
    expect(input).toHaveValue("");
  });

  it("calls onSubmit when Enter is pressed", () => {
    const screen = comboBoxFactory();
    const input = screen.getByTestId("combobox-input");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", keyCode: 13 });

    expect(mockOnSubmit).toHaveBeenCalledWith("test");
    expect(input).toHaveValue("");
  });

  it("shows clear button when input has value", () => {
    const screen = comboBoxFactory();
    const input = screen.getByTestId("combobox-input");
    fireEvent.change(input, { target: { value: "test" } });

    expect(screen.getByTestId("close-icon")).toBeInTheDocument();
  });

  it("clears input when clear button is clicked", () => {
    const screen = comboBoxFactory({ onClear: mockOnClear });
    const input = screen.getByTestId("combobox-input");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(screen.getByTestId("close-icon"));

    expect(input).toHaveValue("");
    expect(mockOnClear).toHaveBeenCalled();
  });

  it("renders submit icon button when provided", () => {
    const screen = comboBoxFactory({ submitIcon: "Go" });
    expect(screen.getByText("Go")).toBeInTheDocument();
  });

  it("calls onSubmit when submit icon is clicked", () => {
    const screen = comboBoxFactory({ submitIcon: "Go" });
    const input = screen.getByTestId("combobox-input");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(screen.getByText("Go"));

    expect(mockOnSubmit).toHaveBeenCalledWith("test");
    expect(input).toHaveValue("");
  });
});
