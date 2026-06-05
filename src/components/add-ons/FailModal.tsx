'use client'

import { useTranslations } from 'next-intl'
import { X } from 'lucide-react'

interface FailModalProps {
  onTryAgain: () => void
  onBack: () => void
}

export function FailModal({ onTryAgain, onBack }: FailModalProps) {
  const t = useTranslations('addOns')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-sm p-6 flex flex-col items-center text-center relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Illustration — sad document */}
        <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mb-4">
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

        <h2 className="text-lg font-bold text-neutral-900 mb-2">{t('fail.title')}</h2>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">{t('fail.subtitle')}</p>

        <button
          onClick={onTryAgain}
          className="w-full bg-primary text-white rounded-lg py-3 font-semibold mb-3 hover:bg-primary-dark transition-colors"
        >
          {t('fail.tryAgain')}
        </button>
        <button
          onClick={onBack}
          className="w-full border border-neutral-300 text-neutral-700 rounded-lg py-3 font-medium hover:bg-neutral-50 transition-colors"
        >
          {t('fail.back')}
        </button>
      </div>
    </div>
  )
}
