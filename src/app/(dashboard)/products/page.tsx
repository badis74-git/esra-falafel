'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { ViewToggle } from '@/components/ui/ViewToggle'
import { EmptyState } from '@/components/ui/EmptyState'
import { SearchInput } from '@/components/ui/SearchInput'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { ProductGridCard } from '@/components/products/ProductGridCard'
import { ProductListRow } from '@/components/products/ProductListRow'
import { AddProductModal } from '@/components/products/AddProductModal'
import { EditProductModal } from '@/components/products/EditProductModal'
import { DeleteProductModal } from '@/components/products/DeleteProductModal'
import { SuccessModal } from '@/components/products/SuccessModal'
import { FailModal } from '@/components/products/FailModal'
import { mockProducts, Product } from '@/lib/mock/products'
import { cn } from '@/lib/utils'
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Plus,
  UtensilsCrossed,
  Upload,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

type CategoryTab = 'all' | 'sandwich' | 'plates' | 'combos' | 'starters' | 'drinks'

type ModalState =
  | { type: 'create' }
  | { type: 'edit'; product: Product }
  | { type: 'delete'; product: Product }
  | { type: 'success'; variant: 'created' | 'updated' }
  | { type: 'fail' }
  | null

function getCategoryTab(category: string): Exclude<CategoryTab, 'all'> {
  const c = category.toLowerCase()
  if (c.includes('bread') || c.includes('laffa') || c.includes('baguette') || c.includes('sandwich')) return 'sandwich'
  if (c.includes('plate') || c === 'plates') return 'plates'
  if (c.includes('combo')) return 'combos'
  if (c.includes('drink')) return 'drinks'
  return 'starters'
}

