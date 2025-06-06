export const filterSpotsExcludeById = (spots, id) =>
  spots.filter((spot) => spot.id !== id);
