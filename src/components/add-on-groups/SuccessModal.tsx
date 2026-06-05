'use client'

import { Button } from '@/components/ui/Button'
import { useTranslations } from 'next-intl'
import { Check, Plus, X } from 'lucide-react'

interface SuccessModalProps {
  variant: 'created' | 'updated'
  onReturnToList: () => void
  onCreateNew?: () => void
}

export function SuccessModal({ variant, onReturnToList, onCreateNew }: SuccessModalProps) {
  const t = useTranslations('addOnGroups')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-sm p-5 sm:p-8 flex flex-col items-center text-center relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onReturnToList}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-5">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
            <Check size={22} className="text-primary stroke-[2.5]" />
          </div>
        </div>

        {variant === 'created' ? (
          <>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">{t('successModal.title')}</h2>
            <p className="text-sm text-neutral-500 mb-6 leading-relaxed">{t('successModal.body')}</p>
            <Button variant="primary" onClick={onReturnToList} className="mb-3">
              {t('successModal.returnToList')}
            </Button>
            <Button variant="secondary" onClick={onCreateNew}>
              <Plus size={14} /> {t('successModal.createNew')}
            </Button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">{t('successModal.titleUpdated')}</h2>
            <p className="text-sm text-neutral-500 mb-6 leading-relaxed">{t('successModal.bodyUpdated')}</p>
            <Button variant="primary" onClick={onReturnToList}>
              {t('successModal.returnToList')}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
