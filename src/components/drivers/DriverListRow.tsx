'use client'

import { useTranslations } from 'next-intl'
import { Edit2, MoreVertical, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Avatar } from '@/components/ui/Avatar'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { Checkbox } from '@/components/ui/Checkbox'
import { DriverActionsMenu } from './DriverActionsMenu'
import { cn } from '@/lib/utils'
import type { Driver } from '@/lib/mock/drivers'

interface DriverListRowProps {
  driver: Driver
  selected: boolean
  onSelect: (id: string) => void
  onEdit: (driver: Driver) => void
  onDelete: (driver: Driver) => void
  onResendInvite: (driver: Driver) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function DriverListRow({ driver, selected, onSelect, onEdit, onDelete, onResendInvite, onToggleStatus }: DriverListRowProps) {
  const t = useTranslations('drivers')
  const [menuOpen, setMenuOpen] = useState(false)
  const isArchived = driver.status === 'archived'
  const isActive = driver.status === 'active'

  const verificationClass = driver.verification === 'verified'
    ? 'text-verified-text bg-verified-bg'
    : 'text-pending-text bg-pending-bg'

  return (
    <tr className={cn('border-b border-table-border hover:bg-table-row-hover transition-colors', isArchived && 'opacity-60')}>
      {/* Checkbox */}
      <td className="py-3 px-4">
        <Checkbox
          checked={selected}
          onChange={() => onSelect(driver.id)}
          id={`sel-${driver.id}`}
        />
      </td>

      {/* Full Name */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar name={`${driver.firstName} ${driver.lastName}`} src={driver.avatar ?? undefined} size="sm" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-neutral-900 truncate">
              {driver.firstName} {driver.lastName}
            </p>
            <p className="text-xs text-neutral-500 truncate">{driver.email}</p>
          </div>
        </div>
      </td>

      {/* Phone */}
      <td className="py-3 px-4 text-sm text-neutral-700 whitespace-nowrap">{driver.phone}</td>

      {/* Role */}
      <td className="py-3 px-4 text-sm text-neutral-700">{t('role')}</td>

      {/* Assigned Zone */}
      <td className="py-3 px-4 text-sm text-neutral-700">{driver.zones.join(', ')}</td>

      {/* Join Date */}
      <td className="py-3 px-4 text-sm text-neutral-700 whitespace-nowrap">{driver.joinDate}</td>

      {/* Verification Status */}
      <td className="py-3 px-4">
        <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap', verificationClass)}>
          {driver.verification === 'verified' ? t('verification.verified') : t('verification.pending')}
        </span>
      </td>

      {/* Active/Inactive Toggle */}
      <td className="py-3 px-4">
        <StatusToggle
          checked={isActive}
          onChange={(val) => !isArchived && onToggleStatus(driver.id, val)}
          disabled={isArchived}
          size="sm"
        />
      </td>

      {/* Actions */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-1 relative">
          <button
            type="button"
            onClick={() => !isArchived && onEdit(driver)}
            disabled={isArchived}
            className="p-1.5 text-neutral-500 hover:text-primary transition-colors disabled:opacity-40"
          >
            <Edit2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => !isArchived && onDelete(driver)}
            disabled={isArchived}
            className="p-1.5 text-neutral-500 hover:text-danger transition-colors disabled:opacity-40"
          >
            <Trash2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="p-1.5 text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            <MoreVertical size={15} />
          </button>
          {menuOpen && (
            <DriverActionsMenu
              driver={driver}
              onEdit={onEdit}
              onResendInvite={onResendInvite}
              onDelete={onDelete}
              onClose={() => setMenuOpen(false)}
            />
          )}
        </div>
      </td>
    </tr>
  )
}
