'use client'

import { useTranslations } from 'next-intl'
import { X, UserCheck } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface DriverCreatedModalProps {
  email: string
  inviteLink: string
  onReturnToList: () => void
  onCreateAnother: () => void
}

export function DriverCreatedModal({ email, inviteLink, onReturnToList, onCreateAnother }: DriverCreatedModalProps) {
  const t = useTranslations('drivers.created')
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 p-4">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-md relative p-8">
        <button type="button" onClick={onReturnToList} className="absolute top-4 right-4 p-1.5 text-neutral-500 hover:text-neutral-700 transition-colors">
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
            <UserCheck size={32} className="text-primary" />
          </div>
          <h2 className="text-[22px] font-bold text-neutral-900">{t('title')}</h2>
          <p className="text-sm text-neutral-500">{t('subtitle', { email })}</p>

          {/* Invite link row */}
          <div className="w-full flex items-center gap-2 border border-neutral-300 rounded-lg overflow-hidden px-3 py-2.5">
            <span className="flex-1 text-sm text-neutral-700 truncate">{inviteLink}</span>
            <button
              type="button"
              onClick={handleCopy}
              className="flex-shrink-0 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              {copied ? '✓' : t('copy')}
            </button>
          </div>

          <div className="w-full flex flex-col gap-3">
            <Button variant="primary" onClick={onReturnToList}>{t('returnToList')}</Button>
            <Button variant="secondary" onClick={onCreateAnother}>{t('createAnother')}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
