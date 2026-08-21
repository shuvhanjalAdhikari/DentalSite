import { team } from '@/content/team';
import { TeamCard } from './TeamCard';

export function TeamGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
      {team.map((c) => (
        <TeamCard key={c.slug} clinician={c} />
      ))}
    </div>
  );
}
