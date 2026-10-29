// General-purpose helpers. They know nothing about members or React, so any
// part of the app can use them.

/** "Léa Martin" -> "LM". Uses the first and last word so middle names are skipped. */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/** Lowercases and strips accents, so "Léa" and "lea" compare equal. */
export function normalizeText(text: string): string {
  // NFD splits "é" into "e" + a combining accent, which we then strip.
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/** "Showing all 7 people" or "Showing 2 of 7 people". */
export function formatCount(
  shown: number,
  total: number,
  singular = "person",
  plural = "people",
): string {
  const noun = total === 1 ? singular : plural;
  if (shown === total) return `Showing all ${total} ${noun}`;
  return `Showing ${shown} of ${total} ${noun}`;
}

/** { q: "lea", department: "" } -> "?q=lea". Empty values are left out; returns "" if none remain. */
export function buildSearch(params: Record<string, string>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  const text = search.toString();
  return text ? `?${text}` : "";
}

/**
 * Puts the params in the address bar (e.g. /?q=lea&department=Sales) so the view
 * can be shared. replaceState doesn't reload the page or call the server, and
 * doesn't add a history entry for every keystroke. Browser only.
 */
export function replaceUrlSearch(params: Record<string, string>): void {
  window.history.replaceState(null, "", buildSearch(params) || window.location.pathname);
}
