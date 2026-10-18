import type { Question } from '@/lib/types'

export const GUIDE_TOPICS = ['Subjects', 'Skills', 'Education pathways', 'Careers', 'Projects']

export function createSeedQuestions(): Question[] {
  const now = Date.now()
  const daysAgo = (d: number) => new Date(now - d * 86400000).toISOString()
  return [
    {
      id: 'q-1',
      topic: 'Education pathways',
      text: 'I am in Class 10 and I like both Biology and Art. Do I have to choose only one stream?',
      author: 'Student',
      createdAt: daysAgo(6),
      reported: false,
      removed: false,
      mine: false,
      answers: [
        {
          id: 'a-1',
          guide: 'Ms. Asha',
          role: 'Science teacher',
          text: 'Many schools let you take a Science stream and keep Art as an elective or hobby. Ask your school which subject combinations they offer. Keep drawing — scientific illustration and design both use these skills together.',
        },
      ],
    },
    {
      id: 'q-2',
      topic: 'Careers',
      text: 'What does an electrician learn at an ITI? Is it only for boys?',
      author: 'Student',
      createdAt: daysAgo(4),
      reported: false,
      removed: false,
      mine: false,
      answers: [
        {
          id: 'a-2',
          guide: 'Mr. Rakesh',
          role: 'Workshop instructor',
          text: 'ITI electrician courses cover wiring, safety, measuring instruments and fault-finding, with lots of practical work. It is for everyone — many girls train and work in technical trades. Check the eligibility on official ITI admission websites for your state.',
        },
      ],
    },
    {
      id: 'q-3',
      topic: 'Skills',
      text: 'How can I practise coding if I only have my mother’s phone sometimes?',
      author: 'Student',
      createdAt: daysAgo(3),
      reported: false,
      removed: false,
      mine: false,
      answers: [
        {
          id: 'a-3',
          guide: 'Priya',
          role: 'College student mentor',
          text: 'You can practise a lot on paper: write step-by-step instructions, draw flowcharts, and solve logic puzzles. When you have the phone, use short lessons that work with little data. Save notes in a notebook so you can continue offline.',
        },
      ],
    },
    {
      id: 'q-4',
      topic: 'Projects',
      text: 'Our street floods every monsoon. Can this be a school project?',
      author: 'Student',
      createdAt: daysAgo(1),
      reported: false,
      removed: false,
      mine: false,
      answers: [
        {
          id: 'a-4',
          guide: 'Ms. Asha',
          role: 'Science teacher',
          text: 'Yes — that is a great real-world project. Observe safely (never enter floodwater), photograph drains from a safe spot, ask neighbours when it started, and research how drainage works. Present ideas to your teacher. Stay safe and involve an adult.',
        },
      ],
    },
    {
      id: 'q-5',
      topic: 'Subjects',
      text: 'Why do we need to learn algebra? Will I ever use it?',
      author: 'Student',
      createdAt: daysAgo(0.5),
      reported: false,
      removed: false,
      mine: false,
      answers: [],
    },
  ]
}

export const DEMO_STUDENTS = [
  { id: 's1', name: 'Aarav', classLevel: 'Class 9', pathway: 'Technical & hands-on skills', milestones: 4, challenges: 2, projects: 1 },
  { id: 's2', name: 'Meera', classLevel: 'Class 10', pathway: 'Design & creativity', milestones: 5, challenges: 3, projects: 1 },
  { id: 's3', name: 'Kabir', classLevel: 'Class 11', pathway: 'Digital skills', milestones: 2, challenges: 1, projects: 0 },
  { id: 's4', name: 'Fatima', classLevel: 'Class 9', pathway: 'Teaching & community service', milestones: 6, challenges: 4, projects: 2 },
  { id: 's5', name: 'Rohit', classLevel: 'Class 12', pathway: 'Entrepreneurship', milestones: 3, challenges: 2, projects: 1 },
  { id: 's6', name: 'Sana', classLevel: 'Class 10', pathway: 'Agriculture & environment', milestones: 1, challenges: 0, projects: 0 },
]

export const DEMO_SUBMISSIONS = [
  {
    id: 'sub-1',
    student: 'Meera',
    title: 'Make a poster about a local issue',
    kind: 'Challenge',
    text: 'I made a poster about not throwing plastic in the canal. My brother understood the message in 3 seconds!',
  },
  {
    id: 'sub-2',
    student: 'Fatima',
    title: 'Plan a book-swap or study corner',
    kind: 'Project',
    text: 'We collected 23 old books and our class teacher gave us a shelf near the window. We made a sign-out sheet.',
  },
  {
    id: 'sub-3',
    student: 'Aarav',
    title: 'Design a paper prototype',
    kind: 'Challenge',
    text: 'I built a cardboard pen stand that stops pens rolling off. Version 1 fell over, so I made the base wider.',
  },
]

export interface HobbyGuide {
  id: string
  name: string
  practise: string[]
  portfolio: string[]
  volunteer: string[]
  futureWork: string[]
  skills: string[]
  beginner: string[]
  safety: string[]
}

