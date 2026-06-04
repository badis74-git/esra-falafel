'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { BrandHeader } from '@/components/ui/BrandHeader'
import { useTranslations } from 'next-intl'
import { Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function ForgotPasswordForm() {
  const router = useRouter()
  const t = useTranslations('auth.forgotPassword')
  const tLogin = useTranslations('auth.login')
  const tCommon = useTranslations('common')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(tLogin('errors.email'))
      return
    }
    setEmailError('')
    router.push('/verify-otp')
  }

  return (
    <div>
      <BrandHeader />

      <h1 className="text-[28px] font-bold leading-[36px] text-neutral-900 mb-1">
        {t('title')}
      </h1>
      <p className="text-sm text-neutral-500 mb-7">
        {t('subtitle')}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="email"
          type="email"
          placeholder={tLogin('emailPlaceholder')}
          value={email}
          onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
          leftIcon={<Mail size={16} />}
          error={emailError}
        />

        <Button type="submit" variant="primary">
          {t('sendCode')}
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push('/login')}
        >
          {t('backToLogin')}
        </Button>
      </form>

      <p className="text-sm text-neutral-500 text-center mt-6">
        {tCommon('needSupport')}{' '}
        <a href="#" className="text-accent-orange font-medium hover:underline">
          {tCommon('contactAdmin')}
        </a>
      </p>
    </div>
  )
}
