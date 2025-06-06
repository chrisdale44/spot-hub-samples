"use client";

import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";
import { MdImageNotSupported } from "@/icons/";

const Tile = ({ item, onClick }) => {
  const { name, thumb } = item;
  return (
    <div className="relative flex flex-[1_1_200px] aspect-square min-w-[140px] lg:min-w-[180px] max-w-[225px] cursor-pointer overflow-hidden bg-[white] p-0">
      {name ? (
        <a
          className="absolute inset-x-0 top-0 z-[1] m-0 bg-[rgba(44,44,44,0.7)] p-1 text-[white] text-xs whitespace-nowrap overflow-hidden truncate"
          onClick={() => onClick(item)}
          data-testid="tile-name"
        >
          {name}
        </a>
      ) : null}
      {thumb ? (
        <Image
          className="inset-0"
          src={thumb}
          fill={true}
          alt={name}
          loading="lazy"
          decoding="async"
          onClick={() => onClick(item)}
          unoptimized
          data-testid="tile-image"
        />
      ) : (
        <div
          className="text-[#777] text-sm h-full w-full flex flex-col items-center justify-center bg-[#f9f9f9] text-center"
          onClick={() => onClick(item)}
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

Tile.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Tile;
