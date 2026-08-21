type Step = { at: string; label: string };

const DEFAULT_STEPS: Step[] = [
  { at: '0:00', label: 'Arrive and check in' },
  { at: '0:10', label: 'Exam and digital x-rays' },
  { at: '0:25', label: 'We talk through what we found' },
  { at: '0:40', label: 'Cleaning if needed' },
  { at: '0:50', label: 'Costs in writing' },
];

export function VisitTimeline({
  steps = DEFAULT_STEPS,
  headingId = 'timeline-heading',
}: {
  steps?: Step[];
  headingId?: string;
}) {
  return (
    <div>
      <ol
        aria-labelledby={headingId}
        className="relative flex md:grid md:grid-cols-[repeat(var(--steps),minmax(0,1fr))] gap-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-8 pb-6"
        style={{ ['--steps' as string]: steps.length }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-[5.25rem] h-px bg-line hidden md:block"
        />
        {steps.map((step, i) => (
          <li
            key={i}
            className="snap-start shrink-0 w-[70vw] max-w-[220px] md:w-auto md:max-w-none relative pr-6 md:pr-4"
          >
            <div className="text-sm text-muted font-sans tabular-nums">{step.at}</div>
            <div className="relative mt-4 mb-4 md:mb-0">
              <span
                aria-hidden="true"
                className="block md:hidden absolute left-0 right-0 top-1/2 h-px bg-line"
              />
              <span
                aria-hidden="true"
                className="relative block w-[10px] h-[10px] bg-rose"
              />
            </div>
            <p className="text-sm text-ink leading-snug max-w-[22ch] mt-4 md:mt-6">
              {step.label}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
