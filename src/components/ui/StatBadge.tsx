import { ArrowDown, ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatBadgeProps {
  value: number
  label?: string
  className?: string
}

export function StatBadge({ value, label, className }: StatBadgeProps) {
  const isUp = value >= 0
  return (
    <span className={cn('inline-flex items-center gap-0.5 text-xs font-medium', isUp ? 'text-trend-up' : 'text-trend-down', className)}>
      {isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
      {Math.abs(value)}%{label ? ` ${label}` : ''}
    </span>
  )
}
