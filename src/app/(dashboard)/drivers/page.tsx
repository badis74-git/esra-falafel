'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { FilterTabs, TabValue } from '@/components/ui/FilterTabs'
import { ViewToggle } from '@/components/ui/ViewToggle'
import { EmptyState } from '@/components/ui/EmptyState'
import { SearchInput } from '@/components/ui/SearchInput'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { DriverGridCard } from '@/components/drivers/DriverGridCard'
import { DriverListRow } from '@/components/drivers/DriverListRow'
import { AddDriverModal } from '@/components/drivers/AddDriverModal'
import { EditDriverModal } from '@/components/drivers/EditDriverModal'
import { DeleteDriverModal } from '@/components/drivers/DeleteDriverModal'
import { DriverCreatedModal } from '@/components/drivers/DriverCreatedModal'
import { ChangesSavedModal } from '@/components/drivers/ChangesSavedModal'
import { FailModal } from '@/components/drivers/FailModal'
import { mockDrivers, Driver } from '@/lib/mock/drivers'
import { useTranslations } from 'next-intl'
import { Download, Filter, Upload, User } from 'lucide-react'
import { useState } from 'react'

type DriverEditSection = 'personal' | 'address' | 'id' | 'vehicle' | 'orders' | 'zone' | 'reviews'

type ModalState =
  | { type: 'create' }
  | { type: 'created'; email: string; inviteLink: string }
  | { type: 'edit'; driver: Driver; section?: DriverEditSection }
  | { type: 'saved' }
  | { type: 'fail' }
  | { type: 'delete'; driver: Driver }
  | null

function UserIcon() {
  return <User size={20} className="text-white" />
}

