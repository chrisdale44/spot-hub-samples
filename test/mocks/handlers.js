import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(
    `https://test-api.example.com/rest/v1/rpc/get_spot_category_values`,
    () => {
      return HttpResponse.json([
        { id: 1, name: "Category 1" },
        { id: 2, name: "Category 2" },
      ]);
    }
  ),
  http.post(
    `https://test-api.example.com/rest/v1/rpc/get_spot_status_values`,
    () => {
      return HttpResponse.json([
        { id: "active", name: "Active" },
        { id: "inactive", name: "Inactive" },
      ]);
    }
  ),
  http.post(`https://test-api.example.com/rest/v1/rpc/get_all_tags`, () => {
    return HttpResponse.json([
      { id: 1, name: "Tag 1" },
      { id: 2, name: "Tag 2" },
    ]);
  }),
  http.post(
    `https://test-api.example.com/rest/v1/rpc/get_spots_within_bounding_boxes`,
    () => {
      return HttpResponse.json([
        {
          id: 1,
          area_key: "area1",
          coordinates: { lat: 2, lng: 1 },
          name: "Spot 1",
          description: "Description 1",
          is_private: false,
          category: "street",
          status: "active",
          images: '[{"url": "version/imageId"}]',
          media: '[{"url": "version/imageId"}]',
          thumb: "version/imageId",
        },
        {
          id: 2,
          area_key: "area2",
          coordinates: { lat: 3, lng: 4 },
          name: "Spot 2",
          description: "Description 2",
          is_private: true,
          category: "park",
          status: "inactive",
          images: '[{"url": "version/imageId"}]',
          media: '[{"url": "version/imageId"}]',
          thumb: "version/imageId",
        },
      ]);
    }
  ),
  http.post(
    `https://test-api.example.com/rest/v1/rpc/get_spot_by_id_geojson`,
    () => {
      const { id } = req.body;
      return HttpResponse.json({
        areaKey: "area1",
        depth: "complete",
        geometry: {
          coordinates: [1, 2],
          type: "Point",
        },
        id,
        properties: {
          category: {
            id: "street",
            name: "Street",
          },
          description: "Description 1",
          images: [
            {
              alt: "Spot 1",
              url: "version1/imageId1",
            },
          ],
          isPrivate: false,
          media: [
            {
              url: "version1/imageId2",
            },
          ],
          name: "Spot 1",
          status: {
            id: "active",
            name: "Active",
          },
          thumb: "version2/imageId1",
        },
        type: "Feature",
      });
    }
  ),
];
