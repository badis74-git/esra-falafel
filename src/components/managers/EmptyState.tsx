import { Plus, User } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-neutral-200 flex items-center justify-center">
          <div className="flex items-center gap-1">
            <User size={28} className="text-neutral-400" />
            <div className="flex flex-col gap-1">
              <div className="w-8 h-1.5 bg-neutral-400 rounded" />
              <div className="w-6 h-1.5 bg-neutral-400 rounded" />
              <div className="w-7 h-1.5 bg-neutral-400 rounded" />
            </div>
          </div>
        </div>
        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow">
          <Plus size={14} className="text-white" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="font-bold text-neutral-900 text-base">No Active Restaurant Managers</h3>
        <p className="text-sm text-neutral-500 mt-1">Send an invitation to add users to your system.</p>
      </div>
    </div>
  )
}
