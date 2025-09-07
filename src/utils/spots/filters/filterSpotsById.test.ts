import { describe, expect, it } from "vitest";
import { filterSpotsById } from "./filterSpotsById";
import { SpotGeoJson } from "@/types";
import { createSpotGeoJsonArray } from "@/test/factories";

describe("UTIL: filterSpotsById", () => {
  describe("given a list of spots and an id", () => {
    it("should return the spot that matches the id", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray({}, 3);
      const id = 2;
      const result = filterSpotsById(spots, id);
      expect(result).toEqual({
        id: 2,
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [0, 0],
        },
        properties: { name: "Test Spot 2" },
      });
    });

    it("should return undefined if no spot matches the id", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray({}, 3);
      const id = 4;
      const result = filterSpotsById(spots, id);
      expect(result).toBeUndefined();
    });
  });
});
