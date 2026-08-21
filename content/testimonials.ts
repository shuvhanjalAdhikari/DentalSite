export type Testimonial = {
  quote: string;
  name: string;
  treatment: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'I had put off going for years. They took the time to explain everything and did not once make me feel embarrassed about the state of my teeth.',
    name: 'Anita',
    treatment: 'Check-up and fillings',
  },
  {
    quote:
      'The written estimate arrived by email before I sat in the chair. No surprises on the bill, and the crown fits perfectly.',
    name: 'Rohan',
    treatment: 'Crown',
  },
  {
    quote:
      'They fitted me in the same afternoon when a filling fell out. Kind, quick, and reasonable about the cost.',
    name: 'Sujata',
    treatment: 'Emergency repair',
  },
  {
    quote:
      'My twelve-year-old was terrified. The team showed her every instrument before using it. She now asks when her next appointment is.',
    name: 'Priya',
    treatment: 'Paediatric check-up',
  },
];
