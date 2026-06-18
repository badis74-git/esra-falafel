'use client'

import { useTranslations } from 'next-intl'
import { Mail, User } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { PhoneInput } from '@/components/ui/PhoneInput'
import { DateInput } from '@/components/ui/DateInput'
import { ProfilePictureUpload } from '@/components/ui/ProfilePictureUpload'
import { Button } from '@/components/ui/Button'
import type { Driver } from '@/lib/mock/drivers'

interface Props {
  driver: Driver
  onSave: () => void
  onCancel: () => void
}

export function PersonalInfoSection({ driver, onSave, onCancel }: Props) {
  const t = useTranslations('drivers')
  const [avatar, setAvatar] = useState(driver.avatar)
  const [firstName, setFirstName] = useState(driver.firstName)
  const [lastName, setLastName] = useState(driver.lastName)
  const [email, setEmail] = useState(driver.email)
  const [phone, setPhone] = useState(driver.phone)
  const [dob, setDob] = useState(driver.dateOfBirth ?? '')

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4 p-5">
        <h3 className="text-sm font-semibold text-primary">{t('edit.nav.personal')}</h3>
        <ProfilePictureUpload
          src={avatar}
          onChange={setAvatar}
          onDelete={() => setAvatar(null)}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input label={`${t('personal.firstName')} *`} leftIcon={<User size={14} />} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <Input label={`${t('personal.lastName')} *`} leftIcon={<User size={14} />} value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <Input label={`${t('personal.email')} *`} leftIcon={<Mail size={14} />} value={email} onChange={(e) => setEmail(e.target.value)} />
          <PhoneInput label={`${t('personal.phone')} *`} value={phone} onChange={setPhone} />
          <div className="col-span-2">
            <DateInput label={t('personal.dob')} placeholder={t('personal.dobPlaceholder')} value={dob} onChange={setDob} />
          </div>
        </div>
      </div>
      <div className="relative z-10 flex items-center gap-3 border-t border-table-border px-5 py-4 flex-shrink-0">
        <Button variant="secondary" fullWidth={false} size="md" onClick={onCancel} className="flex-1 md:flex-none">{t('edit.cancel')}</Button>
        <Button variant="primary" fullWidth={false} size="md" onClick={onSave} className="flex-1 md:flex-none">{t('edit.save')}</Button>
      </div>
    </div>
  )
}
