export type ClassLevel =
  | 'class-9'
  | 'class-10'
  | 'class-11'
  | 'class-12'
  | 'diploma-iti'
  | 'college'
  | 'not-in-school'

export type InternetAccess = 'reliable' | 'sometimes' | 'limited'
export type HelpGoal = 'explore-careers' | 'build-skill' | 'try-project' | 'discover-opportunities'
export type PathwayId = 'digital' | 'design' | 'agriculture' | 'community' | 'entrepreneurship' | 'technical'
export type Language = 'en' | 'hi' | 'bn' | 'other'

export interface Profile {
  name: string
  classLevel: ClassLevel
  language: Language
  interests: string[]
  subjects: string[]
  skills: string[]
  careerAreas: PathwayId[]
  internet: InternetAccess | null
  helpWith: HelpGoal[]
  createdAt: string
}

export interface DiscoveryResult {
  answers: Record<string, string>
  scores: Record<PathwayId, number>
  top: PathwayId[]
  learningStyle: string | null
  completedAt: string
}

export interface Pathway {
  id: PathwayId
  name: string
  tagline: string
  whatPeopleDo: string[]
  exampleRoles: string[]
  subjects: string[]
  skills: string[]
  education: string[]
  theme: string
  themeDescription: string
}

export type MilestoneKind = 'explore' | 'learn' | 'practise' | 'project' | 'passport' | 'education'

export interface Milestone {
  id: string
  kind: MilestoneKind
  title: string
  action: string
  time: string
  href: string
  linkLabel: string
}

export interface Lesson {
  id: string
  pathway: PathwayId
  title: string
  minutes: number
  summary: string
  sections: { heading: string; body: string }[]
  tryIt: string
}

export interface Challenge {
  id: string
  pathway: PathwayId
  title: string
  summary: string
  instructions: string[]
  time: string
  materials: string[]
  lowCost: string[]
  skills: string[]
  badge: string
  custom?: boolean
}

export interface ChallengeRecord {
  status: 'draft' | 'completed'
  text: string
  photo?: string
  updatedAt: string
  completedAt?: string
  feedback?: string
}

export interface Project {
  id: string
  pathway: PathwayId
  title: string
  goal: string
  steps: string[]
  materials: string[]
  effort: string
  skills: string[]
}

export interface ProjectRecord {
  status: 'saved' | 'started' | 'completed'
  stepsDone: number[]
  notes: string
  outcome: string
  updatedAt: string
  feedback?: string
}

export type OppCategory = 'scholarship' | 'competition' | 'workshop' | 'programme' | 'mentorship' | 'volunteering'
export type VerificationStatus = 'needs-review' | 'facilitator-reviewed'
export type Region = 'online' | 'north' | 'south' | 'east' | 'west' | 'central' | 'northeast' | 'any'
export type OppMode = 'online' | 'in-person' | 'hybrid'

export interface Opportunity {
  id: string
  title: string
  category: OppCategory
  description: string
  eligibility: string
  eligibleLevels: ClassLevel[]
  region: Region
  mode: OppMode
  deadline: string | null
  source: string
  status: VerificationStatus
  addedBy: 'seed' | 'facilitator'
}

export type SavedType = 'challenge' | 'project' | 'lesson' | 'opportunity'

export interface SavedItem {
  type: SavedType
  id: string
  savedAt: string
}

export interface PortfolioEntry {
  id: string
  kind: 'challenge' | 'project' | 'lesson' | 'custom'
  refId?: string
  title: string
  description: string
  evidence: string
  photo?: string
  badge?: string
  skills: string[]
  date: string
  visibleInShare: boolean
}

export interface Answer {
  id: string
  guide: string
  role: string
  text: string
}

export interface Question {
  id: string
  topic: string
  text: string
  author: string
  createdAt: string
  answers: Answer[]
  reported: boolean
  removed: boolean
  mine: boolean
}

export interface ChatMessage {
  id: string
  role: 'user' | 'guide'
  text: string
  lang: 'en' | 'hi' | 'bn'
}

export interface AppState {
  version: 1
  profile: Profile | null
  discovery: DiscoveryResult | null
  activePathway: PathwayId | null
  roadmapDone: string[]
  lessonsDone: string[]
  plannerGoal: PathwayId | null
  plannerDone: string[]
  confidence: Record<string, number>
  challenges: Record<string, ChallengeRecord>
  customChallenges: Challenge[]
  projects: Record<string, ProjectRecord>
  saved: SavedItem[]
  portfolio: PortfolioEntry[]
  questions: Question[]
  opportunities: Opportunity[]
  chat: ChatMessage[]
  chatLang: 'en' | 'hi' | 'bn'
}
