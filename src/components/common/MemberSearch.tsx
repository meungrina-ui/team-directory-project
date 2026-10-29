"use client";

import { useSearchParams } from "next/navigation";
import { useId, useRef, useState } from "react";
import { filterMembers, type Member } from "@/lib/members";
import { formatCount, replaceUrlSearch } from "@/lib/utils";
import { MemberList } from "./MemberList";
import { NoResults } from "./NoResults";

type MemberSearchProps = {
  members: Member[];
  departments: string[];
};

/**
 * The only Client Component: it owns the search text and department filter
 * and keeps both in the URL. The page (a Server Component) loads the data.
 */
export function MemberSearch({ members, departments }: MemberSearchProps) {
  // Start from the URL, so shared links and the Back button restore the filters.
  // Unknown departments (e.g. ?department=Nope) fall back to "all".
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [department, setDepartment] = useState(() => {
    const deptFromUrl = searchParams.get("department") ?? "";
    return departments.includes(deptFromUrl) ? deptFromUrl : "";
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const selectId = useId();

  const results = filterMembers(members, query, department);

  function updateFilters(nextQuery: string, nextDepartment: string) {
    setQuery(nextQuery);
    setDepartment(nextDepartment);
    replaceUrlSearch({ q: nextQuery.trim(), department: nextDepartment });
  }

  function clearFilters() {
    updateFilters("", "");
    // The "Clear filters" button disappears, so put focus somewhere useful.
    inputRef.current?.focus();
  }

  return (
    <>
      {/* role="search" makes this a landmark; Enter shouldn't reload the page. */}
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="grid max-w-3xl gap-md sm:grid-cols-[1fr_16rem]"
      >
        <div>
          <label htmlFor={inputId} className="block text-lg font-medium">
            Search by name or role
          </label>
          <div className="relative mt-sm">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="pointer-events-none absolute top-1/2 left-md size-5 -translate-y-1/2 text-muted"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              ref={inputRef}
              id={inputId}
              type="search"
              value={query}
              onChange={(event) => updateFilters(event.target.value, department)}
              autoComplete="off"
              className="w-full rounded-card border-2 border-border-strong bg-background py-md pr-md pl-12 text-lg shadow-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor={selectId} className="block text-lg font-medium">
            Department
          </label>
          {/* Native <select> (keyboard and screen-reader support for free) with the
              browser's arrow replaced by our own chevron, so it matches the search field. */}
          <div className="relative mt-sm">
            <select
              id={selectId}
              value={department}
              onChange={(event) => updateFilters(query, event.target.value)}
              className="h-full w-full cursor-pointer appearance-none rounded-card border-2 border-border-strong bg-background py-md pr-12 pl-md text-lg shadow-sm hover:border-accent"
            >
              <option value="">All departments</option>
              {departments.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute top-1/2 right-md size-5 -translate-y-1/2 text-muted"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </form>

      {/* Always rendered so screen readers pick up changes to its text. */}
      <p role="status" aria-live="polite" className="mt-md mb-md text-muted">
        {formatCount(results.length, members.length)}
      </p>

      {results.length > 0 ? (
        <MemberList members={results} />
      ) : (
        <NoResults query={query} department={department} onClear={clearFilters} />
      )}
    </>
  );
}
