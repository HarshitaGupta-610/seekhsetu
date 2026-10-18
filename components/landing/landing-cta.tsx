'use client'

import { ArrowRight } from 'lucide-react'
import { LinkButton } from '@/components/ui/kit'
import { useAppState } from '@/lib/store'

export function LandingCta() {
  const state = useAppState()
  const hasProfile = !!state?.profile

  return (
    <div className="flex flex-wrap gap-3">
      {hasProfile ? (
        <LinkButton href="/dashboard" size="lg">
          Continue your journey, {state?.profile?.name}
          <ArrowRight aria-hidden />
        </LinkButton>
      ) : (
        <LinkButton href="/onboarding" size="lg">
          Start with what interests you
          <ArrowRight aria-hidden />
        </LinkButton>
      )}
      <LinkButton href="/opportunities" variant="outline" size="lg">
        Browse opportunities
      </LinkButton>
    </div>
  )
}
