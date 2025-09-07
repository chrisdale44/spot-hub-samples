import { describe, expect, it } from "vitest";
import { filterSpotsByTags } from "./filterSpotsByTags";
import { OR } from "@/constants/filters";
import { SpotGeoJson } from "@/types";
import { createSpotGeoJsonArray } from "@/test/factories";

describe("UTIL: filterSpotsByTags", () => {
  describe("given a list of spots and a tag", () => {
    it("should return the spots that match the tag", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([
        {
          properties: {
            tags: [{ id: 1, name: "tag1" }, { id: 2, name: "tag2" }, {
              id: 3,
              name: "tag3",
            }],
          },
        },
        {
          properties: {
            tags: [{ id: 2, name: "tag2" }, { id: 3, name: "tag3" }, {
              id: 4,
              name: "tag4",
            }],
          },
        },
        {
          properties: {
            tags: [{ id: 3, name: "tag3" }, { id: 4, name: "tag4" }, {
              id: 5,
              name: "tag5",
            }],
          },
        },
      ]);
      const selectedTags = [1];
      const result = filterSpotsByTags(spots, selectedTags);
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
            tags: [
              { id: 1, name: "tag1" },
              { id: 2, name: "tag2" },
              { id: 3, name: "tag3" },
            ],
          },
        },
      ]);
    });
  });

  describe("given a list of spots and a tag", () => {
    it("should return the spots that match the tag", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([{
        properties: {
          tags: [{ id: 1, name: "tag1" }, { id: 2, name: "tag2" }, {
            id: 3,
            name: "tag3",
          }],
        },
      }, {
        properties: {
          tags: [{ id: 2, name: "tag2" }, { id: 3, name: "tag3" }, {
            id: 4,
            name: "tag4",
          }],
        },
      }, {
        properties: {
          tags: [{ id: 3, name: "tag3" }, { id: 4, name: "tag4" }, {
            id: 5,
            name: "tag5",
          }],
        },
      }]);
      const selectedTags = [4];
      const result = filterSpotsByTags(spots, selectedTags);
      expect(result).toEqual([
        {
          id: 2,
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [0, 0],
          },
          properties: {
            name: "Test Spot 2",
            tags: [
              { id: 2, name: "tag2" },
              { id: 3, name: "tag3" },
              { id: 4, name: "tag4" },
            ],
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
            tags: [
              { id: 3, name: "tag3" },
              { id: 4, name: "tag4" },
              { id: 5, name: "tag5" },
            ],
          },
        },
      ]);
    });
  });

  describe("given a list of spots and multiple tags", () => {
    it("should return the spots that match both the tags", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([{
        properties: {
          tags: [
            { id: 1, name: "tag1" },
            { id: 2, name: "tag2" },
            { id: 3, name: "tag3" },
          ],
        },
      }, {
        properties: {
          tags: [
            { id: 2, name: "tag2" },
            { id: 3, name: "tag3" },
            { id: 4, name: "tag4" },
          ],
        },
      }, {
        properties: {
          tags: [
            { id: 3, name: "tag3" },
            { id: 4, name: "tag4" },
            { id: 5, name: "tag5" },
          ],
        },
      }]);
      const selectedTags = [2, 3];
      const result = filterSpotsByTags(spots, selectedTags);
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
            tags: [
              { id: 1, name: "tag1" },
              { id: 2, name: "tag2" },
              { id: 3, name: "tag3" },
            ],
          },
        },
        {
          id: 2,
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [0, 0],
          },
          properties: {
            name: "Test Spot 2",
            tags: [
              { id: 2, name: "tag2" },
              { id: 3, name: "tag3" },
              { id: 4, name: "tag4" },
            ],
          },
        },
      ]);
    });
  });

  describe("given a list of spots and multiple tags with OR operator", () => {
    it("should return the spots that match any tag", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([{
        properties: {
          tags: [
            { id: 1, name: "tag1" },
            { id: 2, name: "tag2" },
            { id: 3, name: "tag3" },
          ],
        },
      }, {
        properties: {
          tags: [
            { id: 2, name: "tag2" },
            { id: 3, name: "tag3" },
            { id: 4, name: "tag4" },
          ],
        },
      }, {
        properties: {
          tags: [
            { id: 3, name: "tag3" },
            { id: 4, name: "tag4" },
            { id: 5, name: "tag5" },
          ],
        },
      }]);
      const selectedTags = [1, 5];
      const operator = OR;
      const result = filterSpotsByTags(spots, selectedTags, operator);
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
            tags: [
              { id: 1, name: "tag1" },
              { id: 2, name: "tag2" },
              { id: 3, name: "tag3" },
            ],
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
            tags: [
              { id: 3, name: "tag3" },
              { id: 4, name: "tag4" },
              { id: 5, name: "tag5" },
            ],
          },
        },
      ]);
    });
  });

  describe("given a list of spots and an empty tag", () => {
    it("should return all spots", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([{
        properties: {
          tags: [
            { id: 1, name: "tag1" },
            { id: 2, name: "tag2" },
            { id: 3, name: "tag3" },
          ],
        },
      }, {
        properties: {
          tags: [
            { id: 2, name: "tag2" },
            { id: 3, name: "tag3" },
            { id: 4, name: "tag4" },
          ],
        },
      }, {
        properties: {
          tags: [
            { id: 3, name: "tag3" },
            { id: 4, name: "tag4" },
            { id: 5, name: "tag5" },
          ],
        },
      }]);

      const selectedTags = [];
      const result = filterSpotsByTags(spots, selectedTags);
      expect(result).toEqual(spots);
    });
  });
});
