export const filterSpotsByCategory = (spots, selectedCategories) => {
  if (!selectedCategories || Object.keys(selectedCategories).length === 0) {
    return spots;
  }
  return spots.filter(
    (spot) => selectedCategories[spot.properties.category.id]
  );
};
