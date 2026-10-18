'use client'

import { ImagePlus, X } from 'lucide-react'
import { useId, useState } from 'react'
import { compressImage } from '@/lib/image'

export function PhotoField({
  value,
  onChange,
  disabled,
}: {
  value?: string
  onChange: (v: string | undefined) => void
  disabled?: boolean
}) {
  const id = useId()
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  return (
    <div>
      <p className="mb-1.5 text-sm font-semibold">Photo evidence (optional)</p>
      {value ? (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element -- local data URL */}
          <img src={value} alt="Your evidence photo" className="max-h-56 rounded-2xl border border-border" />
          {!disabled && (
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-foreground/80 text-background outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
              aria-label="Remove photo"
            >
              <X className="size-4" aria-hidden />
            </button>
          )}
        </div>
      ) : (
        <label
          htmlFor={id}
          className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-input bg-card p-4 text-sm hover:bg-muted has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ring/30"
        >
          <ImagePlus className="size-5 text-teal" aria-hidden />
          <span>
            <span className="block font-semibold">{busy ? 'Processing…' : 'Add a photo'}</span>
            <span className="block text-xs text-muted-foreground">
              Stored only on this device, made smaller to save space. Avoid faces, school names or addresses.
            </span>
          </span>
          <input
            id={id}
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={disabled || busy}
            onChange={async (e) => {
              const file = e.target.files?.[0]
              e.target.value = ''
              if (!file) return
              setError(null)
              setBusy(true)
              try {
                onChange(await compressImage(file))
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Could not add this photo.')
              } finally {
                setBusy(false)
              }
            }}
          />
        </label>
      )}
      {error && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
