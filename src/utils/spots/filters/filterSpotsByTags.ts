import { AND } from "@/constants/filters";
import { SpotGeoJson } from "@/types";

export const filterSpotsByTags = (
  spots: SpotGeoJson[],
  selectedTags: number[],
  operator = AND,
): SpotGeoJson[] =>
  operator === AND
    ? filterSpotsByTagsAnd(spots, selectedTags)
    : filterSpotsByTagsOr(spots, selectedTags);

const filterSpotsByTagsOr = (spots: SpotGeoJson[], selectedTags: number[]) =>
  spots.filter((spot) =>
    selectedTags.some((id) =>
      spot.properties?.tags?.some(({ id: tagId }) => id === tagId)
    )
  );

const filterSpotsByTagsAnd = (spots: SpotGeoJson[], selectedTags: number[]) =>
  spots.filter((spot) =>
    selectedTags.every((id) =>
      spot.properties?.tags?.some(({ id: tagId }) => id === tagId)
    )
  );
