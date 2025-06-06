import { describe, it, expect } from "vitest";
import { filterSpots } from "./filterSpots";
import { AND, OR, HAS_IMAGES, HAS_NO_IMAGES } from "@/constants/filters";

describe("UTIL: filterSpots", () => {
  const spots = [
    {
      id: 1,
      name: "Spot1",
      geometry: { coordinates: [1, 1] },
      properties: {
        tags: [
          { id: 1, name: "tag1" },
          { id: 2, name: "tag2" },
          { id: 3, name: "tag3" },
        ],
        status: { id: 2, name: "demolished" },
        category: { id: 1, name: "park" },
      },
    },
    {
      id: 2,
      name: "Spot2",
      geometry: { coordinates: [10, 10] },
      properties: {
        tags: [
          { id: 2, name: "tag2" },
          { id: 3, name: "tag3" },
          { id: 4, name: "tag4" },
        ],
        images: [
          { url: "version1/image1" },
          { url: "version3/image2" },
          { url: "version1/image3" },
        ],
        status: { id: 1, name: "stoppied" },
        category: { id: 2, name: "street" },
      },
    },
    {
      id: 3,
      name: "Spot3",
      geometry: { coordinates: [-1.532132, -1.999283] },
      properties: {
        tags: [
          { id: 3, name: "tag3" },
          { id: 4, name: "tag4" },
          { id: 5, name: "tag5" },
        ],
        images: [{ url: "version1/image4" }],
        status: { id: 3, name: "skateable" },
        category: { id: 3, name: "shop" },
      },
    },
    {
      id: 4,
      name: "Spot4",
      geometry: { coordinates: [-2, -1] },
      properties: {
        tags: [
          { id: 1, name: "tag1" },
          { id: 2, name: "tag2" },
          { id: 3, name: "tag3" },
        ],
        status: { id: 2, name: "demolished" },
        category: { id: 1, name: "park" },
      },
    },
    {
      id: 5,
      name: "Spot5",
      geometry: { coordinates: [41, 51] },
      properties: {
        tags: [{ id: 4, name: "tag4" }],
        images: [
          { url: "version1/image1" },
          { url: "version3/image2" },
          { url: "version1/image3" },
        ],
        status: { id: 1, name: "stoppied" },
        category: { id: 2, name: "street" },
      },
    },
    {
      id: 6,
      name: "Spot6",
      geometry: { coordinates: [-0.1, -0.3] },
      properties: {
        tags: [
          { id: 5, name: "tag5" },
          { id: 6, name: "tag6" },
          { id: 7, name: "tag7" },
        ],
        images: [{ url: "version1/image4" }],
        status: { id: 1, name: "stoppied" },
        category: { id: 3, name: "shop" },
      },
    },
  ];

  it("should filter spots based on the given criteria", () => {
    const selectedFilters = {
      [HAS_IMAGES]: false,
      [HAS_NO_IMAGES]: true,
      searchArea: { radius: 5000000, center: { latitude: 0, longitude: 0 } },
      selectedTags: [3, 4],
      selectedStatuses: { 1: true },
      selectedCategories: { 2: true },
      spotBeingEdited: 5,
    };
    const tagsOperator = AND;
    const filteredSpots = filterSpots(spots, selectedFilters, tagsOperator);
    expect(filteredSpots).toEqual([
      {
        id: 2,
        name: "Spot2",
        geometry: { coordinates: [10, 10] },
        properties: {
          tags: [
            { id: 2, name: "tag2" },
            { id: 3, name: "tag3" },
            { id: 4, name: "tag4" },
          ],
          images: [
            { url: "version1/image1" },
            { url: "version3/image2" },
            { url: "version1/image3" },
          ],
          status: { id: 1, name: "stoppied" },
          category: { id: 2, name: "street" },
        },
      },
    ]);
  });

  it("should filter spots based on the given criteria", () => {
    const selectedFilters = {
      [HAS_IMAGES]: true,
      [HAS_NO_IMAGES]: false,
      searchArea: { radius: 5000000, center: { latitude: 0, longitude: 0 } },
      selectedTags: [3, 4],
      selectedStatuses: { 1: true, 2: true, 3: false },
      selectedCategories: { 1: true, 2: false, 3: true },
      spotBeingEdited: 1,
    };
    const tagsOperator = OR;
    const filteredSpots = filterSpots(spots, selectedFilters, tagsOperator);
    expect(filteredSpots).toEqual([
      {
        id: 4,
        name: "Spot4",
        geometry: { coordinates: [-2, -1] },
        properties: {
          tags: [
            { id: 1, name: "tag1" },
            { id: 2, name: "tag2" },
            { id: 3, name: "tag3" },
          ],
          status: { id: 2, name: "demolished" },
          category: { id: 1, name: "park" },
        },
      },
    ]);
  });

  it("should filter spots based on the given criteria", () => {
    const viewport = {
      northEast: { latitude: 1, longitude: 1 },
      southWest: { latitude: -5, longitude: -5 },
      contains: (coordinates) => {
        const [lng, lat] = coordinates;
        return (
          lat >= viewport.southWest.latitude &&
          lat <= viewport.northEast.latitude &&
          lng >= viewport.southWest.longitude &&
          lng <= viewport.northEast.longitude
        );
      },
    };
    const selectedFilters = {
      [HAS_IMAGES]: false,
      [HAS_NO_IMAGES]: true,
      searchArea: { viewport },
      selectedTags: [5, 7],
      selectedStatuses: { 1: true, 2: true, 3: false },
      selectedCategories: { 1: false, 2: true, 3: true },
      spotBeingEdited: 2,
    };
    const tagsOperator = OR;
    const filteredSpots = filterSpots(spots, selectedFilters, tagsOperator);
    expect(filteredSpots).toEqual([
      {
        id: 6,
        name: "Spot6",
        geometry: { coordinates: [-0.1, -0.3] },
        properties: {
          tags: [
            { id: 5, name: "tag5" },
            { id: 6, name: "tag6" },
            { id: 7, name: "tag7" },
          ],
          images: [{ url: "version1/image4" }],
          status: { id: 1, name: "stoppied" },
          category: { id: 3, name: "shop" },
        },
      },
    ]);
  });

  it("should return an empty array when no spots match the criteria", () => {
    const selectedFilters = {
      [HAS_IMAGES]: true,
      [HAS_NO_IMAGES]: false,
      searchArea: { radius: 5000000, center: { latitude: 0, longitude: 0 } },
      selectedTags: [1],
      selectedStatuses: { 1: true },
      selectedCategories: { 1: true },
      spotBeingEdited: 2,
    };
    const tagsOperator = AND;
    const filteredSpots = filterSpots(spots, selectedFilters, tagsOperator);
    expect(filteredSpots).toEqual([]);
  });
});
