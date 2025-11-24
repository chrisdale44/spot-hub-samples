import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import OptionsList from "./OptionsList";
import type { Option } from "./types";

describe("OptionsList Component", () => {
  const mockOptions: Option[] = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
    { id: 4, name: "Pineapple" },
  ];
  const mockClickHandler = vi.fn();
  const mockMouseDownHandler = vi.fn();

  it("renders the correct number of options", () => {
    render(
      <OptionsList
        options={mockOptions}
        handleClick={mockClickHandler}
        handleOnMouseDown={mockMouseDownHandler}
        value=""
      />
    );

    const renderedOptions = screen.getAllByRole("listitem");
    expect(renderedOptions.length).toBe(mockOptions.length);
  });

  it("boldens the matching part of the option name", () => {
    const searchValue = "ap";
    render(
      <OptionsList
        options={mockOptions}
        handleClick={mockClickHandler}
        handleOnMouseDown={mockMouseDownHandler}
        value={searchValue}
      />
    );

    const firstOption = screen.getAllByTestId("option-1")[0];
    expect(firstOption.innerHTML).toContain("<strong>Ap</strong>");

    const fourthOption = screen.getAllByTestId("option-4")[0];
    expect(fourthOption.innerHTML).toContain("<strong>ap</strong>");
  });

  it("calls the click handler when an option is clicked", () => {
    render(
      <OptionsList
        options={mockOptions}
        handleClick={mockClickHandler}
        handleOnMouseDown={mockMouseDownHandler}
        value=""
      />
    );

    const firstOption = screen.getByTestId("option-1");
    firstOption.click();

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    expect(mockClickHandler).toHaveBeenCalledWith(
      expect.any(Object),
      mockOptions[0]
    );
  });
});
