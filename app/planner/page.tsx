import type { Metadata } from 'next'
import { Planner } from '@/components/planner/planner'

export const metadata: Metadata = { title: 'Skill planner' }

export default function PlannerPage() {
  return <Planner />
}
