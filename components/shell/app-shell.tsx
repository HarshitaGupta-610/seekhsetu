'use client'

import {
  Bookmark,
  BookOpen,
  Compass,
  FolderKanban,
  Home,
  IdCard,
  Lightbulb,
  Map as MapIcon,
  Menu,
  MessageCircleQuestion,
  MessagesSquare,
  School,
  Search,
  Target,
  Trophy,
  UserRound,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './language-switcher'
import { Logo } from './logo'

const PRIMARY = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/roadmap', label: 'Roadmap', icon: MapIcon },
  { href: '/challenges', label: 'Challenge', icon: Trophy },
  { href: '/passport', label: 'Passport', icon: IdCard },
]

const GROUPS: { title: string; items: { href: string; label: string; icon: typeof Home }[] }[] = [
  {
    title: 'Your journey',
    items: [
      { href: '/dashboard', label: 'Home', icon: Home },
      { href: '/discover', label: 'Discover interests', icon: Compass },
      { href: '/roadmap', label: 'My roadmap', icon: MapIcon },
      { href: '/learn', label: 'Lessons', icon: BookOpen },
      { href: '/planner', label: 'Skill planner', icon: Target },
    ],
  },
  {
    title: 'Practise & show',
    items: [
      { href: '/challenges', label: 'Weekly challenge', icon: Trophy },
      { href: '/projects', label: 'Community projects', icon: FolderKanban },
      { href: '/passport', label: 'Skill Passport', icon: IdCard },
    ],
  },
  {
    title: 'Explore',
    items: [
      { href: '/opportunities', label: 'Opportunity board', icon: Search },
      { href: '/skills-in-action', label: 'Skills in action', icon: Lightbulb },
      { href: '/guides', label: 'Ask a Local Guide', icon: MessagesSquare },
      { href: '/ask', label: 'Ask SeekhSetu', icon: MessageCircleQuestion },
      { href: '/saved', label: 'Saved for later', icon: Bookmark },
    ],
  },
  {
    title: 'Settings',
    items: [
      { href: '/profile', label: 'Profile & settings', icon: UserRound },
      { href: '/facilitator', label: 'Facilitator view', icon: School },
    ],
  },
]

const BARE_ROUTES = ['/', '/onboarding']

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const bare = BARE_ROUTES.includes(pathname)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  if (bare) {
    return (
      <>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-card focus:px-4 focus:py-2">
          Skip to content
        </a>
        {children}
      </>
    )
  }

  const nav = (
    <nav aria-label="Main" className="flex flex-col gap-6">
      {GROUPS.map((g) => (
        <div key={g.title}>
          <p className="mb-2 px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">{g.title}</p>
          <ul className="flex flex-col gap-0.5">
            {g.items.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors outline-none focus-visible:ring-4 focus-visible:ring-ring/30',
                      active ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-muted',
                    )}
                  >
                    <item.icon className="size-4.5 shrink-0" aria-hidden />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )

  return (
    <div className="min-h-dvh">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-card focus:px-4 focus:py-2">
        Skip to content
      </a>

      <aside className="no-print fixed inset-y-0 left-0 hidden w-64 flex-col gap-6 overflow-y-auto border-r border-border bg-background px-4 py-6 lg:flex">
        <div className="flex items-center justify-between px-2">
          <Logo />
        </div>
        <div className="px-2"><LanguageSwitcher /></div>
        {nav}
      </aside>

      <header className="no-print sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
        <Logo />
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="rounded-full p-2 hover:bg-muted focus-visible:ring-4 focus-visible:ring-ring/30 outline-none"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="no-print fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          />
          <div className="absolute inset-y-0 right-0 flex w-[min(85vw,20rem)] flex-col gap-6 overflow-y-auto bg-background px-4 py-5 shadow-2xl motion-safe:animate-in motion-safe:slide-in-from-right">
            <div className="flex items-center justify-between px-2">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded-full p-2 hover:bg-muted"
                aria-label="Close menu"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            {nav}
          </div>
        </div>
      )}

      <main id="main" className="px-4 pt-6 pb-28 md:px-8 md:pt-10 lg:ml-64 lg:pb-16">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>

      <nav
        aria-label="Quick"
        className="no-print fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-card/95 px-1 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden"
      >
        {PRIMARY.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-semibold',
                active ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              <span className={cn('rounded-full px-3 py-1', active && 'bg-accent')}>
                <item.icon className="size-5" aria-hidden />
              </span>
              {item.label}
            </Link>
          )
        })}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-semibold text-muted-foreground"
        >
          <span className="rounded-full px-3 py-1">
            <Menu className="size-5" aria-hidden />
          </span>
          More
        </button>
      </nav>
    </div>
  )
}
