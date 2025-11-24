import { describe, expect, it } from "vitest";
import { getFileInfo } from "./getFileInfo";
import { mockFilesFactory } from "./factories/mockFilesFactory";

describe("UTIL: getFileInfo", () => {
    it("should return the matching file and column index", () => {
        const mockFiles = mockFilesFactory(5);
        expect(getFileInfo(mockFiles, "file-3")).toEqual({
            file: mockFiles[3],
            currentColIndex: 3,
        });
        expect(getFileInfo(mockFiles, "file-1")).toEqual({
            file: mockFiles[1],
            currentColIndex: 1,
        });
        expect(getFileInfo(mockFiles, "file-4")).toEqual({
            file: mockFiles[4],
            currentColIndex: 4,
        });
        expect(getFileInfo(mockFiles, "file-0")).toEqual({
            file: mockFiles[0],
            currentColIndex: 0,
        });
    });
});
