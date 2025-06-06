import React from "react";
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import InfiniteScrollGrid from ".";
import Tile from "./Tile";
import Sentinel from "../Sentinel";
import chunk from "lodash.chunk";

vi.mock("./Tile", () => ({
  default: vi.fn(({ item }) => <div data-testid="tile">{item.name}</div>),
}));

vi.mock("../Sentinel", () => ({
  default: vi.fn(({ onChange }) => {
    window.__triggerSentinel = onChange;
    return <div data-testid="sentinel" />;
  }),
}));

vi.mock("lodash.chunk", () => ({
  default: vi.fn((arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }),
}));

describe("COMPONENT: InfiniteScrollGrid", () => {
  const mockParseItem = (item) => ({ ...item, parsed: true });
  const mockItems = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    thumb: `thumb_${i}`,
  }));

  const mockOnTileClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.__triggerSentinel = null;
  });

  it("renders nothing when items are empty", () => {
    const { container } = render(
      <InfiniteScrollGrid
        items={[]}
        chunkSize={5}
        onTileClick={mockOnTileClick}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders initial chunk of items", () => {
    render(
      <InfiniteScrollGrid
        items={mockItems}
        chunkSize={5}
        onTileClick={mockOnTileClick}
      />
    );

    expect(screen.getAllByTestId("tile")).toHaveLength(5);
  });

  it("loads more items when Sentinel comes into view", async () => {
    render(
      <InfiniteScrollGrid
        items={mockItems}
        chunkSize={5}
        onTileClick={mockOnTileClick}
      />
    );

    expect(screen.getAllByTestId("tile")).toHaveLength(5);

    await act(async () => {
      window.__triggerSentinel(true);
    });

    expect(screen.getAllByTestId("tile")).toHaveLength(10);
  });

  it("stops loading when all chunks are displayed", async () => {
    render(
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
      window.__triggerSentinel(true);
    });
    expect(screen.getAllByTestId("tile")).toHaveLength(10);

    // Second trigger - no more items to load
    await act(async () => {
      window.__triggerSentinel(true);
    });
    expect(screen.getAllByTestId("tile")).toHaveLength(10);
  });

  it("resets chunks when items array changes length", async () => {
    const { rerender } = render(
      <InfiniteScrollGrid
        items={mockItems.slice(0, 10)}
        chunkSize={5}
        onTileClick={mockOnTileClick}
      />
    );

    await act(async () => {
      window.__triggerSentinel(true);
    });
    expect(screen.getAllByTestId("tile")).toHaveLength(10);

    rerender(
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
});
