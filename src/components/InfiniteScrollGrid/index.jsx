"use client";

import React, { useRef, useState, useEffect, memo } from "react";
import chunk from "lodash.chunk";
import PropTypes from "prop-types";
import Tile from "./Tile";
import Sentinel from "../Sentinel";
import isEqual from "react-fast-compare";

const InfiniteScrollGrid = memo(
  ({ items, chunkSize, onTileClick, parseItem }) => {
    const gridRef = useRef(null);
    const [chunkIndex, setChunkIndex] = useState(0);
    const [chunkedItems, setChunkedItems] = useState([]);
    const [displayedItems, setDisplayedItems] = useState([]);

    useEffect(() => {
      if (!chunkedItems.length) {
        return;
      }

      if (chunkIndex === 0) {
        setDisplayedItems(chunkedItems[chunkIndex]);
      } else {
        setDisplayedItems((curr) => curr.concat(chunkedItems[chunkIndex]));
      }
    }, [chunkIndex, chunkedItems]);

    useEffect(() => {
      setChunkIndex(0);
      setDisplayedItems([]); // Clear displayed items when items change
      setChunkedItems(chunk(items, chunkSize));
    }, [items, chunkSize]);

    const handleInfiniteScroll = () => {
      if (chunkIndex < chunkedItems.length - 1) {
        setChunkIndex(chunkIndex + 1);
      }
    };

    return items?.length ? (
      <div
        ref={gridRef}
        className="grid grid-cols-[repeat(auto-fit,_minmax(140px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-2 p-2 max-w-[1280px] m-[0_auto]"
      >
        {displayedItems.map((item, i) => (
          <Tile
            key={item.thumb || i}
            index={i}
            item={parseItem ? parseItem(item) : item}
            onClick={() => onTileClick(item)}
          />
        ))}
        <Sentinel key={"s"} onChange={handleInfiniteScroll} />
      </div>
    ) : null;
  },
  (prevProps, nextProps) => {
    return (
      isEqual(prevProps.items, nextProps.items) &&
      prevProps.chunkSize === nextProps.chunkSize &&
      prevProps.parseItem &&
      prevProps.parseItem.toString() === nextProps.parseItem.toString()
    );
  }
);

InfiniteScrollGrid.displayName = "InfiniteScrollGrid";
InfiniteScrollGrid.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object),
};

export default InfiniteScrollGrid;
