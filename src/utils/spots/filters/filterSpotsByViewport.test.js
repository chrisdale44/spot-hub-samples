import { describe, expect, it } from "vitest";
import { filterSpotsByViewport } from "./filterSpotsByViewport";

describe("UTIL: filterSpotsByViewport", () => {
  describe("given a list of spots and a viewport", () => {
    it("should return the spots that are within the viewport", () => {
      const spots = [
        { id: 1, geometry: { coordinates: [1, 1] } },
        { id: 2, geometry: { coordinates: [10, 10] } },
        { id: 3, geometry: { coordinates: [40, 30] } },
      ];
      const viewport = {
        northEast: { latitude: 25, longitude: 25 },
        southWest: { latitude: 5, longitude: 5 },
        contains: (coordinates) => {
          const [lng, lat] = coordinates;
          return (
            lat >= viewport.southWest.latitude &&
            lat <= viewport.northEast.latitude &&
            lng >= viewport.southWest.longitude &&
            lng <= viewport.northEast.longitude
          );
        },
      };
      const result = filterSpotsByViewport(spots, viewport);
      expect(result).toEqual([{ id: 2, geometry: { coordinates: [10, 10] } }]);
    });
  });

  describe("given a list of spots and an empty viewport", () => {
    it("should return all spots", () => {
      const spots = [
        { id: 1, lat: 10, lng: 10 },
        { id: 2, lat: 20, lng: 20 },
        { id: 3, lat: 30, lng: 30 },
      ];
      const result = filterSpotsByViewport(spots, null);
      expect(result).toEqual(spots);
    });
  });
});
