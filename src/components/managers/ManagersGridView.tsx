'use client'

import { Manager } from '@/lib/mock/managers'
import { ManagerCard } from './ManagerCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ManagersGridViewProps {
  managers: Manager[]
  onEdit: (m: Manager) => void
  onDelete: (m: Manager) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function ManagersGridView({ managers, onEdit, onDelete, onToggleStatus }: ManagersGridViewProps) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {managers.map((m) => (
          <ManagerCard key={m.id} manager={m} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} />
        ))}
      </div>
      <div className="flex justify-end items-center gap-2 mt-4">
        <button className="flex items-center gap-1 px-3 text-sm border border-neutral-300 rounded-lg bg-white hover:bg-neutral-100 transition-colors text-neutral-700 min-h-[44px]">
          <ChevronLeft size={14} /> Previous
        </button>
        <button className="min-w-[44px] min-h-[44px] text-sm border border-neutral-300 rounded-lg bg-white font-medium text-neutral-900 hover:bg-neutral-100 transition-colors">1</button>
        <button className="flex items-center gap-1 px-3 text-sm border border-neutral-300 rounded-lg bg-white hover:bg-neutral-100 transition-colors text-neutral-700 min-h-[44px]">
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}
