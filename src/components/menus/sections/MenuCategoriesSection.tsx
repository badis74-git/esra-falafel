'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Filter } from 'lucide-react'
import { ViewToggle } from '@/components/ui/ViewToggle'
import { SearchInput } from '@/components/ui/SearchInput'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import { SelectableCategoryRow } from '@/components/ui/SelectableCategoryRow'
import type { MenuCategory } from '@/lib/mock/menus'

interface Props {
  categories: MenuCategory[]
  selectedIds: string[]
  onSave: () => void
  onCancel: () => void
}

export function MenuCategoriesSection({ categories, selectedIds, onSave, onCancel }: Props) {
  const t = useTranslations('menus')
  const tCommon = useTranslations('common')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string[]>(selectedIds)
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = categories.filter(
    (c) => !search || c.name.toLowerCase().includes(search.toLowerCase())
  )

  const allIds = filtered.map((c) => c.id)
  const isAllSelected = allIds.length > 0 && allIds.every((id) => selected.includes(id))

  function toggleAll() {
    if (isAllSelected) {
      setSelected((prev) => prev.filter((id) => !allIds.includes(id)))
    } else {
      setSelected((prev) => [...new Set([...prev, ...allIds])])
    }
  }

  function toggle(id: string) {
    setSelected((prev) => prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id])
  }

  function toggleExpand(id: string) {
    setExpanded((prev) => (prev === id ? null : id))
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <h3 className="text-sm font-semibold text-primary">{t('categories.title')}</h3>

        {/* Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <ViewToggle view={view} onChange={setView} />
          <SearchInput
            placeholder={tCommon('search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[140px]"
          />
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-100 transition-colors flex-shrink-0"
          >
            <Filter size={14} /> {tCommon('filters')}
          </button>
        </div>

        {/* Select All */}
        <div className="flex items-center gap-3 px-2 py-1">
          <Checkbox
            id="select-all-menu-cats"
            checked={isAllSelected}
            onChange={toggleAll}
            label={t('categories.selectAll')}
          />
        </div>

        {/* Grid view */}
        {view === 'grid' ? (
          <div className="rounded-[12px] border border-table-border overflow-hidden bg-white">
            {filtered.map((cat) => (
              <SelectableCategoryRow
                key={cat.id}
                category={cat}
                selected={selected.includes(cat.id)}
                onToggle={() => toggle(cat.id)}
                variant="grid"
                expanded={expanded === cat.id}
                onExpand={() => toggleExpand(cat.id)}
              />
            ))}
          </div>
        ) : (
          /* List view */
          <div className="overflow-x-auto rounded-[12px] border border-table-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-table-border">
                  <th className="py-3 px-3 w-10" />
                  <th className="text-left py-3 px-3 font-medium text-neutral-600">{t('categories.colName')}</th>
                  <th className="text-left py-3 px-3 font-medium text-neutral-600">{t('categories.colSubcategories')}</th>
                  <th className="text-left py-3 px-3 font-medium text-neutral-600">{t('categories.colProducts')}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((cat) => (
                  <SelectableCategoryRow
                    key={cat.id}
                    category={cat}
                    selected={selected.includes(cat.id)}
                    onToggle={() => toggle(cat.id)}
                    variant="list"
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="relative z-10 flex gap-3 border-t border-table-border px-5 py-4 flex-shrink-0">
        <Button variant="secondary" fullWidth={false} size="md" onClick={onCancel} className="flex-1 md:flex-none">
          {t('edit.cancel')}
        </Button>
        <Button variant="primary" fullWidth={false} size="md" onClick={onSave} className="flex-1 md:flex-none">
          {t('edit.save')}
        </Button>
      </div>
    </div>
  )
}
