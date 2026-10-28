// Hand-edited details layered over the scraped projects.json.
// `name` fixes the all-caps titles from the old site; `tags` show in the work index.
// `year` is a single year or a range like 2019–2026 (en dash).
// `summary` is the one-line "what is it" shown as Overview at the top of each case study.
// Only Zettle's came from the old site; the rest are drafted from each case study's own text.
export const META: Record<string, { name: string; year: string; tags: string[]; summary?: string }> = {
  zettle: {
    name: 'Zettle',
    year: '2023–2026',
    tags: ['Product', 'Brand', 'Web'],
    summary: 'A workflow and communications platform that guides buyers, sellers and conveyancers through settlement.',
  },
  comoditi: {
    name: 'Comoditi',
    year: '2018–2021',
    tags: ['Brand', 'E-commerce', 'Photography'],
    summary: 'A label making premium selvedge jeans and organic cotton tees, sold online.',
  },
  livesign: {
    name: 'Livesign',
    year: '2019–2026',
    tags: ['Product', 'Brand', 'Video'],
    summary: "A platform for signing mortgage and loan contracts online, including verifying the signer's identity.",
  },
  'kester-james': { name: 'Kester James', year: '2024', tags: ['Identity'] },
  'mercho-pod': {
    name: 'Mercho POD',
    year: '2023',
    tags: ['Brand', 'Web'],
    summary: 'An Australian print on demand service for high quality, quick turnaround tees, hoodies and caps.',
  },
  galilee: {
    name: 'Galilee',
    year: '2019–2026',
    tags: ['Brand', 'Print', 'Campaign'],
    summary: "Mortgage and loan documentation for some of Australia's largest financial institutions.",
  },
  selz: {
    name: 'Selz',
    year: '2016–2019',
    tags: ['UI/UX', 'Brand'],
    summary: 'An online store and payment platform for ecommerce entrepreneurs all over the world.',
  },
  qantas: {
    name: 'Qantas',
    year: '2015–2016',
    tags: ['UI', 'UX'],
    summary: 'Redesigning content, journeys and touch points across qantas.com as part of a large replatforming project.',
  },
  frollo: { name: 'Frollo', year: '2017', tags: ['App', 'UX'] },
  'fame-partners': {
    name: 'Fame & Partners',
    year: '2016–2017',
    tags: ['UX', 'E-commerce'],
    summary: "A women's fashion label, with returns, account management and order processing journeys.",
  },
  vodafone: {
    name: 'Vodafone',
    year: '2014–2015',
    tags: ['App', 'UI'],
    summary: "The My Vodafone app and its web equivalent, the heart of the digital experience for Vodafone Australia's paying customers.",
  },
  carryology: { name: 'Carryology', year: '2014', tags: ['Web'] },
  kmart: { name: 'Kmart', year: '2013', tags: ['Web'] },
  outdoorkit: { name: 'Outdoorkit', year: '2013', tags: ['E-commerce'] },
  'perfect-lights': { name: 'Perfect Lights', year: '2013', tags: ['E-commerce'] },
  maxcap: { name: 'Maxcap', year: '2013', tags: ['Brand'] },
  mont: { name: 'Mont', year: '2013', tags: ['E-commerce'] },
  'pinos-dolce-vita': { name: "Pino's Dolce Vita", year: '2012', tags: ['Brand'] },
};
