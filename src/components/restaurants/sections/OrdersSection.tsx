'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Banknote, Bike, CreditCard, MapPin, ShoppingBag, User } from 'lucide-react'
import { ViewToggle } from '@/components/ui/ViewToggle'
import { SearchInput } from '@/components/ui/SearchInput'
import { Button } from '@/components/ui/Button'
import { OrderStatusPill } from '@/components/ui/OrderStatusPill'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/utils'
import type { RestaurantOrder } from '@/lib/mock/restaurants'
import type { OrderStatus } from '@/components/ui/OrderStatusPill'

type OrderTab = 'all' | 'new' | 'preparing' | 'ready' | 'pickedup' | 'delivered' | 'cancelled'

interface Props {
  orders: RestaurantOrder[]
  onSave: () => void
  onCancel: () => void
}

const PER_PAGE = 5

const STATUS_BG: Record<string, string> = {
  new: 'var(--color-order-new-bg)',
  preparing: 'var(--color-order-preparing-bg)',
  ready: 'var(--color-order-ready)',
  ontheway: 'var(--color-order-ontheway-bg)',
  cancelled: 'var(--color-danger-light)',
  pickedup: 'var(--color-order-pickedup-bg, #f0fdf4)',
  delivered: 'var(--color-primary-light)',
}

function OrderCard({ order, t }: { order: RestaurantOrder; t: ReturnType<typeof useTranslations<'restaurants'>> }) {
  const pillStatus: OrderStatus = (['new', 'preparing', 'ready', 'ontheway', 'cancelled'] as const).includes(order.status as OrderStatus)
    ? (order.status as OrderStatus)
    : 'ready'

  return (
    <div className="bg-white rounded-[12px] border border-table-border overflow-hidden">
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ backgroundColor: STATUS_BG[order.status] ?? '#f9fafb' }}
      >
        <OrderStatusPill status={pillStatus} />
        <div className="flex items-center gap-1.5 text-xs text-neutral-600">
          {order.driverName ? (
            <>
              <Bike size={12} />
              <span>{order.driverName}</span>
            </>
          ) : (
            <span className="text-neutral-400">{t('orders.noDriver')}</span>
          )}
        </div>
      </div>

      <div className="px-4 pt-3 pb-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-base font-bold text-neutral-900">Order {order.id}</span>
          <span className="text-xs text-neutral-500">{order.time}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[13px] text-neutral-700 mb-1">
          <User size={13} className="text-neutral-400 flex-shrink-0" />
          <span>{order.customer}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[13px] text-neutral-700 mb-3">
          <MapPin size={13} className="text-neutral-400 flex-shrink-0" />
          <span className="truncate">{order.address}</span>
        </div>
        <div className="flex items-center border-t border-neutral-200 pt-2.5">
          <div className="flex items-center gap-1.5 text-[13px] text-neutral-700 flex-1 min-w-0">
            {order.payment === 'card'
              ? <CreditCard size={13} className="text-neutral-400 flex-shrink-0" />
              : <Banknote size={13} className="text-neutral-400 flex-shrink-0" />
            }
            <span className="truncate">
              {order.payment === 'card' ? 'Credit Card' : 'Cash'} (€{order.amount.toFixed(2)})
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[13px] text-neutral-700 flex-1 min-w-0 border-l border-neutral-200 pl-3">
            <ShoppingBag size={13} className="text-neutral-400 flex-shrink-0" />
            <span>{order.items} {t('orders.items')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[13px] text-neutral-700 flex-1 min-w-0 border-l border-neutral-200 pl-3">
            <MapPin size={13} className="text-neutral-400 flex-shrink-0" />
            <span>{order.distanceKm}Km</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function OrdersSection({ orders, onSave, onCancel }: Props) {
  const t = useTranslations('restaurants')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [tab, setTab] = useState<OrderTab>('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const TABS: { label: string; value: OrderTab }[] = [
    { label: `${t('orders.tabs.all')} (${orders.length})`, value: 'all' },
    { label: `${t('orders.tabs.new')} (${orders.filter(o => o.status === 'new').length})`, value: 'new' },
    { label: `${t('orders.tabs.preparing')} (${orders.filter(o => o.status === 'preparing').length})`, value: 'preparing' },
    { label: `${t('orders.tabs.ready')} (${orders.filter(o => o.status === 'ready').length})`, value: 'ready' },
    { label: `${t('orders.tabs.pickedup')} (${orders.filter(o => o.status === 'pickedup').length})`, value: 'pickedup' },
    { label: `${t('orders.tabs.delivered')} (${orders.filter(o => o.status === 'delivered').length})`, value: 'delivered' },
    { label: `${t('orders.tabs.cancelled')} (${orders.filter(o => o.status === 'cancelled').length})`, value: 'cancelled' },
  ]

  const filtered = orders.filter((o) => {
    const matchTab = tab === 'all' || o.status === tab
    const matchSearch = !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)

  function handleTabChange(next: OrderTab) { setTab(next); setPage(1) }
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) { setSearch(e.target.value); setPage(1) }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-5 space-y-4">
        <h3 className="text-sm font-semibold text-primary">{t('orders.title')}</h3>

        {/* Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <ViewToggle view={view} onChange={setView} />
          <SearchInput placeholder="" value={search} onChange={handleSearch} className="w-44" />
          <Button variant="secondary" fullWidth={false} size="md">Filters</Button>
        </div>

        {/* Tab pills */}
        <div className="flex gap-2 flex-wrap">
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
          <EmptyState illustration="clipboard" title="No orders" subtitle="No orders match this filter." />
        ) : (
          <div className="space-y-3">
            {paginated.map((order) => (
              <OrderCard key={order.id} order={order} t={t} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {filtered.length > PER_PAGE && (
          <div className="flex items-center justify-center gap-1 mt-4 flex-wrap">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="px-3 py-1.5 text-xs text-neutral-700 rounded hover:bg-neutral-100 disabled:opacity-40 transition-colors"
            >
              ← Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={cn('w-7 h-7 text-xs rounded transition-colors', p === safePage ? 'bg-primary text-white' : 'text-neutral-700 hover:bg-neutral-100')}
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
              Next →
            </button>
          </div>
        )}
      </div>

      <div className="relative z-10 flex items-center gap-3 border-t border-table-border px-5 py-4 flex-shrink-0">
        <Button variant="secondary" fullWidth={false} size="md" onClick={onCancel} className="flex-1 md:flex-none">{t('edit.cancel')}</Button>
        <Button variant="primary" fullWidth={false} size="md" onClick={onSave} className="flex-1 md:flex-none">{t('edit.save')}</Button>
      </div>
    </div>
  )
}