export default function DriversPage() {
  const t = useTranslations('drivers')
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers)
  const [view, setView] = useState<'grid' | 'list'>('list')
  const [activeTab, setActiveTab] = useState<TabValue>('all')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<ModalState>(null)
  const [selected, setSelected] = useState<string[]>([])

  const filtered = drivers.filter((d) => {
    const matchTab = activeTab === 'all' || d.status === activeTab
    const matchSearch =
      !search ||
      `${d.firstName} ${d.lastName} ${d.email}`.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const counts = {
    total: drivers.length,
    active: drivers.filter((d) => d.status === 'active').length,
    inactive: drivers.filter((d) => d.status === 'inactive').length,
    archived: drivers.filter((d) => d.status === 'archived').length,
  }

  function handleToggleStatus(id: string, val: boolean) {
    setDrivers((prev) =>
      prev.map((d) => d.id === id ? { ...d, status: val ? 'active' : 'inactive' } : d)
    )
  }

  function handleDelete(driver: Driver) {
    setDrivers((prev) => prev.filter((d) => d.id !== driver.id))
    setModal(null)
  }

  function toggleSelect(id: string) {
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id])
  }

  const allIds = filtered.map((d) => d.id)
  const isAllSelected = allIds.length > 0 && allIds.every((id) => selected.includes(id))

  return (
    <DashboardLayout title={t('pageTitle')}>
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <StatCard label={t('stats.total')} count={counts.total} iconBgClass="bg-stat-orange" icon={<UserIcon />} trend={-2.1} />
        <StatCard label={t('stats.active')} count={counts.active} iconBgClass="bg-stat-green" icon={<UserIcon />} trend={1.5} />
        <StatCard label={t('stats.inactive')} count={counts.inactive} iconBgClass="bg-stat-yellow" icon={<UserIcon />} trend={2.4} />
        <StatCard label={t('stats.archived')} count={counts.archived} iconBgClass="bg-stat-red" icon={<UserIcon />} trend={2.4} />
      </div>

      {/* White content card */}
      <div className="bg-white rounded-[12px] shadow-card p-4 md:p-5">
        {/* Header row */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <h2 className="text-sm md:text-base font-bold text-neutral-900 whitespace-nowrap">
            {t('listTitle')}
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="secondary" fullWidth={false} size="md" className="gap-1.5 hidden sm:inline-flex">
              <Download size={14} /> {t('export')}
            </Button>
            <Button variant="secondary" fullWidth={false} size="md" className="gap-1.5 hidden sm:inline-flex">
              <Upload size={14} /> {t('import')}
            </Button>
            <Button
              variant="primary"
              fullWidth={false}
              size="md"
              onClick={() => setModal({ type: 'create' })}
            >
              {t('addNew')}
            </Button>
          </div>
        </div>

        {/* Filter + view row */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <FilterTabs active={activeTab} onChange={setActiveTab} />
          <div className="flex items-center gap-2 flex-wrap">
            <ViewToggle view={view} onChange={setView} />
            <SearchInput
              placeholder={t('table.fullName')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-36"
            />
            <Button variant="secondary" fullWidth={false} size="md">
              <Filter size={13} /> {t('table.actions')}
            </Button>
          </div>
        </div>

        {/* Content */}
        {filtered.length === 0 ? (
          <EmptyState
            title={t('empty.title')}
            subtitle={t('empty.subtitle')}
          />
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((driver) => (
              <DriverGridCard
                key={driver.id}
                driver={driver}
                onEdit={(d) => setModal({ type: 'edit', driver: d })}
                onDelete={(d) => setModal({ type: 'delete', driver: d })}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-table-header border-b border-table-border">
                  <th className="py-3 px-4 w-10">
                    <Checkbox
                      checked={isAllSelected}
                      onChange={() => setSelected(isAllSelected ? [] : allIds)}
                      id="select-all"
                    />
                  </th>
                  <th className="py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide whitespace-nowrap">{t('table.fullName')}</th>
                  <th className="py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide whitespace-nowrap">{t('table.phone')}</th>
                  <th className="py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">{t('table.role')}</th>
                  <th className="py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide whitespace-nowrap">{t('table.zone')}</th>
                  <th className="py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide whitespace-nowrap">{t('table.joinDate')}</th>
                  <th className="py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">{t('table.status')}</th>
                  <th className="py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide whitespace-nowrap">{t('table.activeInactive')}</th>
                  <th className="py-3 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">{t('table.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((driver) => (
                  <DriverListRow
                    key={driver.id}
                    driver={driver}
                    selected={selected.includes(driver.id)}
                    onSelect={toggleSelect}
                    onEdit={(d) => setModal({ type: 'edit', driver: d })}
                    onDelete={(d) => setModal({ type: 'delete', driver: d })}
                    onResendInvite={() => {}}
                    onToggleStatus={handleToggleStatus}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddDriverModal
        isOpen={modal?.type === 'create'}
        onClose={() => setModal(null)}
        onCreated={(email, inviteLink) => setModal({ type: 'created', email, inviteLink })}
      />

      {modal?.type === 'created' && (
        <DriverCreatedModal
          email={modal.email}
          inviteLink={modal.inviteLink}
          onReturnToList={() => setModal(null)}
          onCreateAnother={() => setModal({ type: 'create' })}
        />
      )}

      {modal?.type === 'edit' && (
        <EditDriverModal
          isOpen
          driver={modal.driver}
          onClose={() => setModal(null)}
          onSaved={() => setModal({ type: 'saved' })}
          onFail={() => setModal({ type: 'fail' })}
          onToggleStatus={handleToggleStatus}
        />
      )}

      {modal?.type === 'saved' && (
        <ChangesSavedModal onReturnToList={() => setModal(null)} />
      )}

      {modal?.type === 'fail' && (
        <FailModal
          onTryAgain={() => setModal(null)}
          onBack={() => setModal(null)}
        />
      )}

      {modal?.type === 'delete' && (
        <DeleteDriverModal
          driver={modal.driver}
          onConfirm={() => handleDelete(modal.driver)}
          onCancel={() => setModal(null)}
        />
      )}
    </DashboardLayout>
  )
}
