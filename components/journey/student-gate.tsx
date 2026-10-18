'use client'

import { Sprout } from 'lucide-react'
import type { ReactNode } from 'react'
import { EmptyState, LinkButton, PageLoading } from '@/components/ui/kit'
import { useAppState } from '@/lib/store'
import type { AppState, Profile } from '@/lib/types'

/** Waits for local data to load, and asks the student to set up a profile first if they haven't. */
export function StudentGate({
  children,
  requireProfile = true,
}: {
  children: (state: AppState & { profile: Profile | null }) => ReactNode
  requireProfile?: boolean
}) {
  const state = useAppState()
  if (!state) return <PageLoading />
  if (requireProfile && !state.profile) {
    return (
      <EmptyState
        icon={<Sprout />}
        title="Start with what interests you"
        description="Set up your SeekhSetu profile in about two minutes. It stays on this device and you can change it any time."
        action={<LinkButton href="/onboarding">Set up my profile</LinkButton>}
      />
    )
  }
  return <>{children(state)}</>
}
