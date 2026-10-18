'use client'

import { Award, CheckCircle2, Clock, PencilLine, Trophy } from 'lucide-react'
import Link from 'next/link'
import { SaveButton } from '@/components/journey/save-button'
import { StudentGate } from '@/components/journey/student-gate'
import { Card, EmptyState, LinkButton, PageHeader, Tag } from '@/components/ui/kit'
import { allChallenges } from '@/lib/actions'
import { weeklyChallengeIndex } from '@/lib/data/activities'
import { getPathway } from '@/lib/data/pathways'

export function ChallengeList() {
  return (
    <StudentGate>
      {(s) => {
        const list = allChallenges(s)
        const weekly = list[weeklyChallengeIndex(list.length)]
        const history = Object.entries(s.challenges)
          .filter(([, r]) => r.status === 'completed')
          .map(([id, r]) => ({ c: list.find((x) => x.id === id), r }))
          .filter((x) => x.c)
          .sort((a, b) => (b.r.completedAt ?? '').localeCompare(a.r.completedAt ?? ''))
        const weeklyRec = s.challenges[weekly.id]

        return (
          <div>
            <PageHeader
              eyebrow="One Skill, One Week"
              title="Try it, learn from it, build on it."
              description="One short, low-cost challenge each week. Save a draft any time and finish when you're ready."
            />

            <Card className="mb-8 grid gap-6 bg-foreground text-background md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-accent">
                  <Trophy className="size-4" aria-hidden /> This week&apos;s challenge
                </p>
                <h2 className="mt-2 text-2xl font-semibold md:text-3xl">{weekly.title}</h2>
                <p className="mt-2 max-w-xl leading-relaxed text-background/80">{weekly.summary}</p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-background/70">
                  <Clock className="size-4" aria-hidden /> {weekly.time}
                </p>
              </div>
              <LinkButton href={`/challenges/${weekly.id}`} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                {weeklyRec?.status === 'completed' ? 'View submission' : weeklyRec ? 'Continue draft' : 'Start challenge'}
              </LinkButton>
            </Card>

            <section aria-labelledby="badges-heading" className="mb-8">
              <h2 id="badges-heading" className="mb-3 text-xl font-semibold">
                Your SeekhSetu badges
              </h2>
              {history.length === 0 ? (
                <EmptyState
                  icon={<Award aria-hidden />}
                  title="No badges yet"
                  description="Complete any challenge to earn a SeekhSetu badge. Badges show practice — they are not official certificates."
                />
              ) : (
                <ul className="flex flex-wrap gap-3">
                  {history.map(({ c, r }) => (
                    <li key={c!.id}>
                      <Link
                        href={`/challenges/${c!.id}`}
                        className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 pr-4 hover:border-teal"
                      >
                        <span className="flex size-10 items-center justify-center rounded-full bg-warning text-warning-foreground">
                          <Award className="size-5" aria-hidden />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold">{c!.badge}</span>
                          <span className="block text-xs text-muted-foreground">
                            {new Date(r.completedAt ?? r.updatedAt).toLocaleDateString()}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section aria-labelledby="all-heading">
              <h2 id="all-heading" className="mb-3 text-xl font-semibold">
                All challenges
              </h2>
              <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {list.map((c) => {
                  const rec = s.challenges[c.id]
                  return (
                    <li key={c.id}>
                      <Card className="flex h-full flex-col">
                        <div className="flex flex-wrap items-center gap-2">
                          <Tag tone="blue">{getPathway(c.pathway).name}</Tag>
                          {c.custom && <Tag tone="warning">Added by facilitator</Tag>}
                          {rec?.status === 'completed' && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal">
                              <CheckCircle2 className="size-3.5" aria-hidden /> Completed
                            </span>
                          )}
                          {rec?.status === 'draft' && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                              <PencilLine className="size-3.5" aria-hidden /> Draft saved
                            </span>
                          )}
                        </div>
                        <h3 className="mt-3 text-lg font-semibold">
                          <Link href={`/challenges/${c.id}`} className="hover:underline">
                            {c.title}
                          </Link>
                        </h3>
                        <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
                        <div className="mt-4 flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="size-3.5" aria-hidden /> {c.time}
                          </span>
                          <SaveButton state={s} type="challenge" id={c.id} title={c.title} />
                        </div>
                      </Card>
                    </li>
                  )
                })}
              </ul>
            </section>
          </div>
        )
      }}
    </StudentGate>
  )
}
