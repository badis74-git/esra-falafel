'use client'

import { Button } from '@/components/ui/Button'
import { Check, Plus, X } from 'lucide-react'

interface SuccessModalProps {
  variant: 'created' | 'updated'
  onGoToList: () => void
  onCreateAnother?: () => void
}

export function SuccessModal({ variant, onGoToList, onCreateAnother }: SuccessModalProps) {
  const isCreated = variant === 'created'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-sm p-5 sm:p-8 flex flex-col items-center text-center relative overflow-y-auto max-h-[90vh]">
        <button onClick={onGoToList} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors">
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-5">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
            <Check size={22} className="text-primary stroke-[2.5]" />
          </div>
        </div>

        <h2 className="text-lg font-bold text-neutral-900 mb-2">
          {isCreated ? 'Zone Created Successfully!' : 'Changes Saved Successfully'}
        </h2>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          {isCreated
            ? 'The zone has been created successfully. You can now assign restaurants, configure coverage, and manage operations within this zone.'
            : 'All edits have been saved and are now visible in the system.'
          }
        </p>

        <Button variant="primary" onClick={onGoToList} className="mb-3">
          {isCreated ? 'Go To Zones List' : 'Return To Zones List'}
        </Button>

        {isCreated && onCreateAnother && (
          <Button variant="secondary" onClick={onCreateAnother}>
            <Plus size={14} /> Create Another Zone
          </Button>
        )}
      </div>
    </div>
  )
}
