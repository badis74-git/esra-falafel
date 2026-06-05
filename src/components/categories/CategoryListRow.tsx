'use client'

import { Checkbox } from '@/components/ui/Checkbox'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { cn } from '@/lib/utils'
import { Copy, Edit2, MoreVertical, Trash2, UtensilsCrossed } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Category } from '@/lib/mock/categories'

interface CategoryListRowProps {
  category: Category
  selected: boolean
  onToggleSelect: () => void
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
  onDuplicate: (category: Category) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function CategoryListRow({
  category,
  selected,
  onToggleSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus,
}: CategoryListRowProps) {
  const tCommon = useTranslations('common')
  const archived = category.status === 'archived'
  const [kebabOpen, setKebabOpen] = useState(false)
  const kebabRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (kebabRef.current && !kebabRef.current.contains(e.target as Node)) {
        setKebabOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <tr className={cn('border-b border-table-border hover:bg-table-row-hover transition-colors', archived && 'opacity-60')}>
      <td className="py-3 px-4">
        <Checkbox id={`cat-${category.id}`} checked={selected} onChange={onToggleSelect} />
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {category.image
              ? <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
              : <UtensilsCrossed size={13} className="text-neutral-400" />
            }
          </div>
          <span className={cn('font-medium text-sm', archived ? 'text-table-archived' : 'text-neutral-900')}>
            {category.name}
          </span>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-neutral-700">{category.products}</td>
      <td className="py-3 px-4 text-sm text-neutral-700">{category.subCategories}</td>
      <td className="py-3 px-4 text-sm text-neutral-700">{category.addOnGroups}</td>
      <td className="py-3 px-4 text-sm text-neutral-500 max-w-[200px]">
        <span className="truncate block" title={category.description}>{category.description || '—'}</span>
      </td>
      <td className="py-3 px-4 text-sm text-neutral-700 whitespace-nowrap">{category.creationDate}</td>
      <td className="py-3 px-4">
        <StatusToggle
          checked={category.status === 'active'}
          onChange={(val) => !archived && onToggleStatus(category.id, val)}
          disabled={archived}
          size="sm"
        />
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1.5 relative" ref={kebabRef}>
          <button
            type="button"
            onClick={() => !archived && onEdit(category)}
            disabled={archived}
            className="p-1.5 text-neutral-500 hover:text-primary transition-colors disabled:opacity-40"
            title={tCommon('edit')}
          >
            <Edit2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => !archived && onDuplicate(category)}
            disabled={archived}
            className="p-1.5 text-neutral-500 hover:text-primary transition-colors disabled:opacity-40"
            title={tCommon('duplicate')}
          >
            <Copy size={15} />
          </button>
          <button
            type="button"
            onClick={() => !archived && onDelete(category)}
            disabled={archived}
            className="p-1.5 text-neutral-500 hover:text-danger transition-colors disabled:opacity-40"
            title={tCommon('delete')}
          >
            <Trash2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => setKebabOpen((o) => !o)}
            className="p-1.5 text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            <MoreVertical size={15} />
          </button>
          {kebabOpen && (
            <div className="absolute right-0 top-8 z-20 bg-white border border-neutral-200 rounded-lg shadow-lg overflow-hidden min-w-[140px]">
              <button
                type="button"
                onClick={() => { setKebabOpen(false); !archived && onEdit(category) }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <Edit2 size={14} /> {tCommon('edit')}
              </button>
              <button
                type="button"
                onClick={() => { setKebabOpen(false); !archived && onDuplicate(category) }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <Copy size={14} /> {tCommon('duplicate')}
              </button>
              <button
                type="button"
                onClick={() => { setKebabOpen(false); !archived && onDelete(category) }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-danger hover:bg-neutral-50 transition-colors"
              >
                <Trash2 size={14} /> {tCommon('delete')}
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  )
}
