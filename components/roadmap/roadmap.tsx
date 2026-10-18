'use client'

import { ArrowRight, BookOpen, Check, Clock, Compass, FolderKanban, GraduationCap, Hammer, IdCard } from 'lucide-react'
import Link from 'next/link'
import { StudentGate } from '@/components/journey/student-gate'
import { Card, PageHeader, ProgressBar, Tag } from '@/components/ui/kit'
import { useToast } from '@/components/ui/toast'
import { currentPathway, roadmapProgress, setActivePathway, toggleMilestone } from '@/lib/actions'
import { PATHWAYS, getPathway } from '@/lib/data/pathways'
import type { MilestoneKind } from '@/lib/types'
import { cn } from '@/lib/utils'

const KIND_ICON: Record<MilestoneKind, typeof Compass> = {
  explore: Compass,
  learn: BookOpen,
  practise: Hammer,
  project: FolderKanban,
  passport: IdCard,
  education: GraduationCap,
}

export function Roadmap() {
  const toast = useToast()
  return (
    <StudentGate>
      {(s) => {
        const active = currentPathway(s)
        const p = getPathway(active)
        const prog = roadmapProgress(s, active)
        const recommended = s.discovery?.top ?? []

        return (
          <div>
            <PageHeader
              eyebrow="Career roadmap"
              title={p.name}
              description={p.tagline}
            />

            <div className="-mx-4 mb-6 overflow-x-auto px-4 pb-2">
              <div className="flex gap-2" role="tablist" aria-label="Choose a pathway">
                {PATHWAYS.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    role="tab"
                    aria-selected={x.id === active}
                    onClick={() => setActivePathway(x.id)}
                    className={cn(
                      'shrink-0 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors outline-none focus-visible:ring-4 focus-visible:ring-ring/30',
                      x.id === active ? 'border-foreground bg-foreground text-background' : 'border-input bg-card hover:bg-muted',
                    )}
                  >
                    {x.name}
                    {recommended[0] === x.id && <span className="ml-1.5 text-xs text-teal">★</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-5">
              <section className="lg:col-span-3" aria-labelledby="milestones-heading">
                <Card>
                  <div className="flex items-center justify-between gap-3">
                    <h2 id="milestones-heading" className="text-xl font-semibold">
                      Milestones
                    </h2>
                    <span className="text-sm font-semibold text-muted-foreground">
                      {prog.done}/{prog.total} done
                    </span>
                  </div>
                  <ProgressBar value={prog.pct} label={`${p.name} roadmap progress`} className="mt-3" />

                  <ol className="mt-6 space-y-0">
                    {prog.milestones.map((m, i) => {
                      const done = s.roadmapDone.includes(m.id)
                      const Icon = KIND_ICON[m.kind]
                      const last = i === prog.milestones.length - 1
                      return (
                        <li key={m.id} className="relative flex gap-4 pb-6 last:pb-0">
                          {!last && (
                            <span
                              className={cn('absolute top-11 bottom-0 left-[1.3rem] w-0.5', done ? 'bg-teal' : 'bg-secondary')}
                              aria-hidden
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              toggleMilestone(m.id)
                              if (!done) toast(`Milestone done: ${m.title}`)
                            }}
                            aria-pressed={done}
                            aria-label={done ? `Mark “${m.title}” as not done` : `Mark “${m.title}” as done`}
                            className={cn(
                              'relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border-2 transition-colors outline-none focus-visible:ring-4 focus-visible:ring-ring/30',
                              done ? 'border-teal bg-teal text-white' : 'border-input bg-card text-muted-foreground hover:border-teal',
                            )}
                          >
                            {done ? <Check className="size-5 animate-pop" aria-hidden /> : <Icon className="size-5" aria-hidden />}
                          </button>
                          <div className="min-w-0 flex-1 pt-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className={cn('font-semibold', done && 'text-muted-foreground line-through decoration-teal/60')}>
                                {m.title}
                              </h3>
                              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="size-3.5" aria-hidden /> {m.time}
                              </span>
                            </div>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.action}</p>
                            <Link
                              href={m.href}
                              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                            >
                              {m.linkLabel} <ArrowRight className="size-4" aria-hidden />
                            </Link>
                          </div>
                        </li>
                      )
                    })}
                  </ol>
                </Card>
              </section>

              <aside className="space-y-4 lg:col-span-2" aria-label="About this pathway">
                <InfoList title="What people in this field do" items={p.whatPeopleDo} />
                <Card>
                  <h2 className="font-semibold">Example roles</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.exampleRoles.map((r) => (
                      <Tag key={r} tone="blue">
                        {r}
                      </Tag>
                    ))}
                  </div>
                  <h2 className="mt-5 font-semibold">Related subjects</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.subjects.map((r) => (
                      <Tag key={r} tone="cream">
                        {r}
                      </Tag>
                    ))}
                  </div>
                  <h2 className="mt-5 font-semibold">Beginner skills</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.skills.map((r) => (
                      <Tag key={r} tone="teal">
                        {r}
                      </Tag>
                    ))}
                  </div>
                </Card>
                <InfoList title="Possible study & training routes" items={p.education} />
                <p className="px-1 text-xs leading-relaxed text-muted-foreground">
                  Routes vary by state and institution. Check official admission websites with a teacher or trusted adult.
                </p>
              </aside>
            </div>
          </div>
        )
      }}
    </StudentGate>
  )
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <h2 className="font-semibold">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((x) => (
          <li key={x} className="flex gap-2 text-sm leading-relaxed">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
            {x}
          </li>
        ))}
      </ul>
    </Card>
  )
}
