'use client'

import { useTranslations } from 'next-intl'

export type OrderStatus = 'new' | 'preparing' | 'ready' | 'ontheway' | 'cancelled'

interface OrderStatusPillProps {
  status: OrderStatus
  namespace?: string
}

const styleMap: Record<OrderStatus, { color: string; backgroundColor: string }> = {
  new: {
    color: 'var(--color-order-new)',
    backgroundColor: 'var(--color-order-new-bg)',
  },
  preparing: {
    color: 'var(--color-order-preparing)',
    backgroundColor: 'var(--color-order-preparing-bg)',
  },
  ready: {
    color: '#ffffff',
    backgroundColor: 'var(--color-order-ready)',
  },
  ontheway: {
    color: 'var(--color-order-ontheway)',
    backgroundColor: 'var(--color-order-ontheway-bg)',
  },
  cancelled: {
    color: '#ffffff',
    backgroundColor: 'var(--color-danger)',
  },
}

export function OrderStatusPill({ status, namespace = 'drivers.orders.status' }: OrderStatusPillProps) {
  const t = useTranslations(namespace as 'drivers.orders.status')
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold whitespace-nowrap"
      style={styleMap[status]}
    >
      {t(status)}
    </span>
  )
}
