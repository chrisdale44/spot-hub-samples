import { HAS_IMAGES, HAS_NO_IMAGES } from "@/constants/filters";
import {
  filterSpotsByCategory,
  filterSpotsByRadius,
  filterSpotsByStatus,
  filterSpotsByTags,
  filterSpotsByViewport,
  filterSpotsExcludeById,
  filterSpotsWithImage,
  filterSpotsWithNoImage,
} from "./index";
import { SelectedFilter, SpotGeoJson, TagsOperator } from "@/types";

const filterSpotsWithoutTags = (spots: SpotGeoJson[]) =>
  spots.filter((spot) => !spot.properties.tags?.length);

const filterSpotsWithTags = (spots: SpotGeoJson[]) =>
  spots.filter((spot) => spot.properties.tags?.length);

export const filterSpots = (
  spots: SpotGeoJson[],
  selectedFilters: SelectedFilter[],
  tagsOperator: TagsOperator,
): SpotGeoJson[] => {
  let filteredSpots = [...spots];

  if (!selectedFilters) return filteredSpots;

  for (const filter of selectedFilters) {
    if (typeof filter.payload === "undefined" || filter.payload === null) {
      continue;
    }
    if (filteredSpots.length === 0) break;

    switch (filter.type) {
      case HAS_IMAGES:
        filteredSpots = filter.payload
          ? filterSpotsWithNoImage(filteredSpots)
          : filteredSpots;
        break;
      case HAS_NO_IMAGES:
        filteredSpots = filter.payload
          ? filterSpotsWithImage(filteredSpots)
          : filteredSpots;
        break;
      case "searchArea":
        if ("viewport" in filter.payload) {
          filteredSpots = filterSpotsByViewport(
            filteredSpots,
            filter.payload.viewport,
          );
        } else if ("radius" in filter.payload) {
          filteredSpots = filterSpotsByRadius(filteredSpots, filter.payload);
        }
        break;
      case "spotsWithoutTags":
        filteredSpots = filter.payload
          ? filterSpotsWithoutTags(spots)
          : filteredSpots;
        break;
      case "spotsWithTags":
        filteredSpots = filter.payload
          ? filterSpotsWithTags(spots)
          : filteredSpots;
        break;
      case "selectedTags":
        filteredSpots = filter.payload?.length
          ? filterSpotsByTags(filteredSpots, filter.payload, tagsOperator)
          : filteredSpots;
        break;
      case "selectedStatuses":
        filteredSpots = filter.payload
          ? filterSpotsByStatus(filteredSpots, filter.payload)
          : filteredSpots;
        break;
      case "selectedCategories":
        filteredSpots = filter.payload
          ? filterSpotsByCategory(filteredSpots, filter.payload)
          : filteredSpots;
        break;
      case "spotBeingEdited":
        filteredSpots = filter.payload
          ? filterSpotsExcludeById(filteredSpots, filter.payload)
          : filteredSpots;
        break;
    }
  }

  return filteredSpots;
};
