'use client'

import { cn } from '@/lib/utils'

export type TabValue = 'all' | 'inactive' | 'active' | 'archived'

interface FilterTabsProps {
  active: TabValue
  onChange: (tab: TabValue) => void
  counts?: Partial<Record<TabValue, number>>
}

const tabs: { value: TabValue; label: string }[] = [
  { value: 'all', label: 'View all' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived' },
]

export function FilterTabs({ active, onChange, counts }: FilterTabsProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'px-4 py-1.5 rounded-full text-sm font-medium transition-colors min-h-[44px]',
            active === tab.value
              ? 'bg-primary text-white'
              : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
          )}
        >
          {tab.label}
          {counts?.[tab.value] !== undefined && (
            <span className="ml-1 opacity-70">({counts[tab.value]})</span>
          )}
        </button>
      ))}
    </div>
  )
}
