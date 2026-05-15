'use client'

import { Button } from '@/components/ui/Button'
import { Trash2, X } from 'lucide-react'

interface DeleteRestaurantModalProps {
  restaurant: { name: string }
  onConfirm: () => void
  onClose: () => void
}

export function DeleteRestaurantModal({ restaurant, onConfirm, onClose }: DeleteRestaurantModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-sm p-5 sm:p-8 flex flex-col items-center text-center relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors">
          <X size={18} />
        </button>

        {/* Red trash illustration */}
        <div className="w-20 h-20 rounded-full bg-stat-red-bg flex items-center justify-center mb-5">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <Trash2 size={24} className="text-danger" />
          </div>
        </div>

        <h2 className="text-lg font-bold text-neutral-900 mb-2 leading-snug">
          Are You Sure You Want To Delete Restaurant &lsquo;{restaurant.name}&rsquo; ?
        </h2>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          This action is permanent and cannot be undone. Deleting this restaurant will remove all related data, including menu items, orders, and team assignments.
        </p>

        <Button
          variant="primary"
          onClick={onConfirm}
          className="mb-3 bg-danger hover:bg-red-700 active:bg-red-700"
        >
          <Trash2 size={14} /> Delete Restaurant
        </Button>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
      </div>
    </div>
  )
}
