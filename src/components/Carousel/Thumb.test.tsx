import { describe, it, expect, vi } from "vitest";
import { render, within } from "@testing-library/react";
import Thumb from "./Thumb";

const thumbFactory = (props = {}) => {
  const defaultProps = {
    colIndex: 0,
    name: "Thumb 1",
    url: "https://example.com/image.jpg",
    preview: "https://example.com/preview.jpg",
    toDelete: false,
    carouselIndex: 0,
    setCarouselIndex: vi.fn(),
    toggleImageDelete: vi.fn(),
    handleDrop: vi.fn(),
    onThumbClick: vi.fn(),
    isEditing: false,
    ratio: "1/1",
    index: 0,
  };
  return render(<Thumb {...defaultProps} {...props} />);
};

describe("COMPONENT: Thumb", () => {
  const colIndex = 0;

  it("should render the thumb component with an image", () => {
    const screen = thumbFactory();
    const thumb = screen.getByTestId(`thumbnail`);
    const image = within(thumb).getByRole("img");
    expect(thumb).toBeInTheDocument();
    expect(thumb).toHaveAttribute("id", `col-${colIndex}`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");

    // should not render the undo button
    const undoButton = within(thumb).queryByRole("button");
    expect(undoButton).not.toBeInTheDocument();

    // should not render the delete button
    const deleteButton = within(thumb).queryByRole("button");
    expect(deleteButton).not.toBeInTheDocument();

    expect(screen.asFragment()).toMatchSnapshot();
  });

  it("should render a wrapper div with the default aspect ratio", () => {
    const screen = thumbFactory();
    const thumb = screen.getByTestId(`thumbnail`);
    expect(thumb).toHaveStyle("aspect-ratio: 1/1");
  });

  describe("when aspect ratio is provided", () => {
    it("should render a wrapper div with the correct aspect ratio", () => {
      const screen = thumbFactory({ ratio: "4/5" });
      const thumb = screen.getByTestId(`thumbnail`);
      expect(thumb).toHaveStyle("aspect-ratio: 4/5");
    });
  });

  it("should call onThumbClick when the thumb is clicked", () => {
    const onThumbClick = vi.fn();
    const screen = thumbFactory({ carouselIndex: 2, onThumbClick });
    const thumb = screen.getByTestId(`thumbnail`);
    const image = within(thumb).getByRole("img");
    image.click();
    expect(onThumbClick).toHaveBeenCalledWith(colIndex);
  });

  describe("when isEditing is true", () => {
    it("should render the delete button", () => {
      const screen = thumbFactory({ isEditing: true, toDelete: false });
      const thumb = screen.getByTestId(`thumbnail`);
      const deleteButton = within(thumb).getByRole("button");
      expect(deleteButton).toBeInTheDocument();
      expect(deleteButton).toHaveClass("text-[#b72020]");
      expect(screen.asFragment()).toMatchSnapshot();
    });

    it("should call toggleImageDelete when the delete button is clicked", () => {
      const toggleImageDelete = vi.fn();
      const screen = thumbFactory({ toggleImageDelete, isEditing: true });
      const thumb = screen.getByTestId(`thumbnail`);
      const deleteButton = within(thumb).getByRole("button");
      deleteButton.click();
      expect(toggleImageDelete).toHaveBeenCalledWith(
        "https://example.com/image.jpg"
      );
    });

    it("should render the undo button when toDelete is true", () => {
      const screen = thumbFactory({ isEditing: true, toDelete: true });
      const thumb = screen.getByTestId(`thumbnail`);
      const undoButton = within(thumb).getByRole("button");
      expect(undoButton).toBeInTheDocument();
      expect(undoButton).toHaveClass("text-[#349028]");
      expect(screen.asFragment()).toMatchSnapshot();
    });

    it("should call toggleImageDelete when the undo button is clicked", () => {
      const toggleImageDelete = vi.fn();
      const screen = thumbFactory({
        toggleImageDelete,
        isEditing: true,
        toDelete: true,
      });
      const thumb = screen.getByTestId(`thumbnail`);
      const undoButton = within(thumb).getByRole("button");
      undoButton.click();
      expect(toggleImageDelete).toHaveBeenCalledWith(
        "https://example.com/image.jpg"
      );
    });
  });
});
