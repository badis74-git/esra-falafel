'use client'

import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { Driver } from '@/lib/mock/drivers'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { Pencil, Trash2 } from 'lucide-react'

interface DriverCardProps {
  driver: Driver
  onEdit: (d: Driver) => void
  onDelete: (d: Driver) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function DriverCard({ driver, onEdit, onDelete, onToggleStatus }: DriverCardProps) {
  const tCommon = useTranslations('common')
  const isArchived = driver.status === 'archived'
  const textMuted = isArchived ? 'text-table-archived' : 'text-neutral-500'

  return (
    <div className={cn('bg-white rounded-[12px] shadow-card p-4 md:p-6 flex flex-col items-center text-center relative', isArchived && 'opacity-80')}>
      <div className="absolute top-4 right-4">
        <StatusToggle
          checked={driver.status === 'active'}
          onChange={(val) => onToggleStatus(driver.id, val)}
          disabled={isArchived}
        />
      </div>

      <Avatar
        name={`${driver.firstName} ${driver.lastName}`}
        size="lg"
        grayscale={isArchived}
        className="mb-3"
      />
      <p className={cn('font-bold text-sm mb-0.5', isArchived ? 'text-table-archived' : 'text-neutral-900')}>
        {driver.firstName} {driver.lastName}
      </p>
      <p className={cn('text-xs mb-1', textMuted)}>
        Delivery Driver : {driver.zones.join(', ')}
      </p>
      <p className={cn('text-xs mb-5', textMuted)}>{driver.phone}</p>

      <div className="flex gap-2 w-full">
        <Button
          variant="secondary"
          size="md"
          onClick={() => onDelete(driver)}
          disabled={isArchived}
          className="flex-1"
        >
          <Trash2 size={13} /> {tCommon('delete')}
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={() => onEdit(driver)}
          disabled={isArchived}
          className={cn('flex-1', isArchived && 'bg-primary/40 hover:bg-primary/40')}
        >
          <Pencil size={13} /> Edit profile
        </Button>
      </div>
    </div>
  )
}
