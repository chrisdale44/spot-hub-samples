export const filterSpotsWithImage = (spots) =>
  spots.filter(({ properties: { images } }) => images?.length);
