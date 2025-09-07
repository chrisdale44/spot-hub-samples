import { SpotGeoJson } from "@/types";

export const filterSpotsWithNoImage = (spots: SpotGeoJson[]): SpotGeoJson[] =>
  spots.filter(({ properties: { images } }) => !images?.length);
