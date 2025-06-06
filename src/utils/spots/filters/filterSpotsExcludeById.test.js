import { describe, expect, it } from "vitest";
import { filterSpotsExcludeById } from "./filterSpotsExcludeById";

describe("UTIL: filterSpotsExcludeById", () => {
  describe("given a list of spots", () => {
    const spots = [
      { id: 1, name: "Spot 1" },
      { id: 2, name: "Spot 2" },
      { id: 3, name: "Spot 3" },
    ];
    const idToExclude = 2;
    it("should return a list of spots excluding the one with the given id", () => {
      const result = filterSpotsExcludeById(spots, idToExclude);
      expect(result).toEqual([
        { id: 1, name: "Spot 1" },
        { id: 3, name: "Spot 3" },
      ]);
    });
  });

  describe("given an empty list of spots", () => {
    it("should return an empty array", () => {
      const result = filterSpotsExcludeById([]);
      expect(result).toEqual([]);
    });
  });
});
