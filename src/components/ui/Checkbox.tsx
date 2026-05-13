'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { InputHTMLAttributes } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export function Checkbox({ label, checked, onChange, className, id, ...props }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-2 cursor-pointer select-none"
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="sr-only"
          {...props}
        />
        <div
          className={cn(
            'h-4 w-4 rounded border transition-colors duration-150 flex items-center justify-center',
            checked
              ? 'bg-primary border-primary'
              : 'bg-white border-neutral-300',
            className
          )}
        >
          {checked && <Check size={10} className="text-white stroke-[3]" />}
        </div>
      </div>
      {label && <span className="text-sm text-neutral-700">{label}</span>}
    </label>
  )
}
