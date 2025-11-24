import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import Carousel from "./index";

vi.mock("embla-carousel-react", () => ({
  __esModule: true,
  default: vi.fn(() => [
    vi.fn(),
    {
      scrollPrev: vi.fn(),
      scrollNext: vi.fn(),
      scrollTo: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
      canScrollNext: vi.fn().mockReturnValue(true),
      canScrollPrev: vi.fn().mockReturnValue(true),
      selectedScrollSnap: vi.fn().mockReturnValue(0),
    },
  ]),
}));

const defaultProps = {
  slides: [
    {
      name: "Image 1",
      ratio: "1/1",
      url: "https://example.com/image",
      preview: "https://example.com/preview",
      index: 1,
    },
    {
      name: "Image 2",
      ratio: "1/1",
      url: "https://example.com/image",
      preview: "https://example.com/preview",
      index: 2,
    },
    {
      name: "Image 3",
      ratio: "1/1",
      url: "https://example.com/image",
      preview: "https://example.com/preview",
      index: 3,
    },
  ],
  options: { startIndex: 0 },
  setCarouselIndex: vi.fn(),
  handleImageClick: vi.fn(),
};

const carouselFactory = (props = {}) => {
  return render(<Carousel {...defaultProps} {...props} />);
};

describe("COMPONENT: Carousel", () => {
  it("should render the carousel component", () => {
    const screen = carouselFactory();
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
    expect(screen.asFragment()).toMatchSnapshot();
  });

  it("should display the correct number of slides", () => {
    const screen = carouselFactory();
    const slides = screen.getAllByTestId("slide");
    expect(slides.length).toBe(3);
  });

  it("should display a message when there are no slides", () => {
    const screen = carouselFactory({ slides: [] });
    const message = screen.getByText("No images to display");
    expect(message).toBeInTheDocument();
    expect(screen.asFragment()).toMatchSnapshot();
  });
});
