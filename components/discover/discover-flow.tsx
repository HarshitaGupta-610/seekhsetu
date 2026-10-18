'use client'

import { ArrowLeft, ArrowRight, Lightbulb, RotateCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { StudentGate } from '@/components/journey/student-gate'
import { Button, Card, PageHeader, ProgressBar, Tag } from '@/components/ui/kit'
import { useToast } from '@/components/ui/toast'
import { saveDiscovery, setActivePathway } from '@/lib/actions'
import { DISCOVERY_QUESTIONS } from '@/lib/data/discovery'
import { PATHWAYS, getPathway } from '@/lib/data/pathways'
import type { AppState, DiscoveryResult, PathwayId } from '@/lib/types'
import { cn } from '@/lib/utils'

function score(answers: Record<string, string>, profile: AppState['profile']): DiscoveryResult {
  const scores = Object.fromEntries(PATHWAYS.map((p) => [p.id, 0])) as Record<PathwayId, number>
  let learningStyle: string | null = null
  for (const q of DISCOVERY_QUESTIONS) {
    const opt = q.options.find((o) => o.id === answers[q.id])
    if (!opt) continue
    if (opt.pathway) scores[opt.pathway] += 2
    if (opt.style) learningStyle = opt.style
  }
  profile?.careerAreas.forEach((id) => (scores[id] += 1))
  const top = (Object.keys(scores) as PathwayId[]).sort((a, b) => scores[b] - scores[a]).slice(0, 3)
  return { answers, scores, top, learningStyle, completedAt: new Date().toISOString() }
}

export function DiscoverFlow() {
  return <StudentGate>{(s) => <DiscoverInner state={s} />}</StudentGate>
}

function DiscoverInner({ state }: { state: AppState }) {
  const [retaking, setRetaking] = useState(!state.discovery)
  if (state.discovery && !retaking) return <Results state={state} onRetake={() => setRetaking(true)} />
  return <Quiz state={state} onDone={() => setRetaking(false)} />
}

function Quiz({ state, onDone }: { state: AppState; onDone: () => void }) {
  const toast = useToast()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const headingRef = useRef<HTMLHeadingElement>(null)
  const q = DISCOVERY_QUESTIONS[index]
  const total = DISCOVERY_QUESTIONS.length
  const selected = answers[q.id]

  useEffect(() => {
    if (index > 0) headingRef.current?.focus()
  }, [index])

  function next() {
    if (!selected) return
    if (index < total - 1) {
      setIndex(index + 1)
      return
    }
    const ok = saveDiscovery(score(answers, state.profile))
    if (!ok) toast('We couldn’t save your results on this device.', 'error')
    onDone()
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        eyebrow="Interest discovery"
        title="What sparks your curiosity?"
        description="This is not a test. Pick the answer that feels most like you right now — interests can change, and that's okay."
      />
      <div className="mb-3 flex items-center justify-between text-sm font-medium text-muted-foreground">
        <span>
          Question {index + 1} of {total}
        </span>
        <span>About 3 minutes</span>
      </div>
      <ProgressBar value={((index + (selected ? 1 : 0)) / total) * 100} label="Discovery progress" />

      <Card className="mt-6">
        <fieldset>
          <legend className="contents">
            <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold text-balance outline-none">
              {q.prompt}
            </h2>
          </legend>
          {q.helper && <p className="mt-2 text-sm text-muted-foreground">{q.helper}</p>}
          <div className="mt-6 grid gap-2.5" role="radiogroup" aria-label={q.prompt}>
            {q.options.map((o) => {
              const active = selected === o.id
              return (
                <button
                  key={o.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setAnswers({ ...answers, [q.id]: o.id })}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-base transition-colors outline-none focus-visible:ring-4 focus-visible:ring-ring/30',
                    active ? 'border-primary bg-accent/60 font-semibold' : 'border-input hover:bg-muted',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-5 shrink-0 items-center justify-center rounded-full border-2',
                      active ? 'border-primary' : 'border-input',
                    )}
                    aria-hidden
                  >
                    {active && <span className="size-2.5 rounded-full bg-primary" />}
                  </span>
                  {o.label}
                </button>
              )
            })}
          </div>
        </fieldset>
        <div className="mt-8 flex items-center justify-between">
          {index > 0 ? (
            <Button variant="ghost" onClick={() => setIndex(index - 1)}>
              <ArrowLeft aria-hidden /> Back
            </Button>
          ) : (
            <span />
          )}
          <Button size="lg" onClick={next} disabled={!selected}>
            {index === total - 1 ? 'See my results' : 'Next'} <ArrowRight aria-hidden />
          </Button>
        </div>
      </Card>
    </div>
  )
}

function Results({ state, onRetake }: { state: AppState; onRetake: () => void }) {
  const router = useRouter()
  const d = state.discovery!
  const max = Math.max(...Object.values(d.scores), 1)

  return (
    <div>
      <PageHeader
        eyebrow="Your discovery results"
        title="Areas you might enjoy exploring"
        description="These are starting points, not labels. Try one for a week and see how it feels."
        actions={
          <Button variant="outline" onClick={onRetake}>
            <RotateCcw aria-hidden /> Retake
          </Button>
        }
      />

      <ol className="grid gap-4 md:grid-cols-3">
        {d.top.map((id, i) => {
          const p = getPathway(id)
          return (
            <li key={id}>
              <Card className={cn('flex h-full flex-col', i === 0 && 'border-teal ring-2 ring-teal/20')}>
                <div className="flex items-center justify-between">
                  <Tag tone={i === 0 ? 'teal' : 'blue'}>{i === 0 ? 'Strongest match' : `Also try #${i + 1}`}</Tag>
                </div>
                <h2 className="mt-4 text-2xl font-semibold">{p.theme}</h2>
                <p className="mt-1 text-sm font-semibold text-primary">{p.name}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.themeDescription}</p>
                <div className="mt-4">
                  <ProgressBar value={(d.scores[id] / max) * 100} label={`${p.name} match`} />
                </div>
                <Button
                  className="mt-5"
                  variant={i === 0 ? 'primary' : 'outline'}
                  onClick={() => {
                    setActivePathway(id)
                    router.push('/roadmap')
                  }}
                >
                  Explore this pathway <ArrowRight aria-hidden />
                </Button>
              </Card>
            </li>
          )
        })}
      </ol>

      {d.learningStyle && (
        <Card className="mt-6 flex items-start gap-4 bg-secondary">
          <Lightbulb className="mt-0.5 size-6 shrink-0 text-primary" aria-hidden />
          <div>
            <h2 className="font-semibold">How you like to learn</h2>
            <p className="mt-1 text-sm leading-relaxed">
              {d.learningStyle}. We&apos;ll point you to activities that fit — but it&apos;s good to try other ways too.
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
