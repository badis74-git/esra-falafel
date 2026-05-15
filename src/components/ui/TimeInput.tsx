'use client'

import { cn } from '@/lib/utils'

interface TimeInputProps {
  value: string
  onChange: (val: string) => void
  label?: string
  placeholder?: string
  className?: string
}

export function TimeInput({
  value,
  onChange,
  label,
  placeholder = '00:00',
  className,
}: TimeInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-neutral-700">{label}</label>
      )}
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-[8px] border border-neutral-300 bg-white text-sm text-neutral-900 shadow-input transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
          'py-3 px-3.5',
          !value && 'text-neutral-500',
          className
        )}
      />
    </div>
  )
}
