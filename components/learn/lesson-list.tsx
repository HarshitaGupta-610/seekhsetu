'use client'

import { CheckCircle2, Clock } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { SaveButton } from '@/components/journey/save-button'
import { StudentGate } from '@/components/journey/student-gate'
import { Card, Chip, PageHeader, Tag } from '@/components/ui/kit'
import { currentPathway } from '@/lib/actions'
import { LESSONS } from '@/lib/data/lessons'
import { PATHWAYS, getPathway } from '@/lib/data/pathways'
import type { PathwayId } from '@/lib/types'

export function LessonList() {
  const [filter, setFilter] = useState<PathwayId | 'all' | null>(null)
  return (
    <StudentGate>
      {(s) => {
        const active = filter ?? currentPathway(s)
        const lessons = active === 'all' ? LESSONS : LESSONS.filter((l) => l.pathway === active)
        return (
          <div>
            <PageHeader
              eyebrow="Learn"
              title="Short lessons, one idea at a time"
              description="Each lesson takes a few minutes and works well on a slow connection. Save one to read later."
            />
            <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter by pathway">
              <Chip selected={active === 'all'} onClick={() => setFilter('all')}>
                All
              </Chip>
              {PATHWAYS.map((p) => (
                <Chip key={p.id} selected={active === p.id} onClick={() => setFilter(p.id)}>
                  {p.name}
                </Chip>
              ))}
            </div>
            <ul className="grid gap-4 md:grid-cols-2">
              {lessons.map((l) => {
                const done = s.lessonsDone.includes(l.id)
                return (
                  <li key={l.id}>
                    <Card className="flex h-full flex-col">
                      <div className="flex flex-wrap items-center gap-2">
                        <Tag tone="blue">{getPathway(l.pathway).name}</Tag>
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="size-3.5" aria-hidden /> {l.minutes} min
                        </span>
                        {done && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal">
                            <CheckCircle2 className="size-3.5" aria-hidden /> Done
                          </span>
                        )}
                      </div>
                      <h2 className="mt-3 text-xl font-semibold">
                        <Link href={`/learn/${l.id}`} className="hover:underline">
                          {l.title}
                        </Link>
                      </h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{l.summary}</p>
                      <div className="mt-4 flex items-center gap-2">
                        <Link href={`/learn/${l.id}`} className="text-sm font-semibold text-primary hover:underline">
                          {done ? 'Read again' : 'Start lesson'}
                        </Link>
                        <span className="flex-1" />
                        <SaveButton state={s} type="lesson" id={l.id} title={l.title} />
                      </div>
                    </Card>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      }}
    </StudentGate>
  )
}
