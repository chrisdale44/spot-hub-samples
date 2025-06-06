import haversine from "haversine";

export const filterSpotsByRadius = (spots, searchArea) => {
  if (!searchArea || !searchArea.radius) return spots;
  return spots.filter((spot) => {
    const spotLocation = {
      latitude: spot.geometry.coordinates[1],
      longitude: spot.geometry.coordinates[0],
    };
    const distanceBetweenPoints = haversine(spotLocation, searchArea.center, {
      unit: "meter",
    });
    return distanceBetweenPoints <= searchArea.radius;
  });
};
