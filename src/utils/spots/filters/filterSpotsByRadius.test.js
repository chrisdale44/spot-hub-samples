import { describe, expect, it } from "vitest";
import { filterSpotsByRadius } from "./filterSpotsByRadius";

describe("UTIL: filterSpotsByRadius", () => {
  describe("given a list of spots and a radius", () => {
    it("should return the spots that are within the radius", () => {
      const spots = [
        { id: 1, geometry: { coordinates: [1, 1] } },
        { id: 2, geometry: { coordinates: [2, 2] } },
        { id: 3, geometry: { coordinates: [3, 3] } },
      ];
      const searchArea = {
        center: { latitude: 1, longitude: 1 },
        radius: 100000, // 100 km
      };
      const result = filterSpotsByRadius(spots, searchArea);
      expect(result).toEqual([{ id: 1, geometry: { coordinates: [1, 1] } }]);
    });

    it("should return mulitple spots that are within the radius", () => {
      const spots = [
        { id: 1, geometry: { coordinates: [1.0, 1.0] } },
        { id: 2, geometry: { coordinates: [2.123456, 2.123456] } },
        { id: 3, geometry: { coordinates: [3.987654, 3.987654] } },
        { id: 4, geometry: { coordinates: [2.999999, 2.999999] } },
        { id: 5, geometry: { coordinates: [-3.123456, -3.123456] } },
        { id: 6, geometry: { coordinates: [2.5, 2.5] } },
      ];
      const searchArea = {
        center: { latitude: 2, longitude: 2 },
        radius: 100000, // 100 km
      };
      const result = filterSpotsByRadius(spots, searchArea);
      expect(result).toEqual([
        { id: 2, geometry: { coordinates: [2.123456, 2.123456] } },
        { id: 6, geometry: { coordinates: [2.5, 2.5] } },
      ]);
    });
  });

  describe("given a list of spots and an empty radius", () => {
    it("should return all spots", () => {
      const spots = [
        { id: 1, lat: 1, lng: 1 },
        { id: 2, lat: 2, lng: 2 },
        { id: 3, lat: 3, lng: 3 },
      ];
      const center = { lat: 1, lng: 1 };
      const radius = null;
      const result = filterSpotsByRadius(spots, center, radius);
      expect(result).toEqual(spots);
    });
  });
});
