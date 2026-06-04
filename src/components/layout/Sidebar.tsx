'use client'

import { cn } from '@/lib/utils'
import {
  BookOpen, ChevronDown, ChevronLeft, ChevronRight, ChevronUp,
  Clock, Gift, Home, MapPin, Package,
  Settings, Star, Store, Ticket, Truck, Users, UserCheck, X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'

const MENU_GROUP_ROOTS = ['/menus', '/products', '/categories', '/sub-categories', '/addons-group', '/addons']

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname()
  const t = useTranslations('sidebar')

  const navItems = [
    { label: t('dashboard'), icon: Home, href: '/dashboard' },
    { label: t('zoneManagement'), icon: MapPin, href: '/zones' },
    { label: t('restaurants'), icon: Store, href: '/restaurants' },
    { label: t('managers'), icon: UserCheck, href: '/managers' },
    { label: t('drivers'), icon: Truck, href: '/drivers' },
    { label: t('customers'), icon: Users, href: '/customers' },
    { label: t('orders'), icon: Package, href: '/orders' },
  ]

  const menuSubItems = [
    { label: t('menus'), href: '/menus' },
    { label: t('products'), href: '/products' },
    { label: t('categories'), href: '/categories' },
    { label: t('subCategories'), href: '/sub-categories' },
    { label: t('addonsGroup'), href: '/addons-group' },
    { label: t('addons'), href: '/addons' },
  ]

  const navItemsBottom = [
    { label: t('offers'), icon: Gift, href: '/offers' },
    { label: t('promotions'), icon: Ticket, href: '/promotions' },
    { label: t('review'), icon: Star, href: '/review' },
    { label: t('auditLogs'), icon: Clock, href: '/audit-logs' },
    { label: t('settings'), icon: Settings, href: '/settings' },
  ]

  const isMenuGroupActive = MENU_GROUP_ROOTS.some(
    (root) => pathname === root || pathname.startsWith(root + '/')
  )
  const [menuGroupOpen, setMenuGroupOpen] = useState(isMenuGroupActive)

  useEffect(() => {
    if (isMenuGroupActive) setMenuGroupOpen(true)
  }, [isMenuGroupActive])

  const isExpanded = !collapsed

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full z-50 flex flex-col bg-primary transition-all duration-300',
        'w-[220px]',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0 md:w-[72px]',
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
        {/* Top nav items */}
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

        {/* Menu Management collapsible group */}
        <div className="my-0.5">
          <button
            type="button"
            onClick={() => {
              if (isExpanded || mobileOpen) setMenuGroupOpen((o) => !o)
            }}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors min-h-[44px]',
              isMenuGroupActive
                ? 'bg-sidebar-active text-white'
                : 'text-sidebar-text hover:bg-sidebar-hover hover:text-white'
            )}
          >
            <BookOpen size={18} className="flex-shrink-0" />
            <span className={cn(
              'text-sm font-medium whitespace-nowrap flex-1 text-left',
              'md:hidden',
              !collapsed && 'lg:block'
            )}>
              {t('menuManagement')}
            </span>
            <span className={cn(
              'ml-auto flex-shrink-0',
              'md:hidden',
              !collapsed && 'lg:flex'
            )}>
              {menuGroupOpen
                ? <ChevronUp size={14} />
                : <ChevronDown size={14} />}
            </span>
          </button>

          {/* Sub-items — only when group is open AND sidebar is expanded */}
          {menuGroupOpen && (
            <div className={cn('md:hidden', !collapsed && 'lg:block')}>
              {menuSubItems.map((sub) => {
                const isActive = pathname === sub.href || pathname.startsWith(sub.href + '/')
                return (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={onMobileClose}
                    className={cn(
                      'flex items-center pl-8 pr-3 py-2 rounded-lg my-0.5 transition-colors min-h-[36px]',
                      isActive
                        ? 'bg-sidebar-active text-white'
                        : 'text-sidebar-text hover:bg-sidebar-hover hover:text-white'
                    )}
                  >
                    <span className="text-xs font-medium whitespace-nowrap">{sub.label}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Bottom nav items */}
        {navItemsBottom.map((item) => {
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
