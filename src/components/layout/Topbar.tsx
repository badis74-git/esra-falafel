'use client'

import { LanguageSelector } from '@/components/ui/LanguageSelector'
import { SearchInput } from '@/components/ui/SearchInput'
import { Avatar } from '@/components/ui/Avatar'
import { Bell, Menu, Moon, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TopbarProps {
  breadcrumb?: string
  title: string
  collapsed: boolean
  onMobileMenuToggle: () => void
}

export function Topbar({ breadcrumb = 'Admin', title, collapsed, onMobileMenuToggle }: TopbarProps) {
  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-20 h-16 bg-white border-b border-table-border flex items-center gap-3 px-3 md:px-6 transition-all duration-300',
        'left-0 md:left-[72px]',
        collapsed ? 'lg:left-[72px]' : 'lg:left-[220px]'
      )}
    >
      {/* Hamburger — mobile only */}
      <button
        onClick={onMobileMenuToggle}
        className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-500 min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0"
      >
        <Menu size={20} />
      </button>

      {/* Left: breadcrumb + title */}
      <div className="flex flex-col justify-center flex-shrink-0">
        <span className="text-xs text-neutral-500 hidden sm:block">{breadcrumb}</span>
        <h1 className="text-base md:text-lg font-bold text-neutral-900 leading-tight">{title}</h1>
      </div>

      {/* Center: search — hidden on mobile */}
      <div className="flex-1 max-w-sm mx-auto hidden sm:block">
        <SearchInput placeholder="Search" className="w-full" />
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1 md:gap-3 ml-auto flex-shrink-0">
        {/* Search icon — mobile only */}
        <button className="sm:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-500 min-h-[44px] min-w-[44px] flex items-center justify-center">
          <Search size={18} />
        </button>
        <LanguageSelector />
        <button className="p-2 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-500 min-h-[44px] min-w-[44px] flex items-center justify-center">
          <Bell size={18} />
        </button>
        <button className="hidden sm:flex p-2 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-500 min-h-[44px] min-w-[44px] items-center justify-center">
          <Moon size={18} />
        </button>
        <Avatar name="Admin User" size="sm" />
      </div>
    </header>
  )
}
