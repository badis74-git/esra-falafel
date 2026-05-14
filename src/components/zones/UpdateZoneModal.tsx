'use client'

import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { MultiSelectDropdown } from '@/components/ui/MultiSelectDropdown'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { Zone, restaurantOptions, driverOptions } from '@/lib/mock/zones'
import { Save, X } from 'lucide-react'
import { useState } from 'react'

const ZoneMapEditor = dynamic(
  () => import('@/components/ui/ZoneMapEditor'),
  { ssr: false }
)

interface UpdateZoneModalProps {
  zone: Zone
  onClose: () => void
  onSaved: () => void
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-semibold text-primary mb-3">{children}</h3>
}

export function UpdateZoneModal({ zone, onClose, onSaved }: UpdateZoneModalProps) {
  const [active, setActive] = useState(zone.status === 'active')
  const [zoneName, setZoneName] = useState(zone.name)
  const [description, setDescription] = useState(zone.description)
  const [assignedRestaurants, setAssignedRestaurants] = useState<string[]>(zone.assignedRestaurants)
  const [assignedDrivers, setAssignedDrivers] = useState<string[]>(zone.assignedDrivers)

  const isValid = zoneName.trim().length > 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isValid) onSaved()
  }

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 md:flex md:items-center md:justify-center md:px-4">
      <div className="bg-white shadow-dashboard-modal w-full flex flex-col h-full md:h-auto md:max-h-[90vh] md:max-w-2xl md:rounded-[16px]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-table-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-neutral-900">{zone.name}</h2>
            <StatusToggle checked={active} onChange={setActive} />
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          <form onSubmit={handleSubmit} id="update-zone-form">
            <div className="mb-5">
              <SectionTitle>Zone Details</SectionTitle>
              <div className="flex flex-col gap-4">
                <Input
                  id="zoneName"
                  label="Zone Name *"
                  placeholder="Enter zone name"
                  value={zoneName}
                  onChange={(e) => setZoneName(e.target.value)}
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-neutral-700">Zone Description</label>
                  <textarea
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-sm text-neutral-900 shadow-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none placeholder:text-neutral-500"
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <SectionTitle>Zone Map</SectionTitle>
              <ZoneMapEditor onChange={() => {}} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MultiSelectDropdown
                options={restaurantOptions}
                value={assignedRestaurants}
                onChange={setAssignedRestaurants}
                placeholder="Select Restaurant"
                label="Assigned Restaurant"
              />
              <MultiSelectDropdown
                options={driverOptions}
                value={assignedDrivers}
                onChange={setAssignedDrivers}
                placeholder="Select drivers"
                label="Assigned Drivers"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-table-border flex-shrink-0">
          <Button type="button" variant="secondary" fullWidth={false} onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="update-zone-form"
            variant="primary"
            fullWidth={false}
            disabled={!isValid}
            className={!isValid ? 'opacity-50 cursor-not-allowed' : ''}
          >
            <Save size={14} /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
