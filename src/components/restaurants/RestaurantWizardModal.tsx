'use client'

import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { MapPreview } from '@/components/ui/MapPreview'
import { MultiSelectDropdown } from '@/components/ui/MultiSelectDropdown'
import { PhoneInput } from '@/components/ui/PhoneInput'
import { ProfilePictureUpload } from '@/components/ui/ProfilePictureUpload'
import { SelectDropdown } from '@/components/ui/SelectDropdown'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { StepperHeader } from '@/components/ui/StepperHeader'
import { OpeningHoursRow } from '@/components/restaurants/OpeningHoursRow'
import {
  DAYS_OF_WEEK,
  MENU_OPTIONS,
  mockManagerOptions,
  OpeningHoursEntry,
} from '@/lib/mock/restaurants'
import { useTranslations } from 'next-intl'
import { Globe, Mail, Plus, Store, X } from 'lucide-react'
import { useState } from 'react'

export interface RestaurantFormData {
  logo: string | null
  name: string
  email: string
  phone: string
  managerId: string
  description: string
  street: string
  houseNumber: string
  zip: string
  city: string
  activeMenu: string
  enableDelivery: boolean
  enableCashOnDelivery: boolean
  openingHours: OpeningHoursEntry[]
  website: string
  facebook: string
  instagram: string
  tiktok: string
  status: boolean
}

const DEFAULT_FORM: RestaurantFormData = {
  logo: null,
  name: '', email: '', phone: '', managerId: '', description: '',
  street: '', houseNumber: '', zip: '', city: '',
  activeMenu: '', enableDelivery: false, enableCashOnDelivery: false,
  openingHours: [{ workingDays: [], from: '', to: '' }],
  website: '', facebook: '', instagram: '', tiktok: '',
  status: true,
}

const MANAGER_SELECT_OPTIONS = mockManagerOptions.map((m) => ({
  label: m.name,
  value: m.id,
}))

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-semibold text-primary mb-3">{children}</h3>
}

interface ReadOnlyField {
  label: string
  value: string
}

function ReadOnlyRow({ fields }: { fields: ReadOnlyField[] }) {
  return (
    <div className={`grid grid-cols-${fields.length === 1 ? '1' : '2'} gap-4`}>
      {fields.map(({ label, value }) => (
        <div key={label} className="flex flex-col gap-1">
          <span className="text-xs text-neutral-500 font-medium">{label}</span>
          <span className="text-sm text-neutral-900 font-medium break-all">
            {value || <span className="text-neutral-400 italic">—</span>}
          </span>
        </div>
      ))}
    </div>
  )
}

interface WizardModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  submitLabel: string
  headerTitle: string
  initialData?: Partial<RestaurantFormData>
}

