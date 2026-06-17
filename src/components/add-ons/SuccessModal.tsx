'use client'

import { useTranslations } from 'next-intl'
import { Check, X } from 'lucide-react'

interface SuccessModalProps {
  variant: 'created' | 'updated'
  onGoToList: () => void
  onCreateAnother?: () => void
}

export function SuccessModal({ variant, onGoToList, onCreateAnother }: SuccessModalProps) {
  const t = useTranslations('addOns')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-sm p-6 flex flex-col items-center text-center relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onGoToList}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Illustration */}
        <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
            <Check size={24} className="text-primary stroke-[2.5]" />
          </div>
        </div>

        <h2 className="text-lg font-bold text-neutral-900 mb-2">
          {variant === 'created' ? t('success.createdTitle') : t('success.updatedTitle')}
        </h2>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          {variant === 'created' ? t('success.createdSubtitle') : t('success.updatedSubtitle')}
        </p>

        <button
          onClick={onGoToList}
          className="w-full bg-primary text-white rounded-lg py-3 font-semibold mb-3 hover:bg-primary-dark transition-colors"
        >
          {t('success.returnToList')}
        </button>

        {variant === 'created' && (
          <button
            onClick={onCreateAnother}
            className="w-full border border-neutral-300 text-neutral-700 rounded-lg py-3 font-medium flex items-center justify-center gap-1 hover:bg-neutral-50 transition-colors"
          >
            {t('success.createAnother')}
          </button>
        )}
      </div>
    </div>
  )
}
