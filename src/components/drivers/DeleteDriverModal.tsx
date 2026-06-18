'use client'

import { useTranslations } from 'next-intl'
import { X, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Driver } from '@/lib/mock/drivers'

interface DeleteDriverModalProps {
  driver: Driver
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteDriverModal({ driver, onConfirm, onCancel }: DeleteDriverModalProps) {
  const t = useTranslations('drivers')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 p-4">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-md relative p-8">
        <button type="button" onClick={onCancel} className="absolute top-4 right-4 p-1.5 text-neutral-500 hover:text-neutral-700 transition-colors">
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-danger-light flex items-center justify-center">
            <Trash2 size={32} className="text-danger" />
          </div>
          <h2 className="text-[22px] font-bold text-neutral-900">
            {t('delete.title', { name: `${driver.firstName} ${driver.lastName}` })}
          </h2>
          <p className="text-sm text-neutral-500">{t('delete.subtitle')}</p>
          <div className="w-full flex flex-col gap-3">
            <button
              type="button"
              onClick={onConfirm}
              className="w-full flex items-center justify-center gap-2 bg-danger text-white rounded-lg py-3 font-semibold text-sm hover:bg-red-700 transition-colors"
            >
              <Trash2 size={14} /> {t('delete.confirm')}
            </button>
            <Button variant="secondary" onClick={onCancel}>{t('delete.cancel')}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
