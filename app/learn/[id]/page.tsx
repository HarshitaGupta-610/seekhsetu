import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LessonDetail } from '@/components/learn/lesson-detail'
import { LESSONS, getLesson } from '@/lib/data/lessons'

export function generateStaticParams() {
  return LESSONS.map((l) => ({ id: l.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  return { title: getLesson(id)?.title ?? 'Lesson' }
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!getLesson(id)) notFound()
  return <LessonDetail id={id} />
}
