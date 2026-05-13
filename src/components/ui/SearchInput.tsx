'use client'

import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { InputHTMLAttributes } from 'react'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className={cn('relative flex items-center', className)}>
      <Search size={15} className="absolute left-3 text-neutral-500 pointer-events-none" />
      <input
        type="text"
        className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
        {...props}
      />
    </div>
  )
}
