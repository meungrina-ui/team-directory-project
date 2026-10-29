import { describe, expect, it } from "vitest";
import { filterMembers, getDepartments, getMember, getMembers } from "./members";

describe("filterMembers", () => {
  const members = getMembers();
  const names = (query: string) => filterMembers(members, query).map((m) => m.name);

  it("returns everyone for an empty or blank query", () => {
    expect(filterMembers(members, "   ")).toHaveLength(members.length);
  });

  it("matches names regardless of case and accents", () => {
    expect(names("LEA")).toEqual(["Léa Martin"]);
  });

  it("matches roles", () => {
    expect(names("design")).toEqual(["Ana Silva"]); // "Product Designer"
    expect(names("engineer")).toEqual(["Priya Nair", "Jordan Lee"]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(names("zzz")).toEqual([]);
  });

  it("filters by department, alone or together with the search text", () => {
    const inDept = (query: string, department: string) =>
      filterMembers(members, query, department).map((m) => m.name);

    expect(inDept("", "Design")).toEqual(["Ana Silva", "Sam Okafor"]);
    expect(inDept("engineer", "Engineering")).toEqual(["Priya Nair", "Jordan Lee"]);
    expect(inDept("ana", "Sales")).toEqual([]);
  });
});

describe("getDepartments", () => {
  it("returns each department once, sorted", () => {
    expect(getDepartments()).toEqual(["Design", "Engineering", "Marketing", "Sales"]);
  });
});

describe("getMember", () => {
  it("finds a member by id and returns undefined for unknown ids", () => {
    expect(getMember("sam-okafor")?.name).toBe("Sam Okafor");
    expect(getMember("nobody")).toBeUndefined();
  });
});
