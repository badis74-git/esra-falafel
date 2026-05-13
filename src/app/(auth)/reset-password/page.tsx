import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'New Password — Esra Falafel' }

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
