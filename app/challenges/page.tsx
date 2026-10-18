import type { Metadata } from 'next'
import { ChallengeList } from '@/components/challenges/challenge-list'

export const metadata: Metadata = { title: 'One Skill, One Week' }

export default function ChallengesPage() {
  return <ChallengeList />
}
