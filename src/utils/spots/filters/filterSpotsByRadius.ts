import haversine from "haversine";
import { SearchRadius, SpotGeoJson } from "@/types";

export const filterSpotsByRadius = (
  spots: SpotGeoJson[],
  searchArea: SearchRadius,
): SpotGeoJson[] => {
  if (!searchArea || !searchArea.radius) return spots;
  return spots.filter((spot) => {
    const spotLocation = {
      latitude: spot.geometry.coordinates[1],
      longitude: spot.geometry.coordinates[0],
    };
    const distanceBetweenPoints = haversine(spotLocation, searchArea.center, {
      unit: "meter",
    });
    return distanceBetweenPoints <= searchArea.radius;
  });
};
