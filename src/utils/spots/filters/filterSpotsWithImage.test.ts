import { describe, expect, it } from "vitest";
import { filterSpotsWithImage } from "./filterSpotsWithImage";
import { SpotGeoJson } from "@/types";
import { createSpotGeoJsonArray } from "@/test/factories";

describe("UTIL: filterSpotsWithImage", () => {
  describe("given a list of spots", () => {
    it("should return the spots that have an image", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray([
        {
          properties: {
            images: [
              { url: "version1/image1", alt: "alt text" },
              { url: "version3/image2", alt: "alt text" },
              { url: "version1/image3", alt: "alt text" },
            ],
          },
        },
        {
          properties: {
            images: [{ url: "version1/image4", alt: "alt text" }],
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
          },
        },
      ]);
      const result = filterSpotsWithImage(spots);
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
            images: [
              { url: "version1/image1", "alt": "alt text" },
              { url: "version3/image2", "alt": "alt text" },
              { url: "version1/image3", "alt": "alt text" },
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
            images: [{ url: "version1/image4", "alt": "alt text" }],
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
            images: [
              { url: "version1/image5", "alt": "alt text" },
              { url: "version2/image6", "alt": "alt text" },
              { url: "version1/image7", "alt": "alt text" },
            ],
          },
        },
      ]);
    });
  });

  describe("given a list of spots with no images", () => {
    it("should return an empty array", () => {
      const spots: SpotGeoJson[] = createSpotGeoJsonArray({}, 5);
      const result = filterSpotsWithImage(spots);
      expect(result).toEqual([]);
    });
  });
});
