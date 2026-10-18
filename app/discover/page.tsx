import type { Metadata } from 'next'
import { DiscoverFlow } from '@/components/discover/discover-flow'

export const metadata: Metadata = { title: 'Discover your interests' }

export default function DiscoverPage() {
  return <DiscoverFlow />
}
