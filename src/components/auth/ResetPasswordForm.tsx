'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { BrandHeader } from '@/components/ui/BrandHeader'
import { SuccessModal } from './SuccessModal'
import { useTranslations } from 'next-intl'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { useState } from 'react'

export function ResetPasswordForm() {
  const t = useTranslations('auth.resetPassword')
  const tCommon = useTranslations('common')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [newError, setNewError] = useState('')
  const [confirmError, setConfirmError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    let valid = true

    if (!newPassword || newPassword.length < 8 || !/[0-9]/.test(newPassword) || !/[^a-zA-Z0-9]/.test(newPassword)) {
      setNewError(t('errors.weak'))
      valid = false
    } else {
      setNewError('')
    }

    if (newPassword !== confirmPassword) {
      setConfirmError(t('errors.mismatch'))
      valid = false
    } else {
      setConfirmError('')
    }

    if (valid) setShowSuccess(true)
  }

  return (
    <>
      <SuccessModal open={showSuccess} />

      <div>
        <BrandHeader />

        <h1 className="text-[28px] font-bold leading-[36px] text-neutral-900 mb-1">
          {t('title')}
        </h1>
        <p className="text-sm text-neutral-500 mb-7">
          {t('subtitle')}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Input
              id="new-password"
              label={t('newPassword')}
              type={showNew ? 'text' : 'password'}
              placeholder="••••••••••••"
              value={newPassword}
              onChange={(e) => { setNewPassword(e.target.value); setNewError('') }}
              leftIcon={<Lock size={16} />}
              rightIcon={
                !newError ? (
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="text-neutral-500 hover:text-neutral-700 transition-colors"
                    tabIndex={-1}
                  >
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                ) : undefined
              }
              error={newError}
            />
            {!newError && (
              <p className="text-xs text-neutral-500">
                {t('hint')}
              </p>
            )}
          </div>

          <Input
            id="confirm-password"
            label={t('confirmPassword')}
            type={showConfirm ? 'text' : 'password'}
            placeholder="••••••••••••"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setConfirmError('') }}
            leftIcon={<Lock size={16} />}
            rightIcon={
              !confirmError ? (
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="text-neutral-500 hover:text-neutral-700 transition-colors"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              ) : undefined
            }
            error={confirmError}
          />

          <Button type="submit" variant="primary" className="mt-2">
            {t('confirm')}
          </Button>
        </form>

        <p className="text-sm text-neutral-500 text-center mt-6">
          {tCommon('needSupport')}{' '}
          <a href="#" className="text-accent-orange font-medium hover:underline">
            {tCommon('contactAdmin')}
          </a>
        </p>
      </div>
    </>
  )
}
