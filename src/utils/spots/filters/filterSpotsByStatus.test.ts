import { describe, expect, it } from "vitest";
import { filterSpotsByStatus } from "./filterSpotsByStatus";
import { SpotGeoJson } from "@/types";
import { createSpotGeoJsonArray } from "@/test/factories";

describe("UTIL: filterSpotsByStatus", () => {
  describe("given a list of spots and a status", () => {
    it("should return the spots that match the status", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([
        { properties: { status: { id: "stoppied", name: "Stoppied" } } },
        { properties: { status: { id: "demolished", name: "Demolished" } } },
        { properties: { status: { id: "skateable", name: "Skateable" } } },
        { properties: { status: { id: "stoppied", name: "Stoppied" } } },
        { properties: { status: { id: "skateable", name: "Skateable" } } },
        { properties: { status: { id: "skateable", name: "Skateable" } } },
      ]);
      const selectedStatuses = {
        "stoppied": true,
        "demolished": false,
        "skateable": false,
        "fixed": false,
        "needs_fixing": false,
        "unknown": false,
      };
      const result = filterSpotsByStatus(spots, selectedStatuses);
      expect(result).toEqual([
        {
          id: 1,
          type: "Feature",
          geometry: { type: "Point", coordinates: [0, 0] },
          properties: {
            name: "Test Spot 1",
            status: { id: "stoppied", name: "Stoppied" },
          },
        },
        {
          id: 4,
          type: "Feature",
          geometry: { type: "Point", coordinates: [0, 0] },
          properties: {
            name: "Test Spot 4",
            status: { id: "stoppied", name: "Stoppied" },
          },
        },
      ]);
    });
  });

  describe("given a list of spots and multiple statuses", () => {
    it("should return the spots that match the statuses", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([
        { properties: { status: { id: "stoppied", name: "Stoppied" } } },
        { properties: { status: { id: "demolished", name: "Demolished" } } },
        { properties: { status: { id: "skateable", name: "Skateable" } } },
        { properties: { status: { id: "stoppied", name: "Stoppied" } } },
        { properties: { status: { id: "skateable", name: "Skateable" } } },
        { properties: { status: { id: "skateable", name: "Skateable" } } },
      ]);
      const selectedStatuses = {
        "stoppied": true,
        "demolished": false,
        "skateable": true,
        "fixed": false,
        "needs_fixing": false,
        "unknown": false,
      };
      const result = filterSpotsByStatus(spots, selectedStatuses);
      expect(result).toEqual([
        {
          id: 1,
          type: "Feature",
          geometry: { type: "Point", coordinates: [0, 0] },
          properties: {
            name: "Test Spot 1",
            status: { id: "stoppied", name: "Stoppied" },
          },
        },
        {
          id: 3,
          type: "Feature",
          geometry: { type: "Point", coordinates: [0, 0] },
          properties: {
            name: "Test Spot 3",
            status: { id: "skateable", name: "Skateable" },
          },
        },
        {
          id: 4,
          type: "Feature",
          geometry: { type: "Point", coordinates: [0, 0] },
          properties: {
            name: "Test Spot 4",
            status: { id: "stoppied", name: "Stoppied" },
          },
        },
        {
          id: 5,
          type: "Feature",
          geometry: { type: "Point", coordinates: [0, 0] },
          properties: {
            name: "Test Spot 5",
            status: { id: "skateable", name: "Skateable" },
          },
        },
        {
          id: 6,
          type: "Feature",
          geometry: { type: "Point", coordinates: [0, 0] },
          properties: {
            name: "Test Spot 6",
            status: { id: "skateable", name: "Skateable" },
          },
        },
      ]);
    });
  });

  describe("given a list of spots and an empty status", () => {
    it("should return all spots", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([
        { properties: { status: { id: "stoppied", name: "Stoppied" } } },
        { properties: { status: { id: "demolished", name: "Demolished" } } },
        { properties: { status: { id: "skateable", name: "Skateable" } } },
        { properties: { status: { id: "stoppied", name: "Stoppied" } } },
        { properties: { status: { id: "skateable", name: "Skateable" } } },
        { properties: { status: { id: "skateable", name: "Skateable" } } },
      ]);
      const selectedStatuses = {};
      // @ts-expect-error - Testing invalid input
      const result = filterSpotsByStatus(spots, selectedStatuses);
      expect(result).toEqual(spots);
    });
  });
});
