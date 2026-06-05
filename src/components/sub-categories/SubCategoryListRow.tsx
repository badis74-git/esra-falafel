'use client'

import { Checkbox } from '@/components/ui/Checkbox'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { cn } from '@/lib/utils'
import { Copy, Edit2, MoreVertical, Trash2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { SubCategory } from '@/lib/mock/subCategories'

interface SubCategoryListRowProps {
  subCategory: SubCategory
  selected: boolean
  onToggleSelect: () => void
  onEdit: (subCategory: SubCategory) => void
  onDelete: (subCategory: SubCategory) => void
  onDuplicate: (subCategory: SubCategory) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function SubCategoryListRow({
  subCategory,
  selected,
  onToggleSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus,
}: SubCategoryListRowProps) {
  const tCommon = useTranslations('common')
  const archived = subCategory.status === 'archived'
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
        <Checkbox id={`sc-${subCategory.id}`} checked={selected} onChange={onToggleSelect} />
      </td>
      <td className="py-3 px-4">
        <span className={cn('font-medium text-sm', archived ? 'text-table-archived' : 'text-neutral-900')}>
          {subCategory.name}
        </span>
      </td>
      <td className="py-3 px-4 text-sm text-neutral-700">{subCategory.parentCategory}</td>
      <td className="py-3 px-4 text-sm text-neutral-700">{subCategory.products}</td>
      <td className="py-3 px-4 text-sm text-neutral-700">{subCategory.subCategories}</td>
      <td className="py-3 px-4 text-sm text-neutral-700">{subCategory.addOnGroups}</td>
      <td className="py-3 px-4 text-sm text-neutral-700 whitespace-nowrap">{subCategory.creationDate}</td>
      <td className="py-3 px-4">
        <StatusToggle
          checked={subCategory.status === 'active'}
          onChange={(val) => !archived && onToggleStatus(subCategory.id, val)}
          disabled={archived}
          size="sm"
        />
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1.5 relative" ref={kebabRef}>
          <button
            type="button"
            onClick={() => !archived && onEdit(subCategory)}
            disabled={archived}
            className="p-1.5 text-neutral-500 hover:text-primary transition-colors disabled:opacity-40"
            title={tCommon('edit')}
          >
            <Edit2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => !archived && onDuplicate(subCategory)}
            disabled={archived}
            className="p-1.5 text-neutral-500 hover:text-primary transition-colors disabled:opacity-40"
            title={tCommon('duplicate')}
          >
            <Copy size={15} />
          </button>
          <button
            type="button"
            onClick={() => !archived && onDelete(subCategory)}
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
            <div className="absolute right-0 top-8 z-20 bg-white border border-neutral-200 rounded-lg shadow-lg overflow-hidden min-w-[160px]">
              <button
                type="button"
                onClick={() => { setKebabOpen(false); !archived && onEdit(subCategory) }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <Edit2 size={14} /> {tCommon('edit')}
              </button>
              <button
                type="button"
                onClick={() => { setKebabOpen(false); !archived && onDuplicate(subCategory) }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <Copy size={14} /> {tCommon('duplicate')}
              </button>
              <button
                type="button"
                onClick={() => { setKebabOpen(false); !archived && onDelete(subCategory) }}
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
