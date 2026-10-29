export type Tone = { bg: string; fg: string };

// Class names are written out in full so Tailwind can find them in the source.
const tones: Record<string, Tone> = {
  Design: { bg: "bg-dept-design-bg", fg: "text-dept-design-fg" },
  Engineering: { bg: "bg-dept-engineering-bg", fg: "text-dept-engineering-fg" },
  Marketing: { bg: "bg-dept-marketing-bg", fg: "text-dept-marketing-fg" },
  Sales: { bg: "bg-dept-sales-bg", fg: "text-dept-sales-fg" },
};

const fallback: Tone = { bg: "bg-avatar-bg", fg: "text-avatar-fg" };

/** Colour pair for a department; unknown departments get the neutral avatar colours. */
export function departmentTone(department: string): Tone {
  return tones[department] ?? fallback;
}
