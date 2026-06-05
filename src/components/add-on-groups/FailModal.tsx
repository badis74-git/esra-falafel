'use client'

import { Button } from '@/components/ui/Button'
import { useTranslations } from 'next-intl'
import { X } from 'lucide-react'

interface FailModalProps {
  onRetry: () => void
  onBack: () => void
}

export function FailModal({ onRetry, onBack }: FailModalProps) {
  const t = useTranslations('common.failModal')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-sm p-5 sm:p-8 flex flex-col items-center text-center relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <X size={18} />
        </button>
        <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mb-5">
          <div className="relative">
            <div className="w-10 h-12 bg-orange-200 rounded-sm flex flex-col items-center justify-center gap-1 relative">
              <div
                className="absolute -top-1 right-0 w-3 h-3 bg-white"
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
              />
              <div className="w-6 h-1 bg-orange-400 rounded mt-2" />
              <div className="w-5 h-1 bg-orange-400 rounded" />
              <div className="text-orange-500 text-xs font-bold mt-0.5">:(</div>
            </div>
          </div>
        </div>
        <h2 className="text-lg font-bold text-neutral-900 mb-2">{t('title')}</h2>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">{t('body')}</p>
        <Button variant="primary" onClick={onRetry} className="mb-3">{t('retry')}</Button>
        <Button variant="secondary" onClick={onBack}>{t('back')}</Button>
      </div>
    </div>
  )
}
