/** Returns an ISO date `days` from today at the given time. Keeps demo data always upcoming. */
const dateFromNow = (days, hour = 18, minute = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

export const CATEGORIES = ['All', 'Tech', 'Music', 'Sports', 'Workshops'];

export const events = [
  {
    id: 'evt-figma-devs',
    title: 'Figma for Developers',
    category: 'Workshops',
    date: dateFromNow(4, 10, 0),
    venue: 'Design Studio, Floor 3',
    price: 799,
    capacity: 40,
    seatsLeft: 7,
    banner: 'https://picsum.photos/seed/kexplore-figma/1200/800',
    shortDescription: 'Hands-on session on handoff, tokens and inspecting designs without pinging anyone.',
    description:
      'A practical three-hour workshop for engineers who ship interfaces. You will learn to read auto layout, export design tokens, and build a component library that mirrors the code in your repository. Laptops required. Figma accounts are free.',
    organizer: 'Pixel & Pipeline Collective',
    speakers: [{ name: 'Meera Iyer', role: 'Design systems lead' }],
  },
  {
    id: 'evt-open-source-night',
    title: 'Open Source Night',
    category: 'Tech',
    date: dateFromNow(6, 18, 30),
    venue: 'Innovation Hub, Hall B',
    price: 0,
    capacity: 120,
    seatsLeft: 14,
    banner: 'https://picsum.photos/seed/kexplore-tech/1200/800',
    shortDescription: 'Lightning talks and live contributions from maintainers of popular projects.',
    description:
      'A relaxed evening where maintainers share what they are building, then pair with newcomers on a first pull request. Bring a laptop and an idea. Snacks are on us.',
    organizer: 'Developers Circle',
    speakers: [
      { name: 'Ananya Rao', role: 'Maintainer, component library' },
      { name: 'Vikram Das', role: 'Staff engineer, data tooling' },
    ],
  },
  {
    id: 'evt-acoustic-sessions',
    title: 'Acoustic Sessions: Live at the Courtyard',
    category: 'Music',
    date: dateFromNow(9, 19, 0),
    venue: 'Courtyard Stage',
    price: 499,
    capacity: 200,
    seatsLeft: 96,
    banner: 'https://picsum.photos/seed/kexplore-music/1200/800',
    shortDescription: 'Three local singer-songwriters, one stage, no amplifiers past nine.',
    description:
      'An intimate outdoor evening with three songwriters performing original sets. Seating is first come, first served and blankets are welcome. Doors open an hour before the first set.',
    organizer: 'Courtyard Live',
    speakers: [
      { name: 'Rohan Mishra', role: 'Singer-songwriter' },
      { name: 'Tara Nayak', role: 'Guitar and vocals' },
    ],
  },
  {
    id: 'evt-college-football-final',
    title: 'Inter-College Football Final',
    category: 'Sports',
    date: dateFromNow(13, 16, 0),
    venue: 'Central Sports Ground',
    price: 199,
    capacity: 500,
    seatsLeft: 0,
    banner: 'https://picsum.photos/seed/kexplore-football/1200/800',
    shortDescription: 'The season decider between the two strongest campuses in the league.',
    description:
      'The championship match of the inter-college season, with halftime entertainment and a trophy presentation. Gates open ninety minutes before kickoff. Please carry a valid student ID.',
    organizer: 'Inter-College Sports Board',
    speakers: [{ name: 'Sanjay Pradhan', role: 'Match commentator' }],
  },
  {
    id: 'evt-ml-lab',
    title: 'Intro to Machine Learning Lab',
    category: 'Workshops',
    date: dateFromNow(18, 10, 0),
    venue: 'Computing Lab 2',
    price: 1200,
    capacity: 60,
    seatsLeft: 35,
    banner: 'https://picsum.photos/seed/kexplore-ml/1200/800',
    shortDescription: 'Train your first model end to end, from messy data to a working prediction.',
    description:
      'A full-day lab covering data cleaning, a baseline model, evaluation, and what to do when the numbers look too good. Every participant leaves with a notebook they can keep running at home.',
    organizer: 'Applied AI Group',
    speakers: [{ name: 'Dr. Kavya Menon', role: 'Applied machine learning researcher' }],
  },
  {
    id: 'evt-jazz-sunsets',
    title: 'Jazz & Sunsets',
    category: 'Music',
    date: dateFromNow(21, 17, 30),
    venue: 'Lakeside Pavilion',
    price: 350,
    capacity: 150,
    seatsLeft: 60,
    banner: 'https://picsum.photos/seed/kexplore-jazz/1200/800',
    shortDescription: 'A quartet plays as the light drops over the water.',
    description:
      'Two sets of standards and original compositions, timed to the sunset. The pavilion is open-air, so bring a light layer for the evening breeze.',
    organizer: 'Lakeside Arts Trust',
    speakers: [{ name: 'The Ravi Kumar Quartet', role: 'Jazz ensemble' }],
  },
  {
    id: 'evt-sprint-clinic',
    title: 'Sprint Training Clinic',
    category: 'Sports',
    date: dateFromNow(25, 7, 0),
    venue: 'Athletics Track, Gate 4',
    price: 0,
    capacity: 80,
    seatsLeft: 30,
    banner: 'https://picsum.photos/seed/kexplore-sprint/1200/800',
    shortDescription: 'Form, starts and acceleration drills with a former national sprinter.',
    description:
      'A morning clinic for runners of all levels. Warm-up is included, followed by technique drills and timed run-throughs. Wear running shoes and bring water.',
    organizer: 'Track & Field Academy',
    speakers: [{ name: 'Lakshmi Pati', role: 'Former national sprinter, coach' }],
  },
  {
    id: 'evt-watercolour-weekend',
    title: 'Watercolour Weekend',
    category: 'Workshops',
    date: dateFromNow(32, 10, 0),
    venue: 'Art House Studio',
    price: 1500,
    capacity: 25,
    seatsLeft: 19,
    banner: 'https://picsum.photos/seed/kexplore-art/1200/800',
    shortDescription: 'Two days of wet-on-wet technique, color mixing and painting outdoors.',
    description:
      'A small-group weekend for beginners and returning painters. All paper and pigments are provided. Expect a mix of studio time and a walk to paint the nearby lake.',
    organizer: 'Art House Studio',
    speakers: [{ name: 'Sunita Behera', role: 'Watercolour artist' }],
  },
];

export const getStatus = (event) => {
  if (event.seatsLeft === 0) return 'Sold out';
  if (event.seatsLeft <= 15) return 'Selling fast';
  return 'Open';
};

export const formatPrice = (price) => (price === 0 ? 'Free' : `₹${price.toLocaleString('en-IN')}`);

export const formatDate = (iso) =>
  new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));

export const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
