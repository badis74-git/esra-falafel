'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { PhotoUploadBox } from '@/components/ui/PhotoUploadBox'
import { Button } from '@/components/ui/Button'
import type { Driver } from '@/lib/mock/drivers'

interface Props {
  driver: Driver
  onSave: () => void
  onCancel: () => void
}

export function IdVerificationSection({ driver, onSave, onCancel }: Props) {
  const t = useTranslations('drivers')
  const [front, setFront] = useState(driver.idFront)
  const [back, setBack] = useState(driver.idBack)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4 p-5">
        <h3 className="text-sm font-semibold text-primary">{t('edit.nav.id')}</h3>
        <div className="grid grid-cols-2 gap-4">
          <PhotoUploadBox
            label={`${t('id.front')} *`}
            value={front}
            onUpload={setFront}
            onRemove={() => setFront(undefined)}
            aspect="wide"
          />
          <PhotoUploadBox
            label={`${t('id.back')} *`}
            value={back}
            onUpload={setBack}
            onRemove={() => setBack(undefined)}
            aspect="wide"
          />
        </div>
      </div>
      <div className="relative z-10 flex items-center gap-3 border-t border-table-border px-5 py-4 flex-shrink-0">
        <Button variant="secondary" fullWidth={false} size="md" onClick={onCancel} className="flex-1 md:flex-none">{t('edit.cancel')}</Button>
        <Button variant="primary" fullWidth={false} size="md" onClick={onSave} className="flex-1 md:flex-none">{t('edit.save')}</Button>
      </div>
    </div>
  )
}
