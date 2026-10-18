'use client'

import { useState } from 'react'
import { Check, RotateCcw } from 'lucide-react'
import { PageHeader, Card, Button, Input, Label, Tag } from '@/components/ui/kit'
import { useAppState, resetState } from '@/lib/store'
import { setProfileLanguage } from '@/lib/actions'

export default function ProfilePage() {
  const state = useAppState()
  const [name, setName] = useState(state?.profile?.name ?? '')
  const language = state?.profile?.language ?? state?.chatLang ?? 'en'
  return <div><PageHeader eyebrow="Your space" title="Profile & settings" description="Keep your learning preferences up to date. Your progress is stored locally on this device." /><div className="grid gap-5 md:grid-cols-[1fr_0.8fr]"><Card><h2 className="text-xl font-semibold">Learner profile</h2><p className="mt-2 text-sm text-muted-foreground">Only add details you are comfortable keeping on this device.</p><div className="mt-6"><Label htmlFor="name">Name or nickname</Label><Input id="name" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => state?.profile && undefined} placeholder="Your name" /></div><div className="mt-5"><Label>Preferred language</Label><div className="mt-2 flex flex-wrap gap-2">{(['en', 'hi', 'bn'] as const).map((lang) => <Button key={lang} variant={language === lang ? 'primary' : 'outline'} size="sm" onClick={() => setProfileLanguage(lang)}>{lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी' : 'বাংলা'}{language === lang && <Check aria-hidden />}</Button>)}</div></div></Card><Card><Tag tone="teal">Privacy first</Tag><h2 className="mt-4 text-xl font-semibold">Manage your data</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">You can clear all local progress at any time. This cannot be undone.</p><Button className="mt-5" variant="danger" onClick={() => { if (window.confirm('Clear all progress on this device?')) resetState() }}><RotateCcw aria-hidden />Clear local progress</Button></Card></div></div>
}
