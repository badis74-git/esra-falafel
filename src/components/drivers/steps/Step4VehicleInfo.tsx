'use client'

import { useTranslations } from 'next-intl'
import { PhotoUploadBox } from '@/components/ui/PhotoUploadBox'
import { SelectDropdown } from '@/components/ui/SelectDropdown'
import { Input } from '@/components/ui/Input'
import { PdfUploadZone } from '@/components/ui/PdfUploadZone'
import { FileAttachmentRow } from '@/components/ui/FileAttachmentRow'
import { mockVehicleTypes } from '@/lib/mock/drivers'
import type { DriverFormData } from '../AddDriverModal'

interface Props {
  data: DriverFormData
  onChange: (patch: Partial<DriverFormData>) => void
}

export function Step4VehicleInfo({ data, onChange }: Props) {
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
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-primary">{t('vehicle.sectionTitle')}</h3>

      <PhotoUploadBox
        label={t('vehicle.picture')}
        value={data.vehiclePicture}
        onUpload={(src) => onChange({ vehiclePicture: src })}
        onRemove={() => onChange({ vehiclePicture: undefined })}
        aspect="square"
      />

      <div className="grid grid-cols-2 gap-4">
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
          <PdfUploadZone
            onUpload={handlePdfUpload}
            onDelete={() => {}}
          />
        )}
      </div>
    </div>
  )
}
