'use client'

import { useTranslations } from 'next-intl'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface FailModalProps {
  onTryAgain: () => void
  onBack: () => void
}

export function FailModal({ onTryAgain, onBack }: FailModalProps) {
  const t = useTranslations('drivers.fail')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 p-4">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-sm relative p-8">
        <button type="button" onClick={onBack} className="absolute top-4 right-4 p-1.5 text-neutral-500 hover:text-neutral-700 transition-colors">
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center">
            <div className="w-10 h-12 bg-orange-200 rounded-sm flex flex-col items-center justify-center gap-1 relative">
              <div className="absolute -top-1 right-0 w-3 h-3 bg-white" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
              <div className="w-6 h-1 bg-orange-400 rounded mt-2" />
              <div className="w-5 h-1 bg-orange-400 rounded" />
              <div className="text-orange-500 text-xs font-bold mt-0.5">:(</div>
            </div>
          </div>
          <h2 className="text-[22px] font-bold text-neutral-900">{t('title')}</h2>
          <p className="text-sm text-neutral-500">{t('subtitle')}</p>
          <div className="w-full flex flex-col gap-3">
            <Button variant="primary" onClick={onTryAgain}>{t('tryAgain')}</Button>
            <Button variant="secondary" onClick={onBack}>{t('back')}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
