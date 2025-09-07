import { describe, expect, it } from "vitest";
import { filterSpotsByRadius } from "./filterSpotsByRadius";
import { SpotGeoJson } from "@/types";
import { createSpotGeoJsonArray } from "@/test/factories";

describe("UTIL: filterSpotsByRadius", () => {
  describe("given a list of spots and a radius", () => {
    it("should return the spots that are within the radius", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([
        { geometry: { type: "Point", coordinates: [1, 1] } },
        { geometry: { type: "Point", coordinates: [2, 2] } },
        { geometry: { type: "Point", coordinates: [3, 3] } },
      ]);
      const searchArea = {
        center: { latitude: 1, longitude: 1 },
        radius: 100000, // 100 km
      };
      const result = filterSpotsByRadius(spots, searchArea);
      expect(result).toEqual([{
        id: 1,
        type: "Feature",
        geometry: { type: "Point", coordinates: [1, 1] },
        properties: { name: "Test Spot 1" },
      }]);
    });

    it("should return mulitple spots that are within the radius", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([
        { geometry: { type: "Point", coordinates: [1.0, 1.0] } },
        { geometry: { type: "Point", coordinates: [2.123456, 2.123456] } },
        { geometry: { type: "Point", coordinates: [3.987654, 3.987654] } },
        { geometry: { type: "Point", coordinates: [2.999999, 2.999999] } },
        { geometry: { type: "Point", coordinates: [-3.123456, -3.123456] } },
        { geometry: { type: "Point", coordinates: [2.5, 2.5] } },
      ]);
      const searchArea = {
        center: { latitude: 2, longitude: 2 },
        radius: 100000, // 100 km
      };
      const result = filterSpotsByRadius(spots, searchArea);
      expect(result).toEqual([
        {
          id: 2,
          type: "Feature",
          geometry: { type: "Point", coordinates: [2.123456, 2.123456] },
          properties: { name: "Test Spot 2" },
        },
        {
          id: 6,
          type: "Feature",
          geometry: { type: "Point", coordinates: [2.5, 2.5] },
          properties: { name: "Test Spot 6" },
        },
      ]);
    });
  });

  describe("given a list of spots and an empty radius", () => {
    it("should return all spots", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([
        { geometry: { type: "Point", coordinates: [1, 1] } },
        { geometry: { type: "Point", coordinates: [2, 2] } },
        { geometry: { type: "Point", coordinates: [3, 3] } },
      ]);
      const center = { lat: 1, lng: 1 };
      const radius = null;
      // @ts-expect-error - Testing invalid input
      const result = filterSpotsByRadius(spots, center, radius);
      expect(result).toEqual(spots);
    });
  });
});
