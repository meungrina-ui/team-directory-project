/** Lets keyboard users jump past the header. Hidden until it receives focus. */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-md focus:top-md focus:z-10 focus:rounded-card focus:bg-accent focus:px-md focus:py-sm focus:text-accent-foreground"
    >
      Skip to content
    </a>
  );
}
