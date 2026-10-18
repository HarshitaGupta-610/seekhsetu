'use client'

import { ArrowLeft, ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Logo } from '@/components/shell/logo'
import { Button, Chip, Input, Label, ProgressBar } from '@/components/ui/kit'
import { useToast } from '@/components/ui/toast'
import { containsContactInfo, saveProfile } from '@/lib/actions'
import {
  CLASS_LEVELS,
  HELP_OPTIONS,
  INTEREST_OPTIONS,
  INTERNET_OPTIONS,
  PATHWAYS,
  SKILL_OPTIONS,
  SUBJECT_OPTIONS,
} from '@/lib/data/pathways'
import { useAppState } from '@/lib/store'
import type { ClassLevel, HelpGoal, InternetAccess, Language, PathwayId, Profile } from '@/lib/types'
import { cn } from '@/lib/utils'

const STEPS = ['About you', 'Interests', 'Subjects & skills', 'Goals']

function toggle<T>(list: T[], v: T) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v]
}

export function OnboardingFlow() {
  const state = useAppState()
  const router = useRouter()
  const toast = useToast()
  const [step, setStep] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const loadedRef = useRef(false)

  const [name, setName] = useState('')
  const [classLevel, setClassLevel] = useState<ClassLevel | ''>('')
  const [language, setLanguage] = useState<Language>('en')
  const [interests, setInterests] = useState<string[]>([])
  const [subjects, setSubjects] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [careerAreas, setCareerAreas] = useState<PathwayId[]>([])
  const [internet, setInternet] = useState<InternetAccess | null>(null)
  const [helpWith, setHelpWith] = useState<HelpGoal[]>([])

  useEffect(() => {
    if (!state || loadedRef.current) return
    loadedRef.current = true
    const p = state.profile
    if (!p) return
    setName(p.name)
    setClassLevel(p.classLevel)
    setLanguage(p.language)
    setInterests(p.interests)
    setSubjects(p.subjects)
    setSkills(p.skills)
    setCareerAreas(p.careerAreas)
    setInternet(p.internet)
    setHelpWith(p.helpWith)
  }, [state])

  useEffect(() => {
    headingRef.current?.focus()
  }, [step])

  function validate(): string | null {
    if (step === 0) {
      if (!name.trim()) return 'Please enter a first name or nickname.'
      if (name.trim().length > 30) return 'Please keep your name under 30 characters.'
      if (containsContactInfo(name)) return 'Please don’t include phone numbers, emails or social handles.'
      if (!classLevel) return 'Please choose your class or education level.'
    }
    if (step === 1 && interests.length === 0) return 'Pick at least one interest — you can change it later.'
    return null
  }

  function next() {
    const err = validate()
    setError(err)
    if (err) return
    if (step < STEPS.length - 1) {
      setStep(step + 1)
      return
    }
    const profile: Profile = {
      name: name.trim(),
      classLevel: classLevel as ClassLevel,
      language,
      interests,
      subjects,
      skills,
      careerAreas,
      internet,
      helpWith,
      createdAt: state?.profile?.createdAt ?? new Date().toISOString(),
    }
    const ok = saveProfile(profile)
    if (!ok) {
      toast('We couldn’t save on this device. Your browser storage may be full.', 'error')
      return
    }
    toast(state?.profile ? 'Profile updated.' : `Welcome to SeekhSetu, ${profile.name}!`)
    router.push(state?.discovery ? '/dashboard' : '/discover')
  }

  return (
    <div id="main" className="min-h-dvh px-4 py-6 md:py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <Logo href="/" />
          <span className="text-sm font-medium text-muted-foreground">
            Step {step + 1} of {STEPS.length}
          </span>
        </div>
        <ProgressBar value={((step + 1) / STEPS.length) * 100} label="Profile setup progress" />
        <ol className="mt-3 hidden grid-cols-4 gap-2 text-xs font-semibold text-muted-foreground sm:grid">
          {STEPS.map((s, i) => (
            <li key={s} className={cn(i <= step && 'text-primary')}>
              {s}
            </li>
          ))}
        </ol>

        <form
          className="mt-8 rounded-[2rem] bg-card p-6 shadow-sm md:p-8"
          onSubmit={(e) => {
            e.preventDefault()
            next()
          }}
          noValidate
        >
          {step === 0 && (
            <fieldset className="space-y-6">
              <legend className="contents">
                <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-semibold outline-none">
                  Let&apos;s get to know you
                </h1>
              </legend>
              <p className="flex items-start gap-2 rounded-2xl bg-accent/60 p-3 text-sm text-accent-foreground">
                <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
                We only ask for a first name or nickname. No phone number, birth date or address.
              </p>
              <div>
                <Label htmlFor="name">First name or nickname</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="given-name"
                  maxLength={30}
                  placeholder="e.g. Priya"
                  aria-invalid={!!error && !name.trim()}
                />
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold" id="class-label">
                  Class or education level
                </p>
                <div className="flex flex-wrap gap-2" role="group" aria-labelledby="class-label">
                  {CLASS_LEVELS.map((c) => (
                    <Chip key={c.value} selected={classLevel === c.value} onClick={() => setClassLevel(c.value)}>
                      {c.label}
                    </Chip>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold" id="lang-label">
                  Preferred language
                </p>
                <div className="flex flex-wrap gap-2" role="group" aria-labelledby="lang-label">
                  {(
                    [
                      ['en', 'English'],
                      ['hi', 'हिन्दी (Hindi)'],
                      ['other', 'Other'],
                    ] as [Language, string][]
                  ).map(([v, l]) => (
                    <Chip key={v} selected={language === v} onClick={() => setLanguage(v)}>
                      {l}
                    </Chip>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Lessons are in English for now. The Ask SeekhSetu helper can reply in Hindi.
                </p>
              </div>
            </fieldset>
          )}

          {step === 1 && (
            <fieldset className="space-y-6">
              <legend className="contents">
                <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-semibold outline-none">
                  What do you enjoy?
                </h1>
              </legend>
              <p className="text-muted-foreground">Choose as many as you like. There are no wrong answers.</p>
              <ChipGroup label="Interests" options={INTEREST_OPTIONS} value={interests} onToggle={(v) => setInterests(toggle(interests, v))} />
            </fieldset>
          )}

          {step === 2 && (
            <fieldset className="space-y-8">
              <legend className="contents">
                <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-semibold outline-none">
                  Subjects & skills
                </h1>
              </legend>
              <ChipGroup
                label="Favourite subjects (optional)"
                options={SUBJECT_OPTIONS}
                value={subjects}
                onToggle={(v) => setSubjects(toggle(subjects, v))}
              />
              <ChipGroup
                label="Skills you already have, even a little (optional)"
                options={SKILL_OPTIONS}
                value={skills}
                onToggle={(v) => setSkills(toggle(skills, v))}
              />
            </fieldset>
          )}

          {step === 3 && (
            <fieldset className="space-y-8">
              <legend className="contents">
                <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-semibold outline-none">
                  What would you like to explore?
                </h1>
              </legend>
              <div>
                <p className="mb-2 text-sm font-semibold" id="areas-label">
                  Career areas you&apos;re curious about (optional)
                </p>
                <div className="grid gap-2 sm:grid-cols-2" role="group" aria-labelledby="areas-label">
                  {PATHWAYS.map((p) => {
                    const selected = careerAreas.includes(p.id)
                    return (
                      <button
                        key={p.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setCareerAreas(toggle(careerAreas, p.id))}
                        className={cn(
                          'flex items-start gap-3 rounded-2xl border p-3 text-left transition-colors outline-none focus-visible:ring-4 focus-visible:ring-ring/30',
                          selected ? 'border-primary bg-accent/50' : 'border-input hover:bg-muted',
                        )}
                      >
                        <span
                          className={cn(
                            'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border',
                            selected ? 'border-primary bg-primary text-primary-foreground' : 'border-input',
                          )}
                        >
                          {selected && <Check className="size-3.5" aria-hidden />}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold">{p.name}</span>
                          <span className="block text-xs text-muted-foreground">{p.tagline}</span>
                        </span>
                      </button>
                    )
                  })}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Not sure? Skip this — the discovery activity will help.</p>
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold" id="net-label">
                  Internet access
                </p>
                <div className="grid gap-2 sm:grid-cols-3" role="radiogroup" aria-labelledby="net-label">
                  {INTERNET_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      role="radio"
                      aria-checked={internet === o.value}
                      onClick={() => setInternet(o.value)}
                      className={cn(
                        'rounded-2xl border p-3 text-left outline-none focus-visible:ring-4 focus-visible:ring-ring/30',
                        internet === o.value ? 'border-primary bg-accent/50' : 'border-input hover:bg-muted',
                      )}
                    >
                      <span className="block text-sm font-semibold">{o.label}</span>
                      <span className="block text-xs text-muted-foreground">{o.hint}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold" id="help-label">
                  What would you like help with?
                </p>
                <div className="flex flex-wrap gap-2" role="group" aria-labelledby="help-label">
                  {HELP_OPTIONS.map((h) => (
                    <Chip key={h.value} selected={helpWith.includes(h.value)} onClick={() => setHelpWith(toggle(helpWith, h.value))}>
                      {h.label}
                    </Chip>
                  ))}
                </div>
              </div>
            </fieldset>
          )}

          {error && (
            <p role="alert" className="mt-6 rounded-2xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
              {error}
            </p>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 0 ? (
              <Button variant="ghost" onClick={() => { setError(null); setStep(step - 1) }}>
                <ArrowLeft aria-hidden /> Back
              </Button>
            ) : (
              <span />
            )}
            <Button type="submit" size="lg">
              {step === STEPS.length - 1 ? (state?.profile ? 'Save changes' : 'Finish & discover') : 'Next'}
              <ArrowRight aria-hidden />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ChipGroup({
  label,
  options,
  value,
  onToggle,
}: {
  label: string
  options: string[]
  value: string[]
  onToggle: (v: string) => void
}) {
  const id = label.replace(/\W+/g, '-').toLowerCase()
  return (
    <div>
      <p className="mb-2 text-sm font-semibold" id={id}>
        {label}
      </p>
      <div className="flex flex-wrap gap-2" role="group" aria-labelledby={id}>
        {options.map((o) => (
          <Chip key={o} selected={value.includes(o)} onClick={() => onToggle(o)}>
            {value.includes(o) && <Check aria-hidden />}
            {o}
          </Chip>
        ))}
      </div>
    </div>
  )
}
