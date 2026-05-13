'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { FilterTabs, TabValue } from '@/components/ui/FilterTabs'
import { ViewToggle } from '@/components/ui/ViewToggle'
import { EmptyState } from '@/components/ui/EmptyState'
import { SearchInput } from '@/components/ui/SearchInput'
import { Button } from '@/components/ui/Button'
import { DriversListView } from '@/components/drivers/DriversListView'
import { DriversGridView } from '@/components/drivers/DriversGridView'
import { CreateDriverModal } from '@/components/drivers/CreateDriverModal'
import { UpdateDriverModal } from '@/components/drivers/UpdateDriverModal'
import { DeleteDriverModal } from '@/components/drivers/DeleteDriverModal'
import { InvitationModal } from '@/components/drivers/InvitationModal'
import { SuccessModal } from '@/components/drivers/SuccessModal'
import { FailModal } from '@/components/drivers/FailModal'
import { Driver, mockDrivers } from '@/lib/mock/drivers'
import { Download, Filter, Plus, Truck, Upload } from 'lucide-react'
import { useState } from 'react'

type ModalState =
  | { type: 'create' }
  | { type: 'update'; driver: Driver }
  | { type: 'delete'; driver: Driver }
  | { type: 'invite'; email: string; inviteLink: string }
  | { type: 'success'; variant: 'created' | 'updated' }
  | { type: 'fail' }
  | null

function TruckIcon() {
  return <Truck size={20} className="text-white" />
}

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers)
  const [view, setView] = useState<'grid' | 'list'>('list')
  const [activeTab, setActiveTab] = useState<TabValue>('all')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<ModalState>(null)

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

  return (
    <DashboardLayout title="Delivery Drivers" breadcrumb="Admin">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <StatCard label="Total Delivery Drivers" count={counts.total} iconBgClass="bg-stat-orange" icon={<TruckIcon />} trend={-2.1} />
        <StatCard label="Active Delivery Drivers" count={counts.active} iconBgClass="bg-stat-green" icon={<TruckIcon />} trend={1.5} />
        <StatCard label="Inactive Delivery Drivers" count={counts.inactive} iconBgClass="bg-stat-yellow" icon={<TruckIcon />} trend={2.4} />
        <StatCard label="Archived Delivery Drivers" count={counts.archived} iconBgClass="bg-stat-red" icon={<TruckIcon />} trend={2.4} />
      </div>

      {/* White content card */}
      <div className="bg-white rounded-[12px] shadow-card p-4 md:p-5">
        {/* Header row */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <h2 className="text-sm md:text-base font-bold text-neutral-900 whitespace-nowrap">
            Delivery Drivers List ({filtered.length})
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="secondary" fullWidth={false} size="md" className="gap-1.5 hidden sm:inline-flex min-h-[44px]">
              <Download size={14} /> Export
            </Button>
            <Button variant="secondary" fullWidth={false} size="md" className="gap-1.5 hidden sm:inline-flex min-h-[44px]">
              <Upload size={14} /> Import
            </Button>
            <Button
              variant="primary"
              fullWidth={false}
              size="md"
              onClick={() => setModal({ type: 'create' })}
              className="min-h-[44px]"
            >
              <Plus size={14} />
              <span className="hidden sm:inline">Add New Delivery Driver</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>

        {/* Filter + view row */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <FilterTabs active={activeTab} onChange={setActiveTab} />
          <div className="flex items-center gap-2 flex-wrap">
            <ViewToggle view={view} onChange={setView} />
            <SearchInput
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-32 md:w-40"
            />
            <Button variant="secondary" fullWidth={false} size="md" className="min-h-[44px]">
              <Filter size={13} /> Filters
            </Button>
          </div>
        </div>

        {/* Content */}
        {filtered.length === 0 ? (
          <EmptyState
            title="No Active Delivery Drivers"
            subtitle="Send an invitation to add users to your system."
          />
        ) : view === 'list' ? (
          <DriversListView
            drivers={filtered}
            onEdit={(d) => setModal({ type: 'update', driver: d })}
            onDelete={(d) => setModal({ type: 'delete', driver: d })}
            onToggleStatus={handleToggleStatus}
          />
        ) : (
          <DriversGridView
            drivers={filtered}
            onEdit={(d) => setModal({ type: 'update', driver: d })}
            onDelete={(d) => setModal({ type: 'delete', driver: d })}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </div>

      {/* Modals */}
      {modal?.type === 'create' && (
        <CreateDriverModal
          onClose={() => setModal(null)}
          onCreated={(email) =>
            setModal({ type: 'invite', email, inviteLink: 'https://webapp.com/invite-driver/abc' })
          }
        />
      )}
      {modal?.type === 'update' && (
        <UpdateDriverModal
          driver={modal.driver}
          onClose={() => setModal(null)}
          onSaved={() => setModal({ type: 'success', variant: 'updated' })}
        />
      )}
      {modal?.type === 'delete' && (
        <DeleteDriverModal
          driverName={`${modal.driver.firstName} ${modal.driver.lastName}`}
          onConfirm={() => handleDelete(modal.driver)}
          onCancel={() => setModal(null)}
        />
      )}
      {modal?.type === 'invite' && (
        <InvitationModal
          email={modal.email}
          inviteLink={modal.inviteLink}
          onClose={() => setModal(null)}
          onCreateNew={() => setModal({ type: 'create' })}
        />
      )}
      {modal?.type === 'success' && (
        <SuccessModal variant={modal.variant} onClose={() => setModal(null)} />
      )}
      {modal?.type === 'fail' && (
        <FailModal onRetry={() => setModal(null)} onBack={() => setModal(null)} />
      )}
    </DashboardLayout>
  )
}
