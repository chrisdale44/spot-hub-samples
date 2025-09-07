CREATE OR REPLACE FUNCTION "public"."get_spots_within_bounding_box"("min_lat" double precision, "min_lng" double precision, "max_lat" double precision, "max_lng" double precision, "include_private" boolean DEFAULT false) RETURNS "jsonb"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN (
        SELECT jsonb_agg(
            jsonb_strip_nulls( -- Strip nulls from each spot object
                jsonb_build_object(
                    'id', s.id,
                    'name', s.name,
                    'description', s.description,
                    'images', s.images,
                    'media', COALESCE(media_data.media_array, '[]'::jsonb), -- Use COALESCE to ensure an empty array if no media
                    'thumb', s.thumb,
                    'isPrivate', s.is_private,
                    'category', s.category,
                    'status', s.status,
                    'tags', COALESCE(tags_data.tags, '[]'::jsonb),
                    'verified', s.verified,
                    'createdAt', s.created_at,
                    'lastEditedAt', s.last_edited_at,
                    'location', ST_AsGeoJSON(s.location)::jsonb, -- Include location as GeoJSON
                    'areaKey', s.area_key -- Include areaKey in each spot object
                )
            )
        )
        FROM spots s
        LEFT JOIN (
            SELECT st.spot_id, jsonb_agg(
                jsonb_build_object(
                    'id', t.id,
                    'name', t.name
                )
            ) AS tags
            FROM spot_tags st
            JOIN tags t ON st.tag_id = t.id
            GROUP BY st.spot_id
        ) AS tags_data ON tags_data.spot_id = s.id
        LEFT JOIN (
            SELECT
                m.spot_id,
                jsonb_agg(
                    jsonb_strip_nulls(
                        jsonb_build_object(
                            'id', m.id,
                            'url', m.url,
                            'urlType', m.url_type,
                            'mediaId', m.media_id,
                            'mediaType', m.media_type,
                            'timestamp', m.timestamp,
                            'subject', m.subject,
                            'trick', m.trick,
                            'shotBy', m.shot_by,
                            'title', m.title,
                            'author', m.author,
                            'thumb', m.thumb,
                            'verified', m.verified
                        )
                    ) ORDER BY m.created_at
                ) AS media_array
            FROM media m
            GROUP BY m.spot_id
        ) AS media_data ON media_data.spot_id = s.id
        WHERE s.location && ST_MakeEnvelope(
            min_lng, min_lat, -- Bottom-left corner (min longitude, min latitude)
            max_lng, max_lat, -- Top-right corner (max longitude, max latitude)
            4326 -- SRID for WGS 84 (latitude/longitude)
        )
        AND (include_private OR s.is_private = false) -- Added parentheses for correct logic
    );
END;
$$;