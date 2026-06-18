'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Filter } from 'lucide-react'
import { ViewToggle } from '@/components/ui/ViewToggle'
import { SearchInput } from '@/components/ui/SearchInput'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import { SelectableProductRow } from '@/components/ui/SelectableProductRow'
import { cn } from '@/lib/utils'
import type { MenuProduct } from '@/lib/mock/menus'

type ProductTab = 'all' | 'sandwich' | 'plates' | 'combos' | 'starters' | 'drinks'

const PER_PAGE = 8

interface Props {
  products: MenuProduct[]
  selectedIds: string[]
  onSave: () => void
  onCancel: () => void
}

export function MenuProductsSection({ products, selectedIds, onSave, onCancel }: Props) {
  const t = useTranslations('menus')
  const tCommon = useTranslations('common')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<ProductTab>('all')
  const [selected, setSelected] = useState<string[]>(selectedIds)
  const [page, setPage] = useState(1)

  const TABS: { key: ProductTab; label: string }[] = [
    { key: 'all', label: t('products.tabs.all') },
    { key: 'sandwich', label: t('products.tabs.sandwich') },
    { key: 'plates', label: t('products.tabs.plates') },
    { key: 'combos', label: t('products.tabs.combos') },
    { key: 'starters', label: t('products.tabs.starters') },
    { key: 'drinks', label: t('products.tabs.drinks') },
  ]

  const filtered = products.filter((p) => {
    const matchTab =
      tab === 'all' ||
      p.category.toLowerCase().includes(tab === 'sandwich' ? 'sandwich' : tab.replace('s', '').toLowerCase())
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)

  const allIds = filtered.map((p) => p.id)
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

  function changeTab(key: ProductTab) {
    setTab(key)
    setPage(1)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <h3 className="text-sm font-semibold text-primary">{t('products.title')}</h3>

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

        {/* Category tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => changeTab(key)}
              className={cn(
                'px-3 py-1.5 text-sm rounded-full transition-colors whitespace-nowrap',
                tab === key
                  ? 'bg-primary text-white font-medium'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Select All */}
        <div className="flex items-center gap-3 px-2 py-1">
          <Checkbox
            id="select-all-menu-prods"
            checked={isAllSelected}
            onChange={toggleAll}
            label={t('products.selectAll')}
          />
        </div>

        {/* Grid view */}
        {view === 'grid' ? (
          <div className="rounded-[12px] border border-table-border overflow-hidden bg-white">
            {paginated.map((prod) => (
              <SelectableProductRow
                key={prod.id}
                product={prod}
                selected={selected.includes(prod.id)}
                onToggle={() => toggle(prod.id)}
                variant="grid"
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
                  <th className="text-left py-3 px-3 font-medium text-neutral-600">{t('products.colName')}</th>
                  <th className="text-left py-3 px-3 font-medium text-neutral-600">{t('products.colCategory')}</th>
                  <th className="text-left py-3 px-3 font-medium text-neutral-600">{t('products.colDietary')}</th>
                  <th className="text-left py-3 px-3 font-medium text-neutral-600">{t('products.colPrice')}</th>
                  <th className="text-left py-3 px-3 font-medium text-neutral-600">{t('products.colDiscount')}</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((prod) => (
                  <SelectableProductRow
                    key={prod.id}
                    product={prod}
                    selected={selected.includes(prod.id)}
                    onToggle={() => toggle(prod.id)}
                    variant="list"
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filtered.length > PER_PAGE && (
          <div className="flex items-center justify-center gap-1 flex-wrap">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="px-3 py-1.5 text-xs text-neutral-700 rounded hover:bg-neutral-100 disabled:opacity-40 transition-colors"
            >
              ← {tCommon('previous')}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={cn(
                  'w-7 h-7 text-xs rounded transition-colors',
                  p === safePage ? 'bg-primary text-white' : 'text-neutral-700 hover:bg-neutral-100'
                )}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="px-3 py-1.5 text-xs text-neutral-700 rounded hover:bg-neutral-100 disabled:opacity-40 transition-colors"
            >
              {tCommon('next')} →
            </button>
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
