'use client'

import { Avatar } from '@/components/ui/Avatar'
import { mockManagerOptions, RestaurantManager } from '@/lib/mock/restaurants'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { Check, Plus, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface InlineManagerPickerProps {
  currentManager?: RestaurantManager | null
  onAssign: (manager: RestaurantManager) => void
  onUnassign: () => void
}

export function InlineManagerPicker({ currentManager, onAssign, onUnassign }: InlineManagerPickerProps) {
  const t = useTranslations('restaurants')
  const [open, setOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const currentManagerId = currentManager?.id ?? null

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (currentManager) {
    return (
      <div
        className="relative inline-block"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar name={currentManager.name} src={currentManager.avatar} size="sm" />
          <div>
            <p className="text-sm font-bold text-neutral-900 leading-tight">{currentManager.name}</p>
            <p className="text-xs text-neutral-500 leading-tight">{currentManager.email}</p>
          </div>
        </div>

        {showTooltip && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50">
            <button
              type="button"
              onClick={onUnassign}
              className="flex items-center gap-1.5 bg-danger text-white text-xs font-medium rounded-md px-3 py-1.5 whitespace-nowrap shadow-lg"
            >
              <Trash2 size={12} />
              {t('inlineManager.unassignManager')}
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-danger rotate-45" />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative inline-block" ref={ref}>
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => { if (!open) setShowTooltip(false) }}
      >
        <button
          type="button"
          onClick={() => { setOpen((o) => !o); setShowTooltip(false) }}
          className="w-8 h-8 rounded-full border-2 border-dashed border-neutral-300 flex items-center justify-center text-neutral-400 hover:border-primary hover:text-primary transition-colors"
        >
          <Plus size={14} />
        </button>

        {showTooltip && !open && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50">
            <div className="bg-neutral-900 text-white text-xs rounded-md px-2.5 py-1.5 whitespace-nowrap shadow-lg">
              {t('inlineManager.assignManager')}
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 rotate-45" />
          </div>
        )}
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-lg shadow-lg border border-neutral-200 min-w-[220px] overflow-hidden">
          {mockManagerOptions.map((mgr) => {
            const isSelected = currentManagerId === mgr.id
            return (
              <button
                key={mgr.id}
                type="button"
                onClick={() => {
                  onAssign({ id: mgr.id, name: mgr.name, email: mgr.email, avatar: mgr.avatar })
                  setOpen(false)
                }}
                className={cn(
                  'w-full flex items-center gap-2.5 py-2 px-3 text-sm text-left transition-colors',
                  isSelected ? 'bg-primary-light' : 'hover:bg-neutral-50'
                )}
              >
                <Avatar name={mgr.name} src={mgr.avatar} size="sm" />
                <span className="flex-1 text-neutral-900 font-medium">{mgr.name}</span>
                {isSelected && <Check size={14} className="text-primary flex-shrink-0" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
