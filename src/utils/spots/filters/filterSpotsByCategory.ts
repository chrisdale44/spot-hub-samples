import { CategoryId, SpotGeoJson } from "@/types";

export const filterSpotsByCategory = (
  spots: SpotGeoJson[],
  selectedCategories: { [key in CategoryId]: boolean },
): SpotGeoJson[] => {
  if (!selectedCategories || Object.keys(selectedCategories).length === 0) {
    return spots;
  }
  return spots.filter(
    (spot) =>
      spot.properties?.category
        ? selectedCategories[spot.properties.category.id]
        : false,
  );
};
