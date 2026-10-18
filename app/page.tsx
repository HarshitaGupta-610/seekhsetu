import { BookOpen, Compass, Hammer, IdCard, Search, ShieldCheck, WifiOff, Languages, School } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { LandingCta } from '@/components/landing/landing-cta'
import { Logo } from '@/components/shell/logo'
import { Card } from '@/components/ui/kit'

const STEPS = [
  { icon: Compass, title: 'Discover', text: 'A short, friendly activity to notice what you enjoy. Not an exam.' },
  { icon: BookOpen, title: 'Learn', text: 'Bite-sized lessons on foundational skills that work on any phone.' },
  { icon: Hammer, title: 'Practise', text: 'One Skill, One Week challenges using low-cost materials.' },
  { icon: IdCard, title: 'Showcase', text: 'Keep a private Skill Passport of what you have practised.' },
  { icon: Search, title: 'Explore opportunities', text: 'Find workshops, competitions and learning programmes.' },
]

const PROMISES = [
  { icon: ShieldCheck, title: 'Private by default', text: 'No birth dates, phone numbers or exact location. Your data stays on this device.' },
  { icon: WifiOff, title: 'Light on data', text: 'Pages are small and you can save lessons and challenges for later.' },
  { icon: Languages, title: 'English & Hindi helper', text: 'Ask SeekhSetu questions by typing or speaking, where supported.' },
  { icon: School, title: 'Teachers included', text: 'A facilitator view to share opportunities and give feedback.' },
]

export default function LandingPage() {
  return (
    <div id="main" className="min-h-dvh">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-8">
        <Logo href="/" />
        <nav aria-label="Landing" className="flex items-center gap-1 text-sm font-semibold">
          <Link href="/facilitator" className="hidden rounded-full px-4 py-2 hover:bg-muted sm:inline-flex">
            For teachers
          </Link>
          <Link href="/dashboard" className="rounded-full px-4 py-2 hover:bg-muted">
            Open app
          </Link>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-6 pb-16 md:grid-cols-2 md:px-8 md:pt-12">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
              For students from Class 9 onwards
            </p>
            <h1 className="text-4xl leading-[1.08] font-semibold md:text-6xl">
              Small steps can open new <span className="text-teal italic">paths.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
              SeekhSetu is your learning bridge. Start with what interests you, try small practical challenges, and build
              a record of what you&apos;ve practised — without having to choose a career today.
            </p>
            <div className="mt-8">
              <LandingCta />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Free learning companion · Your progress stays on this device</p>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] bg-secondary">
              <Image
                src="/images/hero-students.png"
                alt="Illustration of three students crossing a bridge carrying a sketchbook, a seedling and a cardboard model"
                width={1024}
                height={1024}
                priority
                className="aspect-square h-auto w-full object-cover"
              />
            </div>
            <Card className="absolute -bottom-6 left-4 max-w-[15rem] p-4 md:-left-6">
              <p className="text-sm font-semibold">Try it, learn from it, build on it.</p>
              <p className="mt-1 text-xs text-muted-foreground">This week: make a poster about a local issue.</p>
            </Card>
          </div>
        </section>

        <section className="bg-card py-16" aria-labelledby="bridge-heading">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <h2 id="bridge-heading" className="text-3xl font-semibold md:text-4xl">
              Five steps across the bridge
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">Move at your own pace. Every step is small, and you can come back any time.</p>
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {STEPS.map((s, i) => (
                <li key={s.title} className="relative rounded-3xl bg-background p-5">
                  <span className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-foreground text-background">
                    <s.icon className="size-5" aria-hidden />
                  </span>
                  <p className="text-xs font-semibold text-teal">Step {i + 1}</p>
                  <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-8" aria-labelledby="promise-heading">
          <h2 id="promise-heading" className="text-3xl font-semibold md:text-4xl">
            Built to be safe and honest
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROMISES.map((p) => (
              <Card key={p.title}>
                <p.icon className="size-6 text-teal" aria-hidden />
                <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </Card>
            ))}
          </div>
          <p className="mt-8 max-w-3xl rounded-3xl bg-secondary p-5 text-sm leading-relaxed">
            SeekhSetu is a learning and exploration tool. It does not offer jobs, payments or placements, and does not
            promise scholarships, income or career outcomes. Opportunity listings should always be checked on the official organisation website before you apply.
          </p>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground">
        SeekhSetu · Learn, practise, and show what you&apos;ve practised.
      </footer>
    </div>
  )
}
