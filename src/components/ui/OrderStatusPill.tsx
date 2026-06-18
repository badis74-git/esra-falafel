'use client'

import { useTranslations } from 'next-intl'

type OrderStatus = 'new' | 'preparing' | 'ready' | 'ontheway'

interface OrderStatusPillProps {
  status: OrderStatus
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
}

export function OrderStatusPill({ status }: OrderStatusPillProps) {
  const t = useTranslations('drivers.orders.status')
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold whitespace-nowrap"
      style={styleMap[status]}
    >
      {t(status)}
    </span>
  )
}
