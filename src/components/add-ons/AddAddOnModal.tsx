'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SelectDropdown } from '@/components/ui/SelectDropdown'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { useTranslations } from 'next-intl'
import { X } from 'lucide-react'
import { mockAddOnGroups } from '@/lib/mock/addOnGroups'

interface AddAddOnModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: () => void
}

interface FormState {
  groupId: string
  name: string
  price: string
  description: string
  isActive: boolean
}

const defaultForm: FormState = {
  groupId: '',
  name: '',
  price: '',
  description: '',
  isActive: true,
}

export function AddAddOnModal({ isOpen, onClose, onCreated }: AddAddOnModalProps) {
  const t = useTranslations('addOns')
  const tCommon = useTranslations('common')
  const [form, setForm] = useState<FormState>(defaultForm)

  if (!isOpen) return null

  function update(patch: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  const groupOptions = mockAddOnGroups.map((g) => ({ label: g.name, value: g.id }))
  const isValid = form.groupId !== '' && form.name.trim() !== ''

  function handleSubmit() {
    if (!isValid) return
    setForm(defaultForm)
    onCreated()
  }

  function handleClose() {
    setForm(defaultForm)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-lg flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-table-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-neutral-900 text-base">{t('modal.addTitle')}</h2>
            <StatusToggle checked={form.isActive} onChange={(val) => update({ isActive: val })} />
          </div>
          <button onClick={handleClose} className="text-neutral-400 hover:text-neutral-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">

          {/* Selection Add-on Group */}
          <SelectDropdown
            label={t('modal.groupRequired')}
            required
            options={groupOptions}
            value={form.groupId}
            onChange={(val) => update({ groupId: val })}
            placeholder={t('modal.groupPlaceholder')}
          />

          {/* Add-on Name */}
          <Input
            label={t('modal.nameRequired')}
            placeholder={t('modal.namePlaceholder')}
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
          />

          {/* Additional Price */}
          <Input
            label={t('modal.priceLabel')}
            placeholder={t('modal.pricePlaceholder')}
            type="text"
            inputMode="decimal"
            value={form.price}
            onChange={(e) => update({ price: e.target.value })}
          />

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">{t('modal.descriptionLabel')}</label>
            <textarea
              placeholder={t('modal.descriptionPlaceholder')}
              value={form.description}
              onChange={(e) => update({ description: e.target.value })}
              rows={4}
              className="w-full rounded-[8px] border border-neutral-300 bg-white px-3.5 py-3 text-sm text-neutral-900 placeholder:text-neutral-500 shadow-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-table-border flex-shrink-0">
          <Button variant="secondary" fullWidth={false} size="md" onClick={handleClose}>
            {t('modal.cancel')}
          </Button>
          <Button
            variant="primary"
            fullWidth={false}
            size="md"
            disabled={!isValid}
            onClick={handleSubmit}
            className={!isValid ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {t('modal.createCta')}
          </Button>
        </div>
      </div>
    </div>
  )
}
