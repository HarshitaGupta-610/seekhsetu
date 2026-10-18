import type { ClassLevel, OppCategory, OppMode, Opportunity, Region, VerificationStatus } from '@/lib/types'

export const CATEGORY_LABELS: Record<OppCategory, string> = {
  scholarship: 'Scholarship / education support',
  competition: 'Competition',
  workshop: 'Workshop / training',
  programme: 'Learning programme',
  mentorship: 'Mentorship',
  volunteering: 'Supervised volunteering',
}

export const REGION_LABELS: Record<Region, string> = {
  online: 'Online (anywhere)',
  any: 'Any region',
  north: 'North India',
  south: 'South India',
  east: 'East India',
  west: 'West India',
  central: 'Central India',
  northeast: 'Northeast India',
}

export const MODE_LABELS: Record<OppMode, string> = {
  online: 'Online',
  'in-person': 'In person',
  hybrid: 'Online + in person',
}

export const STATUS_LABELS: Record<VerificationStatus, string> = {
  'needs-review': 'Needs review',
  'facilitator-reviewed': 'Reviewed by facilitator',
}

const SCHOOL: ClassLevel[] = ['class-9', 'class-10', 'class-11', 'class-12']
const SENIOR: ClassLevel[] = ['class-11', 'class-12', 'diploma-iti', 'college']
const ALL: ClassLevel[] = ['class-9', 'class-10', 'class-11', 'class-12', 'diploma-iti', 'college', 'not-in-school']

function inDays(days: number) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

/** Curated opportunity records are reviewed before being published. */
export function createSeedOpportunities(): Opportunity[] {
  return [
    {
      id: 'opp-1',
      title: 'Young Innovators Idea Challenge',
      category: 'competition',
      description: 'Submit a one-page idea that solves a problem in your school or neighbourhood. Shortlisted students present to a panel.',
      eligibility: 'Students in Class 9–12. Individual or teams of up to 3.',
      eligibleLevels: SCHOOL,
      region: 'online',
      mode: 'online',
      deadline: inDays(24),
      source: 'Source details — verify on the official website “City Science Circle”',
      status: 'needs-review',
      addedBy: 'seed',
    },
    {
      id: 'opp-2',
      title: 'Merit-cum-need study support',
      category: 'scholarship',
      description: 'An example of a scholarship that helps with books and fees. Real scholarships should be checked on official government or institution websites.',
      eligibility: 'Class 11–12 and college students. Family income criteria apply (example only).',
      eligibleLevels: SENIOR,
      region: 'any',
      mode: 'online',
      deadline: inDays(52),
      source: 'Source details — verify on the official website “Shiksha Support Trust”',
      status: 'needs-review',
      addedBy: 'seed',
    },
    {
      id: 'opp-3',
      title: 'Weekend design & drawing workshop',
      category: 'workshop',
      description: 'Two Saturday sessions on sketching, layout and poster making. Materials provided.',
      eligibility: 'Class 9 and above. Parent or guardian consent needed for minors.',
      eligibleLevels: ALL,
      region: 'north',
      mode: 'in-person',
      deadline: inDays(10),
      source: 'Source details — verify on the official website “District Art Collective”',
      status: 'needs-review',
      addedBy: 'seed',
    },
    {
      id: 'opp-4',
      title: 'Intro to coding — self-paced programme',
      category: 'programme',
      description: 'Short, low-data lessons on step-by-step logic and building a first web page. Works on a phone.',
      eligibility: 'Anyone from Class 9 onwards. No experience needed.',
      eligibleLevels: ALL,
      region: 'online',
      mode: 'online',
      deadline: null,
      source: 'Source details — verify on the official website “Open Learn Collective”',
      status: 'needs-review',
      addedBy: 'seed',
    },
    {
      id: 'opp-5',
      title: 'Career conversations — group mentorship',
      category: 'mentorship',
      description: 'Monthly moderated group calls where professionals share what their work is like. No private messaging.',
      eligibility: 'Class 10–12 students. Sessions are supervised by a teacher.',
      eligibleLevels: ['class-10', 'class-11', 'class-12'],
      region: 'online',
      mode: 'online',
      deadline: inDays(35),
      source: 'Source details — verify on the official website “Pathfinders Network”',
      status: 'needs-review',
      addedBy: 'seed',
    },
    {
      id: 'opp-6',
      title: 'School garden volunteering',
      category: 'volunteering',
      description: 'Help plan and care for a school vegetable garden with a teacher. Learn about compost and water saving.',
      eligibility: 'Class 9 and above, with school permission.',
      eligibleLevels: SCHOOL,
      region: 'south',
      mode: 'in-person',
      deadline: inDays(18),
      source: 'Source details — verify on the official website “Green Schools Club”',
      status: 'needs-review',
      addedBy: 'seed',
    },
    {
      id: 'opp-7',
      title: 'Science model exhibition',
      category: 'competition',
      description: 'Display a working or paper model that explains a science idea. Low-cost materials encouraged.',
      eligibility: 'Class 9–10 students.',
      eligibleLevels: ['class-9', 'class-10'],
      region: 'east',
      mode: 'in-person',
      deadline: inDays(70),
      source: 'Source details — verify on the official website “Block Education Fair”',
      status: 'needs-review',
      addedBy: 'seed',
    },
    {
      id: 'opp-8',
      title: 'Basic electronics safety training',
      category: 'workshop',
      description: 'A supervised introduction to tools, safety and simple circuits using batteries only.',
      eligibility: 'Class 11 onwards, Diploma / ITI students.',
      eligibleLevels: ['class-11', 'class-12', 'diploma-iti'],
      region: 'west',
      mode: 'hybrid',
      deadline: inDays(40),
      source: 'Source details — verify on the official website “Skill Bench Centre”',
      status: 'needs-review',
      addedBy: 'seed',
    },
    {
      id: 'opp-9',
      title: 'Peer reading buddies',
      category: 'volunteering',
      description: 'Read with younger students once a week at school, under teacher supervision.',
      eligibility: 'Class 9–12 students.',
      eligibleLevels: SCHOOL,
      region: 'central',
      mode: 'in-person',
      deadline: null,
      source: 'Source details — verify on the official website “Read Together Initiative”',
      status: 'needs-review',
      addedBy: 'seed',
    },
    {
      id: 'opp-10',
      title: 'Young entrepreneurs bootcamp',
      category: 'programme',
      description: 'Four online sessions on spotting problems, talking to people and presenting ideas. No money or selling involved.',
      eligibility: 'Class 11 onwards.',
      eligibleLevels: SENIOR,
      region: 'northeast',
      mode: 'online',
      deadline: inDays(28),
      source: 'Source details — verify on the official website “Startup Shala”',
      status: 'needs-review',
      addedBy: 'seed',
    },
  ]
}
