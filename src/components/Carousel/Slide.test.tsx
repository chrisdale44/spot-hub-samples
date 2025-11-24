import { describe, it, expect, afterEach, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Slide from "./Slide";

const renderSlide = (props = {}) => {
  const defaultProps = {
    name: "Test Image",
    ratio: "1/1",
    url: "https://example.com/image",
    preview: "https://example.com/preview",
    index: 4,
    handleImageClick: vi.fn(),
  };
  return render(<Slide {...defaultProps} {...props} />);
};

describe("COMPONENT: Slide", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the slide component", () => {
    const screen = renderSlide();
    expect(screen.getByTestId("slide")).toBeInTheDocument();
    expect(screen.asFragment()).toMatchSnapshot();
  });

  it("should render an image in the slide", () => {
    const screen = renderSlide();
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/image");
  });

  it("should render a wrapper div with the default aspect ratio", () => {
    const screen = renderSlide();
    const wrapper = screen.getByTestId("slide").firstChild;
    expect(wrapper).toHaveStyle("aspect-ratio: 1/1");
  });

  describe("when aspect ratio is provided", () => {
    it("should render a wrapper div with the correct aspect ratio", () => {
      const screen = renderSlide({ ratio: "4/5" });
      const wrapper = screen.getByTestId("slide").firstChild;
      expect(wrapper).toHaveStyle("aspect-ratio: 4/5");
    });
  });

  describe("when the image is clicked", () => {
    it("should call handleImageClick", async () => {
      const user = userEvent.setup();
      const handleImageClick = vi.fn();
      const screen = renderSlide({ handleImageClick });
      const image = screen.getByRole("img");
      await user.click(image);
      expect(handleImageClick).toHaveBeenCalledTimes(1);
    });

    it("should call handleImageClick with the correct index", async () => {
      const user = userEvent.setup();
      const handleImageClick = vi.fn();
      const screen = renderSlide({ handleImageClick });
      const image = screen.getByRole("img");
      await user.click(image);
      expect(handleImageClick).toHaveBeenCalledWith(4);
    });
  });
});
