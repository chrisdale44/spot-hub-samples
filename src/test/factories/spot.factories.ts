import { SpotGeoJson } from "@/types";

export const createSpotGeoJson = (
    overrides: Partial<SpotGeoJson> = {},
    i: number = 0,
): SpotGeoJson => {
    return {
        id: i + 1,
        type: "Feature",
        ...overrides,
        geometry: {
            type: "Point",
            coordinates: [0, 0],
            ...overrides.geometry,
        },
        properties: {
            name: `Test Spot ${i + 1}`,
            ...overrides.properties,
        },
    };
};

export const createSpotGeoJsonArray = (
    overrides: Partial<SpotGeoJson> | Partial<SpotGeoJson>[],
    count: number = 1,
): SpotGeoJson[] => {
    if (Array.isArray(overrides)) {
        return Array.from(
            { length: overrides.length },
            (_, i) => createSpotGeoJson(overrides[i], i),
        );
    }
    return Array.from(
        { length: count },
        (_, i) => createSpotGeoJson(overrides, i),
    );
};
