'use client'

import { useTranslations } from 'next-intl'
import { Mail, User } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { ProfilePictureUpload } from '@/components/ui/ProfilePictureUpload'
import { PhoneInput } from '@/components/ui/PhoneInput'
import { SelectDropdown } from '@/components/ui/SelectDropdown'
import { MultiSelectDropdown } from '@/components/ui/MultiSelectDropdown'
import { DateInput } from '@/components/ui/DateInput'
import { mockZones, mockRestaurantsForDrivers } from '@/lib/mock/drivers'
import type { DriverFormData } from '../AddDriverModal'

interface Props {
  data: DriverFormData
  onChange: (patch: Partial<DriverFormData>) => void
}

export function Step1PersonalInfo({ data, onChange }: Props) {
  const t = useTranslations('drivers')

  return (
    <div className="space-y-5">
      <ProfilePictureUpload
        src={data.avatar}
        onChange={(src) => onChange({ avatar: src })}
        onDelete={() => onChange({ avatar: null })}
      />
      <div>
        <h3 className="text-sm font-semibold text-primary mb-4">{t('personal.sectionTitle')}</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={`${t('personal.firstName')} *`}
            placeholder={t('personal.firstNamePlaceholder')}
            leftIcon={<User size={14} />}
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
          />
          <Input
            label={`${t('personal.lastName')} *`}
            placeholder={t('personal.firstName')}
            leftIcon={<User size={14} />}
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
          />
          <Input
            label={`${t('personal.email')} *`}
            placeholder={t('personal.emailPlaceholder')}
            leftIcon={<Mail size={14} />}
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
          <PhoneInput
            label={`${t('personal.phone')} *`}
            value={data.phone}
            onChange={(v) => onChange({ phone: v })}
          />
          <div className="col-span-2">
            <DateInput
              label={t('personal.dob')}
              placeholder={t('personal.dobPlaceholder')}
              value={data.dateOfBirth ?? ''}
              onChange={(v) => onChange({ dateOfBirth: v })}
            />
          </div>
          <SelectDropdown
            label={`${t('personal.zone')} *`}
            placeholder={t('personal.zonePlaceholder')}
            options={mockZones}
            value={data.zone}
            onChange={(v) => onChange({ zone: v })}
          />
          <MultiSelectDropdown
            label={`${t('personal.restaurants')} *`}
            placeholder={t('personal.restaurantsPlaceholder')}
            options={mockRestaurantsForDrivers}
            value={data.restaurants}
            onChange={(v) => onChange({ restaurants: v })}
          />
        </div>
      </div>
    </div>
  )
}
