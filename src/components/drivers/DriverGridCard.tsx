'use client'

import { useTranslations } from 'next-intl'
import { Edit2, Trash2 } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { Driver } from '@/lib/mock/drivers'

interface DriverGridCardProps {
  driver: Driver
  onEdit: (driver: Driver) => void
  onDelete: (driver: Driver) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function DriverGridCard({ driver, onEdit, onDelete, onToggleStatus }: DriverGridCardProps) {
  const t = useTranslations('drivers')
  const isArchived = driver.status === 'archived'
  const isActive = driver.status === 'active'

  return (
    <div className={cn('bg-white rounded-[12px] shadow-card flex flex-col overflow-hidden', isArchived && 'opacity-60')}>
      {/* Body */}
      <div className="flex-1 p-4 bg-primary-light/30 flex flex-col items-center relative">
        <div className="absolute top-3 right-3">
          <StatusToggle
            checked={isActive}
            onChange={(val) => !isArchived && onToggleStatus(driver.id, val)}
            disabled={isArchived}
            size="sm"
          />
        </div>
        <Avatar name={`${driver.firstName} ${driver.lastName}`} src={driver.avatar ?? undefined} size="lg" />
        <p className="mt-3 font-bold text-base text-neutral-900 text-center">
          {driver.firstName} {driver.lastName}
        </p>
        <p className="text-sm text-neutral-700 text-center mt-0.5">
          {t('card.roleZone', { zones: driver.zones.join(', ') })}
        </p>
        <p className="text-sm text-neutral-700 text-center mt-0.5">{driver.phone}</p>
      </div>

      {/* Footer */}
      <div className="flex items-stretch gap-2 border-t border-table-border p-3">
        <Button
          variant="secondary"
          fullWidth={false}
          size="md"
          className="flex-1 gap-1.5"
          disabled={isArchived}
          onClick={() => !isArchived && onDelete(driver)}
        >
          <Trash2 size={14} /> {t('card.delete')}
        </Button>
        <Button
          variant="primary"
          fullWidth={false}
          size="md"
          className="flex-1 gap-1.5"
          disabled={isArchived}
          onClick={() => !isArchived && onEdit(driver)}
        >
          <Edit2 size={14} /> {t('card.edit')}
        </Button>
      </div>
    </div>
  )
}
