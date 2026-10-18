import type { Metadata } from 'next'
import { Roadmap } from '@/components/roadmap/roadmap'

export const metadata: Metadata = { title: 'My roadmap' }

export default function RoadmapPage() {
  return <Roadmap />
}
