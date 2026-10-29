import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

/** Shown for unknown URLs and whenever a page calls notFound(). */
export default function NotFound() {
  return (
    <>
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-sm text-muted">
        We couldn’t find that page. The person may have left, or the link may be mistyped.
      </p>
      <Link
        href="/"
        className="mt-lg inline-block rounded-card bg-accent px-md py-sm font-medium text-accent-foreground hover:underline"
      >
        Go to the directory
      </Link>
    </>
  );
}
