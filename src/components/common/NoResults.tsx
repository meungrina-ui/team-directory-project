type NoResultsProps = {
  query: string;
  department: string;
  onClear: () => void;
};

export function NoResults({ query, department, onClear }: NoResultsProps) {
  const text = query.trim();
  const where = department ? ` in ${department}` : "";

  return (
    <div className="rounded-card border border-dashed border-border-strong bg-background p-lg text-center">
      <p className="font-medium">
        {text ? `No one matches “${text}”${where}.` : `No one found${where}.`}
      </p>
      <p className="mt-xs text-muted">
        Try a shorter name, a role like “Designer”, or all departments.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-md rounded-card bg-accent px-md py-sm font-medium text-accent-foreground hover:underline"
      >
        Clear filters
      </button>
    </div>
  );
}
