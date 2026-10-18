import { Check, Compass, BookOpen, Hammer, IdCard, Search } from 'lucide-react'
import Link from 'next/link'
import type { StageId } from '@/lib/actions'
import { cn } from '@/lib/utils'

const ICONS: Record<StageId, typeof Compass> = {
  discover: Compass,
  learn: BookOpen,
  practise: Hammer,
  showcase: IdCard,
  opportunities: Search,
}

export interface BridgeStage {
  id: StageId
  label: string
  done: boolean
  href: string
  hint: string
}

export function LearningBridge({ stages, compact = false }: { stages: BridgeStage[]; compact?: boolean }) {
  const doneCount = stages.filter((s) => s.done).length
  const currentIndex = stages.findIndex((s) => !s.done)
  const progress = (doneCount / stages.length) * 100

  return (
    <div className="relative">
      <svg
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        className={cn('pointer-events-none absolute inset-x-[10%] w-[80%]', compact ? 'top-0 h-10' : 'top-0 h-14')}
        aria-hidden
      >
        <path d="M0 34 Q50 -6 100 34" fill="none" stroke="#DCEFF5" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
        <path
          d="M0 34 Q50 -6 100 34"
          fill="none"
          stroke="#0D9488"
          strokeWidth="2.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset={100 - progress}
          className="transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <ol className={cn('relative grid grid-cols-5 gap-1', compact ? 'pt-4' : 'pt-6')}>
        {stages.map((stage, i) => {
          const Icon = ICONS[stage.id]
          const current = i === currentIndex
          return (
            <li key={stage.id} className="flex flex-col items-center text-center">
              <Link
                href={stage.href}
                className="group flex flex-col items-center gap-2 rounded-2xl p-1 outline-none focus-visible:ring-4 focus-visible:ring-ring/30"
              >
                <span
                  className={cn(
                    'relative flex items-center justify-center rounded-full border-2 transition-colors',
                    compact ? 'size-11' : 'size-12 md:size-14',
                    stage.done && 'border-teal bg-teal text-white',
                    !stage.done && current && 'border-teal bg-card text-teal',
                    !stage.done && !current && 'border-dashed border-input bg-card text-muted-foreground',
                  )}
                >
                  {stage.done ? (
                    <Check className="size-5 motion-safe:animate-pop" aria-hidden />
                  ) : (
                    <Icon className="size-5" aria-hidden />
                  )}
                  {current && (
                    <span className="absolute inset-0 rounded-full ring-4 ring-teal/25 motion-safe:animate-pulse" aria-hidden />
                  )}
                </span>
                <span className="text-[11px] leading-tight font-semibold md:text-sm">{stage.label}</span>
                {!compact && (
                  <span className="hidden text-xs leading-snug text-muted-foreground md:block">{stage.hint}</span>
                )}
                <span className="sr-only">{stage.done ? '— completed' : current ? '— up next' : '— not started'}</span>
              </Link>
            </li>
          )
        })}
      </ol>
      {/* bridge deck */}
      <div className={cn('mx-[10%] mt-3 h-1.5 rounded-full bg-secondary', compact && 'mt-2')} aria-hidden />
    </div>
  )
}
