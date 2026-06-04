'use client'

import { Button } from '@/components/ui/Button'
import { useTranslations } from 'next-intl'
import { Rocket, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SuccessModalProps {
  open: boolean
}

export function SuccessModal({ open }: SuccessModalProps) {
  const router = useRouter()
  const t = useTranslations('auth.successModal')

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-[20px] shadow-modal w-full max-w-sm p-8 flex flex-col items-center text-center">
        {/* Rocket illustration */}
        <div className="relative flex items-center justify-center w-24 h-24 bg-neutral-100 rounded-full mb-6">
          <Rocket size={40} className="text-primary -rotate-45" />
          <span className="absolute top-2 right-3 text-primary-light">
            <Sparkles size={14} className="text-primary" />
          </span>
          <span className="absolute bottom-3 left-2 text-primary-light">
            <Sparkles size={10} className="text-neutral-300" />
          </span>
        </div>

        <h2 className="text-[22px] font-bold leading-[30px] text-neutral-900 mb-2">
          {t('title')}
        </h2>
        <p className="text-sm text-neutral-500 mb-8 leading-[22px]">
          {t('body')}
        </p>

        <Button
          variant="primary"
          onClick={() => router.push('/login')}
        >
          {t('cta')}
        </Button>
      </div>
    </div>
  )
}
