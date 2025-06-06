import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Tile from "./index";

describe.skip("COMPONENT: InfiniteScrollGridTile", () => {
  beforeEach(() => {
    render(<Tile />);
  });

  it("should render the infinite scroll grid tile component", () => {
    expect(screen.getByTestId("infinite-scroll-grid-tile")).toBeInTheDocument();
  });

  it("should display the correct number of items", () => {
    const items = screen.getAllByTestId("grid-tile-item");
    expect(items.length).toBe(5); // Adjust this based on your actual number of items
  });

  it("should display the correct content in each item", () => {
    const items = screen.getAllByTestId("grid-tile-item");
    expect(items[0].textContent).toBe("Item 1"); // Adjust this based on your actual item content
    expect(items[1].textContent).toBe("Item 2");
    expect(items[2].textContent).toBe("Item 3");
  });
});
