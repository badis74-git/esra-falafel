'use client'

import { useTranslations } from 'next-intl'
import { Mail, User } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { PhoneInput } from '@/components/ui/PhoneInput'
import { DateInput } from '@/components/ui/DateInput'
import { SelectDropdown } from '@/components/ui/SelectDropdown'
import { MultiSelectDropdown } from '@/components/ui/MultiSelectDropdown'
import { PhotoUploadBox } from '@/components/ui/PhotoUploadBox'
import { ProfilePictureUpload } from '@/components/ui/ProfilePictureUpload'
import { PdfUploadZone } from '@/components/ui/PdfUploadZone'
import { FileAttachmentRow } from '@/components/ui/FileAttachmentRow'
import { MapPreview } from '@/components/ui/MapPreview'
import { mockZones, mockRestaurantsForDrivers, mockVehicleTypes } from '@/lib/mock/drivers'
import type { DriverFormData } from '../AddDriverModal'

interface Props {
  data: DriverFormData
  onChange: (patch: Partial<DriverFormData>) => void
}

export function Step5Overview({ data, onChange }: Props) {
  const t = useTranslations('drivers')

  function handlePdfUpload(file: File) {
    onChange({
      vehicleDoc: {
        name: file.name,
        date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }),
        size: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
        url: URL.createObjectURL(file),
      },
    })
  }

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div>
        <h3 className="text-sm font-semibold text-primary mb-3">{t('personal.sectionTitle')}</h3>

        <ProfilePictureUpload
          src={data.avatar}
          onChange={(src) => onChange({ avatar: src })}
          onDelete={() => onChange({ avatar: null })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={`${t('personal.firstName')} *`}
            leftIcon={<User size={14} />}
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
          />
          <Input
            label={`${t('personal.lastName')} *`}
            leftIcon={<User size={14} />}
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
          />
          <Input
            label={`${t('personal.email')} *`}
            leftIcon={<Mail size={14} />}
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
          <PhoneInput
            label={`${t('personal.phone')} *`}
            value={data.phone}
            onChange={(v) => onChange({ phone: v })}
          />
          <div className="col-span-1 md:col-span-2">
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

      {/* Address Details */}
      <div>
        <h3 className="text-sm font-semibold text-primary mb-3">{t('address.sectionTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label={t('address.street')}
            value={data.street}
            onChange={(e) => onChange({ street: e.target.value })}
          />
          <Input
            label={t('address.number')}
            value={data.streetNumber}
            onChange={(e) => onChange({ streetNumber: e.target.value })}
          />
          <Input
            label={t('address.zip')}
            value={data.zip}
            onChange={(e) => onChange({ zip: e.target.value })}
          />
          <Input
            label={t('address.city')}
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
          />
        </div>
        {(data.street || data.city) && <MapPreview />}
      </div>

      {/* ID Verification */}
      <div>
        <h3 className="text-sm font-semibold text-primary mb-3">{t('id.sectionTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PhotoUploadBox
            label={`${t('id.front')} *`}
            value={data.idFront}
            onUpload={(src) => onChange({ idFront: src })}
            onRemove={() => onChange({ idFront: undefined })}
            aspect="wide"
          />
          <PhotoUploadBox
            label={`${t('id.back')} *`}
            value={data.idBack}
            onUpload={(src) => onChange({ idBack: src })}
            onRemove={() => onChange({ idBack: undefined })}
            aspect="wide"
          />
        </div>
      </div>

      {/* Vehicle Information */}
      <div>
        <h3 className="text-sm font-semibold text-primary mb-3">{t('vehicle.sectionTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <SelectDropdown
            label={t('vehicle.type')}
            placeholder={t('vehicle.typePlaceholder')}
            options={mockVehicleTypes}
            value={data.vehicleType}
            onChange={(v) => onChange({ vehicleType: v })}
          />
          <Input
            label={t('vehicle.plate')}
            placeholder={t('vehicle.platePlaceholder')}
            value={data.vehiclePlate}
            onChange={(e) => onChange({ vehiclePlate: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">{t('vehicle.registration')}</label>
          {data.vehicleDoc ? (
            <FileAttachmentRow
              fileName={data.vehicleDoc.name}
              date={data.vehicleDoc.date}
              size={data.vehicleDoc.size}
              onView={() => {}}
              onDownload={() => {}}
              onDelete={() => onChange({ vehicleDoc: undefined })}
            />
          ) : (
            <PdfUploadZone onUpload={handlePdfUpload} onDelete={() => {}} />
          )}
        </div>
      </div>
    </div>
  )
}
