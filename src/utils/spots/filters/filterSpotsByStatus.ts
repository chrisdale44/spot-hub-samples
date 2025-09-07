import { SpotGeoJson, StatusId } from "@/types";

export const filterSpotsByStatus = (
  spots: SpotGeoJson[],
  selectedStatuses: { [key in StatusId]: boolean },
): SpotGeoJson[] => {
  if (!selectedStatuses || Object.keys(selectedStatuses).length === 0) {
    return spots;
  }

  return spots.filter((spot) =>
    spot.properties?.status
      ? selectedStatuses[spot.properties.status.id]
      : false
  );
};
