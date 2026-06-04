'use client'

import { Button } from '@/components/ui/Button'
import { useTranslations } from 'next-intl'
import { Trash2, X } from 'lucide-react'

interface DeleteZoneModalProps {
  zoneName: string
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteZoneModal({ zoneName, onConfirm, onCancel }: DeleteZoneModalProps) {
  const t = useTranslations('zones')
  const tCommon = useTranslations('common')
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-sm p-5 sm:p-8 flex flex-col items-center text-center relative overflow-y-auto max-h-[90vh]">
        <button onClick={onCancel} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors">
          <X size={18} />
        </button>
        <div className="w-20 h-20 rounded-full bg-stat-red-bg flex items-center justify-center mb-5">
          <div className="relative">
            <Trash2 size={36} className="text-danger" />
            <span className="absolute -top-1 -right-1 text-yellow-400 text-xs">✦</span>
            <span className="absolute -bottom-1 -left-1 text-yellow-300 text-xs">✦</span>
          </div>
        </div>
        <h2 className="text-base font-bold text-neutral-900 mb-3 leading-snug">
          {t('deleteModal.title', { name: zoneName })}
        </h2>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          {t('deleteModal.body')}
        </p>
        <Button
          variant="primary"
          onClick={onConfirm}
          className="mb-3 bg-danger hover:bg-red-700 focus-visible:ring-danger"
        >
          <Trash2 size={14} /> {t('deleteModal.confirm')}
        </Button>
        <Button variant="secondary" onClick={onCancel}>{tCommon('cancel')}</Button>
      </div>
    </div>
  )
}
