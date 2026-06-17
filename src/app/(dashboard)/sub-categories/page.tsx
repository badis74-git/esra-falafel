'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { FilterTabs, TabValue } from '@/components/ui/FilterTabs'
import { ViewToggle } from '@/components/ui/ViewToggle'
import { EmptyState } from '@/components/ui/EmptyState'
import { SearchInput } from '@/components/ui/SearchInput'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { SubCategoryGridCard } from '@/components/sub-categories/SubCategoryGridCard'
import { SubCategoryListRow } from '@/components/sub-categories/SubCategoryListRow'
import { AddSubCategoryModal } from '@/components/sub-categories/AddSubCategoryModal'
import { EditSubCategoryModal } from '@/components/sub-categories/EditSubCategoryModal'
import { DeleteSubCategoryModal } from '@/components/sub-categories/DeleteSubCategoryModal'
import { SuccessModal } from '@/components/sub-categories/SuccessModal'
import { FailModal } from '@/components/sub-categories/FailModal'
import { mockSubCategories, SubCategory } from '@/lib/mock/subCategories'
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  UtensilsCrossed,
  Upload,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

type ModalState =
  | { type: 'create' }
  | { type: 'edit'; subCategory: SubCategory }
  | { type: 'delete'; subCategory: SubCategory }
  | { type: 'success'; variant: 'created' | 'updated' }
  | { type: 'fail' }
  | null

export default function SubCategoriesPage() {
  const t = useTranslations('subCategories')
  const tCommon = useTranslations('common')
  const [subCategories, setSubCategories] = useState<SubCategory[]>(mockSubCategories)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [activeTab, setActiveTab] = useState<TabValue>('all')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<ModalState>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const filtered = subCategories.filter((sc) => {
    const matchTab = activeTab === 'all' || sc.status === activeTab
    const matchSearch = !search || sc.name.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const counts = {
    total: subCategories.length,
    active: subCategories.filter((sc) => sc.status === 'active').length,
    inactive: subCategories.filter((sc) => sc.status === 'inactive').length,
    archived: subCategories.filter((sc) => sc.status === 'archived').length,
  }

  function handleToggleStatus(id: string, val: boolean) {
    setSubCategories((prev) =>
      prev.map((sc) => sc.id === id ? { ...sc, status: val ? 'active' : 'inactive' } : sc)
    )
  }

  function handleDuplicate(subCategory: SubCategory) {
    const copy: SubCategory = { ...subCategory, id: String(Date.now()), name: `Copy of ${subCategory.name}` }
    setSubCategories((prev) => [copy, ...prev])
  }

  function handleDelete(subCategory: SubCategory) {
    setSubCategories((prev) => prev.filter((sc) => sc.id !== subCategory.id))
    setModal(null)
  }

  const allFilteredIds = filtered.map((sc) => sc.id)
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
              {t('addNew')}
            </Button>
          </div>
        </div>

        {/* Toolbar: filter tabs + view controls */}
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          <FilterTabs active={activeTab} onChange={setActiveTab} />
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
              {filtered.map((sc) => (
                <SubCategoryGridCard
                  key={sc.id}
                  subCategory={sc}
                  onEdit={(s) => setModal({ type: 'edit', subCategory: s })}
                  onDelete={(s) => setModal({ type: 'delete', subCategory: s })}
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
                        id="select-all-subcategories"
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">{t('table.subCategoryName')}</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">{t('table.parentCategory')}</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">{t('table.products')}</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">{t('table.subCategories')}</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">{t('table.addOnGroups')}</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">{t('table.creationDate')}</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">{t('table.status')}</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">{t('table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((sc) => (
                    <SubCategoryListRow
                      key={sc.id}
                      subCategory={sc}
                      selected={selectedIds.includes(sc.id)}
                      onToggleSelect={() => toggleSelectOne(sc.id)}
                      onEdit={(s) => setModal({ type: 'edit', subCategory: s })}
                      onDelete={(s) => setModal({ type: 'delete', subCategory: s })}
                      onDuplicate={handleDuplicate}
                      onToggleStatus={handleToggleStatus}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-neutral-500">
                {t('showing', { count: filtered.length, total: subCategories.length })}
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
        <AddSubCategoryModal
          isOpen
          onClose={() => setModal(null)}
          onCreated={() => setModal({ type: 'success', variant: 'created' })}
        />
      )}

      {modal?.type === 'edit' && (
        <EditSubCategoryModal
          isOpen
          subCategory={modal.subCategory}
          onClose={() => setModal(null)}
          onSaved={() => setModal({ type: 'success', variant: 'updated' })}
        />
      )}

      {modal?.type === 'delete' && (
        <DeleteSubCategoryModal
          isOpen
          subCategory={modal.subCategory}
          onClose={() => setModal(null)}
          onConfirm={() => handleDelete(modal.subCategory)}
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
