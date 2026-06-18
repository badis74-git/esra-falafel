'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FileText } from 'lucide-react'
import { SelectDropdown } from '@/components/ui/SelectDropdown'
import { Button } from '@/components/ui/Button'
import { MENU_OPTIONS } from '@/lib/mock/restaurants'
import type { Restaurant } from '@/lib/mock/restaurants'

interface Props {
  restaurant: Restaurant
  onSave: () => void
  onCancel: () => void
}

export function MenuSection({ restaurant, onSave, onCancel }: Props) {
  const t = useTranslations('restaurants')
  const [activeMenu, setActiveMenu] = useState(restaurant.activeMenu)
  const preview = restaurant.menuPreview

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-5 space-y-5">
        <h3 className="text-sm font-semibold text-primary">{t('menu.title')}</h3>

        <SelectDropdown
          label={t('menu.activeMenu')}
          options={MENU_OPTIONS}
          value={activeMenu}
          onChange={setActiveMenu}
          placeholder="Select menu"
        />

        {/* Menu preview card */}
        {preview && (
          <div className="rounded-[12px] border border-table-border overflow-hidden">
            {/* Cover image / placeholder */}
            <div className="h-40 bg-neutral-800 flex items-center justify-center relative">
              {preview.cover ? (
                <img src={preview.cover} alt={preview.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-neutral-500">
                  <FileText size={40} className="text-neutral-400" />
                  <span className="text-sm">{preview.name}</span>
                </div>
              )}
            </div>
            {/* Info row */}
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-bold text-neutral-900">{preview.name}</p>
                <p className="text-xs text-neutral-500">
                  {t('menu.lastUpdated')}: {preview.lastUpdated}
                </p>
              </div>
              <div className="flex gap-6 text-right">
                <div>
                  <p className="text-sm font-bold text-neutral-900">{preview.products}</p>
                  <p className="text-xs text-neutral-500">{t('menu.products')}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">{preview.categories}</p>
                  <p className="text-xs text-neutral-500">{t('menu.categories')}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 flex items-center gap-3 border-t border-table-border px-5 py-4 flex-shrink-0">
        <Button variant="secondary" fullWidth={false} size="md" onClick={onCancel} className="flex-1 md:flex-none">{t('edit.cancel')}</Button>
        <Button variant="primary" fullWidth={false} size="md" onClick={onSave} className="flex-1 md:flex-none">{t('edit.save')}</Button>
      </div>
    </div>
  )
}
