import type { Metadata } from 'next'
import { LessonList } from '@/components/learn/lesson-list'

export const metadata: Metadata = { title: 'Lessons' }

export default function LearnPage() {
  return <LessonList />
}
