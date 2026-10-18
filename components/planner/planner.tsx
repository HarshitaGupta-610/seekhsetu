'use client'

import { ArrowRight, BookOpen, Check, FolderKanban, Info, Trophy } from 'lucide-react'
import Link from 'next/link'
import { StudentGate } from '@/components/journey/student-gate'
import { Card, PageHeader, ProgressBar, Select, Tag } from '@/components/ui/kit'
import { currentPathway, setConfidence, setPlannerGoal, togglePlannerAction } from '@/lib/actions'
import { getPlannerSkills } from '@/lib/data/discovery'
import { PATHWAYS, getPathway } from '@/lib/data/pathways'
import type { PathwayId } from '@/lib/types'
import { cn } from '@/lib/utils'

const TYPE_ICON = { lesson: BookOpen, challenge: Trophy, project: FolderKanban }
const CONFIDENCE = ['New to me', 'Tried it', 'Getting there', 'Confident']

export function Planner() {
  return (
    <StudentGate>
      {(s) => {
        const goal = s.plannerGoal ?? currentPathway(s)
        const pathway = getPathway(goal)
        const skills = getPlannerSkills(goal, pathway.skills)
        const allActions = skills.flatMap((k) => k.actions)
        const done = allActions.filter((a) => s.plannerDone.includes(a.id)).length
        const mySkills = s.profile?.skills ?? []

        return (
          <div>
            <PageHeader
              eyebrow="Skill gap-to-action planner"
              title="Skills to grow, one action at a time"
              description="Pick an interest. We'll suggest beginner skills and practical ways to practise them."
            />

            <Card className="mb-6 grid gap-4 md:grid-cols-2 md:items-end">
              <div>
                <label htmlFor="goal" className="mb-1.5 block text-sm font-semibold">
                  I want to explore
                </label>
                <Select id="goal" value={goal} onChange={(e) => setPlannerGoal(e.target.value as PathwayId)}>
                  {PATHWAYS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold">
                  {done} of {allActions.length} actions done
                </p>
                <ProgressBar value={(done / allActions.length) * 100} label="Planner progress" />
              </div>
            </Card>

            <p className="mb-6 flex items-start gap-2 text-sm text-muted-foreground">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
              Suggestions are based on what you told us about your interests and skills — they are not a formal skill
              assessment. Your confidence rating is just for you.
            </p>

            <ul className="grid gap-4 md:grid-cols-2">
              {skills.map((k) => {
                const level = s.confidence[k.id] ?? 0
                const hasIt = mySkills.some((m) => m.toLowerCase().includes(k.name.toLowerCase().split(' ')[0]))
                return (
                  <li key={k.id}>
                    <Card className="h-full">
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="text-lg font-semibold">{k.name}</h2>
                        {hasIt && <Tag tone="teal">You mentioned this</Tag>}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{k.why}</p>

                      <ul className="mt-4 space-y-2">
                        {k.actions.map((a) => {
                          const isDone = s.plannerDone.includes(a.id)
                          const Icon = TYPE_ICON[a.type]
                          return (
                            <li key={a.id} className="flex items-center gap-3 rounded-2xl bg-muted/70 p-2 pr-3">
                              <button
                                type="button"
                                aria-pressed={isDone}
                                aria-label={isDone ? `Mark “${a.label}” as not done` : `Mark “${a.label}” as done`}
                                onClick={() => togglePlannerAction(a.id)}
                                className={cn(
                                  'flex size-9 shrink-0 items-center justify-center rounded-xl border-2 outline-none focus-visible:ring-4 focus-visible:ring-ring/30',
                                  isDone ? 'border-teal bg-teal text-white' : 'border-input bg-card',
                                )}
                              >
                                {isDone ? <Check className="size-4 animate-pop" aria-hidden /> : <Icon className="size-4 text-muted-foreground" aria-hidden />}
                              </button>
                              <Link href={a.href} className="flex-1 text-sm font-medium hover:underline">
                                {a.label}
                              </Link>
                              <ArrowRight className="size-4 text-muted-foreground" aria-hidden />
                            </li>
                          )
                        })}
                      </ul>

                      <fieldset className="mt-5">
                        <legend className="mb-2 text-sm font-semibold">How confident do you feel?</legend>
                        <div className="grid grid-cols-4 gap-1.5">
                          {CONFIDENCE.map((c, i) => (
                            <button
                              key={c}
                              type="button"
                              aria-pressed={level === i + 1}
                              onClick={() => setConfidence(k.id, level === i + 1 ? 0 : i + 1)}
                              className={cn(
                                'rounded-xl border px-1 py-2 text-xs font-medium leading-tight outline-none focus-visible:ring-4 focus-visible:ring-ring/30',
                                level >= i + 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-card hover:bg-muted',
                              )}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </fieldset>
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
