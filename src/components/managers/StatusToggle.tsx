'use client'

import { cn } from '@/lib/utils'

interface StatusToggleProps {
  checked: boolean
  onChange: (val: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md'
}

export function StatusToggle({ checked, onChange, disabled = false, size = 'md' }: StatusToggleProps) {
  const trackSm = 'w-8 h-4'
  const trackMd = 'w-11 h-6'
  const thumbSm = 'w-3 h-3'
  const thumbMd = 'w-4 h-4'
  const translateSm = checked ? 'translate-x-4' : 'translate-x-0.5'
  const translateMd = checked ? 'translate-x-5' : 'translate-x-1'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        'relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
        size === 'sm' ? trackSm : trackMd,
        checked ? 'bg-primary' : 'bg-neutral-300',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <span
        className={cn(
          'inline-block rounded-full bg-white shadow transition-transform duration-200',
          size === 'sm' ? thumbSm : thumbMd,
          size === 'sm' ? translateSm : translateMd
        )}
      />
    </button>
  )
}
