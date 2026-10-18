import type { Lesson } from '@/lib/types'

export const LESSONS: Lesson[] = [
  {
    id: 'digital-intro',
    pathway: 'digital',
    title: 'What does working with digital skills look like?',
    minutes: 10,
    summary: 'A quick look at the kinds of work and study that use digital skills.',
    sections: [
      { heading: 'More than coding', body: 'Digital skills include organising files, using spreadsheets, making simple designs, staying safe online and helping others use technology. Coding is one part, not the whole picture.' },
      { heading: 'Where it is used', body: 'Shops track stock in spreadsheets, schools keep records, health workers use apps, and small businesses share information online. Almost every field now uses some digital skills.' },
      { heading: 'Start small', body: 'You can practise on a shared family phone or a school computer. Even writing step-by-step instructions on paper builds the same thinking that programmers use.' },
    ],
    tryIt: 'Write 6 clear steps for a daily task (like making tea) so a robot could follow them. Did you miss any step?',
  },
  {
    id: 'digital-spreadsheet',
    pathway: 'digital',
    title: 'Spreadsheet basics: rows, columns and totals',
    minutes: 15,
    summary: 'Learn how tables help you organise information — on screen or on paper.',
    sections: [
      { heading: 'Rows and columns', body: 'A spreadsheet is a grid. Columns go up and down (A, B, C) and rows go across (1, 2, 3). Each box is a cell, named like B3.' },
      { heading: 'Adding things up', body: 'In most spreadsheet apps, typing =SUM(B2:B6) adds all the numbers from B2 to B6. On paper you can do the same by drawing a table and adding a total row.' },
      { heading: 'Why it matters', body: 'Tables make it easy to compare, sort and spot mistakes. They are used for budgets, attendance, stock lists and science experiments.' },
    ],
    tryIt: 'Make a table of how you spend 7 days of pocket money or time. Add a total row and one sentence about what you notice.',
  },
  {
    id: 'design-intro',
    pathway: 'design',
    title: 'What do designers actually do?',
    minutes: 10,
    summary: 'Design is about solving problems for people, not just making things pretty.',
    sections: [
      { heading: 'Design solves problems', body: 'A good sign helps you find the right bus. A good form is easy to fill. Designers think about who will use something and what they need.' },
      { heading: 'Many kinds of design', body: 'Graphic design (posters, logos), product design (objects), interior and architecture (spaces), and digital design (apps and websites) are all design fields.' },
      { heading: 'Sketch, test, improve', body: 'Designers make many quick sketches, show them to people, and improve the best one. Mistakes are part of the process.' },
    ],
    tryIt: 'Find one sign or label near you that is confusing. Sketch a clearer version in 5 minutes.',
  },
  {
    id: 'design-layout',
    pathway: 'design',
    title: 'Colour and layout for clear messages',
    minutes: 15,
    summary: 'Simple rules to make posters and pages easy to read.',
    sections: [
      { heading: 'One main message', body: 'Decide the single most important line. Make it the biggest. Everything else supports it.' },
      { heading: 'Contrast helps reading', body: 'Dark text on a light background (or the reverse) is easiest to read. Avoid putting light yellow on white or red on green.' },
      { heading: 'Leave space', body: 'Empty space is not wasted. It helps the eye find what matters. Line things up along an edge so the page feels organised.' },
    ],
    tryIt: 'Redesign the cover of one of your notebooks using one big title, one colour and plenty of space.',
  },
  {
    id: 'agriculture-intro',
    pathway: 'agriculture',
    title: 'Agriculture & environment: more than farming',
    minutes: 10,
    summary: 'See how science, business and technology connect to food and nature.',
    sections: [
      { heading: 'A big field', body: 'People in this area study soil, breed better seeds, manage water, protect forests, process food safely and run farm businesses.' },
      { heading: 'Science in action', body: 'Biology, chemistry and geography are used every day — to understand pests, test soil and predict weather.' },
      { heading: 'Learn locally', body: 'Farmers, gardeners and elders in your area know a lot. Asking respectful questions is a great way to start learning.' },
    ],
    tryIt: 'Ask a family member or neighbour which crop or plant they think is hardest to grow here, and why.',
  },
  {
    id: 'agriculture-observation',
    pathway: 'agriculture',
    title: 'Observing and recording like a scientist',
    minutes: 15,
    summary: 'How to watch carefully and keep useful notes over time.',
    sections: [
      { heading: 'Observe, don’t guess', body: 'Write what you see: “leaf is 3 cm, light green”, not “plant looks happy”. Measurements make notes useful.' },
      { heading: 'Same time, same way', body: 'Check at the same time each day and measure the same way. This makes changes easier to compare.' },
      { heading: 'Look for patterns', body: 'After a week, read your notes. What changed? What might have caused it? This is how experiments begin.' },
    ],
    tryIt: 'Choose one plant and record its height, number of leaves and the weather for 3 days.',
  },
  {
    id: 'community-intro',
    pathway: 'community',
    title: 'Careers that help people learn and stay well',
    minutes: 10,
    summary: 'Teaching, health and social work all start with caring and communicating.',
    sections: [
      { heading: 'Many ways to help', body: 'Teachers, counsellors, health workers, librarians and NGO coordinators all support people in different ways.' },
      { heading: 'Core skills', body: 'Listening, explaining clearly, being patient and planning activities are skills you can practise right now with friends and family.' },
      { heading: 'Volunteering safely', body: 'If you volunteer, do it with a trusted adult or recognised organisation, and never share personal details with strangers.' },
    ],
    tryIt: 'Think of a teacher who explained something really well. Write down two things they did that helped you.',
  },
  {
    id: 'community-explaining',
    pathway: 'community',
    title: 'How to explain something clearly',
    minutes: 15,
    summary: 'A simple method to teach any topic to a friend.',
    sections: [
      { heading: 'Start with why', body: 'Tell the person why the topic matters or where they will see it in real life. This makes them curious.' },
      { heading: 'Use an example', body: 'Explain with something familiar — a cricket match for speed, a recipe for chemical reactions.' },
      { heading: 'Check understanding', body: 'Ask them to explain it back in their own words. If they can, you taught it well. If not, try a different example.' },
    ],
    tryIt: 'Explain one idea from your last science class to a younger sibling or friend in under 3 minutes.',
  },
  {
    id: 'entrepreneurship-intro',
    pathway: 'entrepreneurship',
    title: 'What is entrepreneurship?',
    minutes: 10,
    summary: 'Entrepreneurs notice problems and test ideas to solve them.',
    sections: [
      { heading: 'Problems first', body: 'Most good businesses start by noticing a problem people have — not with a product idea.' },
      { heading: 'Small tests', body: 'Before spending money, entrepreneurs test ideas cheaply: asking people, drawing a plan, or trying a tiny version.' },
      { heading: 'Not only business', body: 'Social entrepreneurs solve community problems. School clubs and fairs are great places to practise.' },
    ],
    tryIt: 'List 3 small problems you noticed this week at home, school or in your area.',
  },
  {
    id: 'entrepreneurship-questions',
    pathway: 'entrepreneurship',
    title: 'Asking good questions',
    minutes: 15,
    summary: 'Learn to ask questions that reveal what people really need.',
    sections: [
      { heading: 'Open questions', body: '“How do you usually…?” gets a story. “Do you like…?” gets yes or no. Stories tell you more.' },
      { heading: 'Ask about the past', body: '“Tell me about the last time you…” is more reliable than “Would you ever…?” People are better at remembering than predicting.' },
      { heading: 'Listen more than talk', body: 'Write down what people say in their own words. Do not try to sell your idea while asking.' },
    ],
    tryIt: 'Write 5 open questions you could ask a shopkeeper about their biggest daily challenge.',
  },
  {
    id: 'technical-intro',
    pathway: 'technical',
    title: 'Hands-on technical careers',
    minutes: 10,
    summary: 'From electricians to engineers — people who build and fix the world.',
    sections: [
      { heading: 'Skilled and important', body: 'Electricians, mechanics, plumbers, technicians and engineers keep homes, transport and factories running.' },
      { heading: 'Many routes', body: 'You can learn through ITI trades, polytechnic diplomas, apprenticeships or engineering degrees. Each has different entry requirements.' },
      { heading: 'Safety always', body: 'Real electrical or machine work must only be done with trained supervision. You can start with safe models and paper prototypes.' },
    ],
    tryIt: 'Look at a simple object like a stapler or tap. Sketch its parts and guess how they work together.',
  },
  {
    id: 'technical-safety',
    pathway: 'technical',
    title: 'Measuring and safety basics',
    minutes: 15,
    summary: 'Accurate measuring and safe habits are the foundation of hands-on work.',
    sections: [
      { heading: 'Measure twice', body: 'Builders say “measure twice, cut once”. Check every measurement before you cut or join anything.' },
      { heading: 'Units matter', body: 'Always write the unit (cm, mm, m). Mixing units is one of the most common causes of mistakes.' },
      { heading: 'Safe workspace', body: 'Keep the area clean, use scissors carefully, never touch electrical wiring and ask an adult before using any tool.' },
    ],
    tryIt: 'Measure 5 objects at home in cm and mm. Check each measurement twice.',
  },
]

export function getLesson(id: string) {
  return LESSONS.find((l) => l.id === id)
}
