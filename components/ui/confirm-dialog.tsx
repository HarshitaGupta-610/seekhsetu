'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { Button } from './kit'

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  tone = 'danger',
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  description: ReactNode
  confirmLabel?: string
  tone?: 'danger' | 'primary'
  onConfirm: () => void
  onCancel: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault()
        onCancel()
      }}
      aria-labelledby="confirm-title"
      className="m-auto w-[min(92vw,28rem)] rounded-3xl border border-border bg-card p-6 text-foreground shadow-2xl backdrop:bg-foreground/40"
    >
      <h2 id="confirm-title" className="text-xl font-semibold">
        {title}
      </h2>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</div>
      <div className="mt-6 flex flex-wrap justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant={tone === 'danger' ? 'primary' : 'primary'}
          className={tone === 'danger' ? 'bg-destructive hover:bg-destructive/90' : undefined}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </div>
    </dialog>
  )
}
