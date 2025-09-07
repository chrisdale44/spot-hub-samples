import { describe, expect, it } from "vitest";
import { filterSpotsByCategory } from "./filterSpotsByCategory";
import { SpotGeoJson } from "@/types";
import { createSpotGeoJsonArray } from "@/test/factories";

describe("UTIL: filterSpotsByCategory", () => {
  describe("given a list of spots and a category", () => {
    it("should return the spots that match the category", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([
        { properties: { category: { id: "park", name: "Park" } } },
        { properties: { category: { id: "shop", name: "Shop" } } },
        { properties: { category: { id: "street", name: "Street" } } },
        { properties: { category: { id: "park", name: "Park" } } },
        { properties: { category: { id: "street", name: "Street" } } },
        { properties: { category: { id: "street", name: "Street" } } },
      ]);
      const selectedCategories = {
        "park": true,
        "shop": false,
        "street": false,
        "bar": false,
      };
      const result = filterSpotsByCategory(spots, selectedCategories);
      expect(result).toEqual([
        {
          id: 1,
          type: "Feature",
          geometry: { type: "Point", coordinates: [0, 0] },
          properties: {
            name: "Test Spot 1",
            category: { id: "park", name: "Park" },
          },
        },
        {
          id: 4,
          type: "Feature",
          geometry: { type: "Point", coordinates: [0, 0] },
          properties: {
            name: "Test Spot 4",
            category: { id: "park", name: "Park" },
          },
        },
      ]);
    });
  });

  describe("given a list of spots and multiple categories", () => {
    it("should return the spots that match the categories", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([
        { properties: { category: { id: "park", name: "Park" } } },
        { properties: { category: { id: "shop", name: "Shop" } } },
        { properties: { category: { id: "street", name: "Street" } } },
        { properties: { category: { id: "park", name: "Park" } } },
        { properties: { category: { id: "street", name: "Street" } } },
        { properties: { category: { id: "street", name: "Street" } } },
      ]);
      const selectedCategories = {
        "park": true,
        "shop": false,
        "street": true,
        "bar": false,
      };
      const result = filterSpotsByCategory(spots, selectedCategories);
      expect(result).toEqual([
        {
          id: 1,
          type: "Feature",
          geometry: { type: "Point", coordinates: [0, 0] },
          properties: {
            name: "Test Spot 1",
            category: { id: "park", name: "Park" },
          },
        },
        {
          id: 3,
          type: "Feature",
          geometry: { type: "Point", coordinates: [0, 0] },
          properties: {
            name: "Test Spot 3",
            category: { id: "street", name: "Street" },
          },
        },
        {
          id: 4,
          type: "Feature",
          geometry: { type: "Point", coordinates: [0, 0] },
          properties: {
            name: "Test Spot 4",
            category: { id: "park", name: "Park" },
          },
        },
        {
          id: 5,
          type: "Feature",
          geometry: { type: "Point", coordinates: [0, 0] },
          properties: {
            name: "Test Spot 5",
            category: { id: "street", name: "Street" },
          },
        },
        {
          id: 6,
          type: "Feature",
          geometry: { type: "Point", coordinates: [0, 0] },
          properties: {
            name: "Test Spot 6",
            category: { id: "street", name: "Street" },
          },
        },
      ]);
    });
  });

  describe("given a list of spots and an empty category", () => {
    it("should return all spots", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([
        { properties: { category: { id: "park", name: "Park" } } },
        { properties: { category: { id: "shop", name: "Shop" } } },
        { properties: { category: { id: "street", name: "Street" } } },
        { properties: { category: { id: "park", name: "Park" } } },
        { properties: { category: { id: "street", name: "Street" } } },
        { properties: { category: { id: "street", name: "Street" } } },
      ]);
      const selectedCategories = {};
      // @ts-expect-error - Testing invalid input
      const result = filterSpotsByCategory(spots, selectedCategories);
      expect(result).toEqual(spots);
    });
  });
});
