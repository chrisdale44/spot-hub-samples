import Image from "next/image";
import type { Image as ImageType } from "./types";

type SlideProps = ImageType & {
  handleImageClick?: (index: number) => void;
};

const Slide = ({
  ratio,
  url,
  preview,
  index,
  handleImageClick,
}: SlideProps) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (handleImageClick) {
      handleImageClick(index);
    }
  };
  return (
    <div
      className="flex flex-[0_0_100%] justify-center max-w-full"
      data-testid="slide"
      data-index={index}
    >
      <div
        className="relative flex flex-col justify-center object-contain max-w-[100vw] max-h-[100vh] overflow-hidden"
        style={{ aspectRatio: ratio || "1/1" }}
      >
        <Image
          className={`object-contain ${
            handleImageClick ? "cursor-pointer" : ""
          }`}
          src={url || preview}
          alt="Your alt text"
          fill={true}
          unoptimized
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

Slide.displayName = "Slide";

export default Slide;
