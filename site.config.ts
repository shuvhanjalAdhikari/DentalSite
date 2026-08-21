export type Weekday =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export type HoursEntry =
  | { day: Weekday; open: string; close: string; closed?: false }
  | { day: Weekday; closed: true; open?: undefined; close?: undefined };

export type SiteConfig = {
  name: string;
  tagline: string;
  legalName: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  siteUrl: string;
  address: {
    street: string;
    city: string;
    region: string;
    postal: string;
    country: string;
  };
  mapEmbedUrl: string;
  geo: { lat: number; lng: number };
  hours: HoursEntry[];
  languages: string[];
  social: { facebook: string; instagram: string };
  bookingProvider: {
    type: 'form' | 'calcom' | 'calendly';
    url: string;
  };
  formEndpoint: string;
  currency: string;
  locale: string;
};

export const siteConfig: SiteConfig = {
  name: 'Lakshya Dental Home',
  tagline: '', // client-supplied — e.g. "Calm, careful dentistry in Bansbari"
  legalName: 'Lakshya Dental Home',
  phone: '9768605190',
  emergencyPhone: '', // client-supplied
  email: '', // client-supplied
  siteUrl: 'https://example.com', // client-supplied — used for canonical + sitemap
  address: {
    street: 'Bansbari',
    city: 'Kathmandu',
    region: 'Bagmati',
    postal: '44600',
    country: 'Nepal',
  },
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Lakshya+Dental+Home,+Bansbari,+Kathmandu&z=16&output=embed',
  geo: { lat: 27.7407958, lng: 85.3369908 },
  hours: [
    { day: 'Sunday', open: '09:00', close: '18:00' },
    { day: 'Monday', open: '09:00', close: '18:00' },
    { day: 'Tuesday', open: '09:00', close: '18:00' },
    { day: 'Wednesday', open: '09:00', close: '18:00' },
    { day: 'Thursday', open: '09:00', close: '18:00' },
    { day: 'Friday', open: '09:00', close: '15:00' },
    { day: 'Saturday', closed: true },
  ],
  languages: [], // client-supplied — e.g. ["English", "Nepali", "Hindi"]
  social: {
    facebook: '',
    instagram: '',
  },
  bookingProvider: {
    type: 'form',
    url: '',
  },
  formEndpoint: '', // client-supplied — Formspree / Web3Forms / Netlify Forms
  currency: 'NPR',
  locale: 'en-NP',
};
