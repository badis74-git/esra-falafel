'use client'

import { useTranslations } from 'next-intl'
import { Edit2, Send, Trash2 } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Driver } from '@/lib/mock/drivers'

interface DriverActionsMenuProps {
  driver: Driver
  onEdit: (driver: Driver) => void
  onResendInvite: (driver: Driver) => void
  onDelete: (driver: Driver) => void
  onClose: () => void
}

export function DriverActionsMenu({ driver, onEdit, onResendInvite, onDelete, onClose }: DriverActionsMenuProps) {
  const t = useTranslations('drivers.actionsMenu')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-1 z-50 bg-white rounded-[12px] shadow-lg border border-neutral-200 py-1 min-w-[180px]"
    >
      <button
        type="button"
        onClick={() => { onEdit(driver); onClose() }}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
      >
        <Edit2 size={14} className="text-neutral-500" />
        {t('edit')}
      </button>
      <button
        type="button"
        onClick={() => { onResendInvite(driver); onClose() }}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
      >
        <Send size={14} className="text-neutral-500" />
        {t('resend')}
      </button>
      <button
        type="button"
        onClick={() => { onDelete(driver); onClose() }}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-danger-light transition-colors"
      >
        <Trash2 size={14} />
        {t('delete')}
      </button>
    </div>
  )
}
