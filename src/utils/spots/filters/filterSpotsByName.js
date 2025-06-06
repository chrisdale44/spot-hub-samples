export const filterSpotsByName = (spots, payload) =>
  spots.filter(({ name }) =>
    name?.toLowerCase().includes(payload.toLowerCase())
  );
