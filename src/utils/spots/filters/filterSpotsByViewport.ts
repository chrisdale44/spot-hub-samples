import { MapBoundingBox, SpotGeoJson } from "@/types";

export const filterSpotsByViewport = (
  spots: SpotGeoJson[],
  viewport: MapBoundingBox,
): SpotGeoJson[] => {
  if (!viewport) return spots;
  return spots.filter((spot) => viewport.contains(spot.geometry.coordinates));
};
