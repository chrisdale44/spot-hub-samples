import { useState } from "react";
import { cn } from "@/utils/cn";
import { IoArrowUndo, MdDeleteForever } from "@/icons";
import type { Image } from "./types";

type ThumbProps = Image & {
  name: string;
  colIndex: number;
  carouselIndex: number;
  setCarouselIndex: React.Dispatch<React.SetStateAction<number>>;
  toggleImageDelete: (index: string) => void;
  handleDrop: (
    e: React.DragEvent<HTMLDivElement>,
    data: { id: string; newColIndex: number }
  ) => void;
  onThumbClick: (index: number) => void;
  isEditing: boolean;
  toDelete?: boolean;
};

const Thumb = ({
  colIndex,
  ratio,
  name,
  url,
  preview,
  carouselIndex,
  setCarouselIndex,
  toggleImageDelete,
  handleDrop,
  onThumbClick,
  isEditing,
  toDelete = false,
}: ThumbProps) => {
  const [draggedImg, setDraggedImg] = useState<string | null>(null);
  const [draggedOver, setDraggedOver] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget as HTMLDivElement;
    const targetId = id || target?.id;
    setDraggedOver(targetId);
  };

  return (
    <div
      className={cn(
        `relative self-center w-auto h-full inline-flex cursor-pointer before:content-[''] before:absolute before:h-[4.25rem]`,
        {
          "opacity-50": draggedImg === name,
          "p-1": draggedOver === `col-${colIndex}`,
        }
      )}
      id={`col-${colIndex}`}
      data-testid={`thumbnail`}
      style={{ aspectRatio: ratio || "1/1" }}
      draggable={true}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setDraggedImg(name);
        e.dataTransfer.setData("imgName", name);
      }}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
        handleDragOver(e, `col-${colIndex}`)
      }
      onDragLeave={() => setDraggedOver(null)}
      onDrop={(e) => {
        handleDrop(e, {
          id: "positionDrop",
          newColIndex: colIndex,
        });
        setDraggedImg(null);
        setDraggedOver(null);
        setCarouselIndex(colIndex);
      }}
    >
      <img
        src={url || preview}
        alt="Your alt text"
        className={cn(
          "cursor-pointer opacity-40 h-full w-full object-contain",
          {
            "opacity-100": carouselIndex === colIndex,
          }
        )}
        onClick={() => carouselIndex !== colIndex && onThumbClick(colIndex)}
        loading="lazy"
        decoding="async"
      />
      {isEditing && !toDelete ? (
        <button
          type="button"
          className="absolute bottom-1 right-1 text-[#b72020] text-xl cursor-pointer"
          onClick={() => toggleImageDelete(url || preview)}
        >
          <MdDeleteForever className="w-4 h-4" />
        </button>
      ) : isEditing && toDelete ? (
        <button
          type="button"
          className="absolute bottom-1 right-1 text-[#349028] text-xl cursor-pointer"
          onClick={() => toggleImageDelete(url || preview)}
        >
          <IoArrowUndo className="w-4 h-4" />
        </button>
      ) : null}
    </div>
  );
};

Thumb.displayName = "Thumb";

export default Thumb;
