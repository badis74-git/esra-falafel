'use client'

import { ChevronDown } from 'lucide-react'

export function LanguageSelector() {
  return (
    <button className="flex items-center gap-1.5 text-sm text-neutral-700 hover:text-neutral-900 transition-colors">
      {/* UK flag emoji */}
      <span className="text-base leading-none">🇬🇧</span>
      <span className="hidden sm:inline font-medium">English (UK)</span>
      <ChevronDown size={14} className="text-neutral-500" />
    </button>
  )
}
