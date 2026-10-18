'use client'

import { CHALLENGES, getProject } from '@/lib/data/activities'
import { getMilestones } from '@/lib/data/pathways'
import { getLesson } from '@/lib/data/lessons'
import { updateState } from '@/lib/store'
import type {
  AppState,
  Challenge,
  ChatMessage,
  DiscoveryResult,
  Opportunity,
  PathwayId,
  PortfolioEntry,
  Profile,
  ProjectRecord,
  Question,
  SavedType,
  VerificationStatus,
} from '@/lib/types'

export function uid(prefix = 'id') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

const nowIso = () => new Date().toISOString()

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

// ---------- Selectors ----------

export function allChallenges(s: AppState): Challenge[] {
  return [...CHALLENGES, ...s.customChallenges]
}

export function findChallenge(s: AppState, id: string) {
  return allChallenges(s).find((c) => c.id === id)
}

export function currentPathway(s: AppState): PathwayId {
  return s.activePathway ?? s.discovery?.top[0] ?? s.profile?.careerAreas[0] ?? 'digital'
}

export function isSaved(s: AppState, type: SavedType, id: string) {
  return s.saved.some((i) => i.type === type && i.id === id)
}

export function roadmapProgress(s: AppState, pathway: PathwayId) {
  const milestones = getMilestones(pathway)
  const done = milestones.filter((m) => s.roadmapDone.includes(m.id)).length
  return { milestones, done, total: milestones.length, pct: Math.round((done / milestones.length) * 100) }
}

export type StageId = 'discover' | 'learn' | 'practise' | 'showcase' | 'opportunities'

export function journeyStages(s: AppState): { id: StageId; label: string; done: boolean; href: string; hint: string }[] {
  const p = currentPathway(s)
  const completedChallenges = Object.values(s.challenges).some((c) => c.status === 'completed')
  const completedProjects = Object.values(s.projects).some((c) => c.status === 'completed')
  return [
    { id: 'discover', label: 'Discover', done: !!s.discovery, href: '/discover', hint: 'Find what interests you' },
    {
      id: 'learn',
      label: 'Learn',
      done: s.lessonsDone.length > 0 || s.roadmapDone.includes(`${p}:learn`),
      href: '/learn',
      hint: 'Finish a short lesson',
    },
    {
      id: 'practise',
      label: 'Practise',
      done: completedChallenges || completedProjects,
      href: '/challenges',
      hint: 'Complete a challenge',
    },
    { id: 'showcase', label: 'Showcase', done: s.portfolio.length > 0, href: '/passport', hint: 'Add to Skill Passport' },
    {
      id: 'opportunities',
      label: 'Explore Opportunities',
      done: s.saved.some((i) => i.type === 'opportunity') || s.roadmapDone.includes(`${p}:education`),
      href: '/opportunities',
      hint: 'Save an opportunity',
    },
  ]
}

// ---------- Profile & discovery ----------

export function saveProfile(profile: Profile) {
  return updateState((s) => ({
    ...s,
    profile,
    activePathway: s.activePathway ?? profile.careerAreas[0] ?? null,
  }))
}

export function setProfileLanguage(language: Profile['language']) {
  return updateState((s) => ({
    ...s,
    profile: s.profile ? { ...s.profile, language } : s.profile,
    chatLang: language === 'hi' || language === 'bn' ? language : 'en',
  }))
}

export function saveDiscovery(result: DiscoveryResult) {
  return updateState((s) => ({ ...s, discovery: result, activePathway: result.top[0] }))
}

export function setActivePathway(id: PathwayId) {
  return updateState((s) => ({ ...s, activePathway: id }))
}

// ---------- Roadmap & lessons ----------

export function toggleMilestone(id: string) {
  return updateState((s) => ({ ...s, roadmapDone: toggle(s.roadmapDone, id) }))
}

export function toggleLessonDone(id: string) {
  return updateState((s) => ({ ...s, lessonsDone: toggle(s.lessonsDone, id) }))
}

// ---------- Planner ----------

export function setPlannerGoal(id: PathwayId) {
  return updateState((s) => ({ ...s, plannerGoal: id }))
}

export function togglePlannerAction(id: string) {
  return updateState((s) => ({ ...s, plannerDone: toggle(s.plannerDone, id) }))
}

export function setConfidence(skillId: string, value: number) {
  return updateState((s) => ({ ...s, confidence: { ...s.confidence, [skillId]: value } }))
}

