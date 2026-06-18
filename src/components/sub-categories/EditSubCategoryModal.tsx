'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SelectDropdown } from '@/components/ui/SelectDropdown'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { parentCategoryOptions, SubCategory } from '@/lib/mock/subCategories'
import { useTranslations } from 'next-intl'
import { X } from 'lucide-react'

interface EditSubCategoryModalProps {
  isOpen: boolean
  subCategory: SubCategory
  onClose: () => void
  onSaved: () => void
}

interface FormData {
  parentCategory: string
  name: string
  description: string
  status: boolean
}

export function EditSubCategoryModal({ isOpen, subCategory, onClose, onSaved }: EditSubCategoryModalProps) {
  const t = useTranslations('subCategories')
  const tCommon = useTranslations('common')
  const [form, setForm] = useState<FormData>({
    parentCategory: subCategory.parentCategory,
    name: subCategory.name,
    description: subCategory.description,
    status: subCategory.status === 'active',
  })

  if (!isOpen) return null

  function update(patch: Partial<FormData>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  const isValid = form.parentCategory !== '' && form.name.trim() !== ''

  function handleSubmit() {
    if (!isValid) return
    onSaved()
  }

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 md:flex md:items-center md:justify-center md:px-4">
      <div className="bg-white shadow-dashboard-modal w-full flex flex-col h-full md:h-auto md:max-h-[90vh] md:max-w-md md:rounded-[16px]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-table-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-neutral-900 text-base">{t('form.editTitle')}</h2>
            <StatusToggle checked={form.status} onChange={(val) => update({ status: val })} />
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          <SelectDropdown
            label={t('form.parentCategory')}
            placeholder={t('form.parentCategoryPlaceholder')}
            options={parentCategoryOptions}
            value={form.parentCategory}
            onChange={(val) => update({ parentCategory: val })}
            required
          />

          <Input
            label={t('form.subCategoryName')}
            placeholder={t('form.subCategoryNamePlaceholder')}
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
            required
          />

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
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-table-border flex-shrink-0">
          <Button variant="secondary" fullWidth={false} size="md" onClick={onClose}>
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
            {t('form.saveChanges')}
          </Button>
        </div>
      </div>
    </div>
  )
}
