import membersData from "../../data/members.json";
import { normalizeText } from "./utils";

export type Member = {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  email: string;
  /** Image URL; an empty string means "show initials instead". */
  avatar: string;
  bio: string;
};

const members: Member[] = membersData;

export function getMembers(): Member[] {
  return members;
}

export function getMember(id: string): Member | undefined {
  return members.find((member) => member.id === id);
}

/** Unique department names, sorted A–Z, for the department filter. */
export function getDepartments(): string[] {
  return [...new Set(members.map((member) => member.department))].sort();
}

/**
 * Case- and accent-insensitive match on name or role,
 * so "lea" finds "Léa" and "DESIGN" finds "Product Designer".
 * An empty department means "all departments".
 */
export function filterMembers(list: Member[], query: string, department = ""): Member[] {
  const normalizedQuery = normalizeText(query.trim());
  return list.filter((member) => {
    if (department && member.department !== department) return false;
    if (!normalizedQuery) return true;
    return (
      normalizeText(member.name).includes(normalizedQuery) || normalizeText(member.role).includes(normalizedQuery)
    );
  });
}