// ---------- Saved ----------

export function toggleSaved(type: SavedType, id: string) {
  return updateState((s) => {
    const exists = s.saved.some((i) => i.type === type && i.id === id)
    return {
      ...s,
      saved: exists
        ? s.saved.filter((i) => !(i.type === type && i.id === id))
        : [...s.saved, { type, id, savedAt: nowIso() }],
    }
  })
}

// ---------- Challenges ----------

export function saveChallengeDraft(id: string, text: string, photo?: string) {
  return updateState((s) => {
    const prev = s.challenges[id]
    return {
      ...s,
      challenges: {
        ...s.challenges,
        [id]: { ...prev, status: prev?.status === 'completed' ? 'completed' : 'draft', text, photo, updatedAt: nowIso() },
      },
    }
  })
}

export function completeChallenge(id: string, text: string, photo?: string) {
  return updateState((s) => ({
    ...s,
    challenges: {
      ...s.challenges,
      [id]: { ...s.challenges[id], status: 'completed', text, photo, updatedAt: nowIso(), completedAt: nowIso() },
    },
  }))
}

export function reopenChallenge(id: string) {
  return updateState((s) => {
    const prev = s.challenges[id]
    if (!prev) return s
    return { ...s, challenges: { ...s.challenges, [id]: { ...prev, status: 'draft', completedAt: undefined } } }
  })
}

export function addCustomChallenge(c: Omit<Challenge, 'id' | 'custom'>) {
  return updateState((s) => ({ ...s, customChallenges: [...s.customChallenges, { ...c, id: uid('ch'), custom: true }] }))
}

// ---------- Projects ----------

export function setProjectStatus(id: string, status: ProjectRecord['status']) {
  return updateState((s) => {
    const prev = s.projects[id]
    return {
      ...s,
      projects: {
        ...s.projects,
        [id]: { ...{ stepsDone: [], notes: '', outcome: '' }, ...prev, status, updatedAt: nowIso() },
      },
    }
  })
}

export function removeProject(id: string) {
  return updateState((s) => {
    const next = { ...s.projects }
    delete next[id]
    return { ...s, projects: next }
  })
}

export function toggleProjectStep(id: string, step: number) {
  return updateState((s) => {
    const prev = s.projects[id] ?? { status: 'started' as const, stepsDone: [], notes: '', outcome: '', updatedAt: nowIso() }
    const stepsDone = prev.stepsDone.includes(step) ? prev.stepsDone.filter((x) => x !== step) : [...prev.stepsDone, step]
    return {
      ...s,
      projects: {
        ...s.projects,
        [id]: { ...prev, status: prev.status === 'saved' ? 'started' : prev.status, stepsDone, updatedAt: nowIso() },
      },
    }
  })
}

export function updateProjectNotes(id: string, notes: string, outcome: string) {
  return updateState((s) => {
    const prev = s.projects[id] ?? { status: 'started' as const, stepsDone: [], notes: '', outcome: '', updatedAt: nowIso() }
    return { ...s, projects: { ...s.projects, [id]: { ...prev, notes, outcome, updatedAt: nowIso() } } }
  })
}

export function setFeedback(kind: 'challenge' | 'project', id: string, feedback: string) {
  return updateState((s) => {
    if (kind === 'challenge' && s.challenges[id]) {
      return { ...s, challenges: { ...s.challenges, [id]: { ...s.challenges[id], feedback } } }
    }
    if (kind === 'project' && s.projects[id]) {
      return { ...s, projects: { ...s.projects, [id]: { ...s.projects[id], feedback } } }
    }
    return s
  })
}

// ---------- Portfolio ----------

export function addPortfolioFromChallenge(s: AppState, id: string) {
  const c = findChallenge(s, id)
  const rec = s.challenges[id]
  if (!c || !rec) return false
  return addPortfolioEntry({
    kind: 'challenge',
    refId: id,
    title: c.title,
    description: c.summary,
    evidence: rec.text,
    photo: rec.photo,
    badge: c.badge,
    skills: c.skills,
    visibleInShare: true,
  })
}

