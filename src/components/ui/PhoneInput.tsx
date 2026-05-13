'use client'

import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface PhoneInputProps {
  countryCode?: string
  dialCode?: string
  value: string
  onChange: (val: string) => void
  placeholder?: string
  className?: string
  label?: string
}

export function PhoneInput({
  countryCode = 'DE',
  dialCode = '+41',
  value,
  onChange,
  placeholder = '+41 -- --- -- --',
  className,
  label,
}: PhoneInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-neutral-700">{label}</label>}
      <div className={cn('flex items-center rounded-lg border border-neutral-300 bg-white shadow-input overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-colors', className)}>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-3 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors flex-shrink-0"
        >
          <span className="text-base leading-none">
            {countryCode === 'DE' ? '🇩🇪' : countryCode === 'TN' ? '🇹🇳' : '🌍'}
          </span>
          <span className="font-medium text-xs">{dialCode}</span>
          <ChevronDown size={12} className="text-neutral-400" />
        </button>
        <div className="w-px h-5 bg-neutral-300 flex-shrink-0" />
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-3 text-sm bg-transparent placeholder:text-neutral-400 focus:outline-none"
        />
      </div>
    </div>
  )
}
