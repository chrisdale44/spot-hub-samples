import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Tile from ".";
import { MdImageNotSupported } from "@/icons/";
import Image from "next/image";

vi.mock("next/image", () => ({
  default: vi.fn(({ fill, unoptimized, ...props }) => (
    <img
      {...props}
      data-test-fill={fill ? "true" : "false"}
      data-test-unoptimized={unoptimized ? "true" : "false"}
    />
  )),
}));

vi.mock("@/icons/", () => ({
  MdImageNotSupported: () => <span data-testid="no-image-icon" />,
}));

describe("COMPONENT: Tile", () => {
  const mockOnClick = vi.fn();
  const baseItem = {
    name: "Test Item",
    thumb: "test-thumb.jpg",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with name and thumb", () => {
    render(<Tile item={baseItem} onClick={mockOnClick} />);

    expect(screen.getByTestId("tile-name")).toBeInTheDocument();
    expect(screen.getByTestId("tile-image")).toHaveAttribute(
      "src",
      "test-thumb.jpg"
    );
    expect(screen.getByTestId("tile-image")).toHaveAttribute(
      "alt",
      "Test Item"
    );
  });

  it("calls onClick when clicked", () => {
    render(<Tile item={baseItem} onClick={mockOnClick} />);

    fireEvent.click(screen.getByTestId("tile-image"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(baseItem);
  });

  it("calls onClick when name link is clicked", () => {
    render(<Tile item={baseItem} onClick={mockOnClick} />);

    fireEvent.click(screen.getByTestId("tile-name"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("renders without name when not provided", () => {
    const itemWithoutName = { ...baseItem, name: undefined };
    render(<Tile item={itemWithoutName} onClick={mockOnClick} />);

    expect(screen.queryByText("Test Item")).not.toBeInTheDocument();
    expect(screen.queryByTestId("tile-image")).toBeInTheDocument();
  });

  describe("when thumb is not provided", () => {
    it("renders a fallback", () => {
      const itemWithoutThumb = { ...baseItem, thumb: undefined };
      render(<Tile item={itemWithoutThumb} onClick={mockOnClick} />);

      expect(screen.queryByTestId("no-image-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("no-image")).toBeInTheDocument();
      expect(screen.queryByTestId("tile-image")).not.toBeInTheDocument();
    });

    it("calls onClick when fallback is clicked", () => {
      const itemWithoutThumb = { ...baseItem, thumb: undefined };
      render(<Tile item={itemWithoutThumb} onClick={mockOnClick} />);

      fireEvent.click(screen.queryByTestId("no-image"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  it("matches snapshot with thumb", () => {
    const { container } = render(
      <Tile item={baseItem} onClick={mockOnClick} />
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot without thumb", () => {
    const itemWithoutThumb = { ...baseItem, thumb: undefined };
    const { container } = render(
      <Tile item={itemWithoutThumb} onClick={mockOnClick} />
    );
    expect(container).toMatchSnapshot();
  });
});
