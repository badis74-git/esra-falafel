'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SelectDropdown } from '@/components/ui/SelectDropdown'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { useTranslations } from 'next-intl'
import { X } from 'lucide-react'

interface AddAddOnGroupModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: () => void
}

interface FormState {
  name: string
  selectionType: string
  minSelection: string
  maxSelection: string
  description: string
  required: boolean
  status: boolean
}

const defaultForm: FormState = {
  name: '',
  selectionType: '',
  minSelection: '',
  maxSelection: '',
  description: '',
  required: false,
  status: true,
}

export function AddAddOnGroupModal({ isOpen, onClose, onCreated }: AddAddOnGroupModalProps) {
  const t = useTranslations('addOnGroups')
  const tCommon = useTranslations('common')
  const [form, setForm] = useState<FormState>(defaultForm)

  if (!isOpen) return null

  function update(patch: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  const selectionTypeOptions = [
    { label: t('selectionTypes.singleChoice'), value: 'single' },
    { label: t('selectionTypes.multipleChoice'), value: 'multiple' },
  ]

  const isValid = form.name.trim() !== '' && form.selectionType !== ''

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
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-md flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-table-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-neutral-900 text-base">{t('form.addTitle')}</h2>
            <StatusToggle checked={form.status} onChange={(val) => update({ status: val })} />
          </div>
          <button onClick={handleClose} className="text-neutral-400 hover:text-neutral-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">

          {/* Add-on Group Name */}
          <Input
            label={t('form.name')}
            placeholder={t('form.namePlaceholder')}
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
            required
          />

          {/* Selection Type */}
          <SelectDropdown
            label={t('form.selectionType')}
            required
            options={selectionTypeOptions}
            value={form.selectionType}
            onChange={(val) => update({ selectionType: val })}
            placeholder={t('form.selectionTypePlaceholder')}
          />

          {/* Min / Max Selection */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('form.minSelection')}
              placeholder={t('form.selectionPlaceholder')}
              type="number"
              min={0}
              value={form.minSelection}
              onChange={(e) => update({ minSelection: e.target.value })}
            />
            <Input
              label={t('form.maxSelection')}
              placeholder={t('form.selectionPlaceholder')}
              type="number"
              min={0}
              value={form.maxSelection}
              onChange={(e) => update({ maxSelection: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">{t('form.description')}</label>
            <textarea
              placeholder={t('form.descriptionPlaceholder')}
              value={form.description}
              onChange={(e) => update({ description: e.target.value })}
              rows={3}
              className="w-full rounded-[8px] border border-neutral-300 bg-white px-3.5 py-3 text-sm text-neutral-900 placeholder:text-neutral-500 shadow-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
            />
          </div>

          {/* Required Add-ons toggle */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-700">{t('form.requiredAddOns')}</label>
            <StatusToggle checked={form.required} onChange={(val) => update({ required: val })} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-table-border flex-shrink-0">
          <Button variant="secondary" fullWidth={false} size="md" onClick={handleClose}>
            {tCommon('cancel')}
          </Button>
          <Button
            variant="primary"
            fullWidth={false}
            size="md"
            disabled={!isValid}
            onClick={handleSubmit}
            className={!isValid ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {t('form.create')}
          </Button>
        </div>
      </div>
    </div>
  )
}
