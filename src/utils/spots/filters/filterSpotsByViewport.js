export const filterSpotsByViewport = (spots, viewport) => {
  if (!viewport) return spots;
  return spots.filter((spot) => viewport.contains(spot.geometry.coordinates));
};
