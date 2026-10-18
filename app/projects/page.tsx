import { FeatureHub } from '@/components/journey/feature-hub'

const items = [
  { id: 'project-water-audit', title: 'Map water use at home', description: 'Observe one day of water use, ask two questions, and suggest one practical improvement.', meta: 'Environment · 1 week', href: '/challenges' },
  { id: 'project-community-poster', title: 'Make a community information poster', description: 'Choose a local issue, verify the key facts, and create a clear poster for your school or neighbourhood.', meta: 'Communication · 1 week', href: '/challenges' },
  { id: 'project-interview', title: 'Learn from a local maker', description: 'Prepare respectful questions, record what you learn, and reflect on the skills behind everyday work.', meta: 'Research · 3 days', href: '/learn' },
]

export default function ProjectsPage() {
  return <FeatureHub kind="skills" title="Community projects" description="Practise useful skills through small projects you can do with people and materials around you." items={items} />
}
