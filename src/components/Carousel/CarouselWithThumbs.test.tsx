import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import CarouselWithThumbs from "./CarouselWithThumbs";

const mocks = vi.hoisted(() => {
  return {
    useAtom: vi.fn(),
    useContext: vi.fn(),
  };
});

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

vi.mock("react-dropzone", () => ({
  __esModule: true,
  useDropzone: vi.fn(() => {
    return {
      getRootProps: vi.fn(() => ({})),
      getInputProps: vi.fn(() => ({})),
    };
  }),
}));

vi.mock("jotai", async () => {
  const actual = await vi.importActual("jotai");
  return {
    ...actual,
    useAtom: mocks.useAtom,
  };
});

vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useContext: mocks.useContext,
  };
});

const carouselWithThumbsFactory = (props = {}) => {
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
    carouselIndex: 0,
    setCarouselIndex: vi.fn(),
    setSlides: vi.fn(),
    toggleImageDelete: vi.fn(),
    handleImageClick: vi.fn(),
    options: {},
  };
  return render(<CarouselWithThumbs {...defaultProps} {...props} />);
};

describe("COMPONENT: CarouselWithThumbs", () => {
  beforeEach(() => {
    mocks.useAtom.mockReturnValue([false]);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render the carousel-with-thumbs component", () => {
    const screen = carouselWithThumbsFactory();
    expect(screen.getByTestId("carousel-with-thumbs")).toBeInTheDocument();
    expect(screen.asFragment()).toMatchSnapshot();
  });

  it("should display the correct number of slides", () => {
    const screen = carouselWithThumbsFactory();
    const slides = screen.getAllByTestId("slide");
    expect(slides.length).toBe(3);
  });

  it("should display the correct number of thumbnails", () => {
    const screen = carouselWithThumbsFactory();
    const thumbnails = screen.getAllByTestId("thumbnail");
    expect(thumbnails.length).toBe(3);
  });

  it("should display a next navigation button when not at the last slide", () => {
    const screen = carouselWithThumbsFactory({ carouselIndex: 1 });
    expect(screen.getByTestId("carousel-next-button")).toBeInTheDocument();
  });

  it("should not display a next navigation button when at the last slide", () => {
    const screen = carouselWithThumbsFactory({ carouselIndex: 2 });
    expect(
      screen.queryByTestId("carousel-next-button")
    ).not.toBeInTheDocument();
  });

  it("should display a previous navigation button when not at the first slide", () => {
    const screen = carouselWithThumbsFactory({ carouselIndex: 1 });
    expect(screen.getByTestId("carousel-prev-button")).toBeInTheDocument();
  });

  it("should not display a previous navigation button when at the first slide", () => {
    const screen = carouselWithThumbsFactory({ carouselIndex: 0 });
    expect(
      screen.queryByTestId("carousel-prev-button")
    ).not.toBeInTheDocument();
  });

  it("should display a message when there are no slides", () => {
    const screen = carouselWithThumbsFactory({ slides: [] });
    const message = screen.getByText("No images to display");
    expect(message).toBeInTheDocument();
    expect(screen.asFragment()).toMatchSnapshot();
  });

  describe("when isEditing is true", () => {
    it("should render the DropZone component", () => {
      mocks.useAtom.mockReturnValue([true]);
      mocks.useContext.mockReturnValue({
        acceptedFiles: [],
        rejectedFiles: [],
        onDropAccepted: vi.fn(),
        onDropRejected: vi.fn(),
      });
      const screen = carouselWithThumbsFactory();
      const dropZone = screen.getByTestId("dropzone");
      expect(dropZone).toBeInTheDocument();
      expect(screen.asFragment()).toMatchSnapshot();
    });
  });
});
