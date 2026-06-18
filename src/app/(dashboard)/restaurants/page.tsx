'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { FilterTabs, TabValue } from '@/components/ui/FilterTabs'
import { ViewToggle } from '@/components/ui/ViewToggle'
import { EmptyState } from '@/components/ui/EmptyState'
import { SearchInput } from '@/components/ui/SearchInput'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { RestaurantGridCard } from '@/components/restaurants/RestaurantGridCard'
import { RestaurantWizardModal } from '@/components/restaurants/RestaurantWizardModal'
import { EditRestaurantModal } from '@/components/restaurants/EditRestaurantModal'
import { DeleteRestaurantModal } from '@/components/restaurants/DeleteRestaurantModal'
import { UnassignManagerModal } from '@/components/restaurants/UnassignManagerModal'
import { SuccessModal } from '@/components/restaurants/SuccessModal'
import { FailModal } from '@/components/restaurants/FailModal'
import { InlineManagerPicker } from '@/components/restaurants/InlineManagerPicker'
import {
  Restaurant,
  RestaurantManager,
  mockRestaurants,
} from '@/lib/mock/restaurants'
import { cn } from '@/lib/utils'
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  Filter,
  MoreVertical,
  Plus,
  Store,
  Trash2,
  Upload,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

type ModalState =
  | { type: 'create' }
  | { type: 'update'; restaurant: Restaurant }
  | { type: 'delete'; restaurant: Restaurant }
  | { type: 'unassign'; restaurant: Restaurant; manager: RestaurantManager }
  | { type: 'success'; variant: 'created' | 'updated' }
  | { type: 'fail' }
  | null

function StoreIcon() {
  return <Store size={20} className="text-white" />
}

