'use client'

import { cn } from '@/lib/utils'
import { AlertCircle } from 'lucide-react'
import { InputHTMLAttributes, forwardRef, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  error?: string
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, rightIcon, error, label, className, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-neutral-700">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 flex items-center text-neutral-500 pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              'w-full rounded-[8px] border bg-white text-sm text-neutral-900 placeholder:text-neutral-500 shadow-input transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
              'py-3',
              leftIcon ? 'pl-10' : 'pl-3.5',
              rightIcon || error ? 'pr-10' : 'pr-3.5',
              error
                ? 'border-error-border bg-error-bg focus:ring-error focus:border-error'
                : 'border-neutral-300',
              className
            )}
            {...props}
          />
          {error ? (
            <span className="absolute right-3 flex items-center text-error pointer-events-none">
              <AlertCircle size={16} />
            </span>
          ) : rightIcon ? (
            <span className="absolute right-3 flex items-center text-neutral-500">
              {rightIcon}
            </span>
          ) : null}
        </div>
        {error && (
          <p className="text-xs text-error">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
