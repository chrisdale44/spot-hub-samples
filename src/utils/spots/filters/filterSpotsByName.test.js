import { describe, expect, it } from "vitest";
import { filterSpotsByName } from "./filterSpotsByName";

describe("UTIL: filterSpotsByName", () => {
  describe("given a list of spots and a name", () => {
    it("should return the spots that match the name", () => {
      const spots = [
        { id: 1, name: "Park" },
        { id: 2, name: "Beach" },
        { id: 3, name: "Mountain" },
      ];
      const name = "Park";
      const result = filterSpotsByName(spots, name);
      expect(result).toEqual([{ id: 1, name: "Park" }]);
    });
  });

  describe("given a list of spots and an empty name", () => {
    it("should return all spots", () => {
      const spots = [
        { id: 1, name: "Park" },
        { id: 2, name: "Beach" },
        { id: 3, name: "Mountain" },
      ];
      const name = "";
      const result = filterSpotsByName(spots, name);
      expect(result).toEqual(spots);
    });
  });
});