export default function RestaurantsPage() {
  const t = useTranslations('restaurants')
  const tCommon = useTranslations('common')
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants)
  const [view, setView] = useState<'grid' | 'list'>('list')
  const [activeTab, setActiveTab] = useState<TabValue>('all')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<ModalState>(null)

  const filtered = restaurants.filter((r) => {
    const matchTab = activeTab === 'all' || r.status === activeTab
    const matchSearch =
      !search ||
      `${r.name} ${r.email}`.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const counts = {
    total: restaurants.length,
    active: restaurants.filter((r) => r.status === 'active').length,
    inactive: restaurants.filter((r) => r.status === 'inactive').length,
    archived: restaurants.filter((r) => r.status === 'archived').length,
  }

  function handleToggleStatus(id: string, val: boolean) {
    setRestaurants((prev) =>
      prev.map((r) => r.id === id ? { ...r, status: val ? 'active' : 'inactive' } : r)
    )
  }

  function handleDelete(restaurant: Restaurant) {
    setRestaurants((prev) => prev.filter((r) => r.id !== restaurant.id))
    setModal(null)
  }

  function handleAssignManager(restaurantId: string, manager: RestaurantManager) {
    setRestaurants((prev) =>
      prev.map((r) => r.id === restaurantId ? { ...r, manager } : r)
    )
  }

  function handleUnassignManager(restaurantId: string) {
    setRestaurants((prev) =>
      prev.map((r) => r.id === restaurantId ? { ...r, manager: null } : r)
    )
    setModal(null)
  }

  return (
    <DashboardLayout title={t('pageTitle')}>
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <StatCard label={t('stats.total')} count={counts.total} iconBgClass="bg-stat-orange" icon={<StoreIcon />} trend={-2.1} />
        <StatCard label={t('stats.active')} count={counts.active} iconBgClass="bg-stat-green" icon={<StoreIcon />} trend={1.5} />
        <StatCard label={t('stats.inactive')} count={counts.inactive} iconBgClass="bg-stat-yellow" icon={<StoreIcon />} trend={2.4} />
        <StatCard label={t('stats.archived')} count={counts.archived} iconBgClass="bg-stat-red" icon={<StoreIcon />} trend={2.4} />
      </div>

      {/* Content card */}
      <div className="bg-white rounded-[12px] shadow-card p-4 md:p-5">
        {/* Header row */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <h2 className="text-sm md:text-base font-bold text-neutral-900 whitespace-nowrap">
            {t('listTitle', { count: filtered.length })}
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="secondary" fullWidth={false} size="md" className="gap-1.5 hidden sm:inline-flex min-h-[44px]">
              <Download size={14} /> {tCommon('export')}
            </Button>
            <Button variant="secondary" fullWidth={false} size="md" className="gap-1.5 hidden sm:inline-flex min-h-[44px]">
              <Upload size={14} /> {tCommon('import')}
            </Button>
            <Button
              variant="primary"
              fullWidth={false}
              size="md"
              onClick={() => setModal({ type: 'create' })}
              className="min-h-[44px]"
            >
              <Plus size={14} />
              <span className="hidden sm:inline">{t('addNew')}</span>
              <span className="sm:hidden">{t('addNewShort')}</span>
            </Button>
          </div>
        </div>

        {/* Filter + view row */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <FilterTabs active={activeTab} onChange={setActiveTab} />
          <div className="flex items-center gap-2 flex-wrap">
            <ViewToggle view={view} onChange={setView} />
            <SearchInput
              placeholder={tCommon('search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-32 md:w-40"
            />
            <Button variant="secondary" fullWidth={false} size="md" className="min-h-[44px]">
              <Filter size={13} /> {tCommon('filters')}
            </Button>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((r) => (
              <RestaurantGridCard
                key={r.id}
                restaurant={r}
                onEdit={(rest) => setModal({ type: 'update', restaurant: rest })}
                onDelete={(rest) => setModal({ type: 'delete', restaurant: rest })}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        ) : (
          <RestaurantsListView
            restaurants={filtered}
            onEdit={(r) => setModal({ type: 'update', restaurant: r })}
            onDelete={(r) => setModal({ type: 'delete', restaurant: r })}
            onToggleStatus={handleToggleStatus}
            onAssignManager={handleAssignManager}
            onRequestUnassign={(r, mgr) => setModal({ type: 'unassign', restaurant: r, manager: mgr })}
          />
        )}
      </div>

      {/* Modals */}
      {modal?.type === 'create' && (
        <RestaurantWizardModal
          isOpen
          onClose={() => setModal(null)}
          onCreated={() => setModal({ type: 'success', variant: 'created' })}
        />
      )}
      {modal?.type === 'update' && (
        <EditRestaurantModal
          isOpen
          restaurant={modal.restaurant}
          onClose={() => setModal(null)}
          onSaved={() => setModal(null)}
          onToggleStatus={handleToggleStatus}
        />
      )}
      {modal?.type === 'delete' && (
        <DeleteRestaurantModal
          restaurant={modal.restaurant}
          onConfirm={() => handleDelete(modal.restaurant)}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === 'unassign' && (
        <UnassignManagerModal
          manager={modal.manager}
          onConfirm={() => handleUnassignManager(modal.restaurant.id)}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === 'success' && (
        <SuccessModal
          variant={modal.variant}
          onGoToList={() => setModal(null)}
          onCreateAnother={
            modal.variant === 'created'
              ? () => setModal({ type: 'create' })
              : undefined
          }
        />
      )}
      {modal?.type === 'fail' && (
        <FailModal onRetry={() => setModal(null)} onBack={() => setModal(null)} />
      )}
    </DashboardLayout>
  )
}

/* ── List view ── */
interface ListViewProps {
  restaurants: Restaurant[]
  onEdit: (r: Restaurant) => void
  onDelete: (r: Restaurant) => void
  onToggleStatus: (id: string, val: boolean) => void
  onAssignManager: (restaurantId: string, manager: RestaurantManager) => void
  onRequestUnassign: (r: Restaurant, mgr: RestaurantManager) => void
}

function RestaurantsListView({
  restaurants,
  onEdit,
  onDelete,
  onToggleStatus,
  onAssignManager,
  onRequestUnassign,
}: ListViewProps) {
  const t = useTranslations('restaurants')
  const tCommon = useTranslations('common')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [allChecked, setAllChecked] = useState(false)

  function toggleAll() {
    if (allChecked) { setSelected(new Set()); setAllChecked(false) }
    else { setSelected(new Set(restaurants.map((r) => r.id))); setAllChecked(true) }
  }

  const columns = [
    t('table.restaurantName'), t('table.manager'), t('table.phone'),
    t('table.creationDate'), t('table.drivers'), t('table.customers'), t('table.orders'), t('table.status'), t('table.actions'),
  ]

  return (
    <div>
      <div className="overflow-x-auto rounded-[12px] border border-table-border">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-table-header border-b border-table-border">
              <th className="py-3 pl-4 pr-2 w-10">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleAll}
                  className="w-4 h-4 accent-primary rounded"
                />
              </th>
              {columns.map((col) => (
                <th key={col} className="py-3 px-4 text-left text-xs font-semibold text-neutral-500 whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {restaurants.map((r) => {
              const archived = r.status === 'archived'
              const textClass = archived ? 'text-table-archived' : 'text-neutral-700'

              return (
                <tr
                  key={r.id}
                  className={cn(
                    'border-b border-table-border hover:bg-table-row-hover transition-colors',
                    archived && 'opacity-60'
                  )}
                >
                  <td className="py-3 pl-4 pr-2 w-10">
                    <input
                      type="checkbox"
                      checked={selected.has(r.id)}
                      onChange={() =>
                        setSelected((prev) => {
                          const s = new Set(prev)
                          s.has(r.id) ? s.delete(r.id) : s.add(r.id)
                          return s
                        })
                      }
                      className="w-4 h-4 accent-primary rounded"
                    />
                  </td>

                  {/* Restaurant Name */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={r.name} src={r.logo} size="md" grayscale={archived} />
                      <div>
                        <p className={cn('text-sm font-semibold', archived ? 'text-table-archived' : 'text-neutral-900')}>
                          {r.name}
                        </p>
                        <p className={cn('text-xs', textClass)}>{r.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Manager */}
                  <td className="py-3 px-4">
                    <InlineManagerPicker
                      currentManager={r.manager}
                      onAssign={(mgr) => onAssignManager(r.id, mgr)}
                      onUnassign={() => r.manager && onRequestUnassign(r, r.manager)}
                    />
                  </td>

                  {/* Phone */}
                  <td className={cn('py-3 px-4 text-sm whitespace-nowrap', textClass)}>{r.phone}</td>

                  {/* Creation Date */}
                  <td className={cn('py-3 px-4 text-sm whitespace-nowrap', textClass)}>{r.creationDate}</td>

                  {/* Drivers */}
                  <td className={cn('py-3 px-4 text-sm', textClass)}>{r.drivers}</td>

                  {/* Customers */}
                  <td className={cn('py-3 px-4 text-sm', textClass)}>{r.customers}</td>

                  {/* Orders */}
                  <td className={cn('py-3 px-4 text-sm', textClass)}>{r.orders}</td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <StatusToggle
                      checked={r.status === 'active'}
                      onChange={(val) => onToggleStatus(r.id, val)}
                      disabled={archived}
                    />
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEdit(r)}
                        disabled={archived}
                        className={cn(
                          'p-2 rounded hover:bg-neutral-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center',
                          archived ? 'text-table-archived cursor-not-allowed' : 'text-neutral-500 hover:text-neutral-700'
                        )}
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => onDelete(r)}
                        disabled={archived}
                        className={cn(
                          'p-2 rounded hover:bg-danger-light transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center',
                          archived ? 'text-table-archived cursor-not-allowed' : 'text-neutral-500 hover:text-danger'
                        )}
                      >
                        <Trash2 size={15} />
                      </button>
                      <button className={cn(
                        'p-2 rounded hover:bg-neutral-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center',
                        archived ? 'text-table-archived' : 'text-neutral-500 hover:text-neutral-700'
                      )}>
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
      <div className="flex justify-end items-center gap-2 mt-4">
        <button className="flex items-center gap-1 px-3 text-sm border border-neutral-300 rounded-lg bg-white hover:bg-neutral-100 transition-colors text-neutral-700 min-h-[44px]">
          <ChevronLeft size={14} /> {tCommon('previous')}
        </button>
        <button className="min-w-[44px] min-h-[44px] text-sm border border-neutral-300 rounded-lg bg-white font-medium text-neutral-900 hover:bg-neutral-100 transition-colors">
          1
        </button>
        <button className="flex items-center gap-1 px-3 text-sm border border-neutral-300 rounded-lg bg-white hover:bg-neutral-100 transition-colors text-neutral-700 min-h-[44px]">
          {tCommon('next')} <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}
