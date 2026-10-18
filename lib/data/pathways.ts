import type { ClassLevel, HelpGoal, InternetAccess, Milestone, Pathway, PathwayId } from '@/lib/types'

export const PATHWAYS: Pathway[] = [
  {
    id: 'digital',
    name: 'Digital skills',
    tagline: 'Use technology to organise, create and solve problems.',
    whatPeopleDo: [
      'Build simple websites and apps that people use every day',
      'Organise information in spreadsheets and databases',
      'Help others use phones, computers and online services safely',
    ],
    exampleRoles: ['Web developer', 'Data assistant', 'IT support technician', 'Digital content creator'],
    subjects: ['Mathematics', 'Computer Science / IT', 'English'],
    skills: ['Organising files and information', 'Spreadsheet basics', 'Step-by-step (coding) logic', 'Online safety'],
    education: [
      'Computer Science or Information Practices in Class 11–12 (if offered)',
      'ITI or polytechnic courses in IT and computer operation',
      'Diplomas and degrees in Computer Applications or Engineering',
      'Free online beginner courses you can try on any device',
    ],
    theme: 'Digital thinker',
    themeDescription: 'You might enjoy figuring out how things work on a screen and making tasks faster or clearer.',
  },
  {
    id: 'design',
    name: 'Design & creativity',
    tagline: 'Communicate ideas through pictures, layouts and objects.',
    whatPeopleDo: [
      'Create posters, logos and illustrations that share a message',
      'Plan how products, rooms or apps look and feel to use',
      'Sketch many ideas, test them with people and improve them',
    ],
    exampleRoles: ['Graphic designer', 'Illustrator', 'Product designer', 'Architect'],
    subjects: ['Art', 'Mathematics (geometry)', 'English / Hindi'],
    skills: ['Sketching ideas quickly', 'Colour and layout', 'Visual storytelling', 'Understanding the user'],
    education: [
      'Fine Arts or any stream with Art as a subject in Class 11–12',
      'Diplomas in design, animation or architecture assistance',
      'Design entrance exams and degrees (explore requirements early)',
      'Building a sketchbook or portfolio of your own work',
    ],
    theme: 'Creative communicator',
    themeDescription: 'You might enjoy turning ideas into something others can see, hold or understand quickly.',
  },
  {
    id: 'agriculture',
    name: 'Agriculture & environment',
    tagline: 'Understand plants, soil, water and how we grow food.',
    whatPeopleDo: [
      'Help farmers grow healthier crops with less water',
      'Study soil, weather and local ecosystems',
      'Process, store and sell food in safer, smarter ways',
    ],
    exampleRoles: ['Agronomist', 'Food technologist', 'Environmental scientist', 'Farm entrepreneur'],
    subjects: ['Biology', 'Geography', 'Chemistry'],
    skills: ['Careful observation', 'Recording data over time', 'Understanding plant growth', 'Sustainable thinking'],
    education: [
      'Science stream with Biology, or Agriculture as a vocational subject',
      'Diplomas in agriculture, horticulture or food processing',
      'Degrees in Agriculture, Environmental Science or Food Technology',
      'Learning from local farmers, gardens and Krishi-related programmes',
    ],
    theme: 'Nature explorer',
    themeDescription: 'You might enjoy observing living things and the environment, and caring for how they grow.',
  },
  {
    id: 'community',
    name: 'Teaching & community service',
    tagline: 'Help people learn, stay healthy and feel supported.',
    whatPeopleDo: [
      'Explain ideas so others can understand and use them',
      'Organise activities that bring people together',
      'Support people who need information or care',
    ],
    exampleRoles: ['Teacher', 'Community health worker', 'Social worker', 'NGO programme coordinator'],
    subjects: ['Languages', 'Social Science', 'Psychology (if offered)'],
    skills: ['Explaining clearly', 'Active listening', 'Planning an activity', 'Empathy and patience'],
    education: [
      'Any stream in Class 11–12 — Humanities is a common route',
      'Teacher education diplomas and degrees after Class 12',
      'Degrees in Social Work, Psychology or Public Health',
      'Supervised volunteering with trusted local organisations',
    ],
    theme: 'Helper & guide',
    themeDescription: 'You might enjoy supporting others, sharing what you know and making groups work well.',
  },
  {
    id: 'entrepreneurship',
    name: 'Entrepreneurship',
    tagline: 'Spot problems and test ideas that create value.',
    whatPeopleDo: [
      'Notice what people need and design a solution',
      'Plan costs, prices and how to reach customers',
      'Lead small teams and learn from what does not work',
    ],
    exampleRoles: ['Small business owner', 'Shop manager', 'Social entrepreneur', 'Marketing assistant'],
    subjects: ['Mathematics', 'Economics', 'Business Studies'],
    skills: ['Asking good questions', 'Basic money maths', 'Presenting an idea', 'Problem solving'],
    education: [
      'Commerce stream (Business Studies, Accountancy, Economics)',
      'Any stream plus entrepreneurship clubs or school fairs',
      'Degrees and diplomas in Business, Commerce or Management',
      'Learning from local shopkeepers and family businesses',
    ],
    theme: 'Idea starter',
    themeDescription: 'You might enjoy noticing problems, organising people and trying new ideas.',
  },
  {
    id: 'technical',
    name: 'Technical & hands-on skills',
    tagline: 'Build, fix and improve real things.',
    whatPeopleDo: [
      'Install, repair and maintain machines and electrical systems',
      'Design and test objects, structures and tools',
      'Find faults step by step and solve them safely',
    ],
    exampleRoles: ['Electrician', 'Mechanic', 'Engineer', 'Mobile repair technician'],
    subjects: ['Physics', 'Mathematics', 'Workshop / vocational subjects'],
    skills: ['Measuring accurately', 'Following safety steps', 'Building prototypes', 'Troubleshooting'],
    education: [
      'Science stream with Physics and Maths',
      'ITI trades such as electrician, fitter or electronics',
      'Polytechnic diplomas and engineering degrees',
      'Supervised practice with a trusted adult or workshop',
    ],
    theme: 'Hands-on builder',
    themeDescription: 'You might enjoy making and fixing things, and learning by trying with your hands.',
  },
]

