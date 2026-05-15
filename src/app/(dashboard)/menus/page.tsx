'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { FilterTabs, TabValue } from '@/components/ui/FilterTabs'
import { ViewToggle } from '@/components/ui/ViewToggle'
import { EmptyState } from '@/components/ui/EmptyState'
import { SearchInput } from '@/components/ui/SearchInput'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { BranchPills } from '@/components/menus/BranchPills'
import { MenuGridCard } from '@/components/menus/MenuGridCard'
import { MenuWizardModal } from '@/components/menus/MenuWizardModal'
import { UpdateMenuModal } from '@/components/menus/UpdateMenuModal'
import { DeleteMenuModal } from '@/components/menus/DeleteMenuModal'
import { SuccessModal } from '@/components/menus/SuccessModal'
import { FailModal } from '@/components/menus/FailModal'
import { mockMenus, Menu } from '@/lib/mock/menus'
import { cn } from '@/lib/utils'
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Edit,
  FileText,
  Filter,
  MoreVertical,
  Plus,
  Trash2,
  Upload,
} from 'lucide-react'
import { useState } from 'react'

type ModalState =
  | { type: 'create' }
  | { type: 'update'; menu: Menu }
  | { type: 'delete'; menu: Menu }
  | { type: 'success'; variant: 'created' | 'updated' }
  | { type: 'fail' }
  | null