export const HOBBIES: HobbyGuide[] = [
  {
    id: 'drawing',
    name: 'Drawing & art',
    practise: ['Sketch for 10 minutes daily', 'Copy and then redesign posters you see'],
    portfolio: ['Keep a dated sketchbook', 'Photograph your best 5 pieces'],
    volunteer: ['Make posters for a school event', 'Decorate a classroom notice board with permission'],
    futureWork: ['Graphic design', 'Illustration', 'Animation', 'Architecture'],
    skills: ['Observation', 'Colour and layout', 'Visual storytelling'],
    beginner: ['Draw one object from 3 angles', 'Design a logo for a school club'],
    safety: ['Credit others when you copy their style for practice', 'Do not post work online with your school name or photo without an adult’s okay'],
  },
  {
    id: 'coding',
    name: 'Coding & computers',
    practise: ['Solve logic puzzles', 'Try free beginner lessons when you have internet'],
    portfolio: ['Save screenshots of small programs you made', 'Write what each program does'],
    volunteer: ['Help a family member set up a safe phone lock', 'Teach a friend a useful app feature'],
    futureWork: ['Software development', 'IT support', 'Data work'],
    skills: ['Logical thinking', 'Patience', 'Breaking problems into steps'],
    beginner: ['Write instructions for a robot to make tea', 'Build a simple web page'],
    safety: ['Never share passwords or OTPs', 'Avoid downloading unknown apps', 'Tell an adult if someone online asks for personal details'],
  },
  {
    id: 'cooking',
    name: 'Cooking',
    practise: ['Help prepare one meal a week', 'Measure ingredients carefully'],
    portfolio: ['Write and photograph your own recipe card', 'Record what you changed and why'],
    volunteer: ['Help at a family or school food event under supervision'],
    futureWork: ['Food technology', 'Nutrition', 'Hotel management', 'Food business'],
    skills: ['Measuring', 'Hygiene', 'Planning and timing'],
    beginner: ['Make a no-fire recipe like a salad or chaat', 'Calculate the cost of one dish'],
    safety: ['Always cook with an adult nearby', 'Be careful with knives, gas and hot oil'],
  },
  {
    id: 'photography',
    name: 'Photography',
    practise: ['Take 10 photos of one object in different light', 'Learn the rule of thirds'],
    portfolio: ['Choose your best 10 photos with a short caption', 'Show before/after edits'],
    volunteer: ['Photograph a school event with permission'],
    futureWork: ['Photography', 'Journalism', 'Film and media', 'Digital marketing'],
    skills: ['Composition', 'Patience', 'Storytelling'],
    beginner: ['A photo story of your street in 5 pictures', 'Capture one plant every day for a week'],
    safety: ['Always ask before photographing people', 'Remove location details before sharing photos'],
  },
  {
    id: 'tutoring',
    name: 'Explaining & tutoring',
    practise: ['Explain one topic each week to someone younger', 'Make simple revision notes'],
    portfolio: ['Keep notes or worksheets you made', 'Ask for a short written comment from a teacher'],
    volunteer: ['Peer reading buddy at school', 'Help younger siblings or neighbours with homework (with family approval)'],
    futureWork: ['Teaching', 'Training', 'Counselling', 'Content writing'],
    skills: ['Explaining clearly', 'Patience', 'Planning'],
    beginner: ['Teach a 5-minute topic', 'Create a 10-question quiz for a friend'],
    safety: ['Tutor in shared family spaces or at school', 'Involve a trusted adult when helping anyone outside your family'],
  },
  {
    id: 'gardening',
    name: 'Gardening & plants',
    practise: ['Grow herbs in old containers', 'Keep a plant growth journal'],
    portfolio: ['Weekly photos of your plants', 'Notes on what worked and what did not'],
    volunteer: ['Help with a school or community garden with a teacher'],
    futureWork: ['Agriculture', 'Horticulture', 'Environmental science', 'Landscape design'],
    skills: ['Observation', 'Patience', 'Recording data'],
    beginner: ['Sprout kitchen seeds', 'Make compost from vegetable peels'],
    safety: ['Wash hands after handling soil', 'Never use pesticides or chemicals without an adult'],
  },
  {
    id: 'repairing',
    name: 'Fixing & repairing',
    practise: ['Observe how simple objects work', 'Build cardboard models'],
    portfolio: ['Photos of models with measurements', 'Write the fault and how you found it'],
    volunteer: ['Help organise tools at school workshop with a teacher'],
    futureWork: ['Electrician', 'Mechanic', 'Electronics technician', 'Engineering'],
    skills: ['Troubleshooting', 'Measuring', 'Safety awareness'],
    beginner: ['Take apart a broken ballpoint pen and rebuild it', 'Make a paper bridge that holds a book'],
    safety: ['Never open electrical appliances or touch wiring', 'Only use tools with a trained adult present'],
  },
  {
    id: 'writing',
    name: 'Writing & storytelling',
    practise: ['Write 100 words daily', 'Keep a notebook of ideas'],
    portfolio: ['Collect your 3 best pieces', 'Show a first draft and a final draft'],
    volunteer: ['Write for the school magazine or notice board'],
    futureWork: ['Journalism', 'Content writing', 'Teaching', 'Advertising'],
    skills: ['Clear writing', 'Research', 'Editing'],
    beginner: ['Interview a grandparent and write their story', 'Write a review of a book'],
    safety: ['Do not share personal details in public writing', 'Ask permission before writing about real people'],
  },
]
