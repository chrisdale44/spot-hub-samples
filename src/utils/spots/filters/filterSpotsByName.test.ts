import { describe, expect, it } from "vitest";
import { filterSpotsByName } from "./filterSpotsByName";
import { SpotGeoJson } from "@/types";
import { createSpotGeoJsonArray } from "@/test/factories";

describe("UTIL: filterSpotsByName", () => {
  describe("given a list of spots and a name", () => {
    it("should return the spots that match the name", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([
        { properties: { name: "Park" } },
        { properties: { name: "Beach" } },
        { properties: { name: "Mountain" } },
      ]);
      const name = "Park";
      const result = filterSpotsByName(spots, name);
      expect(result).toEqual([{
        id: 1,
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [0, 0],
        },
        properties: { name: "Park" },
      }]);
    });
  });

  describe("given a list of spots and an empty name", () => {
    it("should return all spots", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([
        { properties: { name: "Park" } },
        { properties: { name: "Beach" } },
        { properties: { name: "Mountain" } },
      ]);
      const name = "";
      const result = filterSpotsByName(spots, name);
      expect(result).toEqual(spots);
    });
  });
});
