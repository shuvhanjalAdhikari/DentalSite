export function Placeholder({
  label,
  aspect = '4 / 5',
  className = '',
}: {
  label: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`w-full bg-petrol-tint text-petrol-deep flex items-center justify-center rounded-md ${className}`.trim()}
      style={{ aspectRatio: aspect }}
      role="img"
      aria-label={label}
    >
      <span className="font-sans text-sm px-4 text-center">{label}</span>
    </div>
  );
}
