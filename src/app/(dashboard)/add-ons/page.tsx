'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight, Download, Filter, Upload, UtensilsCrossed } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { FilterTabs, TabValue } from '@/components/ui/FilterTabs'
import { ViewToggle } from '@/components/ui/ViewToggle'
import { SearchInput } from '@/components/ui/SearchInput'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { AddOnGridCard } from '@/components/add-ons/AddOnGridCard'
import { AddOnListRow } from '@/components/add-ons/AddOnListRow'
import { AddAddOnModal } from '@/components/add-ons/AddAddOnModal'
import { EditAddOnModal } from '@/components/add-ons/EditAddOnModal'
import { DeleteAddOnModal } from '@/components/add-ons/DeleteAddOnModal'
import { SuccessModal } from '@/components/add-ons/SuccessModal'
import { FailModal } from '@/components/add-ons/FailModal'
import { mockAddOns, AddOn } from '@/lib/mock/addOns'

type ModalState =
  | { type: 'create' }
  | { type: 'edit'; addon: AddOn }
  | { type: 'delete'; addon: AddOn }
  | { type: 'success'; variant: 'created' | 'updated' }
  | { type: 'fail' }
  | null

export default function AddOnsPage() {
  const t = useTranslations('addOns')
  const tCommon = useTranslations('common')

  const [addOns, setAddOns] = useState<AddOn[]>(mockAddOns)
  const [filter, setFilter] = useState<TabValue>('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [modal, setModal] = useState<ModalState>(null)

  const counts = {
    total: addOns.length,
    active: addOns.filter((a) => a.status === 'active').length,
    inactive: addOns.filter((a) => a.status === 'inactive').length,
    archived: addOns.filter((a) => a.status === 'archived').length,
  }

  const filtered = useMemo(
    () =>
      addOns
        .filter((a) => filter === 'all' || a.status === filter)
        .filter(
          (a) =>
            !search ||
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.groupName.toLowerCase().includes(search.toLowerCase())
        ),
    [addOns, filter, search]
  )

  function handleToggleStatus(addon: AddOn) {
    const next = addon.status === 'active' ? 'inactive' : 'active'
    setAddOns((prev) => prev.map((a) => (a.id === addon.id ? { ...a, status: next } : a)))
  }

  function handleDuplicate(addon: AddOn) {
    const copy: AddOn = { ...addon, id: `ao${Date.now()}`, name: `Copy of ${addon.name}` }
    setAddOns((prev) => [...prev, copy])
  }

  function handleDelete(id: string) {
    setAddOns((prev) => prev.filter((a) => a.id !== id))
    setModal(null)
  }

  const allFilteredIds = filtered.map((a) => a.id)
  const isAllSelected =
    allFilteredIds.length > 0 && allFilteredIds.every((id) => selected.includes(id))

  function toggleAll() {
    setSelected(isAllSelected ? [] : allFilteredIds)
  }

  function toggleOne(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const FoodIcon = ({ color }: { color: string }) => (
    <UtensilsCrossed size={20} className={color} />
  )

  const btnBase =
    'flex items-center gap-1.5 px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-100 transition-colors whitespace-nowrap'

  return (
    <DashboardLayout title={t('pageTitle')}>
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
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
            {t('listTitle')} ({filtered.length})
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
          <FilterTabs active={filter} onChange={setFilter} />
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
            title={t('empty.title')}
            subtitle={t('empty.subtitle')}
          />
        ) : view === 'grid' ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((addon) => (
                <AddOnGridCard
                  key={addon.id}
                  addon={addon}
                  onDelete={(a) => setModal({ type: 'delete', addon: a })}
                  onEdit={(a) => setModal({ type: 'edit', addon: a })}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 text-sm">
              <button
                type="button"
                className="flex items-center gap-1 px-2 py-1 text-neutral-500 hover:text-neutral-700 disabled:opacity-40"
                disabled
              >
                <ChevronLeft size={14} /> {tCommon('previous')}
              </button>
              <button
                type="button"
                className="w-7 h-7 rounded bg-primary text-white text-sm font-medium"
              >
                1
              </button>
              <button
                type="button"
                className="flex items-center gap-1 px-2 py-1 text-neutral-700 hover:text-neutral-900"
              >
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
                        id="select-all-addons"
                        checked={isAllSelected}
                        onChange={toggleAll}
                      />
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600 whitespace-nowrap">
                      {t('table.name')}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600 whitespace-nowrap">
                      {t('table.group')}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600 whitespace-nowrap">
                      {t('table.price')}
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-neutral-600 whitespace-nowrap">
                      {t('table.products')}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">
                      {t('table.status')}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">
                      {t('table.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((addon) => (
                    <AddOnListRow
                      key={addon.id}
                      addon={addon}
                      selected={selected.includes(addon.id)}
                      onSelect={() => toggleOne(addon.id)}
                      onEdit={(a) => setModal({ type: 'edit', addon: a })}
                      onDuplicate={handleDuplicate}
                      onDelete={(a) => setModal({ type: 'delete', addon: a })}
                      onToggleStatus={handleToggleStatus}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-neutral-500">
                {filtered.length} / {addOns.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="flex items-center gap-1 px-2 py-1 text-neutral-500 hover:text-neutral-700 disabled:opacity-40"
                  disabled
                >
                  <ChevronLeft size={14} /> {tCommon('previous')}
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded bg-primary text-white text-sm font-medium"
                >
                  1
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 px-2 py-1 text-neutral-700 hover:text-neutral-900"
                >
                  {tCommon('next')} <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      {modal?.type === 'create' && (
        <AddAddOnModal
          isOpen
          onClose={() => setModal(null)}
          onCreated={() => setModal({ type: 'success', variant: 'created' })}
        />
      )}

      {modal?.type === 'edit' && (
        <EditAddOnModal
          isOpen
          addon={modal.addon}
          onClose={() => setModal(null)}
          onSaved={() => setModal({ type: 'success', variant: 'updated' })}
        />
      )}

      {modal?.type === 'delete' && (
        <DeleteAddOnModal
          isOpen
          addon={modal.addon}
          onClose={() => setModal(null)}
          onConfirm={() => handleDelete(modal.addon.id)}
        />
      )}

      {modal?.type === 'success' && (
        <SuccessModal
          variant={modal.variant}
          onGoToList={() => setModal(null)}
          onCreateAnother={
            modal.variant === 'created' ? () => setModal({ type: 'create' }) : undefined
          }
        />
      )}

      {modal?.type === 'fail' && (
        <FailModal
          onTryAgain={() => setModal({ type: 'create' })}
          onBack={() => setModal(null)}
        />
      )}
    </DashboardLayout>
  )
}
