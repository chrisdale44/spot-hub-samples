import type { Image } from "../../types";

export const mockFilesFactory = (n) => {
    const mockFiles: Image[] = [];
    for (let i = 0; i < n; i++) {
        mockFiles.push({
            name: `file-${i}`,
            ratio: "1/1",
            url: `https://file-${i}`,
            preview: `preview-${i}`,
            index: i,
        });
    }
    return mockFiles;
};
