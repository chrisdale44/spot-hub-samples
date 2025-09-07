export type SearchArea = "worldwide" | "draw" | "radius";

export type SearchRadius = {
    center: { latitude: number; longitude: number };
    radius: number;
};

// object returned by map.getBounds() of react-map-gl/maplibre

export type MapBoundingBox = {
    northEast: { latitude: number; longitude: number };
    southWest: { latitude: number; longitude: number };
    contains: (point: [number, number]) => boolean;
};
