'use client'

import { Checkbox } from '@/components/ui/Checkbox'
import { DietaryBadge } from '@/components/ui/DietaryBadge'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { cn } from '@/lib/utils'
import { Copy, Edit2, MoreVertical, Trash2, UtensilsCrossed } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Product, mockAssignedMenus } from '@/lib/mock/products'

interface ProductListRowProps {
  product: Product
  selected: boolean
  onToggleSelect: () => void
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
  onDuplicate: (product: Product) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function ProductListRow({
  product,
  selected,
  onToggleSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus,
}: ProductListRowProps) {
  const tCommon = useTranslations('common')
  const archived = product.status === 'archived'
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

  const assignedMenuLabels = product.assignedMenus
    .map((v) => mockAssignedMenus.find((m) => m.value === v)?.label ?? v)
    .join(', ')

  return (
    <tr className={cn('border-b border-table-border hover:bg-table-row-hover transition-colors', archived && 'opacity-60')}>
      <td className="py-3 px-4">
        <Checkbox id={`product-${product.id}`} checked={selected} onChange={onToggleSelect} />
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {product.image
              ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              : <UtensilsCrossed size={14} className="text-neutral-400" />
            }
          </div>
          <span className={cn('font-medium text-sm', archived ? 'text-table-archived' : 'text-neutral-900')}>
            {product.name}
          </span>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-neutral-700">{product.category}</td>
      <td className="py-3 px-4">
        {product.dietaryType
          ? <DietaryBadge type={product.dietaryType} />
          : <span className="text-sm text-neutral-500">—</span>
        }
      </td>
      <td className="py-3 px-4 text-sm text-neutral-700">{product.basePrice.toFixed(2)} €</td>
      <td className="py-3 px-4 text-sm text-neutral-700">
        {product.addOnGroups.length} {product.addOnGroups.length === 1 ? 'Group' : 'Groups'}
      </td>
      <td className="py-3 px-4 text-sm text-neutral-700 max-w-[160px]">
        <span className="truncate block" title={assignedMenuLabels}>
          {assignedMenuLabels || '—'}
        </span>
      </td>
      <td className="py-3 px-4">
        <StatusToggle
          checked={product.status === 'active'}
          onChange={(val) => !archived && onToggleStatus(product.id, val)}
          disabled={archived}
          size="sm"
        />
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1.5 relative" ref={kebabRef}>
          <button
            type="button"
            onClick={() => !archived && onEdit(product)}
            disabled={archived}
            className="p-1.5 text-neutral-500 hover:text-primary transition-colors disabled:opacity-40"
            title={tCommon('edit')}
          >
            <Edit2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => !archived && onDuplicate(product)}
            disabled={archived}
            className="p-1.5 text-neutral-500 hover:text-primary transition-colors disabled:opacity-40"
            title={tCommon('duplicate')}
          >
            <Copy size={15} />
          </button>
          <button
            type="button"
            onClick={() => !archived && onDelete(product)}
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
            <div className="absolute right-0 top-8 z-20 bg-white border border-neutral-200 rounded-lg shadow-lg overflow-hidden min-w-[120px]">
              <button
                type="button"
                onClick={() => { setKebabOpen(false); !archived && onEdit(product) }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <Edit2 size={14} /> {tCommon('edit')}
              </button>
              <button
                type="button"
                onClick={() => { setKebabOpen(false); !archived && onDuplicate(product) }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <Copy size={14} /> {tCommon('duplicate')}
              </button>
              <button
                type="button"
                onClick={() => { setKebabOpen(false); !archived && onDelete(product) }}
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
