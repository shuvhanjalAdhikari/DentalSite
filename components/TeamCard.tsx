import Link from 'next/link';
import type { Clinician } from '@/content/team';
import { ResponsiveImage } from './ResponsiveImage';

const CARD_SIZES = '(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw';

export function TeamCard({ clinician }: { clinician: Clinician }) {
  return (
    <Link href={`/team/${clinician.slug}/`} className="group block">
      <ResponsiveImage
        dir="team"
        base={clinician.image}
        widths={clinician.imageWidths}
        sizes={CARD_SIZES}
        alt={`Portrait of ${clinician.name}, ${clinician.role.toLowerCase()}.`}
        aspect="4 / 5"
        intrinsicWidth={640}
        intrinsicHeight={800}
      />
      <div className="mt-4">
        <p className="font-display text-xl text-ink group-hover:text-petrol transition-colors">
          {clinician.name}
        </p>
        <p className="text-sm text-muted mt-1">{clinician.credentials}</p>
        <p className="text-sm text-muted mt-3 max-w-[32ch]">{clinician.detail}</p>
      </div>
    </Link>
  );
}
