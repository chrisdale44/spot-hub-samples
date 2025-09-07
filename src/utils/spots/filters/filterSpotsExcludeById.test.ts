import { describe, expect, it } from "vitest";
import { filterSpotsExcludeById } from "./filterSpotsExcludeById";
import { SpotGeoJson } from "@/types";
import { createSpotGeoJsonArray } from "@/test/factories";

describe("UTIL: filterSpotsExcludeById", () => {
  describe("given a list of spots", () => {
    const spots: SpotGeoJson[] = createSpotGeoJsonArray({}, 3);
    const idToExclude = 2;
    it("should return a list of spots excluding the one with the given id", () => {
      const result = filterSpotsExcludeById(spots, idToExclude);
      expect(result).toEqual([
        {
          id: 1,
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [0, 0],
          },
          properties: {
            name: "Test Spot 1",
          },
        },
        {
          id: 3,
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [0, 0],
          },
          properties: {
            name: "Test Spot 3",
          },
        },
      ]);
    });
  });

  describe("given an empty list of spots", () => {
    it("should return an empty array", () => {
      const result = filterSpotsExcludeById([], 1);
      expect(result).toEqual([]);
    });
  });
});
