import { MapPin, Plus, User } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  subtitle?: string
  illustration?: 'person' | 'location'
}

export function EmptyState({
  title = 'No Active Restaurant Managers',
  subtitle = 'Send an invitation to add users to your system.',
  illustration = 'person',
}: EmptyStateProps) {
  if (illustration === 'location') {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-28 h-28 rounded-full bg-neutral-100 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-neutral-200 flex items-center justify-center">
            <MapPin size={36} className="text-neutral-400" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-neutral-900 text-base">{title}</h3>
          <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>
        </div>
      </div>
    )
  }

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
        <h3 className="font-bold text-neutral-900 text-base">{title}</h3>
        <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>
      </div>
    </div>
  )
}
