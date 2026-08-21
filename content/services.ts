export type Service = {
  slug: string;
  name: string;
  summary: string;
  priceFrom: number | null;
  duration: string;
  body: string;
  faqs?: { q: string; a: string }[];
  timeline?: { at: string; label: string }[];
};

export const services: Service[] = [
  {
    slug: 'check-up-and-clean',
    name: 'Check-up and clean',
    summary: 'A thorough exam, digital x-rays if needed, and a professional clean.',
    priceFrom: 3500,
    duration: '45 min',
    body: `A check-up is where we start with every new patient and where returning patients come back every six months. We look at each tooth, check the gums, take digital x-rays only when they help us see something we cannot see by eye, and finish with a scale and polish.

If we find anything, we tell you what it is, what happens if you leave it, and what it would cost to treat. You leave with a written note of what we saw.`,
    faqs: [
      { q: 'Do I need x-rays every visit?', a: 'No. We take them when a clinical question needs them, usually every two years for adults.' },
      { q: 'Will the clean hurt?', a: 'For most people it is a firm scrape and a polish. If your gums are tender, tell us and we will work more gently.' },
    ],
  },
  {
    slug: 'fillings',
    name: 'Fillings',
    summary: 'Tooth-coloured composite fillings, placed the same day.',
    priceFrom: 4500,
    duration: '30–60 min',
    body: `A filling replaces the part of a tooth that decay has taken away. We use tooth-coloured composite so the repair matches the tooth around it.

We will numb the area before we start. You should feel pressure but not pain. If at any point you do, raise your hand and we stop.`,
    faqs: [
      { q: 'How long does a filling last?', a: 'A well-placed composite filling in a small cavity typically lasts seven to ten years. Large fillings under heavy bite forces do not last as long.' },
    ],
  },
  {
    slug: 'root-canal',
    name: 'Root canal treatment',
    summary: 'Save a tooth whose nerve is inflamed or infected, in one or two visits.',
    priceFrom: 12000,
    duration: '60–90 min per visit',
    body: `Root canal treatment is the alternative to taking a tooth out when the nerve inside it is damaged. We clean the inside of the tooth, disinfect it, and seal it. Most teeth then need a crown to protect what remains.

Modern root canals are done under local anaesthetic and are not the ordeal they used to be. Most patients tell us afterwards it was easier than they expected.`,
  },
  {
    slug: 'crowns-and-bridges',
    name: 'Crowns and bridges',
    summary: 'Full-coverage restorations for broken-down or missing teeth.',
    priceFrom: 22000,
    duration: 'Two visits, two weeks apart',
    body: `A crown covers a tooth that has too little of itself left to hold a filling. A bridge replaces one or more missing teeth by anchoring to the teeth on either side.

We take an impression, agree the shade with you, and fit the finished piece at a second visit.`,
  },
  {
    slug: 'orthodontics',
    name: 'Braces and aligners',
    summary: 'Fixed braces or clear aligners for adults and teenagers.',
    priceFrom: 85000,
    duration: '12–24 months of treatment',
    body: `We offer both traditional fixed braces and clear removable aligners. Which suits you depends on what needs to move, how much, and what you prefer to have visible.

The first appointment is a consultation. We take photos and a scan, talk through what is achievable, and give you a written plan with the cost before you commit.`,
  },
  {
    slug: 'extractions',
    name: 'Extractions',
    summary: 'Simple and surgical tooth removal, including wisdom teeth.',
    priceFrom: 4000,
    duration: '20–45 min',
    body: `Sometimes a tooth cannot be saved, or a wisdom tooth is causing problems and needs to come out. We do this under local anaesthetic. You will feel firm pressure but not sharp pain.

We will explain aftercare before you leave and give you a phone number to call if something does not feel right in the days afterwards.`,
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
