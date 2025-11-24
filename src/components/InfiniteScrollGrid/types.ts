import type { StaticImageData } from "next/image";

export type Item = {
    id: number;
    name?: string;
    thumb?: string | StaticImageData;
};
