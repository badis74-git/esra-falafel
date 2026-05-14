'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { FilterTabs, TabValue } from '@/components/ui/FilterTabs'
import { ViewToggle } from '@/components/ui/ViewToggle'
import { EmptyState } from '@/components/ui/EmptyState'
import { SearchInput } from '@/components/ui/SearchInput'
import { Button } from '@/components/ui/Button'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { ZoneGridCard } from '@/components/zones/ZoneGridCard'
import { CreateZoneModal } from '@/components/zones/CreateZoneModal'
import { UpdateZoneModal } from '@/components/zones/UpdateZoneModal'
import { DeleteZoneModal } from '@/components/zones/DeleteZoneModal'
import { SuccessModal } from '@/components/zones/SuccessModal'
import { FailModal } from '@/components/zones/FailModal'
import { Zone, mockZones } from '@/lib/mock/zones'
import { Download, Edit, Filter, MapPin, MoreVertical, Plus, Trash2, Upload } from 'lucide-react'
import { useState } from 'react'

type ModalState =
  | { type: 'create' }
  | { type: 'update'; zone: Zone }
  | { type: 'delete'; zone: Zone }
  | { type: 'success'; variant: 'created' | 'updated' }
  | { type: 'fail' }
  | null

function MapPinIcon() {
  return <MapPin size={20} className="text-white" />
}

export default function ZonesPage() {
  const [zones, setZones] = useState<Zone[]>(mockZones)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [activeTab, setActiveTab] = useState<TabValue>('all')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<ModalState>(null)

  const filtered = zones.filter((z) => {
    const matchTab = activeTab === 'all' || z.status === activeTab
    const matchSearch = !search || z.name.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const counts = {
    total: zones.length,
    active: zones.filter((z) => z.status === 'active').length,
    inactive: zones.filter((z) => z.status === 'inactive').length,
    archived: zones.filter((z) => z.status === 'archived').length,
  }

  function handleToggleStatus(id: string, val: boolean) {
    setZones((prev) =>
      prev.map((z) => z.id === id ? { ...z, status: val ? 'active' : 'inactive' } : z)
    )
  }

  function handleDelete(zone: Zone) {
    setZones((prev) => prev.filter((z) => z.id !== zone.id))
    setModal(null)
  }

  return (
    <DashboardLayout title="Zone Management" breadcrumb="Admin">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <StatCard label="Total Zones" count={counts.total} iconBgClass="bg-stat-orange" icon={<MapPinIcon />} trend={-2.1} />
        <StatCard label="Active Zones" count={counts.active} iconBgClass="bg-stat-green" icon={<MapPinIcon />} trend={1.5} />
        <StatCard label="Inactive Zones" count={counts.inactive} iconBgClass="bg-stat-yellow" icon={<MapPinIcon />} trend={2.4} />
        <StatCard label="Archived Zones" count={counts.archived} iconBgClass="bg-stat-red" icon={<MapPinIcon />} trend={2.4} />
      </div>

      {/* White content card */}
      <div className="bg-white rounded-[12px] shadow-card p-4 md:p-5">
        {/* Header row */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <h2 className="text-sm md:text-base font-bold text-neutral-900 whitespace-nowrap">
            Zones List ({filtered.length})
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
              <span className="hidden sm:inline">Add New Zone</span>
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
            illustration="location"
            title="No Zones Created Yet"
            subtitle="Start creating your first zone."
          />
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((zone) => (
              <ZoneGridCard
                key={zone.id}
                zone={zone}
                onEdit={(z) => setModal({ type: 'update', zone: z })}
                onDelete={(z) => setModal({ type: 'delete', zone: z })}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        ) : (
          <ZonesListView
            zones={filtered}
            onEdit={(z) => setModal({ type: 'update', zone: z })}
            onDelete={(z) => setModal({ type: 'delete', zone: z })}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </div>

      {/* Modals */}
      {modal?.type === 'create' && (
        <CreateZoneModal
          onClose={() => setModal(null)}
          onCreated={() => setModal({ type: 'success', variant: 'created' })}
        />
      )}
      {modal?.type === 'update' && (
        <UpdateZoneModal
          zone={modal.zone}
          onClose={() => setModal(null)}
          onSaved={() => setModal({ type: 'success', variant: 'updated' })}
        />
      )}
      {modal?.type === 'delete' && (
        <DeleteZoneModal
          zoneName={modal.zone.name}
          onConfirm={() => handleDelete(modal.zone)}
          onCancel={() => setModal(null)}
        />
      )}
      {modal?.type === 'success' && (
        <SuccessModal
          variant={modal.variant}
          onGoToList={() => setModal(null)}
          onCreateAnother={modal.variant === 'created' ? () => setModal({ type: 'create' }) : undefined}
        />
      )}
      {modal?.type === 'fail' && (
        <FailModal onRetry={() => setModal(null)} onBack={() => setModal(null)} />
      )}
    </DashboardLayout>
  )
}

/* ── Inline list view ── */
interface ListViewProps {
  zones: Zone[]
  onEdit: (z: Zone) => void
  onDelete: (z: Zone) => void
  onToggleStatus: (id: string, val: boolean) => void
}

function ZonesListView({ zones, onEdit, onDelete, onToggleStatus }: ListViewProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-table-header border-b border-table-border">
            <th className="text-left py-3 px-4 font-medium text-neutral-500 w-8">
              <input type="checkbox" className="rounded" />
            </th>
            <th className="text-left py-3 px-4 font-medium text-neutral-500">Zone Name</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-500">Restaurants</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-500">Delivery Drivers</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-500">Customers</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-500">Orders</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-500">Creation Date</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-500">Description</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-500">Status</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((zone) => {
            const archived = zone.status === 'archived'
            return (
              <tr
                key={zone.id}
                className={`border-b border-table-border hover:bg-table-row-hover transition-colors ${archived ? 'opacity-60' : ''}`}
              >
                <td className="py-3 px-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="py-3 px-4 font-medium text-neutral-900">{zone.name}</td>
                <td className="py-3 px-4 text-neutral-700">{zone.restaurants}</td>
                <td className="py-3 px-4 text-neutral-700">{zone.drivers}</td>
                <td className="py-3 px-4 text-neutral-700">{zone.customers}</td>
                <td className="py-3 px-4 text-neutral-700">{zone.orders}</td>
                <td className="py-3 px-4 text-neutral-700">{zone.creationDate}</td>
                <td className="py-3 px-4 text-neutral-500 max-w-[180px] truncate">{zone.description}</td>
                <td className="py-3 px-4">
                  <StatusToggle
                    checked={zone.status === 'active'}
                    onChange={(val) => onToggleStatus(zone.id, val)}
                    disabled={archived}
                    size="md"
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(zone)}
                      disabled={archived}
                      className="text-neutral-400 hover:text-primary transition-colors disabled:opacity-40"
                    >
                      <Edit size={15} />
                    </button>
                    <button
                      onClick={() => onDelete(zone)}
                      disabled={archived}
                      className="text-neutral-400 hover:text-danger transition-colors disabled:opacity-40"
                    >
                      <Trash2 size={15} />
                    </button>
                    <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                      <MoreVertical size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2 pt-4">
        <Button variant="secondary" fullWidth={false} size="md" className="gap-1.5">
          ← Previous
        </Button>
        <span className="text-sm text-neutral-700 px-2">1</span>
        <Button variant="secondary" fullWidth={false} size="md" className="gap-1.5">
          Next →
        </Button>
      </div>
    </div>
  )
}
