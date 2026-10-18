import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

export function btn(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors outline-none focus-visible:ring-4 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
    size === 'sm' && 'h-9 px-3.5 text-sm',
    size === 'md' && 'h-11 px-5 text-sm',
    size === 'lg' && 'h-12 px-6 text-base',
    variant === 'primary' && 'bg-primary text-primary-foreground hover:bg-[#0b5f58]',
    variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-[#c9e5ee]',
    variant === 'outline' && 'border border-input bg-card text-foreground hover:bg-muted',
    variant === 'ghost' && 'text-foreground hover:bg-muted',
    variant === 'danger' && 'bg-destructive/10 text-destructive hover:bg-destructive/15',
    className,
  )
}

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: ComponentProps<'button'> & { variant?: Variant; size?: Size }) {
  return <button type={type} className={btn(variant, size, className)} {...props} />
}

export function LinkButton({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={btn(variant, size, className)} {...props} />
}

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('rounded-3xl border border-border/70 bg-card p-5 shadow-[0_1px_2px_rgba(18,52,90,0.04),0_8px_24px_-12px_rgba(18,52,90,0.12)] md:p-6', className)}
      {...props}
    />
  )
}

export function Tag({
  tone = 'blue',
  className,
  children,
}: {
  tone?: 'blue' | 'teal' | 'cream' | 'warning' | 'navy'
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold [&_svg]:size-3.5',
        tone === 'blue' && 'bg-secondary text-secondary-foreground',
        tone === 'teal' && 'bg-accent text-accent-foreground',
        tone === 'cream' && 'bg-muted text-muted-foreground',
        tone === 'warning' && 'bg-warning text-warning-foreground',
        tone === 'navy' && 'bg-foreground text-background',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: string
  description?: ReactNode
  actions?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="mb-2 text-sm font-semibold tracking-wide text-primary uppercase">{eyebrow}</p>}
        <h1 className="text-3xl leading-tight font-semibold md:text-4xl">{title}</h1>
        {description && <p className="mt-3 text-base leading-relaxed text-muted-foreground text-pretty">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

export function ProgressBar({ value, label, className }: { value: number; label: string; className?: string }) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div
      className={cn('h-2.5 w-full overflow-hidden rounded-full bg-secondary', className)}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="h-full rounded-full bg-teal transition-[width] duration-500" style={{ width: `${pct}%` }} />
    </div>
  )
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-input bg-card/60 px-6 py-10 text-center">
      <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground [&_svg]:size-6">
        {icon}
      </div>
      <h2 className="font-heading text-xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function PageLoading() {
  return (
    <div className="space-y-4" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading your saved progress…</span>
      <div className="h-8 w-2/3 max-w-sm animate-pulse rounded-xl bg-secondary" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded-lg bg-muted" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-40 animate-pulse rounded-3xl bg-card" />
        <div className="h-40 animate-pulse rounded-3xl bg-card" />
      </div>
    </div>
  )
}

export function Label({ className, ...props }: ComponentProps<'label'>) {
  return <label className={cn('mb-1.5 block text-sm font-semibold', className)} {...props} />
}

const fieldBase =
  'w-full rounded-2xl border border-input bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/80 outline-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/20'

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(fieldBase, 'h-11', className)} {...props} />
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea className={cn(fieldBase, 'min-h-28 py-3 leading-relaxed', className)} {...props} />
}

export function Select({ className, ...props }: ComponentProps<'select'>) {
  return <select className={cn(fieldBase, 'h-11 appearance-auto pr-8', className)} {...props} />
}

export function Chip({
  selected,
  className,
  children,
  ...props
}: ComponentProps<'button'> & { selected: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        'inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors outline-none focus-visible:ring-4 focus-visible:ring-ring/30 [&_svg]:size-4',
        selected
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-input bg-card text-foreground hover:border-primary/50 hover:bg-accent/40',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

