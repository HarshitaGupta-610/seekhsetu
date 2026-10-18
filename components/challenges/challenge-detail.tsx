'use client'

import { ArrowLeft, Award, Clock, IdCard, MessageSquareText, PencilLine, Save, Wallet } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { PhotoField } from '@/components/journey/photo-field'
import { SaveButton } from '@/components/journey/save-button'
import { StudentGate } from '@/components/journey/student-gate'
import { Button, Card, EmptyState, Label, LinkButton, Tag, Textarea } from '@/components/ui/kit'
import { useToast } from '@/components/ui/toast'
import {
  addPortfolioFromChallenge,
  completeChallenge,
  findChallenge,
  isInPortfolio,
  reopenChallenge,
  saveChallengeDraft,
} from '@/lib/actions'
import { getPathway } from '@/lib/data/pathways'
import type { AppState, Challenge } from '@/lib/types'

export function ChallengeDetail({ id }: { id: string }) {
  return (
    <StudentGate>
      {(s) => {
        const c = findChallenge(s, id)
        if (!c)
          return (
            <EmptyState
              icon={<Award aria-hidden />}
              title="Challenge not found"
              description="It may have been removed, or demo data was reset on this device."
              action={<LinkButton href="/challenges">See all challenges</LinkButton>}
            />
          )
        return <Inner key={id} state={s} c={c} />
      }}
    </StudentGate>
  )
}

function Inner({ state, c }: { state: AppState; c: Challenge }) {
  const toast = useToast()
  const rec = state.challenges[c.id]
  const [text, setText] = useState(rec?.text ?? '')
  const [photo, setPhoto] = useState<string | undefined>(rec?.photo)
  const [justDone, setJustDone] = useState(false)
  const completed = rec?.status === 'completed'
  const inPassport = isInPortfolio(state, 'challenge', c.id)
  const dirty = text !== (rec?.text ?? '') || photo !== rec?.photo

  return (
    <div>
      <Link href="/challenges" className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
        <ArrowLeft className="size-4" aria-hidden /> All challenges
      </Link>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="blue">{getPathway(c.pathway).name}</Tag>
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="size-4" aria-hidden /> {c.time}
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold text-balance md:text-4xl">{c.title}</h1>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{c.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {c.skills.map((k) => (
                <Tag key={k} tone="teal">
                  {k}
                </Tag>
              ))}
            </div>
          </div>

          <Card>
            <h2 className="text-xl font-semibold">Instructions</h2>
            <ol className="mt-4 space-y-3">
              {c.instructions.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <h2 className="font-semibold">Materials</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                {c.materials.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </Card>
            <Card className="bg-accent/50">
              <h2 className="flex items-center gap-2 font-semibold">
                <Wallet className="size-4" aria-hidden /> Low-cost alternatives
              </h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                {c.lowCost.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        <aside className="lg:col-span-2">
          <Card className="lg:sticky lg:top-6">
            {completed ? (
              <div className={justDone ? 'animate-pop' : undefined}>
                <div className="flex items-center gap-3">
                  <span className="flex size-14 items-center justify-center rounded-full bg-warning text-warning-foreground">
                    <Award className="size-7" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-teal uppercase">SeekhSetu badge earned</p>
                    <p className="text-lg font-semibold">{c.badge}</p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Completed {new Date(rec!.completedAt ?? rec!.updatedAt).toLocaleDateString()}. This is a practice badge, not an
                  official certificate.
                </p>
                {rec!.text && <p className="mt-4 rounded-2xl bg-muted p-3 text-sm leading-relaxed whitespace-pre-wrap">{rec!.text}</p>}
                {rec!.photo && (
                  // eslint-disable-next-line @next/next/no-img-element -- local data URL
                  <img src={rec!.photo} alt="Your evidence photo" className="mt-3 max-h-56 rounded-2xl border border-border" />
                )}
                {rec!.feedback && (
                  <p className="mt-4 flex gap-2 rounded-2xl bg-secondary p-3 text-sm">
                    <MessageSquareText className="mt-0.5 size-4 shrink-0" aria-hidden />
                    <span>
                      <span className="font-semibold">Facilitator feedback: </span>
                      {rec!.feedback}
                    </span>
                  </p>
                )}
                <div className="mt-5 flex flex-wrap gap-2">
                  {inPassport ? (
                    <LinkButton href="/passport" variant="secondary">
                      <IdCard aria-hidden /> View in Skill Passport
                    </LinkButton>
                  ) : (
                    <Button
                      onClick={() => {
                        if (addPortfolioFromChallenge(state, c.id)) toast('Added to your Skill Passport.')
                      }}
                    >
                      <IdCard aria-hidden /> Add to Skill Passport
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => {
                      reopenChallenge(c.id)
                      setJustDone(false)
                    }}
                  >
                    <PencilLine aria-hidden /> Edit submission
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!text.trim() && !photo) {
                    toast('Add a short note or a photo about what you did first.', 'error')
                    return
                  }
                  if (completeChallenge(c.id, text.trim(), photo)) {
                    setJustDone(true)
                    toast(`Badge earned: ${c.badge}`)
                  } else toast('Couldn’t save — your browser storage may be full. Try removing the photo.', 'error')
                }}
              >
                <h2 className="text-xl font-semibold">Your work</h2>
                {rec?.status === 'draft' && (
                  <p className="mt-1 text-xs text-muted-foreground">Draft saved {new Date(rec.updatedAt).toLocaleString()}</p>
                )}
                <div className="mt-4">
                  <Label htmlFor="evidence">What did you do and learn?</Label>
                  <Textarea
                    id="evidence"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={1500}
                    placeholder="e.g. I made a poster about… The hardest part was… Next time I would…"
                  />
                </div>
                <div className="mt-4">
                  <PhotoField value={photo} onChange={setPhoto} />
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Button type="submit">
                    <Award aria-hidden /> Complete challenge
                  </Button>
                  <Button
                    variant="outline"
                    disabled={!dirty}
                    onClick={() => {
                      if (saveChallengeDraft(c.id, text, photo)) toast('Draft saved on this device.')
                      else toast('Couldn’t save — try removing the photo.', 'error')
                    }}
                  >
                    <Save aria-hidden /> Save draft
                  </Button>
                </div>
              </form>
            )}
            <div className="mt-4 border-t border-border pt-4">
              <SaveButton state={state} type="challenge" id={c.id} title={c.title} />
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}
