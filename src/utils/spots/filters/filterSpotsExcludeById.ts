import { SpotGeoJson } from "@/types";

export const filterSpotsExcludeById = (
  spots: SpotGeoJson[],
  id: number,
): SpotGeoJson[] => spots.filter((spot) => spot.id !== id);