export function getPathway(id: PathwayId): Pathway {
  return PATHWAYS.find((p) => p.id === id) ?? PATHWAYS[0]
}

const PATHWAY_LINKS: Record<PathwayId, { intro: string; skill: string; challenge: string; project: string }> = {
  digital: { intro: 'digital-intro', skill: 'digital-spreadsheet', challenge: 'digital-info-card', project: 'digital-safety-guide' },
  design: { intro: 'design-intro', skill: 'design-layout', challenge: 'design-local-poster', project: 'design-awareness-poster' },
  agriculture: { intro: 'agriculture-intro', skill: 'agriculture-observation', challenge: 'agriculture-seed-journal', project: 'agriculture-water-plan' },
  community: { intro: 'community-intro', skill: 'community-explaining', challenge: 'community-teach-peer', project: 'community-book-corner' },
  entrepreneurship: { intro: 'entrepreneurship-intro', skill: 'entrepreneurship-questions', challenge: 'entrepreneurship-problem-hunt', project: 'entrepreneurship-market-survey' },
  technical: { intro: 'technical-intro', skill: 'technical-safety', challenge: 'technical-paper-prototype', project: 'technical-helper-tool' },
}

export function getPathwayLinks(id: PathwayId) {
  return PATHWAY_LINKS[id]
}

export function getMilestones(id: PathwayId): Milestone[] {
  const p = getPathway(id)
  const links = PATHWAY_LINKS[id]
  return [
    {
      id: `${id}:explore`,
      kind: 'explore',
      title: `Explore ${p.name.toLowerCase()}`,
      action: 'Read what people in this field do and which subjects connect to it.',
      time: '10 min',
      href: `/learn/${links.intro}`,
      linkLabel: 'Open intro lesson',
    },
    {
      id: `${id}:learn`,
      kind: 'learn',
      title: 'Learn a foundational skill',
      action: `Work through a short lesson on ${p.skills[1].toLowerCase()}.`,
      time: '15 min',
      href: `/learn/${links.skill}`,
      linkLabel: 'Open skill lesson',
    },
    {
      id: `${id}:practise`,
      kind: 'practise',
      title: 'Try a small practical challenge',
      action: 'Complete a low-cost challenge you can do at home or school.',
      time: '30–60 min',
      href: `/challenges/${links.challenge}`,
      linkLabel: 'Open challenge',
    },
    {
      id: `${id}:project`,
      kind: 'project',
      title: 'Create a mini-project',
      action: 'Pick a community project idea and work through its steps.',
      time: '2–4 hours over a week',
      href: `/projects/${links.project}`,
      linkLabel: 'Open project',
    },
    {
      id: `${id}:passport`,
      kind: 'passport',
      title: 'Add evidence to your Skill Passport',
      action: 'Write what you did and what you learned. Add a photo if you like.',
      time: '10 min',
      href: '/passport',
      linkLabel: 'Open Skill Passport',
    },
    {
      id: `${id}:education`,
      kind: 'education',
      title: 'Explore education & training options',
      action: 'Look at study routes and browse learning opportunities.',
      time: '15 min',
      href: '/opportunities',
      linkLabel: 'Browse opportunities',
    },
  ]
}

export const CLASS_LEVELS: { value: ClassLevel; label: string }[] = [
  { value: 'class-9', label: 'Class 9' },
  { value: 'class-10', label: 'Class 10' },
  { value: 'class-11', label: 'Class 11' },
  { value: 'class-12', label: 'Class 12' },
  { value: 'diploma-iti', label: 'Diploma / ITI' },
  { value: 'college', label: 'College / University' },
  { value: 'not-in-school', label: 'Not currently studying' },
]

export function classLabel(level: ClassLevel) {
  return CLASS_LEVELS.find((c) => c.value === level)?.label ?? level
}

export const INTERNET_OPTIONS: { value: InternetAccess; label: string; hint: string }[] = [
  { value: 'reliable', label: 'Reliable', hint: 'Most days, no problem' },
  { value: 'sometimes', label: 'Sometimes available', hint: 'Depends on the day or place' },
  { value: 'limited', label: 'Limited', hint: 'Rarely, or very little data' },
]

export const HELP_OPTIONS: { value: HelpGoal; label: string }[] = [
  { value: 'explore-careers', label: 'Explore careers' },
  { value: 'build-skill', label: 'Build a skill' },
  { value: 'try-project', label: 'Try a project' },
  { value: 'discover-opportunities', label: 'Discover opportunities' },
]

export const INTEREST_OPTIONS = [
  'Drawing & art',
  'Music',
  'Sports',
  'Phones & computers',
  'Plants & nature',
  'Cooking',
  'Reading & writing',
  'Fixing things',
  'Helping people',
  'Photography',
  'Games & puzzles',
  'Selling / trading',
]

export const SUBJECT_OPTIONS = [
  'Mathematics',
  'Science',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Hindi',
  'Social Science',
  'Computer / IT',
  'Art',
  'Economics',
  'Business Studies',
]

export const SKILL_OPTIONS = [
  'Drawing',
  'Explaining to friends',
  'Typing / using a computer',
  'Organising events',
  'Gardening',
  'Repairing',
  'Writing',
  'Public speaking',
  'Maths puzzles',
  'Photo / video editing',
  'Cooking',
  'Teamwork',
]
