export type StatusId =
    | "skateable"
    | "stoppied"
    | "fixed"
    | "needs_fixing"
    | "demolished"
    | "unknown";

export type Status = {
    id: StatusId;
    name: string;
};
