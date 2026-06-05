'use client'

import { StatusToggle } from '@/components/ui/StatusToggle'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { Edit2, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { AddOnGroup } from '@/lib/mock/addOnGroups'

interface AddOnGroupGridCardProps {
  group: AddOnGroup
  onEdit: (group: AddOnGroup) => void
  onDelete: (group: AddOnGroup) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function AddOnGroupGridCard({ group, onEdit, onDelete, onToggleStatus }: AddOnGroupGridCardProps) {
  const t = useTranslations('addOnGroups')
  const archived = group.status === 'archived'

  return (
    <div className={cn('bg-white rounded-[12px] shadow-card p-4 flex flex-col gap-3', archived && 'opacity-60')}>
      {/* Header: name + toggle */}
      <div className="flex items-center gap-3">
        <p className="font-bold text-base text-neutral-900 flex-1 leading-snug">{group.name}</p>
        <div className="flex-shrink-0">
          <StatusToggle
            checked={group.status === 'active'}
            onChange={(val) => !archived && onToggleStatus(group.id, val)}
            disabled={archived}
            size="sm"
          />
        </div>
      </div>

      {/* Key-value rows */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">{t('card.selectionType')}</span>
          <span className="font-semibold text-neutral-900">
            {group.selectionType === 'single' ? t('selectionTypes.single') : t('selectionTypes.multiple')}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">{t('card.products')}</span>
          <span className="font-semibold text-neutral-900">{group.products}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">{t('card.minSelection')}</span>
          <span className="font-semibold text-neutral-900">{group.minSelection}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">{t('card.maxSelection')}</span>
          <span className="font-semibold text-neutral-900">{group.maxSelection}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-table-border pt-3 flex items-center gap-2">
        <Button
          variant="secondary"
          size="md"
          fullWidth={false}
          disabled={archived}
          onClick={() => !archived && onDelete(group)}
          className="flex-1"
        >
          <Trash2 size={14} /> {t('card.delete')}
        </Button>
        <Button
          variant="primary"
          size="md"
          fullWidth={false}
          disabled={archived}
          onClick={() => !archived && onEdit(group)}
          className="flex-1"
        >
          <Edit2 size={14} /> {t('card.edit')}
        </Button>
      </div>
    </div>
  )
}
