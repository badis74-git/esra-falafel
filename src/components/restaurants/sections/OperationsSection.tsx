'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Trash2, Plus } from 'lucide-react'
import { SelectDropdown } from '@/components/ui/SelectDropdown'
import { MultiSelectDropdown } from '@/components/ui/MultiSelectDropdown'
import { TimeInput } from '@/components/ui/TimeInput'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { Button } from '@/components/ui/Button'
import { DAYS_OF_WEEK, MENU_OPTIONS } from '@/lib/mock/restaurants'
import type { Restaurant, OpeningHoursEntry } from '@/lib/mock/restaurants'

interface Props {
  restaurant: Restaurant
  onSave: () => void
  onCancel: () => void
}

export function OperationsSection({ restaurant, onSave, onCancel }: Props) {
  const t = useTranslations('restaurants')
  const [activeMenu, setActiveMenu] = useState(restaurant.activeMenu)
  const [enableDelivery, setEnableDelivery] = useState(restaurant.enableDelivery)
  const [enableCod, setEnableCod] = useState(restaurant.enableCashOnDelivery)
  const [hours, setHours] = useState<OpeningHoursEntry[]>(
    restaurant.openingHours.length > 0
      ? restaurant.openingHours
      : [{ workingDays: [], from: '', to: '' }]
  )

  const dayOptions = DAYS_OF_WEEK.map((d) => ({ label: d, value: d }))

  function addRow() {
    setHours((prev) => [...prev, { workingDays: [], from: '', to: '' }])
  }

  function removeRow(index: number) {
    setHours((prev) => prev.filter((_, i) => i !== index))
  }

  function updateRow(index: number, patch: Partial<OpeningHoursEntry>) {
    setHours((prev) => prev.map((row, i) => i === index ? { ...row, ...patch } : row))
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-5 space-y-5">
        <h3 className="text-sm font-semibold text-primary">{t('operations.title')}</h3>

        <SelectDropdown
          label={t('operations.activeMenu')}
          options={MENU_OPTIONS}
          value={activeMenu}
          onChange={setActiveMenu}
          placeholder="Select menu"
        />

        {/* Toggles row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center justify-between gap-3 flex-1 rounded-[8px] border border-neutral-200 px-4 py-3">
            <span className="text-sm font-medium text-neutral-700">{t('operations.enableDelivery')}</span>
            <StatusToggle checked={enableDelivery} onChange={setEnableDelivery} />
          </div>
          <div className="flex items-center justify-between gap-3 flex-1 rounded-[8px] border border-neutral-200 px-4 py-3">
            <span className="text-sm font-medium text-neutral-700">{t('operations.enableCod')}</span>
            <StatusToggle checked={enableCod} onChange={setEnableCod} />
          </div>
        </div>

        <hr className="border-table-border" />

        <h4 className="text-sm font-semibold text-primary">{t('operations.hoursTitle')}</h4>

        <div className="space-y-4">
          {hours.map((row, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-3 items-start md:items-end">
              <div className="flex-1 min-w-0">
                <MultiSelectDropdown
                  label={t('operations.workingDays')}
                  options={dayOptions}
                  value={row.workingDays}
                  onChange={(val) => updateRow(i, { workingDays: val })}
                  placeholder="Select days"
                />
              </div>
              <div className="w-full md:w-32">
                <TimeInput
                  label={t('operations.from')}
                  value={row.from}
                  onChange={(val) => updateRow(i, { from: val })}
                />
              </div>
              <div className="w-full md:w-32">
                <TimeInput
                  label={t('operations.to')}
                  value={row.to}
                  onChange={(val) => updateRow(i, { to: val })}
                />
              </div>
              <button
                type="button"
                onClick={() => removeRow(i)}
                className="p-2 text-danger hover:text-danger/80 transition-colors flex-shrink-0 self-end mb-1"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <Button
          variant="secondary"
          fullWidth={false}
          size="md"
          onClick={addRow}
          className="flex items-center gap-2"
        >
          <Plus size={14} /> {t('operations.addMore')}
        </Button>
      </div>

      <div className="relative z-10 flex items-center gap-3 border-t border-table-border px-5 py-4 flex-shrink-0">
        <Button variant="secondary" fullWidth={false} size="md" onClick={onCancel} className="flex-1 md:flex-none">{t('edit.cancel')}</Button>
        <Button variant="primary" fullWidth={false} size="md" onClick={onSave} className="flex-1 md:flex-none">{t('edit.save')}</Button>
      </div>
    </div>
  )
}
