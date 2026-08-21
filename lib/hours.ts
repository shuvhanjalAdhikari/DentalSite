import { siteConfig, type HoursEntry, type Weekday } from '@/site.config';

const DAY_INDEX: Record<Weekday, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const WEEK_ORDER: Weekday[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function getHoursByDay(): Record<Weekday, HoursEntry> {
  const map = {} as Record<Weekday, HoursEntry>;
  for (const entry of siteConfig.hours) {
    map[entry.day] = entry;
  }
  return map;
}

export function orderedHours(): HoursEntry[] {
  const byDay = getHoursByDay();
  return WEEK_ORDER.map((d) => byDay[d]).filter(Boolean);
}

function parseHM(hm: string): { h: number; m: number } {
  const [h, m] = hm.split(':').map(Number);
  return { h, m };
}

export function formatTime12(hm: string): string {
  const { h, m } = parseHM(hm);
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const mm = m.toString().padStart(2, '0');
  return `${h12}:${mm} ${suffix}`;
}

/** Returns the status string for "today". Uses provided Date for deterministic build output. */
export function todayStatus(now: Date = new Date()): {
  isOpen: boolean;
  label: string;
  today: HoursEntry | undefined;
} {
  const dayName = WEEK_ORDER[now.getDay()];
  const today = getHoursByDay()[dayName];
  if (!today || today.closed) {
    return { isOpen: false, label: 'Closed today', today };
  }
  const open = parseHM(today.open);
  const close = parseHM(today.close);
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const openMins = open.h * 60 + open.m;
  const closeMins = close.h * 60 + close.m;
  if (nowMins < openMins) {
    return { isOpen: false, label: `Opens today at ${formatTime12(today.open)}`, today };
  }
  if (nowMins >= closeMins) {
    return { isOpen: false, label: 'Closed for today', today };
  }
  return { isOpen: true, label: `Open today until ${formatTime12(today.close)}`, today };
}

/** ISO 8601 openingHoursSpecification array for schema.org. */
export function openingHoursSpecification() {
  const dayToSchema: Record<Weekday, string> = {
    Sunday: 'Sunday',
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday',
  };
  return siteConfig.hours
    .filter((h): h is Extract<HoursEntry, { open: string }> => !h.closed)
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: dayToSchema[h.day],
      opens: h.open,
      closes: h.close,
    }));
}

export { DAY_INDEX, WEEK_ORDER };