export function addPortfolioFromProject(s: AppState, id: string) {
  const p = getProject(id)
  const rec = s.projects[id]
  if (!p || !rec) return false
  const evidence = [rec.notes, rec.outcome ? `Result I recorded: ${rec.outcome}` : ''].filter(Boolean).join('\n\n')
  return addPortfolioEntry({
    kind: 'project',
    refId: id,
    title: p.title,
    description: p.goal,
    evidence,
    badge: 'Project Finisher',
    skills: p.skills,
    visibleInShare: true,
  })
}

export function addPortfolioFromLesson(id: string) {
  const l = getLesson(id)
  if (!l) return false
  return addPortfolioEntry({
    kind: 'lesson',
    refId: id,
    title: `Lesson: ${l.title}`,
    description: l.summary,
    evidence: '',
    skills: [],
    visibleInShare: true,
  })
}

export function addPortfolioEntry(entry: Omit<PortfolioEntry, 'id' | 'date'>) {
  return updateState((s) => ({ ...s, portfolio: [{ ...entry, id: uid('pf'), date: nowIso() }, ...s.portfolio] }))
}

export function updatePortfolioEntry(id: string, patch: Partial<PortfolioEntry>) {
  return updateState((s) => ({ ...s, portfolio: s.portfolio.map((p) => (p.id === id ? { ...p, ...patch } : p)) }))
}

export function deletePortfolioEntry(id: string) {
  return updateState((s) => ({ ...s, portfolio: s.portfolio.filter((p) => p.id !== id) }))
}

export function isInPortfolio(s: AppState, kind: PortfolioEntry['kind'], refId: string) {
  return s.portfolio.some((p) => p.kind === kind && p.refId === refId)
}

// ---------- Opportunities ----------

export function addOpportunity(o: Omit<Opportunity, 'id' | 'status' | 'addedBy'>) {
  return updateState((s) => ({
    ...s,
    opportunities: [{ ...o, id: uid('opp'), status: 'needs-review', addedBy: 'facilitator' }, ...s.opportunities],
  }))
}

export function setOpportunityStatus(id: string, status: VerificationStatus) {
  return updateState((s) => ({ ...s, opportunities: s.opportunities.map((o) => (o.id === id ? { ...o, status } : o)) }))
}

export function deleteOpportunity(id: string) {
  return updateState((s) => ({
    ...s,
    opportunities: s.opportunities.filter((o) => o.id !== id),
    saved: s.saved.filter((i) => !(i.type === 'opportunity' && i.id === id)),
  }))
}

// ---------- Q&A ----------

export function postQuestion(q: Pick<Question, 'topic' | 'text' | 'author'>) {
  return updateState((s) => ({
    ...s,
    questions: [
      { ...q, id: uid('q'), createdAt: nowIso(), answers: [], reported: false, removed: false, mine: true },
      ...s.questions,
    ],
  }))
}

export function reportQuestion(id: string) {
  return updateState((s) => ({ ...s, questions: s.questions.map((q) => (q.id === id ? { ...q, reported: true } : q)) }))
}

export function moderateQuestion(id: string, action: 'restore' | 'remove') {
  return updateState((s) => ({
    ...s,
    questions: s.questions.map((q) =>
      q.id === id ? { ...q, reported: false, removed: action === 'remove' } : q,
    ),
  }))
}

export function answerQuestion(id: string, text: string) {
  return updateState((s) => ({
    ...s,
    questions: s.questions.map((q) =>
      q.id === id
        ? {
            ...q,
            answers: [...q.answers, { id: uid('a'), guide: 'Facilitator (this device)', role: 'Local facilitator', text }],
          }
        : q,
    ),
  }))
}

// ---------- Chat ----------

export function appendChat(messages: ChatMessage[]) {
  return updateState((s) => ({ ...s, chat: [...s.chat, ...messages].slice(-60) }))
}

export function clearChat() {
  return updateState((s) => ({ ...s, chat: [] }))
}

export function setChatLang(lang: 'en' | 'hi' | 'bn') {
  return updateState((s) => ({ ...s, chatLang: lang }))
}

// ---------- Safety ----------

const CONTACT_PATTERNS = [/\b\d{10}\b/, /\+?\d[\d\s-]{8,}\d/, /[\w.+-]+@[\w-]+\.[\w.]+/, /\b(instagram|whatsapp|snapchat|telegram)\b/i]

/** Basic guard so students don't post phone numbers, emails or social handles in shared spaces. */
export function containsContactInfo(text: string) {
  return CONTACT_PATTERNS.some((re) => re.test(text))
}
