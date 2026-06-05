'use client'

import { useTranslations } from 'next-intl'
import { Trash2, X } from 'lucide-react'
import { AddOn } from '@/lib/mock/addOns'

interface DeleteAddOnModalProps {
  isOpen: boolean
  addon: AddOn | null
  onClose: () => void
  onConfirm: () => void
}

export function DeleteAddOnModal({ isOpen, addon, onClose, onConfirm }: DeleteAddOnModalProps) {
  const t = useTranslations('addOns')

  if (!isOpen || !addon) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-sm p-6 flex flex-col items-center text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Illustration */}
        <div className="w-20 h-20 rounded-full bg-danger-light flex items-center justify-center mb-4">
          <Trash2 size={32} className="text-danger" />
        </div>

        <h2 className="text-lg font-bold text-neutral-900 mb-2 leading-snug">
          {t('delete.title', { name: addon.name })}
        </h2>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          {t('delete.subtitle')}
        </p>

        <button
          onClick={onConfirm}
          className="w-full bg-danger text-white rounded-lg py-3 font-semibold flex items-center justify-center gap-2 mb-3 hover:bg-red-700 transition-colors"
        >
          <Trash2 size={16} /> {t('delete.confirm')}
        </button>
        <button
          onClick={onClose}
          className="w-full border border-neutral-300 text-neutral-700 rounded-lg py-3 font-medium hover:bg-neutral-50 transition-colors"
        >
          {t('delete.cancel')}
        </button>
      </div>
    </div>
  )
}
