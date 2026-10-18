'use client'

import { ArrowRight, Bookmark, Clock, IdCard, MessagesSquare, Search, Sparkles, Trophy } from 'lucide-react'
import Link from 'next/link'
import { LearningBridge } from '@/components/journey/learning-bridge'
import { StudentGate } from '@/components/journey/student-gate'
import { Card, LinkButton, ProgressBar, Tag } from '@/components/ui/kit'
import { allChallenges, currentPathway, journeyStages, roadmapProgress } from '@/lib/actions'
import { weeklyChallengeIndex } from '@/lib/data/activities'
import { classLabel, getPathway } from '@/lib/data/pathways'
import type { AppState } from '@/lib/types'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function nextStep(s: AppState) {
  if (!s.discovery)
    return { title: 'Discover what interests you', text: 'A short activity — about 3 minutes. Not a test.', href: '/discover', cta: 'Start discovery' }
  const prog = roadmapProgress(s, currentPathway(s))
  const m = prog.milestones.find((x) => !s.roadmapDone.includes(x.id))
  if (m) return { title: m.title, text: m.action, href: m.href, cta: m.linkLabel, time: m.time }
  return { title: 'Roadmap complete — well done!', text: 'Try another pathway or take on this week’s challenge.', href: '/roadmap', cta: 'Explore pathways' }
}

export function Dashboard() {
  return (
    <StudentGate>
      {(s) => {
        const pathway = getPathway(currentPathway(s))
        const prog = roadmapProgress(s, pathway.id)
        const stages = journeyStages(s)
        const step = nextStep(s)
        const challenges = allChallenges(s)
        const weekly = challenges[weeklyChallengeIndex(challenges.length)]
        const weeklyRec = s.challenges[weekly.id]
        const completed = Object.values(s.challenges).filter((c) => c.status === 'completed').length

        return (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {classLabel(s.profile!.classLevel)} · Exploring {pathway.name.toLowerCase()}
              </p>
              <h1 className="mt-1 text-3xl font-semibold md:text-4xl">
                {greeting()}, {s.profile!.name}
              </h1>
            </div>

            <Card className="pb-6">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">Your learning bridge</h2>
                <span className="text-sm font-medium text-muted-foreground">
                  {stages.filter((x) => x.done).length} of {stages.length} steps
                </span>
              </div>
              <LearningBridge stages={stages} />
            </Card>

            <div className="grid gap-6 md:grid-cols-5">
              <Card className="bg-foreground text-background md:col-span-3">
                <p className="flex items-center gap-2 text-sm font-semibold text-accent">
                  <Sparkles className="size-4" aria-hidden /> Your next small step
                </p>
                <h2 className="mt-3 text-2xl font-semibold">{step.title}</h2>
                <p className="mt-2 leading-relaxed text-background/80">{step.text}</p>
                {'time' in step && step.time && (
                  <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-background/70">
                    <Clock className="size-4" aria-hidden /> {step.time}
                  </p>
                )}
                <div className="mt-6">
                  <LinkButton href={step.href} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    {step.cta} <ArrowRight aria-hidden />
                  </LinkButton>
                </div>
              </Card>

              <Card className="md:col-span-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Roadmap</h2>
                  <Tag tone="teal">{pathway.theme}</Tag>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{pathway.name}</p>
                <p className="mt-5 text-3xl font-semibold">
                  {prog.done}
                  <span className="text-base font-medium text-muted-foreground"> / {prog.total} milestones</span>
                </p>
                <ProgressBar value={prog.pct} label="Roadmap progress" className="mt-3" />
                <Link href="/roadmap" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  Open roadmap <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Card>
            </div>

            <Card className="flex flex-col gap-5 md:flex-row md:items-center">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-warning text-warning-foreground">
                <Trophy className="size-7" aria-hidden />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-teal">One Skill, One Week</p>
                <h2 className="mt-1 text-xl font-semibold">{weekly.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {weekly.time} · {weekly.skills.join(', ')}
                </p>
              </div>
              <LinkButton href={`/challenges/${weekly.id}`} variant={weeklyRec?.status === 'completed' ? 'outline' : 'primary'}>
                {weeklyRec?.status === 'completed' ? 'View my submission' : weeklyRec ? 'Continue draft' : 'Start challenge'}
              </LinkButton>
            </Card>

            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { href: '/passport', icon: IdCard, label: 'Skill Passport', value: `${s.portfolio.length} entries` },
                { href: '/challenges', icon: Trophy, label: 'Challenges', value: `${completed} completed` },
                { href: '/saved', icon: Bookmark, label: 'Saved for later', value: `${s.saved.length} items` },
                { href: '/opportunities', icon: Search, label: 'Opportunities', value: `${s.opportunities.length} listings` },
              ].map((q) => (
                <li key={q.href}>
                  <Link
                    href={q.href}
                    className="flex h-full flex-col gap-3 rounded-3xl border border-border/70 bg-card p-4 transition-colors outline-none hover:border-primary/40 focus-visible:ring-4 focus-visible:ring-ring/30"
                  >
                    <q.icon className="size-5 text-teal" aria-hidden />
                    <span>
                      <span className="block text-sm font-semibold">{q.label}</span>
                      <span className="block text-sm text-muted-foreground">{q.value}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Card className="flex flex-col gap-4 bg-secondary sm:flex-row sm:items-center">
              <MessagesSquare className="size-6 shrink-0 text-primary" aria-hidden />
              <p className="flex-1 text-sm leading-relaxed">
                Have a question about subjects, streams or careers? Ask a moderated local guide, or try the Ask SeekhSetu
                helper in English or Hindi.
              </p>
              <div className="flex gap-2">
                <LinkButton href="/guides" variant="outline" size="sm">
                  Ask a guide
                </LinkButton>
                <LinkButton href="/ask" size="sm">
                  Ask SeekhSetu
                </LinkButton>
              </div>
            </Card>
          </div>
        )
      }}
    </StudentGate>
  )
}
