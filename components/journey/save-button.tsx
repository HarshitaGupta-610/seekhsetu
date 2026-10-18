'use client'

import { Bookmark, BookmarkCheck } from 'lucide-react'
import { Button } from '@/components/ui/kit'
import { useToast } from '@/components/ui/toast'
import { isSaved, toggleSaved } from '@/lib/actions'
import type { AppState, SavedType } from '@/lib/types'

export function SaveButton({
  state,
  type,
  id,
  title,
  size = 'sm',
}: {
  state: AppState
  type: SavedType
  id: string
  title: string
  size?: 'sm' | 'md'
}) {
  const toast = useToast()
  const saved = isSaved(state, type, id)
  return (
    <Button
      variant={saved ? 'secondary' : 'outline'}
      size={size}
      aria-pressed={saved}
      aria-label={saved ? `Remove “${title}” from saved` : `Save “${title}” for later`}
      onClick={() => {
        const ok = toggleSaved(type, id)
        if (!ok) toast('Couldn’t save on this device.', 'error')
        else toast(saved ? 'Removed from Saved for later.' : 'Saved for later on this device.')
      }}
    >
      {saved ? <BookmarkCheck aria-hidden /> : <Bookmark aria-hidden />}
      {saved ? 'Saved' : 'Save'}
    </Button>
  )
}
