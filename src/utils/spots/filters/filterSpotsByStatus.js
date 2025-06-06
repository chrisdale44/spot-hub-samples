export const filterSpotsByStatus = (spots, selectedStatuses) => {
  if (!selectedStatuses || Object.keys(selectedStatuses).length === 0)
    return spots;

  return spots.filter((spot) => selectedStatuses[spot.properties.status.id]);
};
