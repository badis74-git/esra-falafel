'use client'

import { Avatar } from '@/components/ui/Avatar'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { Driver } from '@/lib/mock/drivers'
import { cn } from '@/lib/utils'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'

interface DriverTableRowProps {
  driver: Driver
  selected: boolean
  onSelect: (id: string) => void
  onEdit: (d: Driver) => void
  onDelete: (d: Driver) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function DriverTableRow({ driver, selected, onSelect, onEdit, onDelete, onToggleStatus }: DriverTableRowProps) {
  const isArchived = driver.status === 'archived'
  const textClass = isArchived ? 'text-table-archived' : 'text-neutral-700'

  return (
    <tr className={cn('border-b border-table-border hover:bg-table-row-hover transition-colors', isArchived && 'opacity-80')}>
      <td className="py-3 pl-4 pr-2 w-10">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(driver.id)}
          className="w-4 h-4 accent-primary rounded"
        />
      </td>
      {/* Full Name */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <Avatar name={`${driver.firstName} ${driver.lastName}`} size="md" grayscale={isArchived} />
          <div>
            <p className={cn('text-sm font-semibold', isArchived ? 'text-table-archived' : 'text-neutral-900')}>
              {driver.firstName} {driver.lastName}
            </p>
            <p className={cn('text-xs', textClass)}>{driver.email}</p>
          </div>
        </div>
      </td>
      {/* Phone */}
      <td className={cn('py-3 px-4 text-sm whitespace-nowrap hidden md:table-cell', textClass)}>{driver.phone}</td>
      {/* Role */}
      <td className={cn('py-3 px-4 text-sm hidden md:table-cell', textClass)}>{driver.role}</td>
      {/* Assigned Zone */}
      <td className={cn('py-3 px-4 text-sm whitespace-nowrap hidden md:table-cell', textClass)}>
        {driver.zones.join(', ')}
      </td>
      {/* Join Date */}
      <td className={cn('py-3 px-4 text-sm whitespace-nowrap hidden md:table-cell', textClass)}>{driver.joinDate}</td>
      {/* Status */}
      <td className="py-3 px-4">
        <StatusToggle
          checked={driver.status === 'active'}
          onChange={(val) => onToggleStatus(driver.id, val)}
          disabled={isArchived}
        />
      </td>
      {/* Actions */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(driver)}
            disabled={isArchived}
            className={cn(
              'p-2 rounded hover:bg-neutral-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center',
              isArchived ? 'text-table-archived cursor-not-allowed' : 'text-neutral-500 hover:text-neutral-700'
            )}
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(driver)}
            disabled={isArchived}
            className={cn(
              'p-2 rounded hover:bg-danger-light transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center',
              isArchived ? 'text-table-archived cursor-not-allowed' : 'text-neutral-500 hover:text-danger'
            )}
          >
            <Trash2 size={15} />
          </button>
          <button className={cn(
            'p-2 rounded hover:bg-neutral-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center',
            isArchived ? 'text-table-archived' : 'text-neutral-500 hover:text-neutral-700'
          )}>
            <MoreVertical size={15} />
          </button>
        </div>
      </td>
    </tr>
  )
}
