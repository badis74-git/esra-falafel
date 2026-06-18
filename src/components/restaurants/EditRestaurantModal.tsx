'use client'

import { useTranslations } from 'next-intl'
import { X, ArrowLeft, User, MapPin, Briefcase, Users, UtensilsCrossed, ShoppingBag, Star, Phone, Globe } from 'lucide-react'
import { useState } from 'react'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { cn } from '@/lib/utils'
import { ChangesSavedModal } from '@/components/drivers/ChangesSavedModal'
import { FailModal } from '@/components/drivers/FailModal'
import { RestaurantInfoSection } from './sections/RestaurantInfoSection'
import { LocationSection } from './sections/LocationSection'
import { OperationsSection } from './sections/OperationsSection'
import { TeamSection } from './sections/TeamSection'
import { MenuSection } from './sections/MenuSection'
import { OrdersSection } from './sections/OrdersSection'
import { ReviewsSection } from './sections/ReviewsSection'
import { SupportContactSection } from './sections/SupportContactSection'
import { OnlinePresenceSection } from './sections/OnlinePresenceSection'
import type { Restaurant } from '@/lib/mock/restaurants'

type RestaurantEditSection =
  | 'info' | 'location' | 'operations' | 'team' | 'menu'
  | 'orders' | 'reviews' | 'support' | 'online'

interface EditRestaurantModalProps {
  isOpen: boolean
  restaurant: Restaurant
  onClose: () => void
  onSaved: () => void
  onToggleStatus: (id: string, val: boolean) => void
}

const NAV_ITEMS: { key: RestaurantEditSection; icon: React.ReactNode }[] = [
  { key: 'info', icon: <User size={14} /> },
  { key: 'location', icon: <MapPin size={14} /> },
  { key: 'operations', icon: <Briefcase size={14} /> },
  { key: 'team', icon: <Users size={14} /> },
  { key: 'menu', icon: <UtensilsCrossed size={14} /> },
  { key: 'orders', icon: <ShoppingBag size={14} /> },
  { key: 'reviews', icon: <Star size={14} /> },
  { key: 'support', icon: <Phone size={14} /> },
  { key: 'online', icon: <Globe size={14} /> },
]

export function EditRestaurantModal({ isOpen, restaurant, onClose, onSaved, onToggleStatus }: EditRestaurantModalProps) {
  const t = useTranslations('restaurants')
  const [activeSection, setActiveSection] = useState<RestaurantEditSection>('info')
  const [mobileView, setMobileView] = useState<'list' | 'section'>('list')
  const [isActive, setIsActive] = useState(restaurant.status === 'active')
  const [showSaved, setShowSaved] = useState(false)

  if (!isOpen) return null

  function handleNavClick(key: RestaurantEditSection) {
    setActiveSection(key)
    setMobileView('section')
  }

  function handleToggle(val: boolean) {
    setIsActive(val)
    onToggleStatus(restaurant.id, val)
  }

  function handleSave() {
    setShowSaved(true)
  }

  function handleSavedClose() {
    setShowSaved(false)
    onSaved()
  }

  const navLabels: Record<RestaurantEditSection, string> = {
    info: t('edit.nav.info'),
    location: t('edit.nav.location'),
    operations: t('edit.nav.operations'),
    team: t('edit.nav.team'),
    menu: t('edit.nav.menu'),
    orders: t('edit.nav.orders'),
    reviews: t('edit.nav.reviews'),
    support: t('edit.nav.support'),
    online: t('edit.nav.online'),
  }

  return (
    <>
      <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 md:flex md:items-center md:justify-center md:px-4">
        <div className="bg-white shadow-dashboard-modal w-full flex flex-col h-full md:h-auto md:max-h-[92vh] md:max-w-5xl md:rounded-[16px]">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-table-border flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <h2 className="text-lg font-bold text-neutral-900 truncate">{restaurant.name}</h2>
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

            {/* Left rail */}
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
                      <span className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 bg-primary text-white">
                        {icon}
                      </span>
                      <span className="truncate">{navLabels[key]}</span>
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Right pane */}
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
                    <RestaurantInfoSection restaurant={restaurant} onSave={handleSave} onCancel={onClose} />
                  )}
                  {activeSection === 'location' && (
                    <LocationSection restaurant={restaurant} onSave={handleSave} onCancel={onClose} />
                  )}
                  {activeSection === 'operations' && (
                    <OperationsSection restaurant={restaurant} onSave={handleSave} onCancel={onClose} />
                  )}
                  {activeSection === 'team' && (
                    <TeamSection
                      manager={restaurant.teamManager}
                      drivers={restaurant.teamDrivers ?? []}
                      onSave={handleSave}
                      onCancel={onClose}
                    />
                  )}
                  {activeSection === 'menu' && (
                    <MenuSection restaurant={restaurant} onSave={handleSave} onCancel={onClose} />
                  )}
                  {activeSection === 'orders' && (
                    <OrdersSection
                      orders={restaurant.recentOrders ?? []}
                      onSave={handleSave}
                      onCancel={onClose}
                    />
                  )}
                  {activeSection === 'reviews' && (
                    <ReviewsSection
                      rating={restaurant.rating ?? 0}
                      reviews={restaurant.reviews ?? []}
                      onSave={handleSave}
                      onCancel={onClose}
                    />
                  )}
                  {activeSection === 'support' && (
                    <SupportContactSection restaurant={restaurant} onSave={handleSave} onCancel={onClose} />
                  )}
                  {activeSection === 'online' && (
                    <OnlinePresenceSection restaurant={restaurant} onSave={handleSave} onCancel={onClose} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSaved && (
        <ChangesSavedModal onReturnToList={handleSavedClose} />
      )}
    </>
  )
}
