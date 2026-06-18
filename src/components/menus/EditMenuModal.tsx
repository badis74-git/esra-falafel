'use client'

import { useTranslations } from 'next-intl'
import { X, ArrowLeft, FileText, Tag, Package } from 'lucide-react'
import { useState } from 'react'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { cn } from '@/lib/utils'
import { MenuInfoSection } from './sections/MenuInfoSection'
import { MenuCategoriesSection } from './sections/MenuCategoriesSection'
import { MenuProductsSection } from './sections/MenuProductsSection'
import { mockMenuCategories, mockMenuProducts } from '@/lib/mock/menus'
import type { Menu } from '@/lib/mock/menus'

type MenuEditSection = 'info' | 'categories' | 'products'

interface EditMenuModalProps {
  isOpen: boolean
  menu: Menu
  onClose: () => void
  onSaved: () => void
  onToggleStatus: (id: string, val: boolean) => void
}

const NAV_ITEMS: { key: MenuEditSection; icon: React.ReactNode }[] = [
  { key: 'info', icon: <FileText size={14} /> },
  { key: 'categories', icon: <Tag size={14} /> },
  { key: 'products', icon: <Package size={14} /> },
]

export function EditMenuModal({ isOpen, menu, onClose, onSaved, onToggleStatus }: EditMenuModalProps) {
  const t = useTranslations('menus')
  const [activeSection, setActiveSection] = useState<MenuEditSection>('info')
  const [mobileView, setMobileView] = useState<'list' | 'section'>('list')
  const [isActive, setIsActive] = useState(menu.status === 'active')

  if (!isOpen) return null

  function handleNavClick(key: MenuEditSection) {
    setActiveSection(key)
    setMobileView('section')
  }

  function handleToggle(val: boolean) {
    setIsActive(val)
    onToggleStatus(menu.id, val)
  }

  const navLabels: Record<MenuEditSection, string> = {
    info: t('edit.nav.info'),
    categories: t('edit.nav.categories'),
    products: t('edit.nav.products'),
  }

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 md:flex md:items-center md:justify-center md:px-4">
      <div className="bg-white shadow-dashboard-modal w-full flex flex-col h-full md:h-auto md:max-h-[92vh] md:max-w-5xl md:rounded-[16px]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-table-border flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <h2 className="text-lg font-bold text-neutral-900 truncate">{menu.name}</h2>
            <StatusToggle checked={isActive} onChange={handleToggle} size="sm" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-500 hover:text-neutral-700 transition-colors flex-shrink-0 ml-2"
          >
            <X size={18} />
          </button>
        </div>

        {/* Two-pane body */}
        <div className="flex flex-1 min-h-0 overflow-hidden">

          {/* Left rail — full-width list on mobile, fixed sidebar on desktop */}
          <div className={cn(
            'flex-shrink-0 border-table-border p-4 overflow-y-auto',
            mobileView === 'list' ? 'block w-full border-b md:border-b-0' : 'hidden',
            'md:block md:w-56 md:border-r'
          )}>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
              {t('edit.navGroup')}
            </p>
            <nav className="space-y-1">
              {NAV_ITEMS.map(({ key, icon }) => {
                const active = activeSection === key
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleNavClick(key)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left',
                      active
                        ? 'bg-white shadow-sm font-semibold text-neutral-900'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    )}
                  >
                    <span className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 bg-primary-light text-primary">
                      {icon}
                    </span>
                    <span className="truncate">{navLabels[key]}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Right pane — hidden on mobile list view, always visible on desktop */}
          <div className={cn(
            'min-w-0 overflow-hidden flex-col',
            mobileView === 'section' ? 'flex flex-1' : 'hidden',
            'md:flex md:flex-1'
          )}>
            {/* Mobile back header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-table-border flex-shrink-0 md:hidden">
              <button
                type="button"
                onClick={() => setMobileView('list')}
                className="p-1 text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
              <span className="text-sm font-semibold text-neutral-900">{navLabels[activeSection]}</span>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="bg-white rounded-[12px] h-full flex flex-col">
                {activeSection === 'info' && (
                  <MenuInfoSection menu={menu} onSave={onSaved} onCancel={onClose} />
                )}
                {activeSection === 'categories' && (
                  <MenuCategoriesSection
                    categories={mockMenuCategories}
                    selectedIds={menu.selectedCategories}
                    onSave={onSaved}
                    onCancel={onClose}
                  />
                )}
                {activeSection === 'products' && (
                  <MenuProductsSection
                    products={mockMenuProducts}
                    selectedIds={menu.selectedProducts}
                    onSave={onSaved}
                    onCancel={onClose}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
