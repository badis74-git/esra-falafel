'use client'

import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { Input } from '@/components/ui/Input'
import { BrandHeader } from '@/components/ui/BrandHeader'
import { useTranslations } from 'next-intl'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

export function LoginForm() {
  const router = useRouter()
  const t = useTranslations('auth.login')
  const tCommon = useTranslations('common')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  function validate() {
    let valid = true
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(t('errors.email'))
      valid = false
    } else {
      setEmailError('')
    }
    if (!password || password.length < 6) {
      setPasswordError(t('errors.password'))
      valid = false
    } else {
      setPasswordError('')
    }
    return valid
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) router.push('/managers')
  }

  return (
    <div>
      <BrandHeader />

      <h1 className="text-[28px] font-bold leading-[36px] text-neutral-900 mb-1">
        {t('title')}
      </h1>
      <p className="text-sm text-neutral-500 mb-7">{t('subtitle')}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="email"
          type="email"
          placeholder={t('emailPlaceholder')}
          value={email}
          onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
          leftIcon={<Mail size={16} />}
          error={emailError}
        />

        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setPasswordError('') }}
          leftIcon={<Lock size={16} />}
          rightIcon={
            !passwordError ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-neutral-500 hover:text-neutral-700 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            ) : undefined
          }
          error={passwordError}
        />

        <div className="flex items-center justify-between">
          <Checkbox
            id="remember"
            label={t('rememberMe')}
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-accent-orange hover:underline"
          >
            {t('forgotPassword')}
          </Link>
        </div>

        <Button type="submit" variant="primary">
          {t('signIn')}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px bg-neutral-300" />
          <span className="text-xs text-neutral-500 whitespace-nowrap">{t('orSignInWith')}</span>
          <div className="flex-1 h-px bg-neutral-300" />
        </div>

        <Button type="button" variant="google">
          <GoogleIcon />
          {t('google')}
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
