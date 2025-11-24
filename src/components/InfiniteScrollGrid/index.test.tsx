import React from "react";
import { render, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import InfiniteScrollGrid from ".";
import Tile from "./Tile";
import type { Item } from "./types";

declare global {
  interface Window {
    __triggerSentinel?: ((isVisible: boolean) => void) | null;
  }
}

vi.mock("./Tile", () => ({
  default: vi.fn(({ item, onClick }) => (
    <div data-testid="tile" onClick={() => onClick(item)}>
      {item.name}
    </div>
  )),
}));

vi.mock("../Sentinel", () => ({
  default: vi.fn(({ onChange }) => {
    window.__triggerSentinel = onChange;
    return <div data-testid="sentinel" />;
  }),
}));

vi.mock("lodash.chunk", () => ({
  default: vi.fn(<T,>(arr: T[], size: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }),
}));

describe("COMPONENT: InfiniteScrollGrid", () => {
  const mockParseItem = (item: Item) => ({ ...item, parsed: true });
  const mockItems: Item[] = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    thumb: `thumb_${i}`,
  }));

  const mockOnTileClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    delete window.__triggerSentinel;
  });

  it("renders nothing when items are empty", () => {
    const screen = render(
      <InfiniteScrollGrid
        items={[]}
        chunkSize={5}
        onTileClick={mockOnTileClick}
      />
    );
    expect(screen.container).toBeEmptyDOMElement();
    expect(screen.asFragment()).toMatchSnapshot();
  });

  it("renders initial chunk of items", () => {
    const screen = render(
      <InfiniteScrollGrid
        items={mockItems}
        chunkSize={5}
        onTileClick={mockOnTileClick}
      />
    );

    expect(screen.getAllByTestId("tile")).toHaveLength(5);
    expect(screen.asFragment()).toMatchSnapshot();
  });

  it("loads more items when Sentinel comes into view", async () => {
    const screen = render(
      <InfiniteScrollGrid
        items={mockItems}
        chunkSize={5}
        onTileClick={mockOnTileClick}
      />
    );

    expect(screen.getAllByTestId("tile")).toHaveLength(5);

    await act(async () => {
      window.__triggerSentinel?.(true);
    });

    expect(screen.getAllByTestId("tile")).toHaveLength(10);
  });

  it("does not load additional chunks when all items have been displayed", async () => {
    const screen = render(
      <InfiniteScrollGrid
        items={mockItems.slice(0, 10)} // Only 10 items
        chunkSize={5}
        onTileClick={mockOnTileClick}
      />
    );

    // First load - 5 items
    expect(screen.getAllByTestId("tile")).toHaveLength(5);

    // First trigger - load next 5 (total 10)
    await act(async () => {
      window.__triggerSentinel?.(true);
    });
    expect(screen.getAllByTestId("tile")).toHaveLength(10);

    // Second trigger - no more items to load
    await act(async () => {
      window.__triggerSentinel?.(true);
    });
    expect(screen.getAllByTestId("tile")).toHaveLength(10);
  });

  it("should reset chunks when items array changes length", async () => {
    const screen = render(
      <InfiniteScrollGrid
        items={mockItems.slice(0, 10)}
        chunkSize={5}
        onTileClick={mockOnTileClick}
      />
    );

    await act(async () => {
      window.__triggerSentinel?.(true);
    });
    expect(screen.getAllByTestId("tile")).toHaveLength(10);

    screen.rerender(
      <InfiniteScrollGrid
        items={mockItems.slice(0, 15)}
        chunkSize={5}
        onTileClick={mockOnTileClick}
      />
    );

    // Should reset to first chunk only
    expect(screen.getAllByTestId("tile")).toHaveLength(5);
  });

  it("parses Tile items when parseItem function is provided", () => {
    render(
      <InfiniteScrollGrid
        items={mockItems.slice(0, 5)}
        chunkSize={5}
        onTileClick={mockOnTileClick}
        parseItem={mockParseItem}
      />
    );

    expect(Tile).toHaveBeenCalledWith(
      expect.objectContaining({
        item: expect.objectContaining({ parsed: true }),
      }),
      expect.anything()
    );
  });

  it("calls onTileClick when a Tile is clicked", () => {
    const screen = render(
      <InfiniteScrollGrid
        items={mockItems.slice(0, 5)}
        chunkSize={5}
        onTileClick={mockOnTileClick}
      />
    );

    const tiles = screen.getAllByTestId("tile");
    tiles[0].click();
    expect(mockOnTileClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: 0 })
    );
  });
});
