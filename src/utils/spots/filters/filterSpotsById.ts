import { SpotGeoJson } from "@/types";

export const filterSpotsById = (spots: SpotGeoJson[], id: number) =>
  spots.find((spot) => spot.id === id);
