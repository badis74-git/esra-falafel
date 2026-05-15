'use client'

import { Checkbox } from '@/components/ui/Checkbox'
import { Category } from '@/lib/mock/menus'
import { ChevronDown, ChevronUp, UtensilsCrossed } from 'lucide-react'
import { useState } from 'react'

interface CategorySelectionRowProps {
  category: Category
  selected: boolean
  onToggle: () => void
  expanded: boolean
  onExpandToggle: () => void
  readOnly?: boolean
}

export function CategorySelectionRow({
  category,
  selected,
  onToggle,
  expanded,
  onExpandToggle,
  readOnly = false,
}: CategorySelectionRowProps) {
  const [checkedSubs, setCheckedSubs] = useState<string[]>([])

  function toggleSub(sub: string) {
    if (readOnly) return
    setCheckedSubs((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    )
  }

  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <div className="flex items-center py-3 px-2 gap-3">
        {readOnly ? (
          <div className="pointer-events-none">
            <Checkbox id={`cat-${category.id}`} checked={selected} onChange={() => {}} />
          </div>
        ) : (
          <Checkbox id={`cat-${category.id}`} checked={selected} onChange={onToggle} />
        )}

        <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {category.image ? (
            <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
          ) : (
            <UtensilsCrossed size={18} className="text-neutral-400" />
          )}
        </div>

        <span className="font-semibold text-sm text-neutral-900 flex-1 min-w-0 truncate">
          {category.name}
        </span>

        <div className="flex items-center gap-4 flex-shrink-0 text-right">
          <div>
            <span className="font-bold text-sm text-neutral-900">{category.products}</span>
            <p className="text-xs text-neutral-500">Products</p>
          </div>
          <div>
            <span className="font-bold text-sm text-neutral-900">{category.subCategories.length}</span>
            <p className="text-xs text-neutral-500">Sub-categories</p>
          </div>
          <button
            type="button"
            onClick={onExpandToggle}
            className="p-1 text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="bg-neutral-50 px-4 py-3 border-t border-neutral-100">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
            <span className="text-xs font-semibold text-neutral-700 flex-shrink-0">
              Sub-categories :
            </span>
            {category.subCategories.length === 0 ? (
              <span className="text-xs text-neutral-500 italic">There is no sub-categories.</span>
            ) : (
              category.subCategories.map((sub) => (
                <Checkbox
                  key={sub}
                  id={`sub-${category.id}-${sub}`}
                  checked={checkedSubs.includes(sub)}
                  onChange={() => toggleSub(sub)}
                  label={sub}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
