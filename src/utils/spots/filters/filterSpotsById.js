export const filterSpotsById = (spots, id) =>
  spots.find((spot) => spot.id === parseInt(id));
