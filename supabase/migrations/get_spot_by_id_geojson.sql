CREATE OR REPLACE FUNCTION "public"."get_spot_by_id_geojson"("id" integer, "include_private" boolean DEFAULT false) RETURNS "jsonb"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN (
        SELECT jsonb_build_object(
            'type', 'Feature',
            'id', s.id,
            'areaKey', s.area_key,
            'properties', jsonb_strip_nulls(
                jsonb_build_object(
                    'name', s.name,
                    'description', s.description,
                    'images', s.images,
                    'media', media_data.media_array, -- Updated to use the new media_array
                    'thumb', s.thumb,
                    'isPrivate', s.is_private,
                    'category', s.category,
                    'status', s.status,
                    'tags', COALESCE(tags_data.tags, '[]'::jsonb),
                    'verified', s.verified,
                    'createdAt', s.created_at,
                    'lastEditedAt', s.last_edited_at
                )
            ),
            'geometry', ST_AsGeoJSON(s.location)::jsonb
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
                    ) ORDER BY m.created_at -- Optional: Order media by creation date or another relevant field
                ) AS media_array
            FROM media m
            WHERE m.spot_id = get_spot_by_id_geojson.id 
            GROUP BY m.spot_id
        ) AS media_data ON media_data.spot_id = s.id
        WHERE s.id = get_spot_by_id_geojson.id
        AND (include_private OR s.is_private = false)
    );
END;
$$;