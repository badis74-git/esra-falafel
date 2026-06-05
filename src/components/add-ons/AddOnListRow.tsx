'use client'

import { Checkbox } from '@/components/ui/Checkbox'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { cn } from '@/lib/utils'
import { Copy, Edit2, MoreVertical, Trash2 } from 'lucide-react'
import { AddOn, formatPrice } from '@/lib/mock/addOns'

interface AddOnListRowProps {
  addon: AddOn
  selected: boolean
  onSelect: () => void
  onEdit: (addon: AddOn) => void
  onDuplicate: (addon: AddOn) => void
  onDelete: (addon: AddOn) => void
  onToggleStatus: (addon: AddOn) => void
}

export function AddOnListRow({
  addon,
  selected,
  onSelect,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleStatus,
}: AddOnListRowProps) {
  const archived = addon.status === 'archived'

  return (
    <tr
      className={cn(
        'border-b border-table-border hover:bg-table-row-hover transition-colors',
        archived && 'opacity-60 text-table-archived'
      )}
    >
      <td className="py-3 px-4 w-10">
        <Checkbox id={`aon-${addon.id}`} checked={selected} onChange={onSelect} />
      </td>
      <td className="py-3 px-4 font-medium text-neutral-900 whitespace-nowrap">
        {addon.name}
      </td>
      <td className="py-3 px-4 text-neutral-700 whitespace-nowrap">
        {addon.groupName}
      </td>
      <td className="py-3 px-4 text-neutral-700 whitespace-nowrap">
        {formatPrice(addon.additionalPrice)}
      </td>
      <td className="py-3 px-4 text-neutral-700 text-center">
        {addon.products}
      </td>
      <td className="py-3 px-4">
        <StatusToggle
          checked={addon.status === 'active'}
          onChange={() => !archived && onToggleStatus(addon)}
          disabled={archived}
          size="sm"
        />
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={archived}
            onClick={() => !archived && onEdit(addon)}
            className="p-1.5 text-neutral-500 hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Edit2 size={15} />
          </button>
          <button
            type="button"
            disabled={archived}
            onClick={() => !archived && onDuplicate(addon)}
            className="p-1.5 text-neutral-500 hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Copy size={15} />
          </button>
          <button
            type="button"
            disabled={archived}
            onClick={() => !archived && onDelete(addon)}
            className="p-1.5 text-neutral-500 hover:text-danger transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Trash2 size={15} />
          </button>
          <button
            type="button"
            className="p-1.5 text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            <MoreVertical size={15} />
          </button>
        </div>
      </td>
    </tr>
  )
}
