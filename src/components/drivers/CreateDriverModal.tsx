'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PhoneInput } from '@/components/ui/PhoneInput'
import { SelectDropdown } from '@/components/ui/SelectDropdown'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { MapPreview } from '@/components/ui/MapPreview'
import { ProfilePictureUpload } from '@/components/ui/ProfilePictureUpload'
import { mockZones, mockRestaurantsForDrivers } from '@/lib/mock/drivers'
import { Mail, X } from 'lucide-react'
import { useState } from 'react'

interface CreateDriverModalProps {
  onClose: () => void
  onCreated: (email: string) => void
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-semibold text-primary mb-3">{children}</h3>
}

export function CreateDriverModal({ onClose, onCreated }: CreateDriverModalProps) {
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
  const [zone, setZone] = useState('')
  const [restaurants, setRestaurants] = useState('')

  const isFilled = firstName && lastName && email && zone

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
            <h2 className="text-base font-bold text-neutral-900">Add New Driver</h2>
            <StatusToggle checked={active} onChange={setActive} />
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 scrollbar-thin">
          <form onSubmit={handleSubmit} id="create-driver-form">
            <ProfilePictureUpload
              src={photo}
              onChange={(src) => setPhoto(src)}
              onDelete={() => setPhoto(null)}
            />

            <SectionTitle>Personal Information</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <Input
                id="firstName" label="First Name *" placeholder="First Name"
                value={firstName} onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                id="lastName" label="Last Name *" placeholder="Last Name"
                value={lastName} onChange={(e) => setLastName(e.target.value)}
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

            <SectionTitle>Assigned Zone &amp; Restaurants</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectDropdown
                options={mockZones}
                value={zone}
                onChange={setZone}
                placeholder="Select Zone"
                label="Assigned Zone *"
                required
              />
              <SelectDropdown
                options={mockRestaurantsForDrivers}
                value={restaurants}
                onChange={setRestaurants}
                placeholder="Select Restaurants"
                label="Assigned Restaurants *"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-table-border flex-shrink-0">
          <Button type="button" variant="secondary" fullWidth={false} onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            form="create-driver-form"
            variant="primary"
            fullWidth={false}
            disabled={!isFilled}
          >
            + Create Driver
          </Button>
        </div>
      </div>
    </div>
  )
}
