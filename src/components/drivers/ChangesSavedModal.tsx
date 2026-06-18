'use client'

import { useTranslations } from 'next-intl'
import { X, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ChangesSavedModalProps {
  onReturnToList: () => void
}

export function ChangesSavedModal({ onReturnToList }: ChangesSavedModalProps) {
  const t = useTranslations('drivers.saved')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 p-4">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-sm relative p-8">
        <button type="button" onClick={onReturnToList} className="absolute top-4 right-4 p-1.5 text-neutral-500 hover:text-neutral-700 transition-colors">
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
            <CheckCircle size={32} className="text-primary" />
          </div>
          <h2 className="text-[22px] font-bold text-neutral-900">{t('title')}</h2>
          <p className="text-sm text-neutral-500">{t('subtitle')}</p>
          <Button variant="primary" onClick={onReturnToList}>{t('returnToList')}</Button>
        </div>
      </div>
    </div>
  )
}
