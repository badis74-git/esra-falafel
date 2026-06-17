'use client'

import { StatusToggle } from '@/components/ui/StatusToggle'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { Edit2, Trash2, UtensilsCrossed } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Category } from '@/lib/mock/categories'

interface CategoryGridCardProps {
  category: Category
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function CategoryGridCard({ category, onEdit, onDelete, onToggleStatus }: CategoryGridCardProps) {
  const t = useTranslations('categories')
  const archived = category.status === 'archived'

  return (
    <div className={cn('bg-white rounded-[12px] shadow-card p-4 flex flex-col gap-3', archived && 'opacity-60')}>
      {/* Top row: image + name + toggle */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {category.image
            ? <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
            : <UtensilsCrossed size={20} className="text-neutral-400" />
          }
        </div>
        <p className="font-bold text-base text-neutral-900 flex-1 leading-snug">{category.name}</p>
        <div className="flex-shrink-0">
          <StatusToggle
            checked={category.status === 'active'}
            onChange={(val) => !archived && onToggleStatus(category.id, val)}
            disabled={archived}
            size="sm"
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="font-bold text-base text-neutral-900">{category.products}</p>
          <p className="text-xs text-neutral-500">{t('card.products')}</p>
        </div>
        <div>
          <p className="font-bold text-base text-neutral-900">{category.subCategories}</p>
          <p className="text-xs text-neutral-500">{t('card.subCategories')}</p>
        </div>
        <div>
          <p className="font-bold text-base text-neutral-900">{category.addOnGroups}</p>
          <p className="text-xs text-neutral-500 leading-tight">{t('card.addOnsGroups')}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-table-border pt-3 flex items-stretch gap-2">
        <Button
          variant="secondary"
          size="md"
          fullWidth={false}
          disabled={archived}
          onClick={() => !archived && onDelete(category)}
          className="flex-1"
        >
          <Trash2 size={14} /> {t('card.delete')}
        </Button>
        <Button
          variant="primary"
          size="md"
          fullWidth={false}
          disabled={archived}
          onClick={() => !archived && onEdit(category)}
          className="flex-1"
        >
          <Edit2 size={14} /> {t('card.editCategory')}
        </Button>
      </div>
    </div>
  )
}
