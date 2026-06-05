'use client'

import { StatusToggle } from '@/components/ui/StatusToggle'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { Edit2, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { SubCategory } from '@/lib/mock/subCategories'

interface SubCategoryGridCardProps {
  subCategory: SubCategory
  onEdit: (subCategory: SubCategory) => void
  onDelete: (subCategory: SubCategory) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function SubCategoryGridCard({ subCategory, onEdit, onDelete, onToggleStatus }: SubCategoryGridCardProps) {
  const t = useTranslations('subCategories')
  const archived = subCategory.status === 'archived'

  return (
    <div className={cn('bg-white rounded-[12px] shadow-card p-4 flex flex-col gap-3', archived && 'opacity-60')}>
      {/* Top row: parent + name + toggle */}
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-neutral-500 mb-0.5">{subCategory.parentCategory}</p>
          <p className="font-bold text-base text-neutral-900 leading-snug">{subCategory.name}</p>
        </div>
        <div className="flex-shrink-0 mt-0.5">
          <StatusToggle
            checked={subCategory.status === 'active'}
            onChange={(val) => !archived && onToggleStatus(subCategory.id, val)}
            disabled={archived}
            size="sm"
          />
        </div>
      </div>

      {/* Single stat row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">{t('card.products')}</p>
        <p className="font-bold text-base text-neutral-900">{subCategory.products}</p>
      </div>

      {/* Footer */}
      <div className="border-t border-table-border pt-3 flex items-center gap-2">
        <Button
          variant="secondary"
          size="md"
          fullWidth={false}
          disabled={archived}
          onClick={() => !archived && onDelete(subCategory)}
          className="flex-1"
        >
          <Trash2 size={14} /> {t('card.delete')}
        </Button>
        <Button
          variant="primary"
          size="md"
          fullWidth={false}
          disabled={archived}
          onClick={() => !archived && onEdit(subCategory)}
          className="flex-1"
        >
          <Edit2 size={14} /> {t('card.editSubCategory')}
        </Button>
      </div>
    </div>
  )
}
