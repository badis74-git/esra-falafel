'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PhoneInput } from '@/components/ui/PhoneInput'
import { SelectDropdown } from '@/components/ui/SelectDropdown'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { MapPreview } from '@/components/ui/MapPreview'
import { ProfilePictureUpload } from '@/components/ui/ProfilePictureUpload'
import { Driver, mockZones, mockDriverStatuses } from '@/lib/mock/drivers'
import { Mail, Save, X } from 'lucide-react'
import { useState } from 'react'

interface UpdateDriverModalProps {
  driver: Driver
  onClose: () => void
  onSaved: () => void
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-semibold text-primary mb-3">{children}</h3>
}

export function UpdateDriverModal({ driver, onClose, onSaved }: UpdateDriverModalProps) {
  const [active, setActive] = useState(driver.status === 'active')
  const [photo, setPhoto] = useState<string | null>(driver.avatar)
  const [firstName, setFirstName] = useState(driver.firstName)
  const [lastName, setLastName] = useState(driver.lastName)
  const [email, setEmail] = useState(driver.email)
  const [phone, setPhone] = useState(driver.phone)
  const [street, setStreet] = useState('Musterstrasse')
  const [number, setNumber] = useState('12')
  const [zip, setZip] = useState('3000')
  const [city, setCity] = useState('Bern')
  const [zone, setZone] = useState(driver.zones.join(', '))
  const [status, setStatus] = useState(driver.status === 'archived' ? 'inactive' : driver.status)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSaved()
  }

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 md:flex md:items-center md:justify-center md:px-4">
      <div className="bg-white shadow-dashboard-modal w-full flex flex-col h-full md:h-auto md:max-h-[90vh] md:max-w-2xl md:rounded-[16px]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-table-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-neutral-900">
              {driver.firstName} {driver.lastName}
            </h2>
            <StatusToggle checked={active} onChange={setActive} />
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5 scrollbar-thin">
          <form onSubmit={handleSubmit} id="update-driver-form">
            <ProfilePictureUpload
              src={photo}
              onChange={(src) => setPhoto(src)}
              onDelete={() => setPhoto(null)}
            />

            <SectionTitle>Personal Information</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <Input id="firstName" label="First Name *" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <Input id="lastName" label="Last Name *" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <Input id="email" label="Email *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} leftIcon={<Mail size={15} />} />
              <PhoneInput label="Phone Number" countryCode="DE" dialCode="+41" value={phone} onChange={setPhone} />
            </div>

            <SectionTitle>Address Details</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
              <Input id="street" label="Street" value={street} onChange={(e) => setStreet(e.target.value)} />
              <Input id="number" label="N°" value={number} onChange={(e) => setNumber(e.target.value)} />
              <Input id="zip" label="Zip" value={zip} onChange={(e) => setZip(e.target.value)} />
              <Input id="city" label="City" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="mb-5"><MapPreview /></div>

            <SectionTitle>Assigned Zone</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectDropdown
                options={mockZones}
                value={zone}
                onChange={setZone}
                label="Assigned Zone *"
                required
                placeholder="Select Zone"
              />
              <SelectDropdown
                options={mockDriverStatuses}
                value={status}
                onChange={(val) => setStatus(val as 'active' | 'inactive')}
                label="Status"
                placeholder="Select Status"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-table-border flex-shrink-0">
          <Button type="button" variant="secondary" fullWidth={false} onClick={onClose}>Cancel</Button>
          <Button type="submit" form="update-driver-form" variant="primary" fullWidth={false}>
            <Save size={14} /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
