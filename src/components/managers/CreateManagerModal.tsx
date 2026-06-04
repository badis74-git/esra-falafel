'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PhoneInput } from '@/components/ui/PhoneInput'
import { SelectDropdown } from '@/components/ui/SelectDropdown'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { MapPreview } from '@/components/ui/MapPreview'
import { ProfilePictureUpload } from '@/components/ui/ProfilePictureUpload'
import { mockRestaurants } from '@/lib/mock/managers'
import { useTranslations } from 'next-intl'
import { Mail, User, X } from 'lucide-react'
import { useState } from 'react'

interface CreateManagerModalProps {
  onClose: () => void
  onCreated: (email: string) => void
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-semibold text-primary mb-3">{children}</h3>
}

export function CreateManagerModal({ onClose, onCreated }: CreateManagerModalProps) {
  const t = useTranslations('managers')
  const tCommon = useTranslations('common')
  const [active, setActive] = useState(true)
  const [photo, setPhoto] = useState<string | null>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [zip, setZip] = useState('')
  const [city, setCity] = useState('')
  const [restaurant, setRestaurant] = useState('')

  const isFilled = firstName && lastName && email && restaurant

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isFilled) onCreated(email)
  }

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 md:flex md:items-center md:justify-center md:px-4">
      <div className="bg-white shadow-dashboard-modal w-full flex flex-col h-full md:h-auto md:max-h-[90vh] md:max-w-2xl md:rounded-[16px]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-table-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-neutral-900">{t('createModal.title')}</h2>
            <StatusToggle checked={active} onChange={setActive} />
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 scrollbar-thin">
          <form onSubmit={handleSubmit} id="create-form">
            <ProfilePictureUpload
              src={photo}
              onChange={(src) => setPhoto(src)}
              onDelete={() => setPhoto(null)}
            />

            {/* Personal Information */}
            <SectionTitle>{t('createModal.personalInfo')}</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <Input
                id="firstName" label={t('createModal.firstName')} placeholder={t('createModal.firstNamePlaceholder')}
                value={firstName} onChange={(e) => setFirstName(e.target.value)}
                leftIcon={<User size={15} />}
              />
              <Input
                id="lastName" label={t('createModal.lastName')} placeholder={t('createModal.lastNamePlaceholder')}
                value={lastName} onChange={(e) => setLastName(e.target.value)}
                leftIcon={<User size={15} />}
              />
              <Input
                id="email" label={t('createModal.email')} type="email" placeholder="email@domain.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail size={15} />}
              />
              <PhoneInput
                label={t('createModal.phone')}
                countryCode="DE" dialCode="+41"
                value={phone} onChange={setPhone}
                placeholder="+41 -- --- -- --"
              />
            </div>

            {/* Address Details */}
            <SectionTitle>{t('createModal.addressDetails')}</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
              <Input id="street" placeholder={t('createModal.streetPlaceholder')} label={t('createModal.street')} value={street} onChange={(e) => setStreet(e.target.value)} />
              <Input id="number" placeholder={t('createModal.numberPlaceholder')} label={t('createModal.number')} value={number} onChange={(e) => setNumber(e.target.value)} />
              <Input id="zip" placeholder={t('createModal.zipPlaceholder')} label={t('createModal.zip')} value={zip} onChange={(e) => setZip(e.target.value)} />
              <Input id="city" placeholder={t('createModal.cityPlaceholder')} label={t('createModal.city')} value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="mb-5">
              <MapPreview />
            </div>

            {/* Assigned Restaurant */}
            <SectionTitle>{t('createModal.assignedRestaurant')}</SectionTitle>
            <SelectDropdown
              options={mockRestaurants}
              value={restaurant}
              onChange={setRestaurant}
              placeholder={t('createModal.selectRestaurant')}
              label={t('createModal.restaurantLabel')}
              required
            />
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-table-border flex-shrink-0">
          <Button type="button" variant="secondary" fullWidth={false} onClick={onClose}>{tCommon('cancel')}</Button>
          <Button
            type="submit"
            form="create-form"
            variant="primary"
            fullWidth={false}
            disabled={!isFilled}
          >
            {t('createModal.create')}
          </Button>
        </div>
      </div>
    </div>
  )
}
