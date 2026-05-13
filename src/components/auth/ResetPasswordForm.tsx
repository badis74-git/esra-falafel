'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { BrandHeader } from '@/components/ui/BrandHeader'
import { SuccessModal } from './SuccessModal'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { useState } from 'react'

export function ResetPasswordForm() {
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
      setNewError('Must be at least 8 characters with letters, numbers, and a special character.')
      valid = false
    } else {
      setNewError('')
    }

    if (newPassword !== confirmPassword) {
      setConfirmError('Passwords do not match.')
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
          Create New Password
        </h1>
        <p className="text-sm text-neutral-500 mb-7">
          Please enter a new secure password for your account.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Input
              id="new-password"
              label="New Password"
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
                Must be at least 8 characters with letters, numbers, and a special character.
              </p>
            )}
          </div>

          <Input
            id="confirm-password"
            label="Confirm Password"
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
            Confirm Password
          </Button>
        </form>

        <p className="text-sm text-neutral-500 text-center mt-6">
          Need Support?{' '}
          <a href="#" className="text-accent-orange font-medium hover:underline">
            Contact Administrator
          </a>
        </p>
      </div>
    </>
  )
}
