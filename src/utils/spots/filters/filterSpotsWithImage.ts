import { SpotGeoJson } from "@/types";

export const filterSpotsWithImage = (spots: SpotGeoJson[]): SpotGeoJson[] =>
  spots.filter(({ properties: { images } }) => images?.length);
