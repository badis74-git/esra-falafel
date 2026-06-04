'use client'

import { Button } from '@/components/ui/Button'
import { BrandHeader } from '@/components/ui/BrandHeader'
import { OtpInput } from './OtpInput'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const INITIAL_SECONDS = 120

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, '0')
  const sec = (s % 60).toString().padStart(2, '0')
  return `${m}:${sec}`
}

export function OtpVerifyForm() {
  const router = useRouter()
  const t = useTranslations('auth.otp')
  const tCommon = useTranslations('common')
  const [otp, setOtp] = useState(Array(6).fill(''))
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS)
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    if (secondsLeft <= 0) {
      setExpired(true)
      return
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [secondsLeft])

  function handleResend() {
    setOtp(Array(6).fill(''))
    setSecondsLeft(INITIAL_SECONDS)
    setExpired(false)
  }

  function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    if (otp.every((d) => d !== '')) {
      router.push('/reset-password')
    }
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

      <form onSubmit={handleVerify} className="flex flex-col gap-5">
        <OtpInput value={otp} onChange={setOtp} hasError={expired} />

        {expired ? (
          <p className="text-sm text-error">
            {t('expired')}
          </p>
        ) : (
          <p className="text-sm text-neutral-500">
            {t('expiresIn')}{' '}
            <span className="font-semibold text-neutral-700">{formatTime(secondsLeft)}</span>
          </p>
        )}

        <Button type="submit" variant="primary" disabled={otp.some((d) => !d)}>
          {t('verify')}
        </Button>

        <Button
          type="button"
          variant="secondary"
          disabled={!expired}
          onClick={handleResend}
        >
          {t('resend')}
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
