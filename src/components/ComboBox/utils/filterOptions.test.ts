import filterOptions from "./filterOptions";
import { vi, describe, it, expect, beforeEach } from "vitest";

describe("UTIL: filterOptions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return all options if value is empty", () => {
    const options = [{ name: "Option1" }, { name: "Option2" }];
    const result = filterOptions(options, "");
    expect(result).toEqual(options);
  });

  it("should return all options if value is null", () => {
    const options = [{ name: "Option1" }, { name: "Option2" }];
    const result = filterOptions(options, null);
    expect(result).toEqual(options);
  });

  it("should filter options based on the value", () => {
    const options = [{ name: "Apple" }, { name: "Banana" }, { name: "Cherry" }];
    const result = filterOptions(options, "an");
    expect(result).toEqual([{ name: "Banana" }]);
  });

  it("should be case insensitive when filtering", () => {
    const options = [{ name: "Apple" }, { name: "banana" }, { name: "Cherry" }];
    const result = filterOptions(options, "BaNaNa");
    expect(result).toEqual([{ name: "banana" }]);
  });
});
