'use client'

import { useMemo, useState } from 'react'
import { Bookmark, CheckCircle2, ExternalLink, MessageCircle, Plus, Search, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { PageHeader, Card, Button, Input, Textarea, Tag, EmptyState } from '@/components/ui/kit'
import { useAppState } from '@/lib/store'
import { postQuestion, toggleSaved } from '@/lib/actions'

const COPY = {
  en: { save: 'Save', saved: 'Saved', search: 'Search', add: 'Add question', submit: 'Publish question', empty: 'Nothing here yet', emptyText: 'Try another search or add your first item.' },
  hi: { save: 'सहेजें', saved: 'सहेजा गया', search: 'खोजें', add: 'सवाल जोड़ें', submit: 'सवाल प्रकाशित करें', empty: 'अभी कुछ नहीं', emptyText: 'दूसरी खोज करें या अपना पहला आइटम जोड़ें।' },
  bn: { save: 'সংরক্ষণ', saved: 'সংরক্ষিত', search: 'খুঁজুন', add: 'প্রশ্ন যোগ করুন', submit: 'প্রশ্ন প্রকাশ করুন', empty: 'এখনও কিছু নেই', emptyText: 'অন্য কিছু খুঁজুন বা প্রথম আইটেম যোগ করুন।' },
} as const

type HubItem = { id: string; title: string; description: string; meta: string; href?: string }

export function FeatureHub({ kind, title, description, items }: { kind: 'opportunities' | 'saved' | 'guides' | 'skills'; title: string; description: string; items: HubItem[] }) {
  const state = useAppState()
  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [question, setQuestion] = useState('')
  const lang = state?.chatLang ?? 'en'
  const copy = COPY[lang]
  const visible = useMemo(() => items.filter((item) => `${item.title} ${item.description} ${item.meta}`.toLowerCase().includes(query.toLowerCase())), [items, query])

  function submitQuestion() {
    if (!question.trim()) return
    postQuestion({ topic: 'General guidance', text: question.trim(), author: 'You' })
    setQuestion('')
    setShowForm(false)
  }

  return (
    <div>
      <PageHeader eyebrow="SeekhSetu" title={title} description={description} actions={kind === 'guides' ? <Button onClick={() => setShowForm((v) => !v)}><Plus aria-hidden />{copy.add}</Button> : undefined} />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1"><Search className="absolute top-3.5 left-4 size-4 text-muted-foreground" aria-hidden /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`${copy.search}...`} className="pl-10" aria-label={copy.search} /></div>
      </div>
      {showForm && <Card className="mb-6"><label htmlFor="question" className="mb-2 block text-sm font-semibold">What would you like to ask?</label><Textarea id="question" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Write a clear question for the community" /><div className="mt-3 flex justify-end"><Button onClick={submitQuestion} disabled={!question.trim()}>{copy.submit}</Button></div></Card>}
      {visible.length === 0 ? <EmptyState icon={<Sparkles />} title={copy.empty} description={copy.emptyText} /> : <div className="grid gap-4 md:grid-cols-2">{visible.map((item) => { const saved = state ? state.saved.some((s) => s.id === item.id && s.type === (kind === 'opportunities' ? 'opportunity' : 'lesson')) : false; return <Card key={item.id} className="flex flex-col"><div className="flex items-start justify-between gap-3"><Tag tone="teal">{item.meta}</Tag>{kind !== 'guides' && <Button variant="ghost" size="sm" aria-label={`${saved ? copy.saved : copy.save} ${item.title}`} onClick={() => toggleSaved(kind === 'opportunities' ? 'opportunity' : 'lesson', item.id)}><Bookmark aria-hidden fill={saved ? 'currentColor' : 'none'} />{saved ? copy.saved : copy.save}</Button>}</div><h2 className="mt-4 text-xl font-semibold">{item.title}</h2><p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>{item.href && <Link href={item.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Explore <ExternalLink aria-hidden /></Link>}</Card>})}</div>}
    </div>
  )
}

export function SavedOverview() {
  const state = useAppState()
  const saved = state?.saved ?? []
  return <FeatureHub kind="saved" title="Saved for later" description="Keep the lessons and opportunities you want to return to." items={saved.map((item) => ({ id: item.id, title: item.id.replaceAll('-', ' '), description: 'Saved in your personal learning list. Open the original section to continue.', meta: item.type, href: item.type === 'opportunity' ? '/opportunities' : '/learn' }))} />
}

export function GuidesOverview() {
  const items = [{ id: 'guide-1', title: 'Ask about choosing a first project', description: 'Get practical, encouraging guidance from the SeekhSetu learning community.', meta: 'Community guide' }, { id: 'guide-2', title: 'How do I build a routine?', description: 'Start with one small practice session and reflect on what helped you continue.', meta: 'Study habits' }]
  return <FeatureHub kind="guides" title="Ask a Local Guide" description="Questions are saved on this device so you can revisit the advice later." items={items} />
}
