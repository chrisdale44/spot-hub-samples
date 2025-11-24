"use client";

import Image from "next/image";
import React from "react";
import { MdImageNotSupported } from "@/icons/";
import type { Item } from "../types";

export type TileProps = {
  item: Item;
  onClick: (item: Item) => void;
};

const Tile = ({ item, onClick }: TileProps) => {
  const { name, thumb } = item;

  const handleClick = () => {
    onClick(item);
  };

  return (
    <div className="relative flex flex-[1_1_200px] aspect-square min-w-[140px] lg:min-w-[180px] max-w-[225px] cursor-pointer overflow-hidden bg-[white] p-0">
      {name ? (
        <a
          className="absolute inset-x-0 top-0 z-[1] m-0 bg-[rgba(44,44,44,0.7)] p-1 text-[white] text-xs whitespace-nowrap overflow-hidden truncate"
          onClick={handleClick}
          data-testid="tile-name"
        >
          {name}
        </a>
      ) : null}
      {thumb ? (
        <Image
          className="inset-0 object-cover"
          src={thumb}
          fill={true}
          alt={name || "Placeholder Alternative Text"}
          loading="lazy"
          decoding="async"
          onClick={handleClick}
          unoptimized
          data-testid="tile-image"
        />
      ) : (
        <div
          className="text-[#777] text-sm h-full w-full flex flex-col items-center justify-center bg-[#f9f9f9] text-center"
          onClick={handleClick}
          data-testid="no-image"
        >
          <MdImageNotSupported className="w-8 h-8 text-[#777]" />
          No image
          <br />
          available
        </div>
      )}
    </div>
  );
};

Tile.displayName = "Tile";

export default Tile;
