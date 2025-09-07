import { describe, expect, it } from "vitest";
import { filterSpotsWithNoImage } from "./filterSpotsWithNoImage";
import { SpotGeoJson } from "@/types";
import { createSpotGeoJsonArray } from "@/test/factories";

describe("UTIL: filterSpotsWithNoImage", () => {
  describe("given a list of spots", () => {
    it("should return the spots that do not have an image", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([
        {
          properties: {
            images: [
              { url: "version1/image1", alt: "alt text" },
              { url: "version3/image2", alt: "alt text" },
              { url: "version1/image3", alt: "alt text" },
            ],
            media: [],
          },
        },
        {
          properties: {
            images: [
              { url: "version1/image4", alt: "alt text" },
            ],
            media: [],
          },
        },
        {},
        {
          properties: {
            images: [
              { url: "version1/image5", alt: "alt text" },
              { url: "version2/image6", alt: "alt text" },
              { url: "version1/image7", alt: "alt text" },
            ],
            media: [],
          },
        },
        {},
      ]);

      const result = filterSpotsWithNoImage(spots);
      expect(result).toEqual([
        {
          id: 3,
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [0, 0],
          },
          properties: {
            name: "Test Spot 3",
          },
        },
        {
          id: 5,
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [0, 0],
          },
          properties: {
            name: "Test Spot 5",
          },
        },
      ]);
    });
  });

  describe("given a list of spots with no images", () => {
    it("should return all images", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray({}, 5);
      const result = filterSpotsWithNoImage(spots);
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
          },
        },
        {
          id: 4,
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [0, 0],
          },
          properties: {
            name: "Test Spot 4",
          },
        },
        {
          id: 5,
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [0, 0],
          },
          properties: {
            name: "Test Spot 5",
          },
        },
      ]);
    });
  });
});
