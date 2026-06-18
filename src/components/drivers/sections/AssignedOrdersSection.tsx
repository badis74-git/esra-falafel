'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Banknote, CreditCard, MapPin, ShoppingBag, User } from 'lucide-react'
import { ViewToggle } from '@/components/ui/ViewToggle'
import { SearchInput } from '@/components/ui/SearchInput'
import { Button } from '@/components/ui/Button'
import { OrderStatusPill } from '@/components/ui/OrderStatusPill'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/utils'
import type { AssignedOrder } from '@/lib/mock/drivers'

type OrderTab = 'all' | 'pending' | 'completed' | 'cancelled'

interface Props {
  orders: AssignedOrder[]
  onSave: () => void
  onCancel: () => void
}

const PER_PAGE = 4

function matchesTab(order: AssignedOrder, tab: OrderTab): boolean {
  if (tab === 'all') return true
  if (tab === 'pending') return order.pickupState === 'pickup'
  if (tab === 'completed') return order.pickupState === 'pickedup'
  return false
}

// CSS-variable references ensure colors always render regardless of Tailwind JIT scanning
const STRIP_STYLE = {
  pickup: {
    bg: 'var(--color-order-new-bg)',
    color: 'var(--color-order-new)',
  },
  pickedup: {
    bg: 'var(--color-order-pickedup-bg)',
    color: 'var(--color-order-pickedup)',
  },
} as const

