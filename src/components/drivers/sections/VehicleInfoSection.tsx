'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { PhotoUploadBox } from '@/components/ui/PhotoUploadBox'
import { SelectDropdown } from '@/components/ui/SelectDropdown'
import { Input } from '@/components/ui/Input'
import { PdfUploadZone } from '@/components/ui/PdfUploadZone'
import { FileAttachmentRow } from '@/components/ui/FileAttachmentRow'
import { Button } from '@/components/ui/Button'
import { mockVehicleTypes } from '@/lib/mock/drivers'
import type { Driver, FileMeta } from '@/lib/mock/drivers'

interface Props {
  driver: Driver
  onSave: () => void
  onCancel: () => void
}

export function VehicleInfoSection({ driver, onSave, onCancel }: Props) {
  const t = useTranslations('drivers')
  const [picture, setPicture] = useState(driver.vehicle.picture)
  const [vehicleType, setVehicleType] = useState(driver.vehicle.type)
  const [plate, setPlate] = useState(driver.vehicle.plate)
  const [doc, setDoc] = useState<FileMeta | undefined>(driver.vehicle.registrationDoc)

  function handlePdfUpload(file: File) {
    setDoc({
      name: file.name,
      date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }),
      size: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
      url: URL.createObjectURL(file),
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4 p-5">
        <h3 className="text-sm font-semibold text-primary">{t('edit.nav.vehicle')}</h3>
        <PhotoUploadBox
          label={t('vehicle.picture')}
          value={picture}
          onUpload={setPicture}
          onRemove={() => setPicture(undefined)}
          aspect="square"
        />
        <div className="grid grid-cols-2 gap-4">
          <SelectDropdown
            label={t('vehicle.type')}
            placeholder={t('vehicle.typePlaceholder')}
            options={mockVehicleTypes}
            value={vehicleType}
            onChange={setVehicleType}
          />
          <Input
            label={`${t('vehicle.plate')} *`}
            placeholder={t('vehicle.platePlaceholder')}
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">{`${t('vehicle.registration')} *`}</label>
          {doc ? (
            <FileAttachmentRow
              fileName={doc.name}
              date={doc.date}
              size={doc.size}
              onView={() => {}}
              onDownload={() => {}}
              onDelete={() => setDoc(undefined)}
            />
          ) : (
            <PdfUploadZone onUpload={handlePdfUpload} onDelete={() => {}} />
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 border-t border-table-border px-5 py-4 flex-shrink-0">
        <Button variant="secondary" fullWidth={false} size="md" onClick={onCancel}>{t('edit.cancel')}</Button>
        <Button variant="primary" fullWidth={false} size="md" onClick={onSave}>{t('edit.save')}</Button>
      </div>
    </div>
  )
}
