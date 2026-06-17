'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { useTranslations } from 'next-intl'
import { Trash2, Upload, UtensilsCrossed, X } from 'lucide-react'

interface AddCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: () => void
}

interface FormData {
  image: string | null
  name: string
  description: string
  status: boolean
}

const defaultForm: FormData = {
  image: null,
  name: '',
  description: '',
  status: true,
}

export function AddCategoryModal({ isOpen, onClose, onCreated }: AddCategoryModalProps) {
  const t = useTranslations('categories')
  const tCommon = useTranslations('common')
  const [form, setForm] = useState<FormData>(defaultForm)
  const fileRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  function update(patch: Partial<FormData>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) update({ image: URL.createObjectURL(file) })
  }

  const isValid = form.name.trim() !== ''

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

          {/* Picture upload */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {form.image
                ? <img src={form.image} alt="category" className="w-full h-full object-cover" />
                : <UtensilsCrossed size={20} className="text-neutral-300" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-700">{t('form.categoryPicture')}</p>
              <p className="text-xs text-neutral-500">{t('form.pictureFormats')}</p>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            {form.image ? (
              <button
                type="button"
                onClick={() => update({ image: null })}
                className="flex items-center gap-1.5 text-sm text-danger hover:text-red-700 transition-colors flex-shrink-0"
              >
                <Trash2 size={14} /> {t('form.deletePicture')}
              </button>
            ) : (
              <Button type="button" variant="secondary" fullWidth={false} size="md" onClick={() => fileRef.current?.click()}>
                <Upload size={14} /> {t('form.uploadPicture')}
              </Button>
            )}
          </div>

          {/* Category Name */}
          <Input
            label={t('form.categoryName')}
            placeholder={t('form.categoryNamePlaceholder')}
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
            required
          />

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
            {t('form.createCategory')}
          </Button>
        </div>
      </div>
    </div>
  )
}
