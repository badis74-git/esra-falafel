'use client'

import { Button } from '@/components/ui/Button'
import { BrandHeader } from '@/components/ui/BrandHeader'
import { OtpInput } from './OtpInput'
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
  const [otp, setOtp] = useState(Array(6).fill(''))
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS)
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    if (secondsLeft <= 0) {
      setExpired(true)
      return
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
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
        Enter Verification Code
      </h1>
      <p className="text-sm text-neutral-500 mb-7">
        We&apos;ve sent a 6-digit code to your email.
      </p>

      <form onSubmit={handleVerify} className="flex flex-col gap-5">
        <OtpInput value={otp} onChange={setOtp} hasError={expired} />

        {expired ? (
          <p className="text-sm text-error">
            This code has expired. Please request a new one.
          </p>
        ) : (
          <p className="text-sm text-neutral-500">
            Code expires in{' '}
            <span className="font-semibold text-neutral-700">{formatTime(secondsLeft)}</span>
          </p>
        )}

        <Button type="submit" variant="primary" disabled={otp.some((d) => !d)}>
          Verify Code
        </Button>

        <Button
          type="button"
          variant="secondary"
          disabled={!expired}
          onClick={handleResend}
        >
          Resend Code
        </Button>
      </form>

      <p className="text-sm text-neutral-500 text-center mt-6">
        Need Support?{' '}
        <a href="#" className="text-accent-orange font-medium hover:underline">
          Contact Administrator
        </a>
      </p>
    </div>
  )
}
