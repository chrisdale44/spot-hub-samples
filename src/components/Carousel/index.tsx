import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Slide from "./Slide";
import type { CarouselOptions, Image } from "./types";

type CarouselProps = {
  slides: Image[];
  options?: CarouselOptions;
  setCarouselIndex: React.Dispatch<React.SetStateAction<number>>;
  handleImageClick: (index: number) => void;
};

const Carousel = ({
  slides,
  options,
  setCarouselIndex,
  handleImageClick,
}: CarouselProps) => {
  const [emblaCarouselRef, emblaCarouselApi] = useEmblaCarousel(options);

  const onSelect = useCallback(() => {
    if (!emblaCarouselApi) return;
    setCarouselIndex(emblaCarouselApi.selectedScrollSnap());
  }, [emblaCarouselApi, setCarouselIndex]);

  useEffect(() => {
    if (!emblaCarouselApi) return;
    onSelect();
    emblaCarouselApi.on("select", onSelect);
    emblaCarouselApi.on("reInit", onSelect);
  }, [emblaCarouselApi, onSelect]);

  return (
    <>
      <div
        className="relative h-full overflow-hidden"
        ref={emblaCarouselRef}
        data-testid="carousel"
      >
        <div
          className="flex h-full touch-pan-y"
          style={{ backfaceVisibility: "hidden" }}
        >
          {slides.length ? (
            slides.map((slide, i) => (
              <Slide
                {...slide}
                key={`slide-${i}`}
                handleImageClick={handleImageClick}
              />
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <div className="text-[#ccc]">No images to display</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Carousel.displayName = "Carousel";

export default Carousel;
