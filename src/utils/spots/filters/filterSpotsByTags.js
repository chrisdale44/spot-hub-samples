import { AND } from "@/constants/filters";

export const filterSpotsByTags = (spots, selectedTags, operator = AND) =>
  operator === AND
    ? filterSpotsByTagsAnd(spots, selectedTags)
    : filterSpotsByTagsOr(spots, selectedTags);

const filterSpotsByTagsOr = (spots, selectedTags) =>
  spots.filter((spot) =>
    selectedTags.some((id) =>
      spot.properties.tags.some(({ id: tagId }) => id === tagId)
    )
  );

const filterSpotsByTagsAnd = (spots, selectedTags) =>
  spots.filter((spot) =>
    selectedTags.every((id) =>
      spot.properties.tags.some(({ id: tagId }) => id === tagId)
    )
  );
