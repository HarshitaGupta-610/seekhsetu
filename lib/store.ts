'use client'

import { useSyncExternalStore } from 'react'
import { createSeedQuestions } from '@/lib/data/community'
import { createSeedOpportunities } from '@/lib/data/opportunities'
import type { AppState } from '@/lib/types'

const STORAGE_KEY = 'seekhsetu:v1'

export function createInitialState(): AppState {
  return {
    version: 1,
    profile: null,
    discovery: null,
    activePathway: null,
    roadmapDone: [],
    lessonsDone: [],
    plannerGoal: null,
    plannerDone: [],
    confidence: {},
    challenges: {},
    customChallenges: [],
    projects: {},
    saved: [],
    portfolio: [],
    questions: createSeedQuestions(),
    opportunities: createSeedOpportunities(),
    demoFeedback: {},
    chat: [],
    chatLang: 'en',
  }
}

let state: AppState | null = null
let storageError = false
const listeners = new Set<() => void>()

function load(): AppState {
  const fresh = createInitialState()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return fresh
    const parsed = JSON.parse(raw) as Partial<AppState>
    if (parsed.version !== 1) return fresh
    return { ...fresh, ...parsed }
  } catch {
    return fresh
  }
}

function persist(next: AppState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    storageError = false
  } catch {
    storageError = true
  }
}

function getSnapshot(): AppState {
  if (!state) state = load()
  return state
}

function getServerSnapshot(): AppState | null {
  return null
}

function emit() {
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      state = load()
      emit()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

/** Applies an update and persists it. Returns false if the browser refused to save (e.g. storage full). */
export function updateState(fn: (s: AppState) => AppState): boolean {
  state = fn(getSnapshot())
  persist(state)
  emit()
  return !storageError
}

export function resetState() {
  state = createInitialState()
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore — state is reset in memory regardless
  }
  persist(state)
  emit()
}

/** Returns null during server render and the first client render, then the persisted state. */
export function useAppState(): AppState | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
