'use client'

import { Button } from '@/components/ui/Button'
import { Menu } from '@/lib/mock/menus'
import { Trash2, X } from 'lucide-react'

interface DeleteMenuModalProps {
  isOpen: boolean
  menu: Menu | null
  onClose: () => void
  onConfirm: () => void
}

export function DeleteMenuModal({ isOpen, menu, onClose, onConfirm }: DeleteMenuModalProps) {
  if (!isOpen || !menu) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-sm p-5 sm:p-8 flex flex-col items-center text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="w-20 h-20 rounded-full bg-danger-light flex items-center justify-center mb-5">
          <Trash2 size={32} className="text-danger" />
        </div>

        <h2 className="text-lg font-bold text-neutral-900 mb-2 leading-snug">
          Are You Sure You Want To Delete Menu &apos;{menu.name}&apos; ?
        </h2>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          This action is permanent and cannot be undone.
        </p>

        <Button
          variant="primary"
          className="mb-3 bg-danger hover:bg-red-700"
          onClick={onConfirm}
        >
          Delete Menu
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
