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

const RESTAURANT_STEPS = [
  { number: 1, label: 'Restaurant Information' },
  { number: 2, label: 'Location' },
  { number: 3, label: 'Operations' },
  { number: 4, label: 'Online Presence' },
  { number: 5, label: 'Overview' },
]

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
          <StepperHeader steps={RESTAURANT_STEPS} currentStep={step} />

          {/* Step 1 — Restaurant Information */}
          {step === 1 && (
            <div>
              <h3 className="text-sm font-semibold text-primary mb-4">1. Restaurant Information</h3>
              <ProfilePictureUpload
                src={formData.logo}
                onChange={(src) => updateForm({ logo: src })}
                onDelete={() => updateForm({ logo: null })}
              />
              <div className="space-y-4">
                <Input
                  id="rest-name"
                  label="Restaurant Name *"
                  placeholder="Restaurant Name"
                  value={formData.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                  leftIcon={<Store size={15} />}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    id="rest-email"
                    label="Email *"
                    type="email"
                    placeholder="email@domain.com"
                    value={formData.email}
                    onChange={(e) => updateForm({ email: e.target.value })}
                    leftIcon={<Mail size={15} />}
                  />
                  <PhoneInput
                    label="Phone Number *"
                    value={formData.phone}
                    onChange={(val) => updateForm({ phone: val })}
                    placeholder="+41 -- --- -- --"
                  />
                </div>
                <SelectDropdown
                  options={MANAGER_SELECT_OPTIONS}
                  value={formData.managerId}
                  onChange={(val) => updateForm({ managerId: val })}
                  placeholder="Select Manager"
                  label="Assigned Manager"
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-neutral-700">Restaurant Description</label>
                  <textarea
                    rows={4}
                    placeholder="Enter description"
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
              <h3 className="text-sm font-semibold text-primary mb-4">2. Location</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    id="street"
                    label="Street"
                    placeholder="Street"
                    value={formData.street}
                    onChange={(e) => updateForm({ street: e.target.value })}
                  />
                  <Input
                    id="number"
                    label="N°"
                    placeholder="N°"
                    value={formData.houseNumber}
                    onChange={(e) => updateForm({ houseNumber: e.target.value })}
                  />
                  <Input
                    id="zip"
                    label="Zip"
                    placeholder="Zip"
                    value={formData.zip}
                    onChange={(e) => updateForm({ zip: e.target.value })}
                  />
                  <Input
                    id="city"
                    label="City"
                    placeholder="City"
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
              <SectionTitle>Operations</SectionTitle>
              <div className="space-y-4 mb-6">
                <SelectDropdown
                  options={MENU_OPTIONS}
                  value={formData.activeMenu}
                  onChange={(val) => updateForm({ activeMenu: val })}
                  placeholder="Select Menu"
                  label="Active Menu"
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <StatusToggle
                      checked={formData.enableDelivery}
                      onChange={(val) => updateForm({ enableDelivery: val })}
                    />
                    <span className="text-sm text-neutral-700">Enable Delivery</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <StatusToggle
                      checked={formData.enableCashOnDelivery}
                      onChange={(val) => updateForm({ enableCashOnDelivery: val })}
                    />
                    <span className="text-sm text-neutral-700">Enable Cash On Delivery</span>
                  </label>
                </div>
              </div>

              <SectionTitle>Opening Days &amp; Hours</SectionTitle>
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
                  <Plus size={14} /> Add More
                </Button>
              </div>
            </div>
          )}

          {/* Step 4 — Online Presence */}
          {step === 4 && (
            <div>
              <h3 className="text-sm font-semibold text-primary mb-4">4. Online Presence</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="website"
                  label="Website Link"
                  placeholder="www.yoursite.com"
                  value={formData.website}
                  onChange={(e) => updateForm({ website: e.target.value })}
                  leftIcon={<Globe size={15} />}
                />
                <Input
                  id="facebook"
                  label="Facebook Link"
                  placeholder="https://facebook.com/..."
                  value={formData.facebook}
                  onChange={(e) => updateForm({ facebook: e.target.value })}
                />
                <Input
                  id="instagram"
                  label="Instagram Link"
                  placeholder="https://instagram.com/..."
                  value={formData.instagram}
                  onChange={(e) => updateForm({ instagram: e.target.value })}
                />
                <Input
                  id="tiktok"
                  label="TikTok Link"
                  placeholder="https://tiktok.com/..."
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
                <SectionTitle>Restaurant Information</SectionTitle>
                <div className="flex items-center gap-3 mb-4">
                  {formData.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={formData.logo} alt="logo" className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center text-xs text-neutral-500">
                      No logo
                    </div>
                  )}
                  <span className="text-xs text-neutral-500">Restaurant picture</span>
                </div>
                <div className="space-y-3">
                  <ReadOnlyRow fields={[{ label: 'Restaurant Name', value: formData.name }]} />
                  <ReadOnlyRow fields={[
                    { label: 'Email', value: formData.email },
                    { label: 'Phone Number', value: formData.phone },
                  ]} />
                  <ReadOnlyRow fields={[
                    { label: 'Assigned Manager', value: selectedManager?.name || '' },
                    { label: 'Restaurant Description', value: formData.description },
                  ]} />
                </div>
              </div>

              {/* Location */}
              <div>
                <SectionTitle>Location</SectionTitle>
                <div className="space-y-3">
                  <ReadOnlyRow fields={[
                    { label: 'Street', value: formData.street },
                    { label: 'N°', value: formData.houseNumber },
                  ]} />
                  <ReadOnlyRow fields={[
                    { label: 'Zip', value: formData.zip },
                    { label: 'City', value: formData.city },
                  ]} />
                  {showMap && <MapPreview />}
                </div>
              </div>

              {/* Operations */}
              <div>
                <SectionTitle>Operations</SectionTitle>
                <div className="space-y-3">
                  <ReadOnlyRow fields={[{ label: 'Active Menu', value: formData.activeMenu }]} />
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <StatusToggle checked={formData.enableDelivery} onChange={() => {}} disabled />
                      <span className="text-sm text-neutral-700">Enable Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusToggle checked={formData.enableCashOnDelivery} onChange={() => {}} disabled />
                      <span className="text-sm text-neutral-700">Enable Cash On Delivery</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              {formData.openingHours.length > 0 && (
                <div>
                  <SectionTitle>Opening Hours</SectionTitle>
                  <div className="space-y-2">
                    {formData.openingHours.map((row, i) => (
                      <div key={i} className="grid grid-cols-3 gap-4 text-sm text-neutral-700">
                        <div>
                          <span className="text-xs text-neutral-500 block mb-0.5">Working Days</span>
                          {row.workingDays.join(', ') || '—'}
                        </div>
                        <div>
                          <span className="text-xs text-neutral-500 block mb-0.5">From</span>
                          {row.from || '—'}
                        </div>
                        <div>
                          <span className="text-xs text-neutral-500 block mb-0.5">To</span>
                          {row.to || '—'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Online Presence */}
              <div>
                <SectionTitle>Online Presence</SectionTitle>
                <div className="space-y-3">
                  <ReadOnlyRow fields={[
                    { label: 'Website Link', value: formData.website },
                    { label: 'Facebook Link', value: formData.facebook },
                  ]} />
                  <ReadOnlyRow fields={[
                    { label: 'Instagram Link', value: formData.instagram },
                    { label: 'TikTok Link', value: formData.tiktok },
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
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                fullWidth={false}
                disabled={!step1Valid}
                onClick={() => setStep(2)}
              >
                Next →
              </Button>
            </>
          ) : step < 5 ? (
            <>
              <Button type="button" variant="secondary" fullWidth={false} onClick={() => setStep((s) => s - 1)}>
                ← Previous
              </Button>
              <Button type="button" variant="primary" fullWidth={false} onClick={() => setStep((s) => s + 1)}>
                Next →
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="secondary" fullWidth={false} onClick={() => setStep(4)}>
                ← Previous
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
  return (
    <WizardModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onCreated}
      submitLabel="+ Create Restaurant"
      headerTitle="Add New Restaurant"
    />
  )
}
