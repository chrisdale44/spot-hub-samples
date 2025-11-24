"use client";

import React, { useState, useEffect, memo, useMemo } from "react";
import chunk from "lodash.chunk";
import Tile from "./Tile";
import Sentinel from "../Sentinel";
import isEqual from "react-fast-compare";
import type { Item } from "./types";

export type InfiniteScrollGridProps = {
  items?: Item[];
  chunkSize: number;
  onTileClick: (item: Item) => void;
  parseItem?: (item: Item) => Item;
};

const InfiniteScrollGrid = memo<InfiniteScrollGridProps>(
  ({ items, chunkSize, onTileClick, parseItem }) => {
    const [chunkIndex, setChunkIndex] = useState<number>(0);
    const [chunkedItems, setChunkedItems] = useState<Item[][]>([]);
    const [displayedItems, setDisplayedItems] = useState<Item[]>([]);

    useEffect(() => {
      if (!chunkedItems.length) return;

      setDisplayedItems((curr) =>
        chunkIndex === 0
          ? chunkedItems[0]
          : curr.concat(chunkedItems[chunkIndex])
      );
    }, [chunkIndex, chunkedItems]);

    const parsedItems = useMemo(() => {
      if (!items) return [];
      return parseItem ? items.map(parseItem) : items;
    }, [items, parseItem]);

    useEffect(() => {
      setChunkIndex(0);
      setDisplayedItems([]); // Clear displayed items when items change
      setChunkedItems(chunk(parsedItems, chunkSize));
    }, [chunkSize, parsedItems]);

    const handleInfiniteScroll = (): void => {
      if (chunkIndex < chunkedItems.length - 1) {
        setChunkIndex(chunkIndex + 1);
      }
    };

    return items?.length ? (
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(140px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-2 p-2 max-w-[1280px] m-[0_auto]">
        {displayedItems.map((item, i) => (
          <Tile
            key={item.id || i}
            item={item}
            onClick={() => onTileClick(item)}
          />
        ))}
        <Sentinel onChange={handleInfiniteScroll} />
      </div>
    ) : null;
  },
  (prevProps, nextProps) =>
    isEqual(prevProps.items, nextProps.items) &&
    prevProps.chunkSize === nextProps.chunkSize &&
    prevProps?.parseItem === nextProps?.parseItem
);

InfiniteScrollGrid.displayName = "InfiniteScrollGrid";

export default InfiniteScrollGrid;
