'use client'

import { ArrowLeft, Check, Clock, IdCard, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { SaveButton } from '@/components/journey/save-button'
import { StudentGate } from '@/components/journey/student-gate'
import { Button, Card, LinkButton, Tag } from '@/components/ui/kit'
import { useToast } from '@/components/ui/toast'
import { addPortfolioFromLesson, isInPortfolio, toggleLessonDone } from '@/lib/actions'
import { getLesson } from '@/lib/data/lessons'
import { getPathway } from '@/lib/data/pathways'

export function LessonDetail({ id }: { id: string }) {
  const toast = useToast()
  const lesson = getLesson(id)!
  return (
    <StudentGate>
      {(s) => {
        const done = s.lessonsDone.includes(id)
        const inPassport = isInPortfolio(s, 'lesson', id)
        return (
          <article className="mx-auto max-w-2xl">
            <Link href="/learn" className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              <ArrowLeft className="size-4" aria-hidden /> All lessons
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="blue">{getPathway(lesson.pathway).name}</Tag>
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="size-4" aria-hidden /> {lesson.minutes} min read
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold text-balance md:text-4xl">{lesson.title}</h1>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{lesson.summary}</p>

            <div className="mt-8 space-y-6">
              {lesson.sections.map((sec) => (
                <section key={sec.heading}>
                  <h2 className="text-xl font-semibold">{sec.heading}</h2>
                  <p className="mt-2 leading-relaxed">{sec.body}</p>
                </section>
              ))}
            </div>

            <Card className="mt-8 flex gap-4 bg-accent/60">
              <Lightbulb className="mt-0.5 size-6 shrink-0 text-accent-foreground" aria-hidden />
              <div>
                <h2 className="font-semibold">Try it</h2>
                <p className="mt-1 leading-relaxed">{lesson.tryIt}</p>
              </div>
            </Card>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <Button
                variant={done ? 'outline' : 'primary'}
                onClick={() => {
                  toggleLessonDone(id)
                  if (!done) toast('Lesson complete. Nice work!')
                }}
              >
                <Check aria-hidden /> {done ? 'Completed — undo' : 'Mark lesson complete'}
              </Button>
              <SaveButton state={s} type="lesson" id={id} title={lesson.title} size="md" />
              {done &&
                (inPassport ? (
                  <LinkButton href="/passport" variant="ghost">
                    <IdCard aria-hidden /> In your Skill Passport
                  </LinkButton>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      if (addPortfolioFromLesson(id)) toast('Added to your Skill Passport.')
                    }}
                  >
                    <IdCard aria-hidden /> Add to Skill Passport
                  </Button>
                ))}
            </div>
          </article>
        )
      }}
    </StudentGate>
  )
}
