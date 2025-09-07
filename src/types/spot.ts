import { Category, CategoryId, MediaItem, Status, StatusId, Tag } from "./";

export type SpotJson = {
    id: number;
    name?: string;
    category?: CategoryId;
    status?: StatusId;
    tags?: Tag[];
    thumb?: string;
    areaKey?: string;
    description?: string;
    images?: string;
    media?: MediaItem[];
    isPrivate?: boolean;
    verified?: boolean;
    createdAt?: string;
    lastEditedAt?: string;
    location: {
        type: "Point";
        coordinates: [number, number];
    };
};

export type SpotGeoJson = {
    type: "Feature";
    id: number;
    areaKey?: string;
    properties:
        & Pick<
            SpotJson,
            | "description"
            | "name"
            | "tags"
            | "thumb"
            | "isPrivate"
            | "verified"
            | "createdAt"
            | "lastEditedAt"
        >
        & {
            category?: Category | null;
            status?: Status | null;
            images?: {
                url: string;
                alt: string;
            }[];
            media?: MediaItem[];
        };
    geometry: {
        type: "Point";
        coordinates: [number, number];
    };
    lastCachedAt?: number;
    depth?: string;
};

export interface Spot extends SpotGeoJson {
    openThumbnailMarker: () => void;
}
