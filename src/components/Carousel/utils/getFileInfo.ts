import type { Image } from "../types";

export const getFileInfo = (
    files: Image[],
    imgName: string,
): { file: Image; currentColIndex: number } => {
    const fileIndex = files.findIndex((file) => file.name === imgName);
    return {
        file: files[fileIndex],
        currentColIndex: fileIndex,
    };
};
