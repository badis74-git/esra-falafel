'use client'

import { useTranslations } from 'next-intl'
import { X, User, MapPin, FileText, Truck, ShoppingBag, Map, Star } from 'lucide-react'
import { useState } from 'react'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { cn } from '@/lib/utils'
import { PersonalInfoSection } from './sections/PersonalInfoSection'
import { AddressDetailsSection } from './sections/AddressDetailsSection'
import { IdVerificationSection } from './sections/IdVerificationSection'
import { VehicleInfoSection } from './sections/VehicleInfoSection'
import { AssignedOrdersSection } from './sections/AssignedOrdersSection'
import { AssignedZoneSection } from './sections/AssignedZoneSection'
import { ReviewsSection } from './sections/ReviewsSection'
import type { Driver } from '@/lib/mock/drivers'

type DriverEditSection = 'personal' | 'address' | 'id' | 'vehicle' | 'orders' | 'zone' | 'reviews'

interface EditDriverModalProps {
  isOpen: boolean
  driver: Driver
  onClose: () => void
  onSaved: () => void
  onFail: () => void
  onToggleStatus: (id: string, val: boolean) => void
}

const NAV_ITEMS: { key: DriverEditSection; icon: React.ReactNode }[] = [
  { key: 'personal', icon: <User size={14} /> },
  { key: 'address', icon: <MapPin size={14} /> },
  { key: 'id', icon: <FileText size={14} /> },
  { key: 'vehicle', icon: <Truck size={14} /> },
  { key: 'orders', icon: <ShoppingBag size={14} /> },
  { key: 'zone', icon: <Map size={14} /> },
  { key: 'reviews', icon: <Star size={14} /> },
]

export function EditDriverModal({ isOpen, driver, onClose, onSaved, onFail, onToggleStatus }: EditDriverModalProps) {
  const t = useTranslations('drivers')
  const [activeSection, setActiveSection] = useState<DriverEditSection>('personal')
  const [isActive, setIsActive] = useState(driver.status === 'active')

  if (!isOpen) return null

  function handleToggle(val: boolean) {
    setIsActive(val)
    onToggleStatus(driver.id, val)
  }

  const navLabels: Record<DriverEditSection, string> = {
    personal: t('edit.nav.personal'),
    address: t('edit.nav.address'),
    id: t('edit.nav.id'),
    vehicle: t('edit.nav.vehicle'),
    orders: t('edit.nav.orders'),
    zone: t('edit.nav.zone'),
    reviews: t('edit.nav.reviews'),
  }

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 md:flex md:items-center md:justify-center md:px-4">
      <div className="bg-white shadow-dashboard-modal w-full flex flex-col h-full md:h-auto md:max-h-[92vh] md:max-w-5xl md:rounded-[16px]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-table-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-neutral-900">
              {driver.firstName} {driver.lastName}
            </h2>
            <StatusToggle checked={isActive} onChange={handleToggle} size="sm" />
          </div>
          <button type="button" onClick={onClose} className="p-1.5 text-neutral-500 hover:text-neutral-700 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Two-pane body */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Left rail */}
          <div className="w-56 flex-shrink-0 border-r border-table-border p-4 overflow-y-auto">
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
                    onClick={() => setActiveSection(key)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left',
                      active
                        ? 'bg-white shadow-sm font-semibold text-neutral-900'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    )}
                  >
                    <span className={cn('w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0', active ? 'bg-primary-light text-primary' : 'bg-primary-light text-primary')}>
                      {icon}
                    </span>
                    <span className="truncate">{navLabels[key]}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Right pane */}
          <div className="flex-1 min-w-0 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <div className="bg-white rounded-[12px] h-full flex flex-col">
                {activeSection === 'personal' && (
                  <PersonalInfoSection driver={driver} onSave={onSaved} onCancel={onClose} />
                )}
                {activeSection === 'address' && (
                  <AddressDetailsSection driver={driver} onSave={onSaved} onCancel={onClose} />
                )}
                {activeSection === 'id' && (
                  <IdVerificationSection driver={driver} onSave={onSaved} onCancel={onClose} />
                )}
                {activeSection === 'vehicle' && (
                  <VehicleInfoSection driver={driver} onSave={onSaved} onCancel={onClose} />
                )}
                {activeSection === 'orders' && (
                  <AssignedOrdersSection orders={driver.assignedOrders} onSave={onSaved} onCancel={onClose} />
                )}
                {activeSection === 'zone' && (
                  <AssignedZoneSection driver={driver} onSave={onSaved} onCancel={onClose} />
                )}
                {activeSection === 'reviews' && (
                  <ReviewsSection rating={driver.rating} reviews={driver.reviews} onSave={onSaved} onCancel={onClose} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
