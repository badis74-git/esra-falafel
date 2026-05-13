'use client'

import { Avatar } from '@/components/ui/Avatar'
import { StatusToggle } from './StatusToggle'
import { Manager } from '@/lib/mock/managers'
import { cn } from '@/lib/utils'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'

interface ManagerTableRowProps {
  manager: Manager
  selected: boolean
  onSelect: (id: string) => void
  onEdit: (m: Manager) => void
  onDelete: (m: Manager) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function ManagerTableRow({ manager, selected, onSelect, onEdit, onDelete, onToggleStatus }: ManagerTableRowProps) {
  const isArchived = manager.status === 'archived'
  const textClass = isArchived ? 'text-table-archived' : 'text-neutral-700'

  return (
    <tr className={cn('border-b border-table-border hover:bg-table-row-hover transition-colors', isArchived && 'opacity-80')}>
      {/* Checkbox */}
      <td className="py-3 pl-4 pr-2 w-10">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(manager.id)}
          className="w-4 h-4 accent-primary rounded"
        />
      </td>
      {/* Full Name */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <Avatar name={`${manager.firstName} ${manager.lastName}`} size="md" grayscale={isArchived} />
          <div>
            <p className={cn('text-sm font-semibold', isArchived ? 'text-table-archived' : 'text-neutral-900')}>
              {manager.firstName} {manager.lastName}
            </p>
            <p className={cn('text-xs', textClass)}>{manager.email}</p>
          </div>
        </div>
      </td>
      {/* Phone — hidden on mobile */}
      <td className={cn('py-3 px-4 text-sm whitespace-nowrap hidden md:table-cell', textClass)}>{manager.phone}</td>
      {/* Role — hidden on mobile */}
      <td className={cn('py-3 px-4 text-sm hidden md:table-cell', textClass)}>{manager.role}</td>
      {/* Restaurant — hidden on mobile */}
      <td className="py-3 px-4 hidden md:table-cell">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
            <span className="text-xs">🧆</span>
          </div>
          <span className={cn('text-sm whitespace-nowrap', textClass)}>{manager.restaurant}</span>
        </div>
      </td>
      {/* Join Date — hidden on mobile */}
      <td className={cn('py-3 px-4 text-sm whitespace-nowrap hidden md:table-cell', textClass)}>{manager.joinDate}</td>
      {/* Status */}
      <td className="py-3 px-4">
        <StatusToggle
          checked={manager.status === 'active'}
          onChange={(val) => onToggleStatus(manager.id, val)}
          disabled={isArchived}
        />
      </td>
      {/* Actions */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(manager)}
            disabled={isArchived}
            className={cn('p-2 rounded hover:bg-neutral-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center', isArchived ? 'text-table-archived cursor-not-allowed' : 'text-neutral-500 hover:text-neutral-700')}
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(manager)}
            disabled={isArchived}
            className={cn('p-2 rounded hover:bg-danger-light transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center', isArchived ? 'text-table-archived cursor-not-allowed' : 'text-neutral-500 hover:text-danger')}
          >
            <Trash2 size={15} />
          </button>
          <button className={cn('p-2 rounded hover:bg-neutral-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center', isArchived ? 'text-table-archived' : 'text-neutral-500 hover:text-neutral-700')}>
            <MoreVertical size={15} />
          </button>
        </div>
      </td>
    </tr>
  )
}
