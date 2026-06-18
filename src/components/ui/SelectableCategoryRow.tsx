'use client'

import { useTranslations } from 'next-intl'
import { ChevronDown, ChevronUp, UtensilsCrossed } from 'lucide-react'
import { Checkbox } from '@/components/ui/Checkbox'
import type { MenuCategory } from '@/lib/mock/menus'

interface Props {
  category: MenuCategory
  selected: boolean
  onToggle: () => void
  variant: 'grid' | 'list'
  expanded?: boolean
  onExpand?: () => void
}

export function SelectableCategoryRow({ category, selected, onToggle, variant, expanded, onExpand }: Props) {
  const t = useTranslations('menus')

  if (variant === 'grid') {
    return (
      <div className="border-b border-neutral-200 last:border-b-0">
        <div className="flex items-center py-3 px-3 gap-3">
          <Checkbox id={`scat-${category.id}`} checked={selected} onChange={onToggle} />
          <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {category.image
              ? <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
              : <UtensilsCrossed size={18} className="text-neutral-400" />}
          </div>
          <span className="font-semibold text-sm text-neutral-900 flex-1 min-w-0 truncate">{category.name}</span>
          <div className="flex items-center gap-4 flex-shrink-0 text-right">
            <div>
              <span className="font-bold text-sm text-neutral-900">{category.productCount}</span>
              <p className="text-xs text-neutral-500">{t('categories.colProducts')}</p>
            </div>
            <div>
              <span className="font-bold text-sm text-neutral-900">{category.subCategoryCount}</span>
              <p className="text-xs text-neutral-500">{t('categories.colSubcategories')}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onExpand}
            className="p-1 text-neutral-500 hover:text-neutral-700 transition-colors flex-shrink-0"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
        {expanded && category.subCategories.length > 0 && (
          <div className="bg-neutral-50 px-4 py-2 border-t border-neutral-100">
            <span className="text-xs text-neutral-500">{category.subCategories.join(', ')}</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <tr className="border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50">
      <td className="py-2.5 px-3 w-10">
        <Checkbox id={`scat-list-${category.id}`} checked={selected} onChange={onToggle} />
      </td>
      <td className="py-2.5 px-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {category.image
              ? <img src={category.image} alt={category.name} className="w-8 h-8 object-cover" />
              : <UtensilsCrossed size={14} className="text-neutral-400" />}
          </div>
          <span className="text-sm font-medium text-neutral-900">{category.name}</span>
        </div>
      </td>
      <td className="py-2.5 px-3 text-sm text-neutral-600">
        {category.subCategories.length > 0 ? category.subCategories.join(', ') : t('categories.noneDash')}
      </td>
      <td className="py-2.5 px-3 text-sm text-neutral-700">{category.productCount}</td>
    </tr>
  )
}
