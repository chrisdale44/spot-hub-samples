"use client";

import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { IoChevronBack, IoChevronForward, TbCirclePlus } from "@/icons";
import Slide from "./Slide";
import Thumb from "./Thumb";
import DropZone from "@/components/Forms/DropZone";
import {
  acceptedFileTypes,
  minFileSize,
  maxFileSize,
} from "@/components/Forms/DropZone/constants";
import { useAtom } from "jotai";
import { editModeAtom } from "@/state";
import { getFileInfo, moveImageColumn } from "./utils";
import type { Image, CarouselOptions } from "./types";

type CarouselWithThumbsProps = {
  slides: Image[];
  carouselIndex: number;
  setCarouselIndex: React.Dispatch<React.SetStateAction<number>>;
  setSlides: React.Dispatch<React.SetStateAction<Image[]>>;
  toggleImageDelete: (index: string) => void;
  handleImageClick: (index: number) => void;
  options?: CarouselOptions;
};

const CarouselWithThumbs = ({
  slides,
  carouselIndex,
  setCarouselIndex,
  setSlides,
  toggleImageDelete,
  handleImageClick,
  options = {},
}: CarouselWithThumbsProps) => {
  const [isEditing] = useAtom(editModeAtom);
  const [emblaCarouselRef, emblaCarouselApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: false,
    watchDrag: !isEditing,
  });

  const onSelect = useCallback((): void => {
    if (!emblaCarouselApi || !emblaThumbsApi) return;
    setCarouselIndex(emblaCarouselApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaCarouselApi.selectedScrollSnap());
  }, [emblaCarouselApi, emblaThumbsApi, setCarouselIndex]);

  useEffect(() => {
    if (!emblaCarouselApi) return;
    onSelect();
    emblaCarouselApi.on("select", onSelect);
    emblaCarouselApi.on("reInit", onSelect);

    return () => {
      emblaCarouselApi.off("select", onSelect);
      emblaCarouselApi.off("reInit", onSelect);
    };
  }, [emblaCarouselApi, onSelect]);

  useEffect(() => {
    if (!emblaCarouselApi) return;
    emblaCarouselApi.scrollTo(carouselIndex);
  }, [emblaCarouselApi, carouselIndex]);

  const onThumbClick = useCallback(
    (index: number): void => {
      if (!emblaCarouselApi || !emblaThumbsApi) return;
      emblaCarouselApi.scrollTo(index);
    },
    [emblaCarouselApi, emblaThumbsApi]
  );

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    payload: { id: string; newColIndex: number }
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    const imgName = e.dataTransfer?.getData("imgName");
    if (!imgName) return;

    setSlides((prevState: Image[]): Image[] => {
      const nextState = [...prevState];
      const { file, currentColIndex } = getFileInfo(nextState, imgName);
      const { newColIndex } = payload;
      return moveImageColumn(nextState, file, currentColIndex, newColIndex);
    });
  };

  return (
    <>
      {/* Main Carousel */}
      <div
        className="relative h-[80%] md:h-[80%] overflow-hidden"
        ref={emblaCarouselRef}
        data-testid="carousel-with-thumbs"
      >
        <div
          className="flex h-full touch-pan-y"
          style={{ backfaceVisibility: "hidden" }}
        >
          {isEditing || slides.length ? (
            <>
              {slides.map((slide, i) => (
                <Slide
                  {...slide}
                  key={i}
                  index={i}
                  handleImageClick={handleImageClick}
                />
              ))}
              {isEditing ? (
                <div
                  className="flex flex-[0_0_100%] justify-center max-w-full"
                  key={slides.length}
                >
                  <div className="w-[480px] h-full p-2">
                    <DropZone
                      name="images"
                      minFileSize={minFileSize}
                      maxFileSize={maxFileSize}
                      acceptedFileTypes={acceptedFileTypes}
                    />
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <div className="text-[#ccc]">No images to display</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        {carouselIndex > 0 ? (
          <button
            type="button"
            className="absolute left-0 md:left-[20px] top-2/4 flex h-14 w-14 -translate-y-2/4 items-center justify-center bg-transparent text-3xl text-[#000] opacity-30"
            onClick={() => onThumbClick(carouselIndex - 1)}
            data-testid="carousel-prev-button"
          >
            <IoChevronBack className="w-12 h-12" />
          </button>
        ) : null}
        {carouselIndex < slides.length - 1 ? (
          <button
            type="button"
            className="absolute right-0 md:right-[20px] top-2/4 flex h-14 w-14 -translate-y-2/4 items-center justify-center bg-transparent text-3xl text-[#000] opacity-30"
            onClick={() => onThumbClick(carouselIndex + 1)}
            data-testid="carousel-next-button"
          >
            <IoChevronForward className="w-12 h-12" />
          </button>
        ) : null}
      </div>

      {/* Thumbnails */}
      <div
        className="h-[20%] md:h-[20%] p-2 pb-0 overflow-hidden"
        ref={emblaThumbsRef}
      >
        <div className="flex h-full max-w-full gap-2 touch-pan-y">
          {slides.map((slide, colIndex) => (
            <Thumb
              key={colIndex}
              colIndex={colIndex}
              carouselIndex={carouselIndex}
              setCarouselIndex={setCarouselIndex}
              toggleImageDelete={toggleImageDelete}
              handleDrop={handleDrop}
              onThumbClick={onThumbClick}
              isEditing={isEditing}
              {...slide}
            />
          ))}
          {isEditing ? (
            <button
              key={slides.length}
              type="button"
              className="flex justify-center h-full px-2 align-middle"
              onClick={() =>
                carouselIndex !== slides.length && onThumbClick(slides.length)
              }
            >
              <TbCirclePlus className="w-8 h-8 text-[#ccc] self-center" />
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

CarouselWithThumbs.displayName = "CarouselWithThumbs";

export default CarouselWithThumbs;
