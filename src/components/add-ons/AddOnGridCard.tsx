'use client'

import { Button } from '@/components/ui/Button'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { cn } from '@/lib/utils'
import { Edit2, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { AddOn, formatPrice } from '@/lib/mock/addOns'

interface AddOnGridCardProps {
  addon: AddOn
  onDelete: (addon: AddOn) => void
  onEditGroup: (groupId: string) => void
  onToggleStatus: (addon: AddOn) => void
}

export function AddOnGridCard({ addon, onDelete, onEditGroup, onToggleStatus }: AddOnGridCardProps) {
  const t = useTranslations('addOns')
  const archived = addon.status === 'archived'

  return (
    <div className={cn('bg-white rounded-[12px] shadow-card p-4 flex flex-col gap-2', archived && 'opacity-60')}>
      {/* Header: group name + toggle */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs text-neutral-500 truncate flex-1">{addon.groupName}</p>
        <div className="flex-shrink-0">
          <StatusToggle
            checked={addon.status === 'active'}
            onChange={() => !archived && onToggleStatus(addon)}
            disabled={archived}
            size="sm"
          />
        </div>
      </div>

      {/* Add-on name */}
      <p className="font-bold text-base text-neutral-900 leading-snug">{addon.name}</p>

      {/* Key-value rows */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between py-1">
          <span className="text-sm text-neutral-700">{t('card.additionalPrice')}</span>
          <span className="text-sm font-medium text-neutral-900">{formatPrice(addon.additionalPrice)}</span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-sm text-neutral-700">{t('card.products')}</span>
          <span className="text-sm font-medium text-neutral-900">{addon.products}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-table-border pt-3 flex items-center gap-2 mt-auto">
        <Button
          variant="secondary"
          size="md"
          fullWidth={false}
          disabled={archived}
          onClick={() => !archived && onDelete(addon)}
          className={cn('flex-shrink-0', archived && 'pointer-events-none')}
        >
          <Trash2 size={14} /> {t('card.delete')}
        </Button>
        <Button
          variant="primary"
          size="md"
          fullWidth={false}
          disabled={archived}
          onClick={() => !archived && onEditGroup(addon.groupId)}
          className={cn('flex-1 text-sm', archived && 'pointer-events-none')}
        >
          <Edit2 size={14} /> {t('card.editGroup')}
        </Button>
      </div>
    </div>
  )
}
