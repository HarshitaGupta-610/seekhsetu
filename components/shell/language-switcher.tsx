'use client'

import { Languages } from 'lucide-react'
import { setProfileLanguage } from '@/lib/actions'
import { useAppState } from '@/lib/store'
import type { Language } from '@/lib/types'

const OPTIONS: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'bn', label: 'বাংলা' },
]

export function LanguageSwitcher() {
  const state = useAppState()
  const selected = state?.profile?.language ?? state?.chatLang ?? 'en'

  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-semibold">
      <Languages className="size-4 text-primary" aria-hidden />
      <span className="sr-only">Language</span>
      <select
        value={selected}
        onChange={(event) => setProfileLanguage(event.target.value as Language)}
        className="bg-transparent outline-none"
        aria-label="Language"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  )
}
