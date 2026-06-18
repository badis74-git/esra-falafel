'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Globe } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { Restaurant } from '@/lib/mock/restaurants'

interface Props {
  restaurant: Restaurant
  onSave: () => void
  onCancel: () => void
}

export function OnlinePresenceSection({ restaurant, onSave, onCancel }: Props) {
  const t = useTranslations('restaurants')
  const [website, setWebsite] = useState(restaurant.website)
  const [facebook, setFacebook] = useState(restaurant.facebook)
  const [instagram, setInstagram] = useState(restaurant.instagram)
  const [tiktok, setTiktok] = useState(restaurant.tiktok)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-5 space-y-5">
        <h3 className="text-sm font-semibold text-primary">{t('online.title')}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t('online.website')}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="www.esrafalafel.com"
            leftIcon={<Globe size={16} className="text-neutral-400" />}
          />
          <Input
            label={t('online.facebook')}
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            placeholder="https://www.facebook.com/esrafalafel"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t('online.instagram')}
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="https://www.instagram.com/esrafalafel"
          />
          <Input
            label={t('online.tiktok')}
            value={tiktok}
            onChange={(e) => setTiktok(e.target.value)}
            placeholder="https://www.tiktok.com/@esrafalafel"
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
