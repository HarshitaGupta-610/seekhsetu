import { FeatureHub } from '@/components/journey/feature-hub'

const ITEMS = [
  { id: 'skill-communication', title: 'Communication in action', description: 'Practise explaining an idea clearly through a short poster, voice note or peer explanation.', meta: 'People skills' },
  { id: 'skill-digital', title: 'Digital problem solving', description: 'Break a local problem into steps, research responsibly and make a simple plan for testing your idea.', meta: 'Digital skills' },
  { id: 'skill-making', title: 'Making and building', description: 'Use everyday materials to create, measure, improve and document a useful prototype.', meta: 'Practical skills' },
  { id: 'skill-reflection', title: 'Reflection and resilience', description: 'Notice what worked, what changed and what you would try next. Progress grows through small iterations.', meta: 'Self-management' },
]

export default function SkillsInActionPage() {
  return <FeatureHub kind="skills" title="Skills in action" description="See how everyday activities build skills that travel across subjects, projects and future pathways." items={ITEMS} />
}
