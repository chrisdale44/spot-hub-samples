export const filterSpotsWithNoImage = (spots) =>
  spots.filter(({ properties: { images } }) => !images?.length);
