'use client'

import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { Manager } from '@/lib/mock/managers'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { Pencil, Trash2 } from 'lucide-react'

interface ManagerCardProps {
  manager: Manager
  onEdit: (m: Manager) => void
  onDelete: (m: Manager) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function ManagerCard({ manager, onEdit, onDelete, onToggleStatus }: ManagerCardProps) {
  const t = useTranslations('managers')
  const tCommon = useTranslations('common')
  const isArchived = manager.status === 'archived'
  const textMuted = isArchived ? 'text-table-archived' : 'text-neutral-500'

  return (
    <div className={cn('bg-white rounded-[12px] shadow-card p-4 md:p-6 flex flex-col items-center text-center relative', isArchived && 'opacity-80')}>
      {/* Toggle top-right */}
      <div className="absolute top-4 right-4">
        <StatusToggle
          checked={manager.status === 'active'}
          onChange={(val) => onToggleStatus(manager.id, val)}
          disabled={isArchived}
        />
      </div>

      <Avatar
        name={`${manager.firstName} ${manager.lastName}`}
        size="lg"
        grayscale={isArchived}
        className="mb-3"
      />
      <p className={cn('font-bold text-sm mb-0.5', isArchived ? 'text-table-archived' : 'text-neutral-900')}>
        {manager.firstName} {manager.lastName}
      </p>
      <p className={cn('text-xs mb-1', textMuted)}>
        {t('card.role', { name: manager.restaurant })}
      </p>
      <p className={cn('text-xs mb-5', textMuted)}>{manager.phone}</p>

      <div className="flex gap-2 w-full">
        <Button
          variant="secondary"
          size="md"
          onClick={() => onDelete(manager)}
          disabled={isArchived}
          className="flex-1"
        >
          <Trash2 size={13} /> {tCommon('delete')}
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={() => onEdit(manager)}
          disabled={isArchived}
          className={cn('flex-1', isArchived && 'bg-primary/40 hover:bg-primary/40')}
        >
          <Pencil size={13} /> {t('editProfile')}
        </Button>
      </div>
    </div>
  )
}
