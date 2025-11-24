import type { Image } from "../types";

export const moveImageColumn = (
    files: Image[],
    file: Image,
    currentColIndex: number,
    newColIndex: number,
): Image[] => {
    // image is dropped in the same position
    if (currentColIndex === newColIndex) {
        return files;
    }
    // if the image is moved to the right, the index of the image in the row will be reduced by 1
    // const afterSpliceColIndex =
    //   newColIndex > currentColIndex ? newColIndex - 1 : newColIndex;
    files.splice(currentColIndex, 1);
    files.splice(newColIndex, 0, file); // add image in new position
    return files;
};
