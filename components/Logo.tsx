export function Logo({ stacked = false, className = "" }: { stacked?: boolean; className?: string }) {
  return (
    <span className={`logo${stacked ? " logo--stacked" : ""} ${className}`} role="img" aria-label="Studio 77">
      <span className="logo__mark" />
      <span className="logo__word" />
    </span>
  );
}
