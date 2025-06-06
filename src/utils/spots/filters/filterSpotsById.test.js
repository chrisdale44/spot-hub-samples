import { describe, expect, it } from "vitest";
import { filterSpotsById } from "./filterSpotsById";

describe("UTIL: filterSpotsById", () => {
  describe("given a list of spots and an id", () => {
    it("should return the spot that matches the id", () => {
      const spots = [
        { id: 1, name: "Spot 1" },
        { id: 2, name: "Spot 2" },
        { id: 3, name: "Spot 3" },
      ];
      const id = 2;
      const result = filterSpotsById(spots, id);
      expect(result).toEqual({ id: 2, name: "Spot 2" });
    });
  });
});
