import { AND, HAS_IMAGES, HAS_NO_IMAGES } from "@/constants/filters";
import {
  filterSpotsByRadius,
  filterSpotsByStatus,
  filterSpotsByCategory,
  filterSpotsByTags,
  filterSpotsWithNoImage,
  filterSpotsWithImage,
  filterSpotsExcludeById,
  filterSpotsByViewport,
  filterSpotsById,
  filterSpotsByTitle,
} from "./index";

const filterSpotsWithoutTags = (spots) =>
  spots.filter((spot) => !spot.properties.tags?.length);

const filterSpotsWithTags = (spots) =>
  spots.filter((spot) => spot.properties.tags?.length);

export const filterSpots = (spots, selectedFilters, tagsOperator) => {
  let filteredSpots = [...spots];

  if (!selectedFilters) return filteredSpots;

  for (let key in selectedFilters) {
    const payload = selectedFilters[key];
    if (typeof payload === "undefined" || payload === null) continue;
    if (filteredSpots.length === 0) break;

    switch (key) {
      case HAS_IMAGES:
        filteredSpots = payload
          ? filterSpotsWithNoImage(filteredSpots)
          : filteredSpots;
        break;
      case HAS_NO_IMAGES:
        filteredSpots = payload
          ? filterSpotsWithImage(filteredSpots)
          : filteredSpots;
        break;
      case "searchArea":
        filteredSpots = payload.viewport
          ? filterSpotsByViewport(filteredSpots, payload.viewport)
          : filterSpotsByRadius(filteredSpots, payload);
        break;
      case "spotsWithoutTags":
        filteredSpots = payload ? filterSpotsWithoutTags(spots) : filteredSpots;
        break;
      case "spotsWithTags":
        filteredSpots = payload ? filterSpotsWithTags(spots) : filteredSpots;
        break;
      case "selectedTags":
        filteredSpots = payload?.length
          ? filterSpotsByTags(filteredSpots, payload, tagsOperator)
          : filteredSpots;
        break;
      case "selectedStatuses":
        filteredSpots = payload
          ? filterSpotsByStatus(filteredSpots, payload)
          : filteredSpots;
        break;
      case "selectedCategories":
        filteredSpots = payload
          ? filterSpotsByCategory(filteredSpots, payload)
          : filteredSpots;
        break;
      case "spotBeingEdited":
        filteredSpots = payload
          ? filterSpotsExcludeById(filteredSpots, payload)
          : filteredSpots;
        break;
    }
  }

  return filteredSpots;
};
