'use client'

import { CalendarDays, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DateInputProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  label?: string
  className?: string
}

export function DateInput({ value, onChange, placeholder = 'DD-MM-YYYY', label, className }: DateInputProps) {
  function toDisplay(iso: string): string {
    if (!iso) return ''
    const [y, m, d] = iso.split('-')
    if (!y || !m || !d) return iso
    return `${d}-${m}-${y}`
  }

  function fromDisplay(display: string): string {
    const parts = display.split('-')
    if (parts.length !== 3) return display
    const [d, m, y] = parts
    return `${y}-${m}-${d}`
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-neutral-700">{label}</label>
      )}
      <div className="relative flex items-center">
        <span className="absolute left-3 flex items-center text-neutral-500 pointer-events-none">
          <CalendarDays size={16} />
        </span>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full rounded-[8px] border border-neutral-300 bg-white text-sm text-neutral-900 shadow-input',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors',
            'py-3 pl-10 pr-10',
            !value && 'text-neutral-500',
            className
          )}
          placeholder={placeholder}
        />
        <span className="absolute right-3 flex items-center text-neutral-500 pointer-events-none">
          <ChevronDown size={16} />
        </span>
      </div>
    </div>
  )
}
