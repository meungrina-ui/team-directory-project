import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto max-w-5xl px-md py-md">
        <Link href="/" className="inline-flex items-center gap-sm text-lg font-semibold hover:text-accent">
          {/* Decorative logo mark; the link's name is the text next to it. */}
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-foreground"
          >
            TD
          </span>
          Team Directory
        </Link>
      </div>
    </header>
  );
}