export function WizardModal({
  isOpen,
  onClose,
  onSubmit,
  submitLabel,
  headerTitle,
  initialData = {},
}: WizardModalProps) {
  const t = useTranslations('restaurants')
  const tCommon = useTranslations('common')
  const restaurantSteps = [
    { number: 1, label: t('wizard.steps.restaurantInfo') },
    { number: 2, label: t('wizard.steps.location') },
    { number: 3, label: t('wizard.steps.operations') },
    { number: 4, label: t('wizard.steps.onlinePresence') },
    { number: 5, label: t('wizard.steps.overview') },
  ]
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<RestaurantFormData>({ ...DEFAULT_FORM, ...initialData })

  function updateForm(patch: Partial<RestaurantFormData>) {
    setFormData((prev) => ({ ...prev, ...patch }))
  }

  const step1Valid = !!(formData.name && formData.email && formData.phone)

  function handleOpeningHoursChange(i: number, row: OpeningHoursEntry) {
    const updated = formData.openingHours.map((r, idx) => (idx === i ? row : r))
    updateForm({ openingHours: updated })
  }

  function handleOpeningHoursDelete(i: number) {
    updateForm({ openingHours: formData.openingHours.filter((_, idx) => idx !== i) })
  }

  function handleAddOpeningHours() {
    updateForm({ openingHours: [...formData.openingHours, { workingDays: [], from: '', to: '' }] })
  }

  const selectedManager = mockManagerOptions.find((m) => m.id === formData.managerId)
  const showMap = !!(formData.street && formData.city)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 md:flex md:items-center md:justify-center md:px-4">
      <div className="bg-white shadow-dashboard-modal w-full flex flex-col h-full md:h-auto md:max-h-[90vh] md:max-w-2xl md:rounded-[16px]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-table-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-neutral-900">{headerTitle}</h2>
            <StatusToggle
              checked={formData.status}
              onChange={(val) => updateForm({ status: val })}
            />
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 scrollbar-thin">
          <StepperHeader steps={restaurantSteps} currentStep={step} />

          {/* Step 1 — Restaurant Information */}
          {step === 1 && (
            <div>
              <h3 className="text-sm font-semibold text-primary mb-4">{t('wizard.step1.title')}</h3>
              <ProfilePictureUpload
                src={formData.logo}
                onChange={(src) => updateForm({ logo: src })}
                onDelete={() => updateForm({ logo: null })}
              />
              <div className="space-y-4">
                <Input
                  id="rest-name"
                  label={t('wizard.step1.restaurantName')}
                  placeholder={t('wizard.step1.namePlaceholder')}
                  value={formData.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                  leftIcon={<Store size={15} />}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    id="rest-email"
                    label={t('wizard.step1.email')}
                    type="email"
                    placeholder="email@domain.com"
                    value={formData.email}
                    onChange={(e) => updateForm({ email: e.target.value })}
                    leftIcon={<Mail size={15} />}
                  />
                  <PhoneInput
                    label={t('wizard.step1.phone')}
                    value={formData.phone}
                    onChange={(val) => updateForm({ phone: val })}
                    placeholder="+41 -- --- -- --"
                  />
                </div>
                <SelectDropdown
                  options={MANAGER_SELECT_OPTIONS}
                  value={formData.managerId}
                  onChange={(val) => updateForm({ managerId: val })}
                  placeholder={t('wizard.step1.selectManager')}
                  label={t('wizard.step1.assignedManager')}
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-neutral-700">{t('wizard.step1.description')}</label>
                  <textarea
                    rows={4}
                    placeholder={t('wizard.step1.descriptionPlaceholder')}
                    value={formData.description}
                    onChange={(e) => updateForm({ description: e.target.value })}
                    className="w-full rounded-[8px] border border-neutral-300 bg-white text-sm text-neutral-900 placeholder:text-neutral-500 shadow-input transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary py-3 px-3.5 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Location */}
          {step === 2 && (
            <div>
              <h3 className="text-sm font-semibold text-primary mb-4">{t('wizard.step2.title')}</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    id="street"
                    label={t('wizard.step2.street')}
                    placeholder={t('wizard.step2.street')}
                    value={formData.street}
                    onChange={(e) => updateForm({ street: e.target.value })}
                  />
                  <Input
                    id="number"
                    label={t('wizard.step2.number')}
                    placeholder={t('wizard.step2.number')}
                    value={formData.houseNumber}
                    onChange={(e) => updateForm({ houseNumber: e.target.value })}
                  />
                  <Input
                    id="zip"
                    label={t('wizard.step2.zip')}
                    placeholder={t('wizard.step2.zip')}
                    value={formData.zip}
                    onChange={(e) => updateForm({ zip: e.target.value })}
                  />
                  <Input
                    id="city"
                    label={t('wizard.step2.city')}
                    placeholder={t('wizard.step2.city')}
                    value={formData.city}
                    onChange={(e) => updateForm({ city: e.target.value })}
                  />
                </div>
                {showMap && <MapPreview />}
              </div>
            </div>
          )}

          {/* Step 3 — Operations */}
          {step === 3 && (
            <div>
              <SectionTitle>{t('wizard.step3.operations')}</SectionTitle>
              <div className="space-y-4 mb-6">
                <SelectDropdown
                  options={MENU_OPTIONS}
                  value={formData.activeMenu}
                  onChange={(val) => updateForm({ activeMenu: val })}
                  placeholder={t('wizard.step3.selectMenu')}
                  label={t('wizard.step3.activeMenu')}
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <StatusToggle
                      checked={formData.enableDelivery}
                      onChange={(val) => updateForm({ enableDelivery: val })}
                    />
                    <span className="text-sm text-neutral-700">{t('wizard.step3.enableDelivery')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <StatusToggle
                      checked={formData.enableCashOnDelivery}
                      onChange={(val) => updateForm({ enableCashOnDelivery: val })}
                    />
                    <span className="text-sm text-neutral-700">{t('wizard.step3.enableCashOnDelivery')}</span>
                  </label>
                </div>
              </div>

              <SectionTitle>{t('wizard.step3.openingHours')}</SectionTitle>
              <div className="space-y-3">
                {formData.openingHours.map((row, i) => (
                  <OpeningHoursRow
                    key={i}
                    row={row}
                    onChange={(r) => handleOpeningHoursChange(i, r)}
                    onDelete={() => handleOpeningHoursDelete(i)}
                    isOnly={formData.openingHours.length === 1}
                  />
                ))}
              </div>
              <div className="flex justify-end mt-3">
                <Button
                  type="button"
                  variant="ghost"
                  fullWidth={false}
                  size="md"
                  onClick={handleAddOpeningHours}
                  className="gap-1.5"
                >
                  <Plus size={14} /> {t('wizard.step3.addMore')}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4 — Online Presence */}
          {step === 4 && (
            <div>
              <h3 className="text-sm font-semibold text-primary mb-4">{t('wizard.step4.title')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="website"
                  label={t('wizard.step4.website')}
                  placeholder={t('wizard.step4.websitePlaceholder')}
                  value={formData.website}
                  onChange={(e) => updateForm({ website: e.target.value })}
                  leftIcon={<Globe size={15} />}
                />
                <Input
                  id="facebook"
                  label={t('wizard.step4.facebook')}
                  placeholder={t('wizard.step4.facebookPlaceholder')}
                  value={formData.facebook}
                  onChange={(e) => updateForm({ facebook: e.target.value })}
                />
                <Input
                  id="instagram"
                  label={t('wizard.step4.instagram')}
                  placeholder={t('wizard.step4.instagramPlaceholder')}
                  value={formData.instagram}
                  onChange={(e) => updateForm({ instagram: e.target.value })}
                />
                <Input
                  id="tiktok"
                  label={t('wizard.step4.tiktok')}
                  placeholder={t('wizard.step4.tiktokPlaceholder')}
                  value={formData.tiktok}
                  onChange={(e) => updateForm({ tiktok: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 5 — Overview */}
          {step === 5 && (
            <div className="space-y-6">
              {/* Restaurant Information */}
              <div>
                <SectionTitle>{t('wizard.step5.restaurantInfo')}</SectionTitle>
                <div className="flex items-center gap-3 mb-4">
                  {formData.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={formData.logo} alt="logo" className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center text-xs text-neutral-500">
                      {t('wizard.step5.noLogo')}
                    </div>
                  )}
                  <span className="text-xs text-neutral-500">{t('wizard.step5.restaurantPicture')}</span>
                </div>
                <div className="space-y-3">
                  <ReadOnlyRow fields={[{ label: t('wizard.step5.readOnly.restaurantName'), value: formData.name }]} />
                  <ReadOnlyRow fields={[
                    { label: t('wizard.step5.readOnly.email'), value: formData.email },
                    { label: t('wizard.step5.readOnly.phone'), value: formData.phone },
                  ]} />
                  <ReadOnlyRow fields={[
                    { label: t('wizard.step5.readOnly.assignedManager'), value: selectedManager?.name || '' },
                    { label: t('wizard.step5.readOnly.description'), value: formData.description },
                  ]} />
                </div>
              </div>

              {/* Location */}
              <div>
                <SectionTitle>{t('wizard.step5.location')}</SectionTitle>
                <div className="space-y-3">
                  <ReadOnlyRow fields={[
                    { label: t('wizard.step5.readOnly.street'), value: formData.street },
                    { label: t('wizard.step5.readOnly.number'), value: formData.houseNumber },
                  ]} />
                  <ReadOnlyRow fields={[
                    { label: t('wizard.step5.readOnly.zip'), value: formData.zip },
                    { label: t('wizard.step5.readOnly.city'), value: formData.city },
                  ]} />
                  {showMap && <MapPreview />}
                </div>
              </div>

              {/* Operations */}
              <div>
                <SectionTitle>{t('wizard.step5.operations')}</SectionTitle>
                <div className="space-y-3">
                  <ReadOnlyRow fields={[{ label: t('wizard.step5.readOnly.activeMenu'), value: formData.activeMenu }]} />
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <StatusToggle checked={formData.enableDelivery} onChange={() => {}} disabled />
                      <span className="text-sm text-neutral-700">{t('wizard.step3.enableDelivery')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusToggle checked={formData.enableCashOnDelivery} onChange={() => {}} disabled />
                      <span className="text-sm text-neutral-700">{t('wizard.step3.enableCashOnDelivery')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              {formData.openingHours.length > 0 && (
                <div>
                  <SectionTitle>{t('wizard.step5.openingHours')}</SectionTitle>
                  <div className="space-y-2">
                    {formData.openingHours.map((row, i) => (
                      <div key={i} className="grid grid-cols-3 gap-4 text-sm text-neutral-700">
                        <div>
                          <span className="text-xs text-neutral-500 block mb-0.5">{t('wizard.step5.workingDays')}</span>
                          {row.workingDays.join(', ') || '—'}
                        </div>
                        <div>
                          <span className="text-xs text-neutral-500 block mb-0.5">{t('wizard.step5.from')}</span>
                          {row.from || '—'}
                        </div>
                        <div>
                          <span className="text-xs text-neutral-500 block mb-0.5">{t('wizard.step5.to')}</span>
                          {row.to || '—'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Online Presence */}
              <div>
                <SectionTitle>{t('wizard.step5.onlinePresence')}</SectionTitle>
                <div className="space-y-3">
                  <ReadOnlyRow fields={[
                    { label: t('wizard.step5.readOnly.website'), value: formData.website },
                    { label: t('wizard.step5.readOnly.facebook'), value: formData.facebook },
                  ]} />
                  <ReadOnlyRow fields={[
                    { label: t('wizard.step5.readOnly.instagram'), value: formData.instagram },
                    { label: t('wizard.step5.readOnly.tiktok'), value: formData.tiktok },
                  ]} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-table-border flex-shrink-0">
          {step === 1 ? (
            <>
              <Button type="button" variant="secondary" fullWidth={false} onClick={onClose}>
                {tCommon('cancel')}
              </Button>
              <Button
                type="button"
                variant="primary"
                fullWidth={false}
                disabled={!step1Valid}
                onClick={() => setStep(2)}
              >
                {tCommon('next')} →
              </Button>
            </>
          ) : step < 5 ? (
            <>
              <Button type="button" variant="secondary" fullWidth={false} onClick={() => setStep((s) => s - 1)}>
                ← {tCommon('previous')}
              </Button>
              <Button type="button" variant="primary" fullWidth={false} onClick={() => setStep((s) => s + 1)}>
                {tCommon('next')} →
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="secondary" fullWidth={false} onClick={() => setStep(4)}>
                ← {tCommon('previous')}
              </Button>
              <Button type="button" variant="primary" fullWidth={false} onClick={onSubmit}>
                {submitLabel}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

interface RestaurantWizardModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: () => void
}

export function RestaurantWizardModal({ isOpen, onClose, onCreated }: RestaurantWizardModalProps) {
  const t = useTranslations('restaurants')
  return (
    <WizardModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onCreated}
      submitLabel={t('wizard.submitCreate')}
      headerTitle={t('wizard.headerCreate')}
    />
  )
}
