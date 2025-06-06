import { describe, expect, it } from "vitest";
import { filterSpotsWithNoImage } from "./filterSpotsWithNoImage";

describe("UTIL: filterSpotsWithNoImage", () => {
  describe("given a list of spots", () => {
    it("should return the spots that do not have an image", () => {
      const spots = [
        {
          id: 1,
          properties: {
            images: [
              { url: "version1/image1" },
              { url: "version3/image2" },
              { url: "version1/image3" },
            ],
          },
        },
        {
          id: 2,
          properties: {
            images: [{ url: "version1/image4" }],
          },
        },
        {
          id: 3,
          properties: {
            images: [],
          },
        },
        {
          id: 4,
          properties: {
            images: [
              { url: "version1/image5" },
              { url: "version2/image6" },
              { url: "version1/image7" },
            ],
          },
        },
        {
          id: 5,
          properties: {
            images: [],
          },
        },
      ];
      const result = filterSpotsWithNoImage(spots);
      expect(result).toEqual([
        {
          id: 3,
          properties: {
            images: [],
          },
        },
        {
          id: 5,
          properties: {
            images: [],
          },
        },
      ]);
    });
  });

  describe("given a list of spots with no images", () => {
    it("should return all images", () => {
      const spots = [
        {
          id: 1,
          properties: {
            images: [],
          },
        },
        {
          id: 2,
          properties: {},
        },
        {
          id: 3,
          properties: {
            images: [],
          },
        },
        {
          id: 4,
          properties: {},
        },
        {
          id: 5,
          properties: {
            images: [],
          },
        },
      ];
      const result = filterSpotsWithNoImage(spots);
      expect(result).toEqual([
        {
          id: 1,
          properties: {
            images: [],
          },
        },
        {
          id: 2,
          properties: {},
        },
        {
          id: 3,
          properties: {
            images: [],
          },
        },
        {
          id: 4,
          properties: {},
        },
        {
          id: 5,
          properties: {
            images: [],
          },
        },
      ]);
    });
  });
});
