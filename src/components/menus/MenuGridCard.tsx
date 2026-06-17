'use client'

import { Button } from '@/components/ui/Button'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { BranchPills } from '@/components/menus/BranchPills'
import { Menu } from '@/lib/mock/menus'
import { Edit, Trash2, UtensilsCrossed } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface MenuGridCardProps {
  menu: Menu
  onEdit: (m: Menu) => void
  onDelete: (m: Menu) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function MenuGridCard({ menu, onEdit, onDelete, onToggleStatus }: MenuGridCardProps) {
  const t = useTranslations('menus')
  const tCommon = useTranslations('common')
  const archived = menu.status === 'archived'

  return (
    <div className={`bg-white rounded-[12px] shadow-card overflow-hidden flex flex-col ${archived ? 'opacity-60' : ''}`}>
      {/* Image area */}
      <div className="relative h-48 w-full bg-neutral-100 flex-shrink-0">
        {menu.image ? (
          <img src={menu.image} alt={menu.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-light to-neutral-200 flex items-center justify-center">
            <UtensilsCrossed size={40} className="text-primary/40" />
          </div>
        )}
        {/* Status toggle */}
        <div className="absolute top-2 right-2">
          <StatusToggle
            checked={menu.status === 'active'}
            onChange={(val) => onToggleStatus(menu.id, val)}
            disabled={archived}
          />
        </div>
        {/* Branch pills */}
        <div className="absolute bottom-2 left-2">
          <BranchPills branches={menu.branches} maxVisible={2} />
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-baseline justify-between gap-2 mb-2">
          <p className="font-bold text-base text-neutral-900 truncate flex-1">{menu.name}</p>
          <p className="text-xs text-neutral-500 flex-shrink-0 whitespace-nowrap">
            {t('card.lastUpdated', { date: menu.lastUpdated })}
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-sm mt-auto">
          <div>
            <span className="font-bold text-neutral-900">{menu.products}</span>
            <span className="text-neutral-500 ml-1">{t('card.products')}</span>
          </div>
          <div>
            <span className="font-bold text-neutral-900">{menu.categories}</span>
            <span className="text-neutral-500 ml-1">{t('card.categories')}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-table-border px-4 pt-3 pb-4 flex items-stretch gap-2">
        <Button
          variant="secondary"
          size="md"
          fullWidth={false}
          className="flex-1"
          disabled={archived}
          onClick={() => onDelete(menu)}
        >
          <Trash2 size={14} /> {tCommon('delete')}
        </Button>
        <Button
          variant="primary"
          size="md"
          fullWidth={false}
          className="flex-1"
          disabled={archived}
          onClick={() => onEdit(menu)}
        >
          <Edit size={14} /> {t('card.editProduct')}
        </Button>
      </div>
    </div>
  )
}
