'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PhoneInput } from '@/components/ui/PhoneInput'
import { SelectDropdown } from '@/components/ui/SelectDropdown'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { MapPreview } from '@/components/ui/MapPreview'
import { ProfilePictureUpload } from '@/components/ui/ProfilePictureUpload'
import { Manager, mockRestaurants } from '@/lib/mock/managers'
import { useTranslations } from 'next-intl'
import { Mail, Save, User, X } from 'lucide-react'
import { useState } from 'react'

interface UpdateManagerModalProps {
  manager: Manager
  onClose: () => void
  onSaved: () => void
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-semibold text-primary mb-3">{children}</h3>
}

export function UpdateManagerModal({ manager, onClose, onSaved }: UpdateManagerModalProps) {
  const t = useTranslations('managers')
  const tCommon = useTranslations('common')
  const [active, setActive] = useState(manager.status === 'active')
  const [photo, setPhoto] = useState<string | null>(manager.avatar)
  const [firstName, setFirstName] = useState(manager.firstName)
  const [lastName, setLastName] = useState(manager.lastName)
  const [email, setEmail] = useState(manager.email)
  const [phone, setPhone] = useState(manager.phone)
  const [street, setStreet] = useState('Musterstrasse')
  const [number, setNumber] = useState('12')
  const [zip, setZip] = useState('3000')
  const [city, setCity] = useState('Bern')
  const [restaurant, setRestaurant] = useState(
    mockRestaurants.find((r) => r.label === manager.restaurant)?.value ?? ''
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSaved()
  }

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 md:flex md:items-center md:justify-center md:px-4">
      <div className="bg-white shadow-dashboard-modal w-full flex flex-col h-full md:h-auto md:max-h-[90vh] md:max-w-2xl md:rounded-[16px]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-table-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-neutral-900">
              {manager.firstName} {manager.lastName}
            </h2>
            <StatusToggle checked={active} onChange={setActive} />
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5 scrollbar-thin">
          <form onSubmit={handleSubmit} id="update-form">
            <ProfilePictureUpload
              src={photo}
              onChange={(src) => setPhoto(src)}
              onDelete={() => setPhoto(null)}
            />

            <SectionTitle>{t('createModal.personalInfo')}</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <Input id="firstName" label={t('createModal.firstName')} value={firstName} onChange={(e) => setFirstName(e.target.value)} leftIcon={<User size={15} />} />
              <Input id="lastName" label={t('createModal.lastName')} value={lastName} onChange={(e) => setLastName(e.target.value)} leftIcon={<User size={15} />} />
              <Input id="email" label={t('createModal.email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} leftIcon={<Mail size={15} />} />
              <PhoneInput label={t('createModal.phone')} countryCode="DE" dialCode="+41" value={phone} onChange={setPhone} />
            </div>

            <SectionTitle>{t('createModal.addressDetails')}</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
              <Input id="street" label={t('createModal.street')} value={street} onChange={(e) => setStreet(e.target.value)} />
              <Input id="number" label={t('createModal.number')} value={number} onChange={(e) => setNumber(e.target.value)} />
              <Input id="zip" label={t('createModal.zip')} value={zip} onChange={(e) => setZip(e.target.value)} />
              <Input id="city" label={t('createModal.city')} value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="mb-5"><MapPreview /></div>

            <SectionTitle>{t('createModal.assignedRestaurant')}</SectionTitle>
            <SelectDropdown options={mockRestaurants} value={restaurant} onChange={setRestaurant} label={t('createModal.restaurantLabel')} required placeholder={t('createModal.selectRestaurant')} />
          </form>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-table-border flex-shrink-0">
          <Button type="button" variant="secondary" fullWidth={false} onClick={onClose}>{tCommon('cancel')}</Button>
          <Button type="submit" form="update-form" variant="primary" fullWidth={false}>
            <Save size={14} /> {tCommon('saveChanges')}
          </Button>
        </div>
      </div>
    </div>
  )
}
