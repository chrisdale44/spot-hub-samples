import { CategoryId, MapBoundingBox, SearchRadius, StatusId } from ".";

export type SearchAreaFilter = {
    type: "searchArea";
    payload: SearchRadius | { viewport: MapBoundingBox };
};

export type TagsFilter = {
    type: "selectedTags";
    payload: number[];
};

export type StatusFilter = {
    type: "selectedStatuses";
    payload: { [key in StatusId]: boolean };
};

export type CategoryFilter = {
    type: "selectedCategories";
    payload: { [key in CategoryId]: boolean };
};

export type IdFilter = {
    type: "spotBeingEdited";
    payload: number;
};

export type BooleanFilter = {
    type: "hasImages" | "hasNoImages" | "spotsWithoutTags" | "spotsWithTags";
    payload: boolean;
};

export type SelectedFilter =
    | SearchAreaFilter
    | TagsFilter
    | StatusFilter
    | CategoryFilter
    | IdFilter
    | BooleanFilter;
