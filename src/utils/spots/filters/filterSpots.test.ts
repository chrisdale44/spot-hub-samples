import { describe, expect, it } from "vitest";
import { filterSpots } from "./filterSpots";
import { AND, HAS_IMAGES, HAS_NO_IMAGES, OR } from "@/constants/filters";
import {
  CategoryFilter,
  MapBoundingBox,
  SelectedFilter,
  SpotGeoJson,
  StatusFilter,
} from "@/types";
import { createSpotGeoJsonArray } from "@/test/factories";

describe("UTIL: filterSpots", () => {
  const spots: SpotGeoJson[] = createSpotGeoJsonArray([
    {
      geometry: { type: "Point", coordinates: [1, 1] },
      properties: {
        tags: [
          { id: 1, name: "tag1" },
          { id: 2, name: "tag2" },
          { id: 3, name: "tag3" },
        ],
        status: { id: "demolished", name: "Demolished" },
        category: { id: "park", name: "Park" },
      },
    },
    {
      geometry: { type: "Point", coordinates: [10, 10] },
      properties: {
        tags: [
          { id: 2, name: "tag2" },
          { id: 3, name: "tag3" },
          { id: 4, name: "tag4" },
        ],
        images: [
          { url: "version1/image1", alt: "Alt text 1" },
          { url: "version3/image2", alt: "Alt text 2" },
          { url: "version1/image3", alt: "Alt text 3" },
        ],
        status: { id: "stoppied", name: "Stoppied" },
        category: { id: "street", name: "Street" },
      },
    },
    {
      geometry: { type: "Point", coordinates: [-1.532132, -1.999283] },
      properties: {
        tags: [
          { id: 3, name: "tag3" },
          { id: 4, name: "tag4" },
          { id: 5, name: "tag5" },
        ],
        images: [{ url: "version1/image4", alt: "Alt text 4" }],
        status: { id: "skateable", name: "Skateable" },
        category: { id: "shop", name: "Shop" },
      },
    },
    {
      geometry: { type: "Point", coordinates: [-2, -1] },
      properties: {
        tags: [
          { id: 1, name: "tag1" },
          { id: 2, name: "tag2" },
          { id: 3, name: "tag3" },
        ],
        status: { id: "demolished", name: "Demolished" },
        category: { id: "park", name: "Park" },
      },
    },
    {
      geometry: { type: "Point", coordinates: [41, 51] },
      properties: {
        tags: [{ id: 4, name: "tag4" }],
        images: [
          { url: "version1/image1", alt: "Alt text 1" },
          { url: "version3/image2", alt: "Alt text 2" },
          { url: "version1/image3", alt: "Alt text 3" },
        ],
        status: { id: "stoppied", name: "Stoppied" },
        category: { id: "street", name: "Street" },
      },
    },
    {
      geometry: { type: "Point", coordinates: [-0.1, -0.3] },
      properties: {
        tags: [
          { id: 5, name: "tag5" },
          { id: 6, name: "tag6" },
          { id: 7, name: "tag7" },
        ],
        images: [{ url: "version1/image4", alt: "Alt text 4" }],
        status: { id: "stoppied", name: "Stoppied" },
        category: { id: "shop", name: "Shop" },
      },
    },
  ]);

  it("should return Test Spot 2 based on combination of filters", () => {
    const selectedFilters: SelectedFilter[] = [
      { type: HAS_IMAGES, payload: false }, // filter off
      { type: HAS_NO_IMAGES, payload: true }, // filters spot 1 and 4
      {
        type: "searchArea",
        payload: { radius: 5000000, center: { latitude: 0, longitude: 0 } },
      }, // does not filter any spots
      { type: "selectedTags", payload: [3, 4] }, // filters spot 5 and 6
      { type: "selectedStatuses", payload: { stoppied: true } } as StatusFilter, // filters spot 3
      {
        type: "selectedCategories",
        payload: { street: true },
      } as CategoryFilter, // filters spot 1, 3, 4 and 6
      { type: "spotBeingEdited", payload: 5 }, // filters spot 5
    ];
    const tagsOperator = AND;
    const filteredSpots = filterSpots(spots, selectedFilters, tagsOperator);
    expect(filteredSpots).toEqual([
      {
        id: 2,
        type: "Feature",
        geometry: { type: "Point", coordinates: [10, 10] },
        properties: {
          name: "Test Spot 2",
          tags: [
            { id: 2, name: "tag2" },
            { id: 3, name: "tag3" },
            { id: 4, name: "tag4" },
          ],
          images: [
            { url: "version1/image1", alt: "Alt text 1" },
            { url: "version3/image2", alt: "Alt text 2" },
            { url: "version1/image3", alt: "Alt text 3" },
          ],
          status: { id: "stoppied", name: "Stoppied" },
          category: { id: "street", name: "Street" },
        },
      },
    ]);
  });

  it("should return Test Spot 4 based on combination of filters", () => {
    const selectedFilters: SelectedFilter[] = [
      { type: HAS_IMAGES, payload: true }, // filters spot 2, 3, 5 and 6
      { type: HAS_NO_IMAGES, payload: false },
      {
        type: "searchArea",
        payload: { radius: 5000000, center: { latitude: 0, longitude: 0 } },
      },
      { type: "selectedTags", payload: [3, 4] },
      {
        type: "selectedStatuses",
        payload: { "stoppied": true, "demolished": true },
      } as StatusFilter,
      {
        type: "selectedCategories",
        payload: { "street": true, "park": true },
      } as CategoryFilter,
      { type: "spotBeingEdited", payload: 1 }, // filters spot 1
    ];
    const tagsOperator = OR;
    const filteredSpots = filterSpots(spots, selectedFilters, tagsOperator);
    expect(filteredSpots).toEqual([
      {
        id: 4,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-2, -1] },
        properties: {
          name: "Test Spot 4",
          tags: [
            { id: 1, name: "tag1" },
            { id: 2, name: "tag2" },
            { id: 3, name: "tag3" },
          ],
          status: { id: "demolished", name: "Demolished" },
          category: { id: "park", name: "Park" },
        },
      },
    ]);
  });

  it("should return Test Spot 6 based on combination of filters", () => {
    const viewport: MapBoundingBox = {
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
    const selectedFilters: SelectedFilter[] = [
      { type: HAS_IMAGES, payload: false },
      { type: HAS_NO_IMAGES, payload: true }, // filters spot 1 and 4
      {
        type: "searchArea",
        payload: { viewport },
      }, // filters spot 2 and 5
      { type: "selectedTags", payload: [3, 4, 5] },
      {
        type: "selectedStatuses",
        payload: { "stoppied": true },
      } as StatusFilter, // filters spot 3
      {
        type: "selectedCategories",
        payload: { "shop": true },
      } as CategoryFilter,
    ];
    const tagsOperator = OR;
    const filteredSpots = filterSpots(spots, selectedFilters, tagsOperator);
    expect(filteredSpots).toEqual([
      {
        id: 6,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-0.1, -0.3] },
        properties: {
          name: "Test Spot 6",
          tags: [
            { id: 5, name: "tag5" },
            { id: 6, name: "tag6" },
            { id: 7, name: "tag7" },
          ],
          images: [{ url: "version1/image4", alt: "Alt text 4" }],
          status: { id: "stoppied", name: "Stoppied" },
          category: { id: "shop", name: "Shop" },
        },
      },
    ]);
  });

  it("should return an empty array when no spots match the criteria", () => {
    const selectedFilters: SelectedFilter[] = [
      { type: HAS_IMAGES, payload: true }, // filters spot 2, 3, 5 and 6
      { type: HAS_NO_IMAGES, payload: false },
      {
        type: "searchArea",
        payload: { radius: 5000000, center: { latitude: 0, longitude: 0 } },
      },
      { type: "selectedTags", payload: [1] }, // filters spot 2, 3, 5 and 6
      {
        type: "selectedStatuses",
        payload: { skateable: true },
      } as StatusFilter, // filters spot 1, 2, 4 and 6
      {
        type: "selectedCategories",
        payload: { street: true },
      } as CategoryFilter, // filters spot 1, 3, 4 and 6
      { type: "spotBeingEdited", payload: 2 }, // filters spot 2
    ];
    const tagsOperator = AND;
    const filteredSpots = filterSpots(spots, selectedFilters, tagsOperator);
    expect(filteredSpots).toEqual([]);
  });
});
