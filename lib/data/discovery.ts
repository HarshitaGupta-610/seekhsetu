import type { PathwayId } from '@/lib/types'
import { getPathwayLinks } from './pathways'

export interface DiscoveryOption {
  id: string
  label: string
  pathway?: PathwayId
  style?: string
}

export interface DiscoveryQuestion {
  id: string
  prompt: string
  helper?: string
  options: DiscoveryOption[]
}

export const DISCOVERY_QUESTIONS: DiscoveryQuestion[] = [
  {
    id: 'free-time',
    prompt: 'On a free afternoon, what are you most likely to do?',
    options: [
      { id: 'a', label: 'Explore an app, game or a new gadget', pathway: 'digital' },
      { id: 'b', label: 'Draw, design or decorate something', pathway: 'design' },
      { id: 'c', label: 'Spend time outdoors or with plants and animals', pathway: 'agriculture' },
      { id: 'd', label: 'Help a friend or family member with something', pathway: 'community' },
      { id: 'e', label: 'Plan something or think of a new idea to try', pathway: 'entrepreneurship' },
      { id: 'f', label: 'Take apart or fix something', pathway: 'technical' },
    ],
  },
  {
    id: 'problem',
    prompt: 'When something goes wrong, what do you usually do first?',
    options: [
      { id: 'a', label: 'Search for how others solved it', pathway: 'digital' },
      { id: 'b', label: 'Sketch or picture a few different solutions', pathway: 'design' },
      { id: 'c', label: 'Watch closely to understand what is happening', pathway: 'agriculture' },
      { id: 'd', label: 'Talk it through with someone', pathway: 'community' },
      { id: 'e', label: 'Make a quick plan and get people involved', pathway: 'entrepreneurship' },
      { id: 'f', label: 'Try things step by step with my hands', pathway: 'technical' },
    ],
  },
  {
    id: 'school-project',
    prompt: 'In a group project, which part do you enjoy most?',
    options: [
      { id: 'a', label: 'Typing, organising files or making slides', pathway: 'digital' },
      { id: 'b', label: 'Making it look good — layout and pictures', pathway: 'design' },
      { id: 'c', label: 'Collecting information and observations', pathway: 'agriculture' },
      { id: 'd', label: 'Presenting and explaining to the class', pathway: 'community' },
      { id: 'e', label: 'Leading the team and dividing tasks', pathway: 'entrepreneurship' },
      { id: 'f', label: 'Building the model', pathway: 'technical' },
    ],
  },
  {
    id: 'proud',
    prompt: 'Which of these would make you feel proudest?',
    options: [
      { id: 'a', label: 'Making a useful website or tool', pathway: 'digital' },
      { id: 'b', label: 'Seeing people admire something I designed', pathway: 'design' },
      { id: 'c', label: 'Growing something healthy from a seed', pathway: 'agriculture' },
      { id: 'd', label: 'Helping someone understand a hard topic', pathway: 'community' },
      { id: 'e', label: 'Starting a club, stall or event that works', pathway: 'entrepreneurship' },
      { id: 'f', label: 'Repairing something that was broken', pathway: 'technical' },
    ],
  },
  {
    id: 'news',
    prompt: 'Which kind of news story catches your eye?',
    options: [
      { id: 'a', label: 'New technology and apps', pathway: 'digital' },
      { id: 'b', label: 'Art, fashion, films or architecture', pathway: 'design' },
      { id: 'c', label: 'Weather, farming or wildlife', pathway: 'agriculture' },
      { id: 'd', label: 'People helping their communities', pathway: 'community' },
      { id: 'e', label: 'Young people starting something new', pathway: 'entrepreneurship' },
      { id: 'f', label: 'Machines, vehicles or space', pathway: 'technical' },
    ],
  },
  {
    id: 'learning-style',
    prompt: 'How do you like to learn something new?',
    helper: 'There is no right answer — this helps us suggest the type of activities.',
    options: [
      { id: 'a', label: 'Watching or seeing pictures and diagrams', style: 'Visual — pictures, diagrams and videos' },
      { id: 'b', label: 'Listening and talking it through', style: 'Talking — discussion and explanation' },
      { id: 'c', label: 'Reading and writing notes', style: 'Reading — notes and written steps' },
      { id: 'd', label: 'Trying it out with my hands', style: 'Doing — hands-on practice' },
    ],
  },
]

export interface PlannerAction {
  id: string
  label: string
  href: string
  type: 'lesson' | 'challenge' | 'project'
}

export interface PlannerSkill {
  id: string
  name: string
  why: string
  actions: PlannerAction[]
}

const SKILL_WHY: Record<PathwayId, string[]> = {
  digital: [
    'Helps you find and share work quickly.',
    'Used for budgets, records and science data.',
    'The thinking behind every app and website.',
    'Keeps you and your family safe online.',
  ],
  design: [
    'Lets you test many ideas before choosing one.',
    'Makes your message easy to read.',
    'Helps people remember what you share.',
    'Good design starts with the person using it.',
  ],
  agriculture: [
    'The first step in any science investigation.',
    'Shows patterns you would otherwise miss.',
    'Useful for gardens, farms and food science.',
    'Helps protect water, soil and nature.',
  ],
  community: [
    'Useful in every class, job and friendship.',
    'People share more when they feel heard.',
    'Turns a good idea into a real activity.',
    'Helps you support people well.',
  ],
  entrepreneurship: [
    'Reveals what people actually need.',
    'Helps you plan costs and avoid losses.',
    'Gets others interested in your idea.',
    'The core of creating anything new.',
  ],
  technical: [
    'Accurate work starts with accurate measurements.',
    'Protects you and others while you work.',
    'Lets you test ideas cheaply.',
    'Helps you find and fix faults step by step.',
  ],
}

export function getPlannerSkills(pathway: PathwayId, skills: string[]): PlannerSkill[] {
  const links = getPathwayLinks(pathway)
  return skills.map((name, i) => {
    const actions: PlannerAction[] = [
      i % 2 === 0
        ? { id: `${pathway}-s${i}-lesson`, label: 'Read the intro lesson', href: `/learn/${links.intro}`, type: 'lesson' }
        : { id: `${pathway}-s${i}-lesson`, label: 'Work through the skill lesson', href: `/learn/${links.skill}`, type: 'lesson' },
      i < 2
        ? { id: `${pathway}-s${i}-challenge`, label: 'Practise with a challenge', href: `/challenges/${links.challenge}`, type: 'challenge' }
        : { id: `${pathway}-s${i}-project`, label: 'Apply it in a mini-project', href: `/projects/${links.project}`, type: 'project' },
    ]
    return { id: `${pathway}-skill-${i}`, name, why: SKILL_WHY[pathway][i] ?? '', actions }
  })
}