export default function MenusPage() {
  const [menus, setMenus] = useState<Menu[]>(mockMenus)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [activeTab, setActiveTab] = useState<TabValue>('all')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<ModalState>(null)

  const filtered = menus.filter((m) => {
    const matchTab = activeTab === 'all' || m.status === activeTab
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const counts = {
    total: menus.length,
    active: menus.filter((m) => m.status === 'active').length,
    inactive: menus.filter((m) => m.status === 'inactive').length,
    archived: menus.filter((m) => m.status === 'archived').length,
  }

  function handleToggleStatus(id: string, val: boolean) {
    setMenus((prev) =>
      prev.map((m) => m.id === id ? { ...m, status: val ? 'active' : 'inactive' } : m)
    )
  }

  function handleDuplicate(menu: Menu) {
    const copy: Menu = {
      ...menu,
      id: String(Date.now()),
      name: `Copy of ${menu.name}`,
    }
    setMenus((prev) => [copy, ...prev])
  }

  function handleDelete(menu: Menu) {
    setMenus((prev) => prev.filter((m) => m.id !== menu.id))
    setModal(null)
  }

  function handleCreated() {
    setModal({ type: 'success', variant: 'created' })
  }

  function handleSaved() {
    setModal({ type: 'success', variant: 'updated' })
  }

  const MenuIcon = () => <FileText size={20} className="text-white" />

  return (
    <DashboardLayout title="Menus Management">
      {/* Stat Cards */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <StatCard
          label="Total Menus"
          count={counts.total}
          iconBgClass="bg-stat-orange-bg"
          icon={<FileText size={20} className="text-stat-orange" />}
          trend={-2.1}
        />
        <StatCard
          label="Active Menus"
          count={counts.active}
          iconBgClass="bg-stat-green-bg"
          icon={<FileText size={20} className="text-stat-green" />}
          trend={1.5}
        />
        <StatCard
          label="Inactive Menus"
          count={counts.inactive}
          iconBgClass="bg-stat-yellow-bg"
          icon={<FileText size={20} className="text-stat-yellow" />}
          trend={2.4}
        />
        <StatCard
          label="Archived Menus"
          count={counts.archived}
          iconBgClass="bg-stat-red-bg"
          icon={<FileText size={20} className="text-stat-red" />}
          trend={2.4}
        />
      </div>

      {/* Main content card */}
      <div className="bg-white rounded-[12px] shadow-card p-6">
        {/* Table header row */}
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <h2 className="font-bold text-neutral-900 text-base whitespace-nowrap">
            Menus List ({filtered.length})
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <Download size={14} /> Export
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <Upload size={14} /> Import
            </button>
            <Button
              variant="primary"
              size="md"
              fullWidth={false}
              onClick={() => setModal({ type: 'create' })}
            >
              <Plus size={14} /> Add New Menu
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          <FilterTabs active={activeTab} onChange={setActiveTab} />
          <div className="flex items-center gap-2">
            <ViewToggle view={view} onChange={setView} />
            <SearchInput
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48"
            />
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <Filter size={14} /> Filters
            </button>
          </div>
        </div>

        {/* Content */}
        {filtered.length === 0 ? (
          <EmptyState
            illustration="clipboard"
            title="No menus created yet"
            subtitle="Create your first menu to organize products for a specific restaurant branch."
          />
        ) : view === 'grid' ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((menu) => (
                <MenuGridCard
                  key={menu.id}
                  menu={menu}
                  onEdit={(m) => setModal({ type: 'update', menu: m })}
                  onDelete={(m) => setModal({ type: 'delete', menu: m })}
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
                <ChevronLeft size={14} /> Previous
              </button>
              <button type="button" className="w-7 h-7 rounded bg-primary text-white text-sm font-medium">1</button>
              <button
                type="button"
                className="flex items-center gap-1 px-2 py-1 text-neutral-700 hover:text-neutral-900"
              >
                Next <ChevronRight size={14} />
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
                      <Checkbox id="select-all-menus" checked={false} onChange={() => {}} />
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Product Name</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Products</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Categories</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Branches</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Last Updated</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Creation Date</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((menu) => {
                    const archived = menu.status === 'archived'
                    return (
                      <tr
                        key={menu.id}
                        className={cn(
                          'border-b border-table-border hover:bg-table-row-hover transition-colors',
                          archived && 'opacity-60'
                        )}
                      >
                        <td className="py-3 px-4">
                          <Checkbox id={`menu-${menu.id}`} checked={false} onChange={() => {}} />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                              <FileText size={14} className="text-neutral-400" />
                            </div>
                            <span className={cn('font-medium', archived ? 'text-table-archived' : 'text-neutral-900')}>
                              {menu.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-neutral-700">{menu.products}</td>
                        <td className="py-3 px-4 text-neutral-700">{menu.categories}</td>
                        <td className="py-3 px-4">
                          <BranchPills branches={menu.branches} maxVisible={2} />
                        </td>
                        <td className="py-3 px-4 text-neutral-700">{menu.lastUpdated}</td>
                        <td className="py-3 px-4 text-neutral-700">{menu.creationDate}</td>
                        <td className="py-3 px-4">
                          <StatusToggle
                            checked={menu.status === 'active'}
                            onChange={(val) => handleToggleStatus(menu.id, val)}
                            disabled={archived}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => !archived && setModal({ type: 'update', menu })}
                              disabled={archived}
                              className="p-1.5 text-neutral-500 hover:text-primary transition-colors disabled:opacity-40"
                              title="Edit"
                            >
                              <Edit size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => !archived && handleDuplicate(menu)}
                              disabled={archived}
                              className="p-1.5 text-neutral-500 hover:text-primary transition-colors disabled:opacity-40"
                              title="Duplicate"
                            >
                              <Copy size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => !archived && setModal({ type: 'delete', menu })}
                              disabled={archived}
                              className="p-1.5 text-neutral-500 hover:text-danger transition-colors disabled:opacity-40"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                            <button
                              type="button"
                              className="p-1.5 text-neutral-500 hover:text-neutral-700 transition-colors"
                              title="More"
                            >
                              <MoreVertical size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-neutral-500">
                Showing {filtered.length} of {menus.length} menus
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="flex items-center gap-1 px-2 py-1 text-neutral-500 hover:text-neutral-700 disabled:opacity-40"
                  disabled
                >
                  <ChevronLeft size={14} /> Previous
                </button>
                <button type="button" className="w-7 h-7 rounded bg-primary text-white text-sm font-medium">1</button>
                <button
                  type="button"
                  className="flex items-center gap-1 px-2 py-1 text-neutral-700 hover:text-neutral-900"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      {modal?.type === 'create' && (
        <MenuWizardModal
          isOpen
          onClose={() => setModal(null)}
          onCreated={handleCreated}
          mode="create"
        />
      )}

      {modal?.type === 'update' && (
        <UpdateMenuModal
          isOpen
          menu={modal.menu}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}

      {modal?.type === 'delete' && (
        <DeleteMenuModal
          isOpen
          menu={modal.menu}
          onClose={() => setModal(null)}
          onConfirm={() => handleDelete(modal.menu)}
        />
      )}

      {modal?.type === 'success' && (
        <SuccessModal
          variant={modal.variant}
          onGoToList={() => setModal(null)}
          onCreateAnother={() => setModal({ type: 'create' })}
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
