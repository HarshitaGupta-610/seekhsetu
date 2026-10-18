'use client'

import { PageHeader, Card, EmptyState, Tag } from '@/components/ui/kit'
import { useAppState } from '@/lib/store'
import { IdCard } from 'lucide-react'

export default function PassportPage() {
  const state = useAppState()
  const entries = state?.portfolio ?? []
  return <div><PageHeader eyebrow="Your evidence" title="Skill Passport" description="A private record of lessons, challenges, and projects you have practised." />{entries.length === 0 ? <EmptyState icon={<IdCard />} title="Your passport is ready" description="Complete a lesson or challenge, then add it here as evidence of your practice." /> : <div className="grid gap-4 md:grid-cols-2">{entries.map((entry) => <Card key={entry.id}><div className="flex items-center justify-between gap-3"><Tag tone="teal">{entry.kind}</Tag><span className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</span></div><h2 className="mt-4 text-xl font-semibold">{entry.title}</h2><p className="mt-2 text-sm text-muted-foreground">{entry.description}</p>{entry.evidence && <p className="mt-4 rounded-2xl bg-muted p-3 text-sm leading-relaxed">{entry.evidence}</p>}</Card>)}</div>}</div>
}
