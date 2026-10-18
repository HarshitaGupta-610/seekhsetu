import type { Challenge, PathwayId, Project } from '@/lib/types'

export const CHALLENGES: Challenge[] = [
  {
    id: 'design-local-poster',
    pathway: 'design',
    title: 'Make a poster about a local issue',
    summary: 'Pick one issue you care about nearby and design a clear, one-message poster.',
    instructions: [
      'Choose one local issue (e.g. littering, saving water, road safety).',
      'Write one short main message — 8 words or fewer.',
      'Sketch 3 quick layout ideas in small boxes.',
      'Pick the clearest one and make the final poster.',
      'Show it to one person and ask what message they understood.',
    ],
    time: '45–60 min',
    materials: ['Paper or chart paper', 'Pens, pencils or colours'],
    lowCost: ['The back of an old calendar or notebook page', 'A single pen works — use bold outlines instead of colour'],
    skills: ['Visual communication', 'Colour and layout'],
    badge: 'Poster Maker',
  },
  {
    id: 'community-teach-peer',
    pathway: 'community',
    title: 'Explain a school topic to a peer',
    summary: 'Teach one idea from class to a friend or sibling and check if they understood.',
    instructions: [
      'Pick a topic you understand well from a recent class.',
      'Plan: why it matters, one example, and one check question.',
      'Explain it in 5 minutes or less.',
      'Ask them to explain it back in their own words.',
      'Write down what worked and what you would change.',
    ],
    time: '30 min',
    materials: ['Your notebook', 'A willing friend or family member'],
    lowCost: ['No materials needed — you can teach out loud anywhere'],
    skills: ['Explaining clearly', 'Active listening'],
    badge: 'Peer Teacher',
  },
  {
    id: 'technical-paper-prototype',
    pathway: 'technical',
    title: 'Design a paper prototype',
    summary: 'Build a simple model of a tool or object that solves a small everyday problem.',
    instructions: [
      'Notice one small problem (e.g. pens rolling off the desk, cables tangling).',
      'Sketch 2 ideas to fix it, with measurements.',
      'Build the best idea from paper, card and tape.',
      'Test it 3 times and note what fails.',
      'Improve one thing and test again.',
    ],
    time: '60 min',
    materials: ['Card or thick paper', 'Scissors (with care)', 'Tape or glue', 'Ruler'],
    lowCost: ['Old cereal boxes or packaging', 'Flour-and-water paste instead of glue'],
    skills: ['Measuring accurately', 'Building prototypes'],
    badge: 'Prototype Builder',
  },
  {
    id: 'digital-info-card',
    pathway: 'digital',
    title: 'Create a simple digital design',
    summary: 'Make a one-page digital information card on any app you have — or plan it on paper first.',
    instructions: [
      'Pick a topic: a study tip, a safety reminder or a school event.',
      'Plan the card on paper: title, 3 key points, one picture idea.',
      'Make it in any free app (notes, slides, a word processor or a design app).',
      'Check spelling and that text is easy to read on a small screen.',
      'Save or screenshot it for your Skill Passport.',
    ],
    time: '45 min',
    materials: ['A phone or computer (shared is fine)'],
    lowCost: ['No device today? Draw the card on paper as a “screen” and make it digital later'],
    skills: ['Online tools', 'Organising information'],
    badge: 'Digital Creator',
  },
  {
    id: 'entrepreneurship-problem-hunt',
    pathway: 'entrepreneurship',
    title: 'Investigate a community problem',
    summary: 'Ask 3 people about one everyday problem and summarise what you learn.',
    instructions: [
      'Pick a problem you notice (e.g. queues at the ration shop, broken streetlights).',
      'Write 4 open questions about it.',
      'Ask 3 people you know and trust (family, neighbours, classmates).',
      'Write down their answers in their own words.',
      'Summarise: what is the real problem, and one possible idea?',
    ],
    time: '60 min over 2–3 days',
    materials: ['Notebook and pen'],
    lowCost: ['No materials needed beyond paper'],
    skills: ['Asking good questions', 'Problem solving'],
    badge: 'Problem Investigator',
  },
  {
    id: 'agriculture-seed-journal',
    pathway: 'agriculture',
    title: 'Start a 7-day seed journal',
    summary: 'Sprout seeds and record how they change each day.',
    instructions: [
      'Place a few seeds (moong, chana or methi) on damp cloth or cotton.',
      'Keep them in a cup or bowl near light, not direct hot sun.',
      'Record length, colour and number of sprouts every day at the same time.',
      'Draw a quick sketch on day 1, 4 and 7.',
      'Write what changed most and one question you now have.',
    ],
    time: '10 min a day for 7 days',
    materials: ['A handful of seeds from the kitchen', 'Cotton or cloth', 'A cup', 'Water'],
    lowCost: ['Use kitchen seeds and an old container — no purchase needed'],
    skills: ['Careful observation', 'Recording data over time'],
    badge: 'Nature Observer',
  },
]

