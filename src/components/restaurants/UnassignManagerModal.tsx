'use client'

import { Button } from '@/components/ui/Button'
import { useTranslations } from 'next-intl'
import { Minus, User, X } from 'lucide-react'

interface UnassignManagerModalProps {
  manager: { name: string }
  onConfirm: () => void
  onClose: () => void
}

export function UnassignManagerModal({ manager, onConfirm, onClose }: UnassignManagerModalProps) {
  const t = useTranslations('restaurants')
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-sm p-5 sm:p-8 flex flex-col items-center text-center relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors">
          <X size={18} />
        </button>

        {/* Person + minus illustration */}
        <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-5 relative">
          <User size={36} className="text-neutral-400" />
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-danger flex items-center justify-center shadow border-2 border-white">
            <Minus size={14} className="text-white" strokeWidth={3} />
          </div>
        </div>

        <h2 className="text-lg font-bold text-neutral-900 mb-2 leading-snug">
          {t('unassignModal.title')}
        </h2>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          {t('unassignModal.body', { name: manager.name })}
        </p>

        <Button variant="primary" onClick={onConfirm} className="mb-3">
          {t('unassignModal.confirm')}
        </Button>
        <Button variant="secondary" onClick={onClose}>{t('unassignModal.cancel')}</Button>
      </div>
    </div>
  )
}
