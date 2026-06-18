'use client'

import { useTranslations } from 'next-intl'
import { X } from 'lucide-react'
import { useState } from 'react'
import { StepperHeader } from '@/components/ui/StepperHeader'
import { Button } from '@/components/ui/Button'
import { Step1PersonalInfo } from './steps/Step1PersonalInfo'
import { Step2AddressDetails } from './steps/Step2AddressDetails'
import { Step3IdVerification } from './steps/Step3IdVerification'
import { Step4VehicleInfo } from './steps/Step4VehicleInfo'
import { Step5Overview } from './steps/Step5Overview'

export interface DriverFormData {
  avatar: string | null
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth?: string
  zone: string
  restaurants: string[]
  street: string
  streetNumber: string
  zip: string
  city: string
  idFront?: string
  idBack?: string
  vehiclePicture?: string
  vehicleType: string
  vehiclePlate: string
  vehicleDoc?: { name: string; date: string; size: string; url: string }
}

const initialForm: DriverFormData = {
  avatar: null,
  firstName: '', lastName: '', email: '', phone: '',
  zone: '', restaurants: [],
  street: '', streetNumber: '', zip: '', city: '',
  vehicleType: '', vehiclePlate: '',
}

interface AddDriverModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: (email: string, inviteLink: string) => void
}

export function AddDriverModal({ isOpen, onClose, onCreated }: AddDriverModalProps) {
  const t = useTranslations('drivers')
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<DriverFormData>(initialForm)

  function updateForm(patch: Partial<DriverFormData>) {
    setFormData((prev) => ({ ...prev, ...patch }))
  }

  const step1Valid = !!(formData.firstName && formData.lastName && formData.email && formData.phone && formData.zone && formData.restaurants.length > 0)
  const step4Valid = !!(formData.vehicleType && formData.vehiclePlate)

  function handleCreate() {
    onCreated(formData.email, `https://webapp.com/invite-driver/${Date.now()}`)
  }

  function handleClose() {
    setStep(1)
    setFormData(initialForm)
    onClose()
  }

  const steps = [
    { number: 1, label: t('wizard.steps.personal') },
    { number: 2, label: t('wizard.steps.address') },
    { number: 3, label: t('wizard.steps.id') },
    { number: 4, label: t('wizard.steps.vehicle') },
    { number: 5, label: t('wizard.steps.overview') },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 p-4">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-table-border flex-shrink-0">
          <h2 className="text-lg font-semibold text-neutral-900">{t('wizard.title')}</h2>
          <button type="button" onClick={handleClose} className="p-1.5 text-neutral-500 hover:text-neutral-700 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 pt-5 flex-shrink-0">
          <StepperHeader steps={steps} currentStep={step} centered />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          <div className="bg-white rounded-[12px] border border-table-border p-5">
            {step === 1 && <Step1PersonalInfo data={formData} onChange={updateForm} />}
            {step === 2 && <Step2AddressDetails data={formData} onChange={updateForm} />}
            {step === 3 && <Step3IdVerification data={formData} onChange={updateForm} />}
            {step === 4 && <Step4VehicleInfo data={formData} onChange={updateForm} />}
            {step === 5 && <Step5Overview data={formData} onChange={updateForm} />}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-table-border flex-shrink-0">
          {step === 1 ? (
            <Button variant="secondary" fullWidth={false} size="md" onClick={handleClose}>
              {t('wizard.cancel')}
            </Button>
          ) : (
            <Button variant="secondary" fullWidth={false} size="md" onClick={() => setStep((s) => s - 1)}>
              ← {t('wizard.previous')}
            </Button>
          )}

          {step < 5 ? (
            <Button
              variant="primary"
              fullWidth={false}
              size="md"
              onClick={() => setStep((s) => s + 1)}
              disabled={step === 1 && !step1Valid || step === 4 && !step4Valid}
            >
              {t('wizard.next')} →
            </Button>
          ) : (
            <Button variant="primary" fullWidth={false} size="md" onClick={handleCreate}>
              {t('wizard.create')}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
