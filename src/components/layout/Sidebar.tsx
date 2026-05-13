'use client'

import { cn } from '@/lib/utils'
import {
  BookOpen, ChevronLeft, ChevronRight, Clock, Gift, Home, MapPin, Package,
  Settings, Star, Store, Ticket, Truck, Users, UserCheck, X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Dashboard', icon: Home, href: '/dashboard' },
  { label: 'Delivery Zones', icon: MapPin, href: '/delivery-zones' },
  { label: 'Restaurants', icon: Store, href: '/restaurants' },
  { label: 'Restaurant Managers', icon: UserCheck, href: '/managers' },
  { label: 'Delivery Drivers', icon: Truck, href: '/delivery-drivers' },
  { label: 'Customers', icon: Users, href: '/customers' },
  { label: 'Orders', icon: Package, href: '/orders' },
  { label: 'Menu', icon: BookOpen, href: '/menu' },
  { label: 'Offers', icon: Gift, href: '/offers' },
  { label: 'Promotions', icon: Ticket, href: '/promotions' },
  { label: 'Review', icon: Star, href: '/review' },
  { label: 'Audit Logs', icon: Clock, href: '/audit-logs' },
  { label: 'Settings', icon: Settings, href: '/settings' },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full z-50 flex flex-col bg-primary transition-all duration-300',
        // Mobile: slide in/out
        'w-[220px]',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
        // Tablet: always visible, always collapsed
        'md:translate-x-0 md:w-[72px]',
        // Desktop: expand/collapse
        collapsed ? 'lg:w-[72px]' : 'lg:w-[220px]'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
          <span className="text-xl">🧆</span>
        </div>
        <span className={cn(
          'text-white font-bold text-sm leading-tight whitespace-nowrap flex-1',
          'md:hidden',
          !collapsed && 'lg:block'
        )}>
          Esraa Falefel
        </span>
        {/* Close button — mobile only */}
        <button
          onClick={onMobileClose}
          className="ml-auto text-white/70 hover:text-white transition-colors md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X size={20} />
        </button>
      </div>

      {/* Collapse toggle — desktop only */}
      <button
        onClick={onToggle}
        className="hidden lg:flex absolute -right-3 top-16 w-6 h-6 rounded-full bg-white border border-neutral-300 items-center justify-center shadow-sm hover:bg-neutral-100 transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={12} className="text-neutral-600" /> : <ChevronLeft size={12} className="text-neutral-600" />}
      </button>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-thin">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg my-0.5 transition-colors min-h-[44px]',
                isActive
                  ? 'bg-sidebar-active text-white'
                  : 'text-sidebar-text hover:bg-sidebar-hover hover:text-white'
              )}
            >
              <Icon size={18} className="flex-shrink-0" />
              <span className={cn(
                'text-sm font-medium whitespace-nowrap',
                'md:hidden',
                !collapsed && 'lg:block'
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
