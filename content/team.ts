export type Clinician = {
  slug: string;
  name: string;
  role: string;
  credentials: string;
  detail: string;
  bio: string;
  languages: string[];
  specialties: string[];
  image: string; // base filename in /public/images/team/, e.g. "doc1"
  imageWidths: number[]; // widths available in that folder
};

export const team: Clinician[] = [
  {
    slug: 'clinician-one',
    name: 'Dr. [Clinician one]',
    role: 'Principal dentist',
    credentials: 'BDS · MDS Prosthodontics',
    detail: 'Sees the practice’s longest-standing patients.',
    bio: `[Bio to be supplied by client. Two short paragraphs — what they trained in, what they treat most, and one plain sentence about how they work with anxious patients.]`,
    languages: ['English', 'Nepali'],
    specialties: ['Crowns and bridges', 'Full-mouth rehabilitation'],
    image: 'doc1',
    imageWidths: [640],
  },
  {
    slug: 'clinician-two',
    name: 'Dr. [Clinician two]',
    role: 'Dentist',
    credentials: 'BDS · Cert. Endodontics',
    detail: 'Runs the root-canal clinic on Tuesdays and Thursdays.',
    bio: `[Bio to be supplied by client.]`,
    languages: ['English', 'Nepali', 'Hindi'],
    specialties: ['Root canal treatment', 'Emergency care'],
    image: 'doc2',
    imageWidths: [640],
  },
  {
    slug: 'clinician-three',
    name: 'Dr. [Clinician three]',
    role: 'Orthodontist',
    credentials: 'BDS · MDS Orthodontics',
    detail: 'Treats teenagers and adults with braces and aligners.',
    bio: `[Bio to be supplied by client.]`,
    languages: ['English', 'Nepali'],
    specialties: ['Braces', 'Clear aligners'],
    image: 'doc3',
    imageWidths: [640],
  },
  {
    slug: 'clinician-four',
    name: '[Hygienist name]',
    role: 'Dental hygienist',
    credentials: 'Dip. Dental Hygiene',
    detail: 'Sees every new patient for their first clean.',
    bio: `[Bio to be supplied by client.]`,
    languages: ['English', 'Nepali'],
    specialties: ['Preventive care', 'Gum health'],
    image: 'doc4',
    imageWidths: [640],
  },
];

export function getClinician(slug: string): Clinician | undefined {
  return team.find((c) => c.slug === slug);
}
