'use client'

import { cn } from '@/lib/utils'
import { Grid, List } from 'lucide-react'

interface ViewToggleProps {
  view: 'grid' | 'list'
  onChange: (view: 'grid' | 'list') => void
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center rounded-lg border border-neutral-300 overflow-hidden">
      <button
        onClick={() => onChange('grid')}
        className={cn(
          'flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors',
          view === 'grid' ? 'bg-primary text-white' : 'bg-white text-neutral-700 hover:bg-neutral-100'
        )}
      >
        <Grid size={14} />
        <span>Grid View</span>
      </button>
      <button
        onClick={() => onChange('list')}
        className={cn(
          'flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors',
          view === 'list' ? 'bg-primary text-white' : 'bg-white text-neutral-700 hover:bg-neutral-100'
        )}
      >
        <List size={14} />
        <span>List View</span>
      </button>
    </div>
  )
}
