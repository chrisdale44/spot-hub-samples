import { SpotGeoJson } from "@/types";

export const filterSpotsByName = (
  spots: SpotGeoJson[],
  payload: string,
): SpotGeoJson[] =>
  spots.filter(({ properties: { name } }) =>
    name?.toLowerCase().includes(payload.toLowerCase())
  );
