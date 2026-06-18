'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { SelectDropdown } from '@/components/ui/SelectDropdown'
import { MultiSelectDropdown } from '@/components/ui/MultiSelectDropdown'
import ZoneMapEditor from '@/components/ui/ZoneMapEditor'
import { Button } from '@/components/ui/Button'
import { mockZones, mockRestaurantsForDrivers } from '@/lib/mock/drivers'
import type { Driver } from '@/lib/mock/drivers'

interface Props {
  driver: Driver
  onSave: () => void
  onCancel: () => void
}

export function AssignedZoneSection({ driver, onSave, onCancel }: Props) {
  const t = useTranslations('drivers')
  const [zone, setZone] = useState(driver.zones[0] ?? '')
  const [restaurants, setRestaurants] = useState(driver.restaurants)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4 p-5">
        <h3 className="text-sm font-semibold text-primary">{t('edit.nav.zone')}</h3>
        <div className="grid grid-cols-2 gap-4">
          <SelectDropdown
            label={t('zone.zone')}
            placeholder={t('personal.zonePlaceholder')}
            options={mockZones}
            value={zone}
            onChange={setZone}
          />
          <MultiSelectDropdown
            label={t('zone.restaurants')}
            placeholder={t('personal.restaurantsPlaceholder')}
            options={mockRestaurantsForDrivers}
            value={restaurants}
            onChange={setRestaurants}
          />
        </div>
        <ZoneMapEditor readOnly={false} />
      </div>
      <div className="relative z-10 flex items-center gap-3 border-t border-table-border px-5 py-4 flex-shrink-0">
        <Button variant="secondary" fullWidth={false} size="md" onClick={onCancel} className="flex-1 md:flex-none">{t('edit.cancel')}</Button>
        <Button variant="primary" fullWidth={false} size="md" onClick={onSave} className="flex-1 md:flex-none">{t('edit.save')}</Button>
      </div>
    </div>
  )
}