function OrderCard({ order, t }: { order: AssignedOrder; t: ReturnType<typeof useTranslations<'drivers'>> }) {
  const strip = STRIP_STYLE[order.pickupState]
  const tagLabel = order.pickupState === 'pickedup' ? t('orders.pickedUp') : t('orders.pickup')

  return (
    <div className="bg-white rounded-[12px] border border-table-border shadow-card overflow-hidden">
      {/* Tinted header strip */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ backgroundColor: strip.bg }}
      >
        <span className="text-[12px] font-semibold" style={{ color: strip.color }}>
          {tagLabel}
        </span>
        <span className="text-[12px] text-neutral-600">{order.timeHint}</span>
        <span className="text-[12px] font-medium text-neutral-700">{order.restaurant}</span>
      </div>

      {/* Card body */}
      <div className="px-4 pt-3 pb-3">
        {/* Order number + status pill */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[16px] font-bold text-neutral-900 leading-tight">
            {t('orders.order')} {order.number}
          </span>
          <OrderStatusPill status={order.status} />
        </div>

        {/* Customer */}
        <div className="flex items-center gap-1.5 text-[13px] text-neutral-700 mb-1">
          <User size={13} className="text-neutral-400 flex-shrink-0" />
          <span>{order.customer}</span>
        </div>

        {/* Address */}
        <div className="flex items-center gap-1.5 text-[13px] text-neutral-700 mb-3">
          <MapPin size={13} className="text-neutral-400 flex-shrink-0" />
          <span className="truncate">{order.address}</span>
        </div>

        {/* Divided footer: payment · items · distance */}
        <div className="flex items-center border-t border-neutral-200 pt-2.5">
          <div className="flex items-center gap-1.5 text-[13px] text-neutral-700 flex-1 min-w-0">
            {order.payment.method === 'card'
              ? <CreditCard size={13} className="text-neutral-400 flex-shrink-0" />
              : <Banknote size={13} className="text-neutral-400 flex-shrink-0" />
            }
            <span className="truncate">{order.payment.amount.toFixed(2)} €</span>
          </div>
          <div className="flex items-center gap-1.5 text-[13px] text-neutral-700 flex-1 min-w-0 border-l border-neutral-200 pl-3">
            <ShoppingBag size={13} className="text-neutral-400 flex-shrink-0" />
            <span>{t('orders.items', { count: order.items })}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[13px] text-neutral-700 flex-1 min-w-0 border-l border-neutral-200 pl-3">
            <MapPin size={13} className="text-neutral-400 flex-shrink-0" />
            <span>{t('orders.km', { distance: order.distanceKm })}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderListRow({ order, t }: { order: AssignedOrder; t: ReturnType<typeof useTranslations<'drivers'>> }) {
  const strip = STRIP_STYLE[order.pickupState]
  const tagLabel = order.pickupState === 'pickedup' ? t('orders.pickedUp') : t('orders.pickup')

  return (
    <div className="flex items-center gap-3 border-b border-table-border py-3 px-3 last:border-0">
      <span
        className="text-[11px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
        style={{ color: strip.color, backgroundColor: strip.bg }}
      >
        {tagLabel}
      </span>
      <span className="text-[13px] font-bold text-neutral-900 flex-shrink-0 whitespace-nowrap">
        {t('orders.order')} {order.number}
      </span>
      <span className="text-[13px] text-neutral-700 flex-1 truncate min-w-0">{order.customer}</span>
      <span className="text-[12px] text-neutral-500 flex-shrink-0 whitespace-nowrap">{order.timeHint}</span>
      <span className="flex-shrink-0">
        <OrderStatusPill status={order.status} />
      </span>
      <span className="text-[13px] text-neutral-700 flex-shrink-0 whitespace-nowrap">
        {order.payment.amount.toFixed(2)} €
      </span>
    </div>
  )
}

export function AssignedOrdersSection({ orders, onSave, onCancel }: Props) {
  const t = useTranslations('drivers')
  const [view, setView] = useState<'grid' | 'list'>('list')
  const [tab, setTab] = useState<OrderTab>('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const TABS: { label: string; value: OrderTab }[] = [
    { label: t('orders.filters.all'), value: 'all' },
    { label: t('orders.filters.pending'), value: 'pending' },
    { label: t('orders.filters.completed'), value: 'completed' },
    { label: t('orders.filters.cancelled'), value: 'cancelled' },
  ]

  const filtered = orders.filter((o) => {
    const matchTab = matchesTab(o, tab)
    const matchSearch = !search ||
      o.number.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)

  function handleTabChange(next: OrderTab) {
    setTab(next)
    setPage(1)
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-5">
        <h3 className="text-sm font-semibold text-primary mb-3">{t('edit.nav.orders')}</h3>

        {/* Toolbar: ViewToggle · Search · Filters */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <ViewToggle view={view} onChange={setView} />
          <SearchInput
            placeholder={t('orders.searchPlaceholder')}
            value={search}
            onChange={handleSearchChange}
            className="w-44"
          />
          <Button variant="secondary" fullWidth={false} size="md">
            {t('orders.filtersBtn')}
          </Button>
        </div>

        {/* Filter tab pills */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {TABS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => handleTabChange(item.value)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                tab === item.value
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {paginated.length === 0 ? (
          <EmptyState
            illustration="clipboard"
            title={t('orders.empty.title')}
            subtitle={t('orders.empty.subtitle')}
          />
        ) : view === 'grid' ? (
          <div className="flex flex-col gap-4">
            {paginated.map((order) => (
              <OrderCard key={order.id} order={order} t={t} />
            ))}
          </div>
        ) : (
          <div className="rounded-[12px] border border-table-border overflow-hidden bg-white">
            {paginated.map((order) => (
              <OrderListRow key={order.id} order={order} t={t} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-center gap-1 mt-4 flex-wrap">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="px-3 py-1.5 text-xs text-neutral-700 rounded hover:bg-neutral-100 disabled:opacity-40 transition-colors"
            >
              ← {t('wizard.previous')}
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
              {t('wizard.next')} →
            </button>
          </div>
        )}
      </div>

      {/* Section footer */}
      <div className="flex items-center gap-3 border-t border-table-border px-5 py-4 flex-shrink-0">
        <Button variant="secondary" fullWidth={false} size="md" onClick={onCancel}>
          {t('edit.cancel')}
        </Button>
        <Button variant="primary" fullWidth={false} size="md" onClick={onSave}>
          {t('edit.save')}
        </Button>
      </div>
    </div>
  )
}
