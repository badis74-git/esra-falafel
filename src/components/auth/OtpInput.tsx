'use client'

import { cn } from '@/lib/utils'
import { KeyboardEvent, ClipboardEvent, useRef } from 'react'

interface OtpInputProps {
  value: string[]
  onChange: (value: string[]) => void
  hasError?: boolean
}

export function OtpInput({ value, onChange, hasError }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  function handleChange(index: number, char: string) {
    const digit = char.replace(/\D/g, '').slice(-1)
    const next = [...value]
    next[index] = digit
    onChange(next)
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace') {
      if (value[index]) {
        const next = [...value]
        next[index] = ''
        onChange(next)
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus()
        const next = [...value]
        next[index - 1] = ''
        onChange(next)
      }
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const next = Array(6).fill('')
    pasted.split('').forEach((ch, i) => { next[i] = ch })
    onChange(next)
    const focusIdx = Math.min(pasted.length, 5)
    inputRefs.current[focusIdx]?.focus()
  }

  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i]}
          placeholder="0"
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={cn(
            'h-12 w-10 sm:w-12 rounded-[8px] border text-center text-lg font-semibold text-neutral-900 placeholder:text-neutral-300 bg-white shadow-input transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
            hasError ? 'border-error-border bg-error-bg' : 'border-neutral-300'
          )}
        />
      ))}

      {/* Dash separator */}
      <span className="text-neutral-400 text-xl font-light select-none">—</span>

      {[3, 4, 5].map((i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i]}
          placeholder="0"
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={cn(
            'h-12 w-10 sm:w-12 rounded-[8px] border text-center text-lg font-semibold text-neutral-900 placeholder:text-neutral-300 bg-white shadow-input transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
            hasError ? 'border-error-border bg-error-bg' : 'border-neutral-300'
          )}
        />
      ))}
    </div>
  )
}
