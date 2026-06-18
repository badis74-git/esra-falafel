'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Globe, Mail } from 'lucide-react'
import { PhoneInput } from '@/components/ui/PhoneInput'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { Restaurant } from '@/lib/mock/restaurants'

interface Props {
  restaurant: Restaurant
  onSave: () => void
  onCancel: () => void
}

export function SupportContactSection({ restaurant, onSave, onCancel }: Props) {
  const t = useTranslations('restaurants')
  const support = restaurant.support
  const [phone, setPhone] = useState(support?.phone ?? restaurant.phone)
  const [whatsapp, setWhatsapp] = useState(support?.whatsapp ?? '')
  const [website, setWebsite] = useState(support?.website ?? restaurant.website)
  const [email, setEmail] = useState(support?.email ?? restaurant.email)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-5 space-y-5">
        <h3 className="text-sm font-semibold text-primary">{t('support.title')}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PhoneInput
            label={t('support.phone')}
            value={phone}
            onChange={setPhone}
          />
          <PhoneInput
            label={t('support.whatsapp')}
            value={whatsapp}
            onChange={setWhatsapp}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t('support.website')}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="www.esrafalafel.com"
            leftIcon={<Globe size={16} className="text-neutral-400" />}
          />
          <Input
            label={t('support.email')}
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contact@esrafalafel.com"
            leftIcon={<Mail size={16} className="text-neutral-400" />}
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
