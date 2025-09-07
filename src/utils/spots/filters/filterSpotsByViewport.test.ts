import { describe, expect, it } from "vitest";
import { filterSpotsByViewport } from "./filterSpotsByViewport";
import { SpotGeoJson } from "@/types";
import { createSpotGeoJsonArray } from "@/test/factories";

describe("UTIL: filterSpotsByViewport", () => {
  describe("given a list of spots and a viewport", () => {
    it("should return the spots that are within the viewport", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([
        { geometry: { type: "Point", coordinates: [1, 1] } },
        { geometry: { type: "Point", coordinates: [10, 10] } },
        { geometry: { type: "Point", coordinates: [40, 30] } },
      ]);
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
      expect(result).toEqual([{
        id: 2,
        type: "Feature",
        geometry: { type: "Point", coordinates: [10, 10] },
        properties: { name: "Test Spot 2" },
      }]);
    });
  });

  describe("given a list of spots and an empty viewport", () => {
    it("should return all spots", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([
        { geometry: { type: "Point", coordinates: [10, 10] } },
        { geometry: { type: "Point", coordinates: [20, 20] } },
        { geometry: { type: "Point", coordinates: [30, 30] } },
      ]);
      // @ts-expect-error - Testing invalid input
      const result = filterSpotsByViewport(spots, null);
      expect(result).toEqual(spots);
    });
  });
});
