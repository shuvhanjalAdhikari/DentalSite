import { formatTime12, orderedHours, todayStatus } from '@/lib/hours';
import type { Weekday } from '@/site.config';

const SHORT: Record<Weekday, string> = {
  Sunday: 'Sun',
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
};

export function HoursCard({
  variant = 'floating',
  now,
}: {
  variant?: 'floating' | 'block';
  now?: Date;
}) {
  const status = todayStatus(now);
  const hours = orderedHours();
  if (variant === 'floating') {
    return (
      <div className="bg-white shadow-md p-4 rounded-lg w-[200px]">
        <p className="eyebrow mb-2" style={{ fontSize: '0.7rem' }}>
          This week
        </p>
        <p className="font-display text-base leading-snug mb-3" aria-live="polite">
          {status.label}
        </p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 text-xs">
          {hours.map((h) => {
            const isToday = status.today?.day === h.day;
            return (
              <div key={h.day} className="contents">
                <dt className={`text-muted ${isToday ? 'text-ink font-semibold' : ''}`}>
                  {SHORT[h.day]}
                </dt>
                <dd
                  className={`text-right tabular-nums ${
                    isToday ? 'text-ink font-semibold' : 'text-muted'
                  }`}
                >
                  {h.closed ? 'Closed' : `${formatTime12(h.open)} – ${formatTime12(h.close)}`}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    );
  }

  return (
    <div className="bg-white border border-line p-6 rounded-md w-full">
      <p className="eyebrow mb-3">This week</p>
      <p className="font-display text-lg mb-4" aria-live="polite">
        {status.label}
      </p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
        {hours.map((h) => {
          const isToday = status.today?.day === h.day;
          return (
            <div key={h.day} className="contents">
              <dt className={`text-muted ${isToday ? 'text-ink font-semibold' : ''}`}>
                {SHORT[h.day]}
              </dt>
              <dd
                className={`text-right tabular-nums ${
                  isToday ? 'text-ink font-semibold' : 'text-muted'
                }`}
              >
                {h.closed ? 'Closed' : `${formatTime12(h.open)} – ${formatTime12(h.close)}`}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
