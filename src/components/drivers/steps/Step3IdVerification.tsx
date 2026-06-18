'use client'

import { useTranslations } from 'next-intl'
import { PhotoUploadBox } from '@/components/ui/PhotoUploadBox'
import type { DriverFormData } from '../AddDriverModal'

interface Props {
  data: DriverFormData
  onChange: (patch: Partial<DriverFormData>) => void
}

export function Step3IdVerification({ data, onChange }: Props) {
  const t = useTranslations('drivers')

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-primary">{t('id.sectionTitle')}</h3>
      <div className="grid grid-cols-2 gap-4">
        <PhotoUploadBox
          label={t('id.front')}
          value={data.idFront}
          onUpload={(src) => onChange({ idFront: src })}
          onRemove={() => onChange({ idFront: undefined })}
          aspect="wide"
        />
        <PhotoUploadBox
          label={t('id.back')}
          value={data.idBack}
          onUpload={(src) => onChange({ idBack: src })}
          onRemove={() => onChange({ idBack: undefined })}
          aspect="wide"
        />
      </div>
    </div>
  )
}
