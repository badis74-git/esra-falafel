import { OtpVerifyForm } from '@/components/auth/OtpVerifyForm'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Verify Code — Esra Falafel' }

export default function VerifyOtpPage() {
  return <OtpVerifyForm />
}
