'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { FilterTabs, TabValue } from '@/components/ui/FilterTabs'
import { ViewToggle } from '@/components/ui/ViewToggle'
import { ManagersListView } from '@/components/managers/ManagersListView'
import { ManagersGridView } from '@/components/managers/ManagersGridView'
import { EmptyState } from '@/components/ui/EmptyState'
import { CreateManagerModal } from '@/components/managers/CreateManagerModal'
import { UpdateManagerModal } from '@/components/managers/UpdateManagerModal'
import { DeleteManagerModal } from '@/components/managers/DeleteManagerModal'
import { InvitationModal } from '@/components/managers/InvitationModal'
import { SuccessModal } from '@/components/managers/SuccessModal'
import { FailModal } from '@/components/managers/FailModal'
import { SearchInput } from '@/components/ui/SearchInput'
import { Button } from '@/components/ui/Button'
import { Manager, mockManagers } from '@/lib/mock/managers'
import { Download, Filter, Plus, Upload, Users } from 'lucide-react'
import { useState } from 'react'

type ModalState =
  | { type: 'create' }
  | { type: 'update'; manager: Manager }
  | { type: 'delete'; manager: Manager }
  | { type: 'invite'; email: string }
  | { type: 'success' }
  | { type: 'fail' }
  | null

function PersonIcon() {
  return <Users size={20} className="text-white" />
}

export default function ManagersPage() {
  const [managers, setManagers] = useState<Manager[]>(mockManagers)
  const [view, setView] = useState<'grid' | 'list'>('list')
  const [activeTab, setActiveTab] = useState<TabValue>('all')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<ModalState>(null)

  const filtered = managers.filter((m) => {
    const matchTab = activeTab === 'all' || m.status === activeTab
    const matchSearch =
      !search ||
      `${m.firstName} ${m.lastName} ${m.email}`.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const counts = {
    total: managers.length,
    active: managers.filter((m) => m.status === 'active').length,
    inactive: managers.filter((m) => m.status === 'inactive').length,
    archived: managers.filter((m) => m.status === 'archived').length,
  }

  function handleToggleStatus(id: string, val: boolean) {
    setManagers((prev) =>
      prev.map((m) => m.id === id ? { ...m, status: val ? 'active' : 'inactive' } : m)
    )
  }

  function handleDelete(manager: Manager) {
    setManagers((prev) => prev.filter((m) => m.id !== manager.id))
    setModal(null)
  }

  return (
    <DashboardLayout title="Restaurant Managers" breadcrumb="Admin">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <StatCard label="Total Restaurant Manager" count={counts.total} iconBgClass="bg-stat-orange" icon={<PersonIcon />} trend={-2.1} />
        <StatCard label="Active Restaurant Manager" count={counts.active} iconBgClass="bg-stat-green" icon={<PersonIcon />} trend={1.5} />
        <StatCard label="Inactive Restaurant Manager" count={counts.inactive} iconBgClass="bg-stat-yellow" icon={<PersonIcon />} trend={2.4} />
        <StatCard label="Archived Restaurant Manager" count={counts.archived} iconBgClass="bg-stat-red" icon={<PersonIcon />} trend={2.4} />
      </div>

      {/* White content card */}
      <div className="bg-white rounded-[12px] shadow-card p-4 md:p-5">
        {/* Header row */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <h2 className="text-sm md:text-base font-bold text-neutral-900 whitespace-nowrap">
            Restaurant Managers List ({filtered.length})
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="secondary" fullWidth={false} size="md" className="gap-1.5 hidden sm:inline-flex min-h-[44px]">
              <Download size={14} /> Export
            </Button>
            <Button variant="secondary" fullWidth={false} size="md" className="gap-1.5 hidden sm:inline-flex min-h-[44px]">
              <Upload size={14} /> Import
            </Button>
            <Button variant="primary" fullWidth={false} size="md" onClick={() => setModal({ type: 'create' })} className="min-h-[44px]">
              <Plus size={14} /> <span className="hidden sm:inline">Add New Manager</span><span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>

        {/* Filter + view row */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <FilterTabs active={activeTab} onChange={setActiveTab} />
          <div className="flex items-center gap-2 flex-wrap">
            <ViewToggle view={view} onChange={setView} />
            <SearchInput placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="w-32 md:w-40" />
            <Button variant="secondary" fullWidth={false} size="md" className="min-h-[44px]">
              <Filter size={13} /> Filters
            </Button>
          </div>
        </div>

        {/* Content */}
        {filtered.length === 0 ? (
          <EmptyState />
        ) : view === 'list' ? (
          <ManagersListView
            managers={filtered}
            onEdit={(m) => setModal({ type: 'update', manager: m })}
            onDelete={(m) => setModal({ type: 'delete', manager: m })}
            onToggleStatus={handleToggleStatus}
          />
        ) : (
          <ManagersGridView
            managers={filtered}
            onEdit={(m) => setModal({ type: 'update', manager: m })}
            onDelete={(m) => setModal({ type: 'delete', manager: m })}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </div>

      {/* Modals */}
      {modal?.type === 'create' && (
        <CreateManagerModal
          onClose={() => setModal(null)}
          onCreated={(email) => setModal({ type: 'invite', email })}
        />
      )}
      {modal?.type === 'update' && (
        <UpdateManagerModal
          manager={modal.manager}
          onClose={() => setModal(null)}
          onSaved={() => setModal({ type: 'success' })}
        />
      )}
      {modal?.type === 'delete' && (
        <DeleteManagerModal
          managerName={`${modal.manager.firstName} ${modal.manager.lastName}`}
          onConfirm={() => handleDelete(modal.manager)}
          onCancel={() => setModal(null)}
        />
      )}
      {modal?.type === 'invite' && (
        <InvitationModal
          email={modal.email}
          onClose={() => setModal(null)}
          onCreateNew={() => setModal({ type: 'create' })}
        />
      )}
      {modal?.type === 'success' && (
        <SuccessModal onClose={() => setModal(null)} />
      )}
      {modal?.type === 'fail' && (
        <FailModal onRetry={() => setModal(null)} onBack={() => setModal(null)} />
      )}
    </DashboardLayout>
  )
}
