'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { MapPreview } from '@/components/ui/MapPreview'
import { Button } from '@/components/ui/Button'
import type { Restaurant } from '@/lib/mock/restaurants'

interface Props {
  restaurant: Restaurant
  onSave: () => void
  onCancel: () => void
}

export function LocationSection({ restaurant, onSave, onCancel }: Props) {
  const t = useTranslations('restaurants')
  const [street, setStreet] = useState(restaurant.street)
  const [number, setNumber] = useState(restaurant.number)
  const [zip, setZip] = useState(restaurant.zip)
  const [city, setCity] = useState(restaurant.city)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-5 space-y-5">
        <h3 className="text-sm font-semibold text-primary">{t('location.title')}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t('location.street')}
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Musterstrasse"
          />
          <Input
            label={t('location.number')}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="12"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t('location.zip')}
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="3000"
          />
          <Input
            label={t('location.city')}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Bern"
          />
        </div>

        <MapPreview />
      </div>

      <div className="relative z-10 flex items-center gap-3 border-t border-table-border px-5 py-4 flex-shrink-0">
        <Button variant="secondary" fullWidth={false} size="md" onClick={onCancel} className="flex-1 md:flex-none">{t('edit.cancel')}</Button>
        <Button variant="primary" fullWidth={false} size="md" onClick={onSave} className="flex-1 md:flex-none">{t('edit.save')}</Button>
      </div>
    </div>
  )
}
