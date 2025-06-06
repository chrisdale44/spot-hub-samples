import { describe, expect, it } from "vitest";
import { filterSpotsByCategory } from "./filterSpotsBycategory";

describe("UTIL: filterSpotsByCategory", () => {
  describe("given a list of spots and a category", () => {
    it("should return the spots that match the category", () => {
      const spots = [
        { id: 1, properties: { category: { id: 1, name: "park" } } },
        { id: 2, properties: { category: { id: 2, name: "beach" } } },
        { id: 3, properties: { category: { id: 3, name: "mountain" } } },
        { id: 4, properties: { category: { id: 1, name: "park" } } },
        { id: 5, properties: { category: { id: 3, name: "mountain" } } },
        { id: 6, properties: { category: { id: 3, name: "mountain" } } },
      ];
      const selectedCategories = { 1: true, 2: false, 3: false };
      const result = filterSpotsByCategory(spots, selectedCategories);
      expect(result).toEqual([
        { id: 1, properties: { category: { id: 1, name: "park" } } },
        { id: 4, properties: { category: { id: 1, name: "park" } } },
      ]);
    });
  });

  describe("given a list of spots and multiple categories", () => {
    it("should return the spots that match the categories", () => {
      const spots = [
        { id: 1, properties: { category: { id: 1, name: "park" } } },
        { id: 2, properties: { category: { id: 2, name: "beach" } } },
        { id: 3, properties: { category: { id: 3, name: "mountain" } } },
        { id: 4, properties: { category: { id: 1, name: "park" } } },
        { id: 5, properties: { category: { id: 3, name: "mountain" } } },
        { id: 6, properties: { category: { id: 3, name: "mountain" } } },
      ];
      const selectedCategories = { 1: true, 2: false, 3: true };
      const result = filterSpotsByCategory(spots, selectedCategories);
      expect(result).toEqual([
        { id: 1, properties: { category: { id: 1, name: "park" } } },
        { id: 3, properties: { category: { id: 3, name: "mountain" } } },
        { id: 4, properties: { category: { id: 1, name: "park" } } },
        { id: 5, properties: { category: { id: 3, name: "mountain" } } },
        { id: 6, properties: { category: { id: 3, name: "mountain" } } },
      ]);
    });
  });

  describe("given a list of spots and an empty category", () => {
    it("should return all spots", () => {
      const spots = [
        { id: 1, properties: { category: { id: 1, name: "park" } } },
        { id: 2, properties: { category: { id: 2, name: "beach" } } },
        { id: 3, properties: { category: { id: 3, name: "mountain" } } },
        { id: 4, properties: { category: { id: 1, name: "park" } } },
        { id: 5, properties: { category: { id: 3, name: "mountain" } } },
        { id: 6, properties: { category: { id: 3, name: "mountain" } } },
      ];
      const selectedCategories = {};
      const result = filterSpotsByCategory(spots, selectedCategories);
      expect(result).toEqual(spots);
    });
  });
});
