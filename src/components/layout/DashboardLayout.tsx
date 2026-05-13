'use client'

import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  breadcrumb?: string
}

export function DashboardLayout({ children, title, breadcrumb }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-page-bg">
      {/* Mobile sidebar backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <Topbar
        title={title}
        breadcrumb={breadcrumb}
        collapsed={collapsed}
        onMobileMenuToggle={() => setMobileOpen((o) => !o)}
      />
      <main
        className={cn(
          'pt-16 min-h-screen transition-all duration-300 ml-0 md:ml-[72px]',
          collapsed ? 'lg:ml-[72px]' : 'lg:ml-[220px]'
        )}
      >
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  )
}
