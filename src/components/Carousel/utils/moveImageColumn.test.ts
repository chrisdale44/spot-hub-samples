import { describe, expect, it } from "vitest";
import { moveImageColumn } from "./moveImageColumn";
import { mockFilesFactory } from "./factories/mockFilesFactory";

describe("UTIL: moveImageColumn", () => {
    it("should return files array with image correctly moved to beginning", () => {
        const mockFiles = mockFilesFactory(5);
        const currentIndex = 3;
        const file = Object.assign(mockFiles[currentIndex]);
        expect(moveImageColumn(mockFiles, file, currentIndex, 0)).toEqual([{
            "index": 3,
            "name": "file-3",
            "preview": "preview-3",
            "ratio": "1/1",
            "url": "https://file-3",
        }, {
            "index": 0,
            "name": "file-0",
            "preview": "preview-0",
            "ratio": "1/1",
            "url": "https://file-0",
        }, {
            "index": 1,
            "name": "file-1",
            "preview": "preview-1",
            "ratio": "1/1",
            "url": "https://file-1",
        }, {
            "index": 2,
            "name": "file-2",
            "preview": "preview-2",
            "ratio": "1/1",
            "url": "https://file-2",
        }, {
            "index": 4,
            "name": "file-4",
            "preview": "preview-4",
            "ratio": "1/1",
            "url": "https://file-4",
        }]);
    });

    it("should return files array with image correctly moved to end", () => {
        const mockFiles = mockFilesFactory(5);
        const currentIndex = 3;
        const file = Object.assign(mockFiles[currentIndex]);
        expect(moveImageColumn(mockFiles, file, currentIndex, 4)).toEqual([{
            "index": 0,
            "name": "file-0",
            "preview": "preview-0",
            "ratio": "1/1",
            "url": "https://file-0",
        }, {
            "index": 1,
            "name": "file-1",
            "preview": "preview-1",
            "ratio": "1/1",
            "url": "https://file-1",
        }, {
            "index": 2,
            "name": "file-2",
            "preview": "preview-2",
            "ratio": "1/1",
            "url": "https://file-2",
        }, {
            "index": 4,
            "name": "file-4",
            "preview": "preview-4",
            "ratio": "1/1",
            "url": "https://file-4",
        }, {
            "index": 3,
            "name": "file-3",
            "preview": "preview-3",
            "ratio": "1/1",
            "url": "https://file-3",
        }]);
    });

    it("should return files array with image correctly moved", () => {
        const mockFiles = mockFilesFactory(5);
        const currentIndex = 0;
        const file = Object.assign(mockFiles[currentIndex]);
        expect(moveImageColumn(mockFiles, file, currentIndex, 3)).toEqual([{
            "index": 1,
            "name": "file-1",
            "preview": "preview-1",
            "ratio": "1/1",
            "url": "https://file-1",
        }, {
            "index": 2,
            "name": "file-2",
            "preview": "preview-2",
            "ratio": "1/1",
            "url": "https://file-2",
        }, {
            "index": 3,
            "name": "file-3",
            "preview": "preview-3",
            "ratio": "1/1",
            "url": "https://file-3",
        }, {
            "index": 0,
            "name": "file-0",
            "preview": "preview-0",
            "ratio": "1/1",
            "url": "https://file-0",
        }, {
            "index": 4,
            "name": "file-4",
            "preview": "preview-4",
            "ratio": "1/1",
            "url": "https://file-4",
        }]);
    });

    it("should return unchanged files array if currentColIndex equals newColIndex", () => {
        const mockFiles = mockFilesFactory(5);
        const file = Object.assign(mockFiles[1]);
        expect(moveImageColumn(mockFiles, file, 1, 1)).toEqual(mockFiles);
    });
});
