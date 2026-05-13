import { StatBadge } from '@/components/ui/StatBadge'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface StatCardProps {
  label: string
  count: number
  iconBgClass: string
  icon: ReactNode
  trend: number
  className?: string
}

export function StatCard({ label, count, iconBgClass, icon, trend, className }: StatCardProps) {
  return (
    <div className={cn('bg-white rounded-[12px] shadow-card p-4 flex items-center gap-4 flex-1 min-w-0', className)}>
      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', iconBgClass)}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-neutral-500 truncate">{label}</p>
        <p className="text-2xl font-bold text-neutral-900 leading-tight">{count}</p>
        <StatBadge value={trend} />
      </div>
    </div>
  )
}
