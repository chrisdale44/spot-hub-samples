import { describe, expect, it } from "vitest";
import { filterSpotsByStatus } from "./filterSpotsByStatus";

describe("UTIL: filterSpotsByStatus", () => {
  describe("given a list of spots and a status", () => {
    it("should return the spots that match the status", () => {
      const spots = [
        { id: 1, properties: { status: { id: 1, name: "stoppied" } } },
        { id: 2, properties: { status: { id: 2, name: "demolished" } } },
        { id: 3, properties: { status: { id: 3, name: "skateable" } } },
        { id: 4, properties: { status: { id: 1, name: "stoppied" } } },
        { id: 5, properties: { status: { id: 3, name: "skateable" } } },
        { id: 6, properties: { status: { id: 3, name: "skateable" } } },
      ];
      const selectedStatuses = { 1: true, 2: false, 3: false };
      const result = filterSpotsByStatus(spots, selectedStatuses);
      expect(result).toEqual([
        { id: 1, properties: { status: { id: 1, name: "stoppied" } } },
        { id: 4, properties: { status: { id: 1, name: "stoppied" } } },
      ]);
    });
  });

  describe("given a list of spots and multiple statuses", () => {
    it("should return the spots that match the statuses", () => {
      const spots = [
        { id: 1, properties: { status: { id: 1, name: "stoppied" } } },
        { id: 2, properties: { status: { id: 2, name: "demolished" } } },
        { id: 3, properties: { status: { id: 3, name: "skateable" } } },
        { id: 4, properties: { status: { id: 1, name: "stoppied" } } },
        { id: 5, properties: { status: { id: 3, name: "skateable" } } },
        { id: 6, properties: { status: { id: 3, name: "skateable" } } },
      ];
      const selectedStatuses = { 1: true, 2: false, 3: true };
      const result = filterSpotsByStatus(spots, selectedStatuses);
      expect(result).toEqual([
        { id: 1, properties: { status: { id: 1, name: "stoppied" } } },
        { id: 3, properties: { status: { id: 3, name: "skateable" } } },
        { id: 4, properties: { status: { id: 1, name: "stoppied" } } },
        { id: 5, properties: { status: { id: 3, name: "skateable" } } },
        { id: 6, properties: { status: { id: 3, name: "skateable" } } },
      ]);
    });
  });

  describe("given a list of spots and an empty status", () => {
    it("should return all spots", () => {
      const spots = [
        { id: 1, properties: { status: { id: 1, name: "stoppied" } } },
        { id: 2, properties: { status: { id: 2, name: "demolished" } } },
        { id: 3, properties: { status: { id: 3, name: "skateable" } } },
        { id: 4, properties: { status: { id: 1, name: "stoppied" } } },
        { id: 5, properties: { status: { id: 3, name: "skateable" } } },
        { id: 6, properties: { status: { id: 3, name: "skateable" } } },
      ];
      const selectedStatuses = {};
      const result = filterSpotsByStatus(spots, selectedStatuses);
      expect(result).toEqual(spots);
    });
  });
});
