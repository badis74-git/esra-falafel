'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PhoneInput } from '@/components/ui/PhoneInput'
import { SelectDropdown } from '@/components/ui/SelectDropdown'
import { StatusToggle } from './StatusToggle'
import { MapPreview } from './MapPreview'
import { mockRestaurants } from '@/lib/mock/managers'
import { Mail, Trash2, Upload, User, X } from 'lucide-react'
import { useRef, useState } from 'react'

interface CreateManagerModalProps {
  onClose: () => void
  onCreated: (email: string) => void
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-semibold text-primary mb-3">{children}</h3>
}

export function CreateManagerModal({ onClose, onCreated }: CreateManagerModalProps) {
  const [active, setActive] = useState(true)
  const [photo, setPhoto] = useState<string | null>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [zip, setZip] = useState('')
  const [city, setCity] = useState('')
  const [restaurant, setRestaurant] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const isFilled = firstName && lastName && email && restaurant

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setPhoto(URL.createObjectURL(file))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isFilled) onCreated(email)
  }

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 md:flex md:items-center md:justify-center md:px-4">
      <div className="bg-white shadow-dashboard-modal w-full flex flex-col h-full md:h-auto md:max-h-[90vh] md:max-w-2xl md:rounded-[16px]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-table-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-neutral-900">Add New Manager</h2>
            <StatusToggle checked={active} onChange={setActive} />
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 scrollbar-thin">
          <form onSubmit={handleSubmit} id="create-form">
            {/* Profile picture */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                {photo
                  ? <img src={photo} alt="profile" className="w-full h-full object-cover" />
                  : <User size={28} className="text-neutral-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-700">Profile picture</p>
                <p className="text-xs text-neutral-500">PNG, JPEG under 15MB</p>
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              {photo ? (
                <button
                  type="button"
                  onClick={() => setPhoto(null)}
                  className="flex items-center gap-1.5 text-sm text-danger hover:text-red-700 transition-colors"
                >
                  <Trash2 size={14} /> Delete
                </button>
              ) : (
                <Button type="button" variant="secondary" fullWidth={false} size="md" onClick={() => fileRef.current?.click()}>
                  <Upload size={14} /> Upload Picture
                </Button>
              )}
            </div>

            {/* Personal Information */}
            <SectionTitle>Personal Information</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <Input
                id="firstName" label="First Name *" placeholder="First Name"
                value={firstName} onChange={(e) => setFirstName(e.target.value)}
                leftIcon={<User size={15} />}
              />
              <Input
                id="lastName" label="Last Name *" placeholder="Last Name"
                value={lastName} onChange={(e) => setLastName(e.target.value)}
                leftIcon={<User size={15} />}
              />
              <Input
                id="email" label="Email *" type="email" placeholder="email@domain.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail size={15} />}
              />
              <PhoneInput
                label="Phone Number"
                countryCode="DE" dialCode="+41"
                value={phone} onChange={setPhone}
                placeholder="+41 -- --- -- --"
              />
            </div>

            {/* Address Details */}
            <SectionTitle>Address Details</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
              <Input id="street" placeholder="Street" label="Street" value={street} onChange={(e) => setStreet(e.target.value)} />
              <Input id="number" placeholder="N°" label="N°" value={number} onChange={(e) => setNumber(e.target.value)} />
              <Input id="zip" placeholder="Zip" label="Zip" value={zip} onChange={(e) => setZip(e.target.value)} />
              <Input id="city" placeholder="City" label="City" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="mb-5">
              <MapPreview />
            </div>

            {/* Assigned Restaurant */}
            <SectionTitle>Assigned Restaurant</SectionTitle>
            <SelectDropdown
              options={mockRestaurants}
              value={restaurant}
              onChange={setRestaurant}
              placeholder="Select Restaurant"
              label="Restaurant *"
              required
            />
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-table-border flex-shrink-0">
          <Button type="button" variant="secondary" fullWidth={false} onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            form="create-form"
            variant="primary"
            fullWidth={false}
            disabled={!isFilled}
          >
            + Create Manager
          </Button>
        </div>
      </div>
    </div>
  )
}
