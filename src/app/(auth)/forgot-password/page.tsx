import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Reset Password — Esra Falafel' }

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
