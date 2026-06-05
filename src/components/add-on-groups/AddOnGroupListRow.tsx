'use client'

import { StatusToggle } from '@/components/ui/StatusToggle'
import { Checkbox } from '@/components/ui/Checkbox'
import { cn } from '@/lib/utils'
import { Copy, Edit2, MoreVertical, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { AddOnGroup } from '@/lib/mock/addOnGroups'

interface AddOnGroupListRowProps {
  group: AddOnGroup
  selected: boolean
  onToggleSelect: () => void
  onEdit: (group: AddOnGroup) => void
  onDelete: (group: AddOnGroup) => void
  onDuplicate: (group: AddOnGroup) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function AddOnGroupListRow({
  group,
  selected,
  onToggleSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus,
}: AddOnGroupListRowProps) {
  const t = useTranslations('addOnGroups')
  const archived = group.status === 'archived'

  return (
    <tr
      className={cn(
        'border-b border-table-border hover:bg-table-row-hover transition-colors',
        archived && 'opacity-60 text-table-archived'
      )}
    >
      <td className="py-3 px-4 w-10">
        <Checkbox id={`aog-${group.id}`} checked={selected} onChange={onToggleSelect} />
      </td>
      <td className="py-3 px-4 font-medium text-neutral-900 whitespace-nowrap">
        {group.name}
      </td>
      <td className="py-3 px-4 text-neutral-700 whitespace-nowrap">
        {group.selectionType === 'single' ? t('selectionTypes.single') : t('selectionTypes.multiple')}
      </td>
      <td className="py-3 px-4 text-neutral-700 text-center">
        {group.minSelection}
      </td>
      <td className="py-3 px-4 text-neutral-700 text-center">
        {group.maxSelection}
      </td>
      <td className="py-3 px-4 text-neutral-700 whitespace-nowrap">
        {group.required ? t('required') : t('optional')}
      </td>
      <td className="py-3 px-4 text-neutral-700 text-center">
        {group.addOns}
      </td>
      <td className="py-3 px-4 text-neutral-700 text-center">
        {group.products}
      </td>
      <td className="py-3 px-4">
        <StatusToggle
          checked={group.status === 'active'}
          onChange={(val) => !archived && onToggleStatus(group.id, val)}
          disabled={archived}
          size="sm"
        />
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={archived}
            onClick={() => !archived && onEdit(group)}
            className="p-1.5 text-neutral-500 hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Edit2 size={15} />
          </button>
          <button
            type="button"
            disabled={archived}
            onClick={() => !archived && onDuplicate(group)}
            className="p-1.5 text-neutral-500 hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Copy size={15} />
          </button>
          <button
            type="button"
            disabled={archived}
            onClick={() => !archived && onDelete(group)}
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