export default function ProductsPage() {
  const t = useTranslations('products')
  const tCommon = useTranslations('common')
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [activeTab, setActiveTab] = useState<CategoryTab>('all')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<ModalState>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const filtered = products.filter((p) => {
    const matchTab = activeTab === 'all' || getCategoryTab(p.category) === activeTab
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const counts = {
    total: products.length,
    active: products.filter((p) => p.status === 'active').length,
    inactive: products.filter((p) => p.status === 'inactive').length,
    archived: products.filter((p) => p.status === 'archived').length,
  }

  const categoryTabs: { value: CategoryTab; labelKey: string }[] = [
    { value: 'all', labelKey: 'tabs.viewAll' },
    { value: 'sandwich', labelKey: 'tabs.sandwich' },
    { value: 'plates', labelKey: 'tabs.plates' },
    { value: 'combos', labelKey: 'tabs.combos' },
    { value: 'starters', labelKey: 'tabs.starters' },
    { value: 'drinks', labelKey: 'tabs.drinks' },
  ]

  function handleToggleStatus(id: string, val: boolean) {
    setProducts((prev) =>
      prev.map((p) => p.id === id ? { ...p, status: val ? 'active' : 'inactive' } : p)
    )
  }

  function handleDuplicate(product: Product) {
    const copy: Product = { ...product, id: String(Date.now()), name: `Copy of ${product.name}` }
    setProducts((prev) => [copy, ...prev])
  }

  function handleDelete(product: Product) {
    setProducts((prev) => prev.filter((p) => p.id !== product.id))
    setModal(null)
  }

  const allFilteredIds = filtered.map((p) => p.id)
  const isAllSelected = allFilteredIds.length > 0 && allFilteredIds.every((id) => selectedIds.includes(id))

  function toggleSelectAll() {
    setSelectedIds(isAllSelected ? [] : allFilteredIds)
  }

  function toggleSelectOne(id: string) {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  const FoodIcon = ({ color }: { color: string }) => (
    <UtensilsCrossed size={20} className={color} />
  )

  const btnBase = 'flex items-center gap-1.5 px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-100 transition-colors whitespace-nowrap'

  return (
    <DashboardLayout title={t('pageTitle')}>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label={t('stats.total')}
          count={counts.total}
          iconBgClass="bg-stat-orange-bg"
          icon={<FoodIcon color="text-stat-orange" />}
          trend={-2.1}
        />
        <StatCard
          label={t('stats.active')}
          count={counts.active}
          iconBgClass="bg-stat-green-bg"
          icon={<FoodIcon color="text-stat-green" />}
          trend={1.5}
        />
        <StatCard
          label={t('stats.inactive')}
          count={counts.inactive}
          iconBgClass="bg-stat-yellow-bg"
          icon={<FoodIcon color="text-stat-yellow" />}
          trend={2.4}
        />
        <StatCard
          label={t('stats.archived')}
          count={counts.archived}
          iconBgClass="bg-stat-red-bg"
          icon={<FoodIcon color="text-stat-red" />}
          trend={2.4}
        />
      </div>

      {/* Main content card */}
      <div className="bg-white rounded-[12px] shadow-card p-6">

        {/* Top bar: title + actions */}
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <h2 className="font-bold text-neutral-900 text-base whitespace-nowrap">
            {t('listTitle', { count: filtered.length })}
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <button type="button" className={btnBase}>
              <Download size={14} /> {tCommon('export')}
            </button>
            <button type="button" className={btnBase}>
              <Upload size={14} /> {tCommon('import')}
            </button>
            <Button
              variant="primary"
              size="md"
              fullWidth={false}
              onClick={() => setModal({ type: 'create' })}
            >
              <Plus size={14} /> {t('addNew')}
            </Button>
          </div>
        </div>

        {/* Toolbar: category tabs + view controls */}
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          {/* Category filter tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {categoryTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
                  activeTab === tab.value
                    ? 'bg-primary text-white'
                    : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                )}
              >
                {t(tab.labelKey as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
            <ViewToggle view={view} onChange={setView} />
            <SearchInput
              placeholder={tCommon('search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-44"
            />
            <button type="button" className={btnBase}>
              <Filter size={14} /> {tCommon('filters')}
            </button>
          </div>
        </div>

        {/* Content */}
        {filtered.length === 0 ? (
          <EmptyState
            illustration="box"
            title={t('emptyTitle')}
            subtitle={t('emptySubtitle')}
          />
        ) : view === 'grid' ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((product) => (
                <ProductGridCard
                  key={product.id}
                  product={product}
                  onEdit={(p) => setModal({ type: 'edit', product: p })}
                  onDelete={(p) => setModal({ type: 'delete', product: p })}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 text-sm">
              <button type="button" className="flex items-center gap-1 px-2 py-1 text-neutral-500 hover:text-neutral-700 disabled:opacity-40" disabled>
                <ChevronLeft size={14} /> {tCommon('previous')}
              </button>
              <button type="button" className="w-7 h-7 rounded bg-primary text-white text-sm font-medium">1</button>
              <button type="button" className="flex items-center gap-1 px-2 py-1 text-neutral-700 hover:text-neutral-900">
                {tCommon('next')} <ChevronRight size={14} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-neutral-50 border-b border-table-border">
                    <th className="text-left py-3 px-4 w-10">
                      <Checkbox
                        id="select-all-products"
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">{t('table.productName')}</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">{t('table.category')}</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">{t('table.dietaryType')}</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">{t('table.price')}</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">{t('table.addOns')}</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">{t('table.assignedMenus')}</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">{t('table.status')}</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">{t('table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((product) => (
                    <ProductListRow
                      key={product.id}
                      product={product}
                      selected={selectedIds.includes(product.id)}
                      onToggleSelect={() => toggleSelectOne(product.id)}
                      onEdit={(p) => setModal({ type: 'edit', product: p })}
                      onDelete={(p) => setModal({ type: 'delete', product: p })}
                      onDuplicate={handleDuplicate}
                      onToggleStatus={handleToggleStatus}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-neutral-500">
                {t('showing', { count: filtered.length, total: products.length })}
              </span>
              <div className="flex items-center gap-1">
                <button type="button" className="flex items-center gap-1 px-2 py-1 text-neutral-500 hover:text-neutral-700 disabled:opacity-40" disabled>
                  <ChevronLeft size={14} /> {tCommon('previous')}
                </button>
                <button type="button" className="w-7 h-7 rounded bg-primary text-white text-sm font-medium">1</button>
                <button type="button" className="flex items-center gap-1 px-2 py-1 text-neutral-700 hover:text-neutral-900">
                  {tCommon('next')} <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      {modal?.type === 'create' && (
        <AddProductModal
          isOpen
          onClose={() => setModal(null)}
          onCreated={() => setModal({ type: 'success', variant: 'created' })}
        />
      )}

      {modal?.type === 'edit' && (
        <EditProductModal
          isOpen
          product={modal.product}
          onClose={() => setModal(null)}
          onSaved={() => setModal({ type: 'success', variant: 'updated' })}
        />
      )}

      {modal?.type === 'delete' && (
        <DeleteProductModal
          isOpen
          product={modal.product}
          onClose={() => setModal(null)}
          onConfirm={() => handleDelete(modal.product)}
        />
      )}

      {modal?.type === 'success' && (
        <SuccessModal
          variant={modal.variant}
          onReturnToList={() => setModal(null)}
          onCreateNew={() => setModal({ type: 'create' })}
        />
      )}

      {modal?.type === 'fail' && (
        <FailModal
          onRetry={() => setModal({ type: 'create' })}
          onBack={() => setModal(null)}
        />
      )}
    </DashboardLayout>
  )
}
