import { Category, SpotGeoJson, SpotJson, Status } from ".";

type ShallowSpotJsonWithKeys =
    & Pick<
        SpotJson,
        "id" | "name" | "category" | "status" | "areaKey" | "thumb" | "location"
    >
    & {
        tags?: string[];
    };

type keyMap = {
    id: "i";
    name: "n";
    category: "c";
    status: "s";
    tags: "t";
    areaKey: "a";
    thumb: "b";
    location: "l";
};

export type ShallowSpotJson = {
    [K in keyof ShallowSpotJsonWithKeys as keyMap[K]]:
        ShallowSpotJsonWithKeys[K];
};

export type ShallowSpotGeoJson = Omit<SpotGeoJson, "properties"> & {
    properties:
        & Pick<
            ShallowSpotJsonWithKeys,
            | "name"
            | "thumb"
            | "tags"
        >
        & {
            category: Category | null;
            status: Status | null;
            images: string[];
            media: string[];
        };
};
