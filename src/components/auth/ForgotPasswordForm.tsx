'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { BrandHeader } from '@/components/ui/BrandHeader'
import { Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function ForgotPasswordForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setEmailError('')
    router.push('/verify-otp')
  }

  return (
    <div>
      <BrandHeader />

      <h1 className="text-[28px] font-bold leading-[36px] text-neutral-900 mb-1">
        Reset Your Password
      </h1>
      <p className="text-sm text-neutral-500 mb-7">
        Enter your email address to receive a verification code.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="email"
          type="email"
          placeholder="email@domain.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
          leftIcon={<Mail size={16} />}
          error={emailError}
        />

        <Button type="submit" variant="primary">
          Send Code
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push('/login')}
        >
          Back To Login
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