export const PROJECTS: Project[] = [
  {
    id: 'design-awareness-poster',
    pathway: 'design',
    title: 'Information poster series for a local need',
    goal: 'Create 2–3 posters that share useful information about a local issue, and ask permission to display one.',
    steps: [
      'Talk to 2 people about what information would help them.',
      'Choose a topic and research 3 accurate facts from your textbook or a trusted source.',
      'Sketch your poster series so they look like a set.',
      'Make the final posters.',
      'Ask a teacher or adult where it may be displayed and get permission.',
      'Note any reactions or questions people had.',
    ],
    materials: ['Chart paper or used paper', 'Pens and colours'],
    effort: '3–4 hours over a week',
    skills: ['Visual storytelling', 'Research', 'Communication'],
  },
  {
    id: 'agriculture-water-plan',
    pathway: 'agriculture',
    title: 'Water-saving proposal for your school or home',
    goal: 'Observe how water is used and propose 2–3 practical ways to save it.',
    steps: [
      'Observe one water point (tap, tank, garden) for 3 days and note how it is used.',
      'Estimate how much water is wasted (e.g. count leaking drips per minute).',
      'Research two simple water-saving ideas.',
      'Write a one-page proposal with a drawing.',
      'Share it with a teacher, family member or school leader.',
    ],
    materials: ['Notebook', 'A cup and a phone or clock for timing'],
    effort: '3 hours over a week',
    skills: ['Careful observation', 'Sustainable thinking', 'Writing a proposal'],
  },
  {
    id: 'technical-helper-tool',
    pathway: 'technical',
    title: 'Prototype a helpful everyday tool',
    goal: 'Design and test a cardboard prototype that makes one daily task easier for someone you know.',
    steps: [
      'Ask a family member about one small task that is difficult for them.',
      'Sketch 3 ideas with measurements.',
      'Build the best one from cardboard and tape.',
      'Let them try it and observe without helping.',
      'Improve the design based on what you saw.',
      'Write what changed between version 1 and version 2.',
    ],
    materials: ['Cardboard', 'Tape', 'Ruler', 'Scissors (with care)'],
    effort: '3–4 hours over a week',
    skills: ['Building prototypes', 'Troubleshooting', 'Understanding the user'],
  },
  {
    id: 'community-book-corner',
    pathway: 'community',
    title: 'Plan a book-swap or study corner',
    goal: 'Plan a small shared reading or study corner with a teacher or adult’s support.',
    steps: [
      'Ask 5 classmates what would help them study or read more.',
      'Find a possible space and ask a teacher or adult for permission.',
      'Make a simple plan: books or materials needed, rules, who looks after it.',
      'Collect donated or old books with permission.',
      'Set up the corner together with your helpers.',
    ],
    materials: ['Old books and magazines', 'A box or shelf', 'Paper for signs'],
    effort: '4 hours over 1–2 weeks',
    skills: ['Planning an activity', 'Teamwork', 'Communication'],
  },
  {
    id: 'entrepreneurship-market-survey',
    pathway: 'entrepreneurship',
    title: 'Mini market survey for a small idea',
    goal: 'Test whether a simple product or service idea is useful by asking real people — no selling involved.',
    steps: [
      'Write your idea in one sentence (e.g. a homework-help timetable for younger students).',
      'Write 5 open questions to learn about people’s needs.',
      'Ask 8–10 people you know, with a trusted adult’s knowledge.',
      'Organise answers in a simple table.',
      'Decide: keep, change or drop the idea — and explain why.',
    ],
    materials: ['Notebook', 'Pen'],
    effort: '3 hours over a week',
    skills: ['Asking good questions', 'Basic data analysis', 'Decision making'],
  },
  {
    id: 'digital-safety-guide',
    pathway: 'digital',
    title: 'Digital safety guide for your family',
    goal: 'Create a simple guide that helps family members stay safe from common phone and online scams.',
    steps: [
      'Ask family members which apps they use and what confuses them.',
      'List 5 common safety tips (e.g. never share OTPs).',
      'Write the guide in the language your family prefers.',
      'Add simple drawings or screenshots without personal information.',
      'Explain it to one family member and ask for feedback.',
    ],
    materials: ['Paper or a phone/computer'],
    effort: '2–3 hours over a week',
    skills: ['Online safety', 'Explaining clearly', 'Organising information'],
  },
]

export function getProject(id: string) {
  return PROJECTS.find((p) => p.id === id)
}

export function challengesForPathway(id: PathwayId, all: Challenge[]) {
  return all.filter((c) => c.pathway === id)
}

/** Rotates the weekly challenge deterministically by ISO week number. */
export function weeklyChallengeIndex(total: number, date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 1)
  const week = Math.floor((date.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000))
  return total === 0 ? 0 : week % total
}
