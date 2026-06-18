'use client'

import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/Input'
import { MapPreview } from '@/components/ui/MapPreview'
import type { DriverFormData } from '../AddDriverModal'

interface Props {
  data: DriverFormData
  onChange: (patch: Partial<DriverFormData>) => void
}

export function Step2AddressDetails({ data, onChange }: Props) {
  const t = useTranslations('drivers')
  const hasAddress = !!(data.street || data.city)

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-primary">{t('address.sectionTitle')}</h3>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t('address.street')}
          placeholder={t('address.street')}
          value={data.street}
          onChange={(e) => onChange({ street: e.target.value })}
        />
        <Input
          label={t('address.number')}
          placeholder={t('address.number')}
          value={data.streetNumber}
          onChange={(e) => onChange({ streetNumber: e.target.value })}
        />
        <Input
          label={t('address.zip')}
          placeholder={t('address.zip')}
          value={data.zip}
          onChange={(e) => onChange({ zip: e.target.value })}
        />
        <Input
          label={t('address.city')}
          placeholder={t('address.city')}
          value={data.city}
          onChange={(e) => onChange({ city: e.target.value })}
        />
      </div>
      {hasAddress && (
        <MapPreview />
      )}
    </div>
  )
}
