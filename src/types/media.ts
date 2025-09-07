export type MediaItemFromServer = {
    id: number;
    url?: string;
    urlType?: string;
    mediaId?: string;
    mediaType?: string;
    author?: string;
    title?: string;
    thumb?: string;
    verified: boolean;
    createdBy?: string;
    lastEditedBy?: string;
    createdAt?: string;
    lastEditedAt?: string;
};

export type MediaItem = {
    id: number;
    url?: string;
    urlType?: string;
    mediaId?: string;
    mediaType?: string;
    author?: string;
    title?: string;
    thumb: string | null;
    verified: boolean;
    createdBy?: string;
    lastEditedBy?: string;
    createdAt?: string;
    lastEditedAt?: string;
};
