import { describe, expect, it } from "vitest";
import { buildSearch, formatCount, getInitials, normalizeText } from "./utils";

describe("getInitials", () => {
  it("uses the first letters of the first and last name", () => {
    expect(getInitials("Ana Silva")).toBe("AS");
  });

  it("skips middle names and handles accents", () => {
    expect(getInitials("Léa Marie Martin")).toBe("LM");
  });

  it("works for a single name and extra spaces", () => {
    expect(getInitials("  cher  ")).toBe("C");
  });
});

describe("normalizeText", () => {
  it("lowercases and removes accents", () => {
    expect(normalizeText("Léa MARTIN")).toBe("lea martin");
  });
});

describe("formatCount", () => {
  it("says 'all' when nothing is filtered out", () => {
    expect(formatCount(7, 7)).toBe("Showing all 7 people");
  });

  it("shows 'x of y' when filtered, and uses the singular for one", () => {
    expect(formatCount(2, 7)).toBe("Showing 2 of 7 people");
    expect(formatCount(1, 1)).toBe("Showing all 1 person");
  });

  it("accepts other nouns", () => {
    expect(formatCount(3, 10, "file", "files")).toBe("Showing 3 of 10 files");
  });
});

describe("buildSearch", () => {
  it("builds a query string and leaves out empty values", () => {
    expect(buildSearch({ q: "lea", department: "Sales" })).toBe("?q=lea&department=Sales");
    expect(buildSearch({ q: "", department: "Design" })).toBe("?department=Design");
  });

  it("returns an empty string when every value is empty", () => {
    expect(buildSearch({ q: "", department: "" })).toBe("");
  });

  it("encodes special characters", () => {
    expect(buildSearch({ q: "léa & co" })).toBe("?q=l%C3%A9a+%26+co");
  });
});
