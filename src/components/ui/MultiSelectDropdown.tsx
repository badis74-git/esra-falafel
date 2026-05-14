'use client'

import { cn } from '@/lib/utils'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Avatar } from '@/components/ui/Avatar'
import { Checkbox } from '@/components/ui/Checkbox'

interface Option {
  label: string
  value: string
  avatar?: string
}

interface MultiSelectDropdownProps {
  options: Option[]
  value: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  label?: string
}

export function MultiSelectDropdown({
  options,
  value,
  onChange,
  placeholder = 'Select',
  label,
}: MultiSelectDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function toggle(val: string) {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val))
    } else {
      onChange([...value, val])
    }
  }

  const selectedLabels = options
    .filter((o) => value.includes(o.value))
    .map((o) => o.label)
    .join(' - ')

  const hasAvatars = options.some((o) => o.avatar !== undefined)

  return (
    <div className="flex flex-col gap-1.5" ref={ref}>
      {label && (
        <label className="text-sm font-medium text-neutral-700">{label}</label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            'w-full flex items-center justify-between rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-sm shadow-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-left',
            open && 'ring-2 ring-primary border-primary'
          )}
        >
          <span className={cn(selectedLabels ? 'text-neutral-900' : 'text-neutral-500')}>
            {selectedLabels || placeholder}
          </span>
          {open
            ? <ChevronUp size={16} className="text-neutral-500 flex-shrink-0" />
            : <ChevronDown size={16} className="text-neutral-500 flex-shrink-0" />
          }
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-neutral-300 rounded-lg shadow-dashboard-modal overflow-hidden">
            {options.map((option) => {
              const selected = value.includes(option.value)
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggle(option.value)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left transition-colors',
                    selected ? 'bg-primary-light' : 'bg-white hover:bg-neutral-50'
                  )}
                >
                  <Checkbox
                    checked={selected}
                    onChange={() => toggle(option.value)}
                    id={`msd-${option.value}`}
                  />
                  {hasAvatars && (
                    <Avatar
                      name={option.label}
                      src={option.avatar || undefined}
                      size="sm"
                    />
                  )}
                  <span className="flex-1 text-neutral-900">{option.label}</span>
                  {selected && <Check size={16} className="text-primary flex-shrink-0" />}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
