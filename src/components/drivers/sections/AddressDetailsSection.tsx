'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { MapPreview } from '@/components/ui/MapPreview'
import { Button } from '@/components/ui/Button'
import type { Driver } from '@/lib/mock/drivers'

interface Props {
  driver: Driver
  onSave: () => void
  onCancel: () => void
}

export function AddressDetailsSection({ driver, onSave, onCancel }: Props) {
  const t = useTranslations('drivers')
  const [street, setStreet] = useState(driver.address.street)
  const [number, setNumber] = useState(driver.address.number)
  const [zip, setZip] = useState(driver.address.zip)
  const [city, setCity] = useState(driver.address.city)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4 p-5">
        <h3 className="text-sm font-semibold text-primary">{t('edit.nav.address')}</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input label={t('address.street')} value={street} onChange={(e) => setStreet(e.target.value)} />
          <Input label={t('address.number')} value={number} onChange={(e) => setNumber(e.target.value)} />
          <Input label={t('address.zip')} value={zip} onChange={(e) => setZip(e.target.value)} />
          <Input label={t('address.city')} value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <MapPreview />
      </div>
      <div className="flex items-center gap-3 border-t border-table-border px-5 py-4 flex-shrink-0">
        <Button variant="secondary" fullWidth={false} size="md" onClick={onCancel}>{t('edit.cancel')}</Button>
        <Button variant="primary" fullWidth={false} size="md" onClick={onSave}>{t('edit.save')}</Button>
      </div>
    </div>
  )
}
