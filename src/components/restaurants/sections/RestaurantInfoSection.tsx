'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Mail, Store } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { PhoneInput } from '@/components/ui/PhoneInput'
import { SelectDropdown } from '@/components/ui/SelectDropdown'
import { ProfilePictureUpload } from '@/components/ui/ProfilePictureUpload'
import { Button } from '@/components/ui/Button'
import { mockManagerOptions } from '@/lib/mock/restaurants'
import type { Restaurant } from '@/lib/mock/restaurants'

interface Props {
  restaurant: Restaurant
  onSave: () => void
  onCancel: () => void
}

export function RestaurantInfoSection({ restaurant, onSave, onCancel }: Props) {
  const t = useTranslations('restaurants')
  const [picture, setPicture] = useState<string | null>(restaurant.logo)
  const [name, setName] = useState(restaurant.name)
  const [email, setEmail] = useState(restaurant.email)
  const [phone, setPhone] = useState(restaurant.phone)
  const [managerId, setManagerId] = useState(restaurant.manager?.id ?? '')
  const [description, setDescription] = useState(restaurant.description ?? '')

  const managerOptions = mockManagerOptions.map((m) => ({ label: m.name, value: m.id }))

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-5 space-y-5">
        <h3 className="text-sm font-semibold text-primary">{t('info.title')}</h3>

        <ProfilePictureUpload
          src={picture}
          onChange={setPicture}
          onDelete={() => setPicture(null)}
        />

        <hr className="border-table-border" />

        {/* Restaurant Name */}
        <Input
          label={t('info.name')}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('info.namePlaceholder')}
          leftIcon={<Store size={16} className="text-neutral-400" />}
        />

        {/* Email + Phone grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t('info.email')}
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contact@esrafalafel.com"
            leftIcon={<Mail size={16} className="text-neutral-400" />}
          />
          <PhoneInput
            label={t('info.phone')}
            value={phone}
            onChange={setPhone}
          />
        </div>

        {/* Assigned Manager */}
        <SelectDropdown
          label={t('info.manager')}
          options={managerOptions}
          value={managerId}
          onChange={setManagerId}
          placeholder="Select manager"
        />

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-neutral-700">{t('info.description')}</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('info.descriptionPlaceholder')}
            rows={4}
            className="w-full rounded-[8px] border border-neutral-300 bg-white text-sm text-neutral-900 shadow-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary py-3 px-3.5 resize-none"
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
