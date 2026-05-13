'use client'

import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface Option { label: string; value: string }

interface SelectDropdownProps {
  options: Option[]
  value: string
  onChange: (val: string) => void
  placeholder?: string
  label?: string
  required?: boolean
  className?: string
}

export function SelectDropdown({ options, value, onChange, placeholder = 'Select', label, required, className }: SelectDropdownProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-neutral-700">
          {label}{required && <span className="text-error ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full appearance-none rounded-lg border border-neutral-300 bg-white px-3.5 py-3 pr-10 text-sm text-neutral-900 shadow-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors',
            !value && 'text-neutral-500',
            className
          )}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
      </div>
    </div>
  )
}
