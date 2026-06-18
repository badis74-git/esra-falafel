'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { FileText, Trash2, Upload } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { MultiSelectDropdown } from '@/components/ui/MultiSelectDropdown'
import { FileAttachmentRow } from '@/components/ui/FileAttachmentRow'
import { PdfUploadZone } from '@/components/ui/PdfUploadZone'
import { Button } from '@/components/ui/Button'
import { mockBranches } from '@/lib/mock/menus'
import type { Menu } from '@/lib/mock/menus'

interface Props {
  menu: Menu
  onSave: () => void
  onCancel: () => void
}

interface PdfMeta { name: string; date: string; size: string; url: string }

export function MenuInfoSection({ menu, onSave, onCancel }: Props) {
  const t = useTranslations('menus')
  const fileRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<string | null>(menu.image)
  const [name, setName] = useState(menu.name)
  const [branches, setBranches] = useState<string[]>(menu.assignedBranches)
  const [description, setDescription] = useState(menu.description ?? '')
  const [pdf, setPdf] = useState<PdfMeta | undefined>(menu.pdf)

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setImage(URL.createObjectURL(file))
  }

  function handlePdfUpload(file: File) {
    setPdf({
      name: file.name,
      date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }),
      size: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
      url: URL.createObjectURL(file),
    })
  }

  const isValid = name.trim() !== '' && branches.length > 0

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 p-5">
        <h3 className="text-sm font-semibold text-primary">{t('info.title')}</h3>

        {/* Picture row */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden flex-shrink-0">
            {image
              ? <img src={image} alt="menu" className="w-full h-full object-cover" />
              : <FileText size={24} className="text-neutral-400" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-700">{t('info.picture')}</p>
            <p className="text-xs text-neutral-500">{t('info.pictureHint')}</p>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          {image ? (
            <button
              type="button"
              onClick={() => setImage(null)}
              className="flex items-center gap-1.5 text-sm text-danger hover:text-red-700 transition-colors flex-shrink-0"
            >
              <Trash2 size={14} /> {t('info.delete')}
            </button>
          ) : (
            <Button type="button" variant="secondary" fullWidth={false} size="md" onClick={() => fileRef.current?.click()}>
              <Upload size={14} /> {t('info.upload')}
            </Button>
          )}
        </div>

        {/* Name + Branches */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={`${t('info.name')} *`}
            placeholder={t('info.namePlaceholder')}
            leftIcon={<FileText size={14} />}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <MultiSelectDropdown
            label={`${t('info.branches')} *`}
            placeholder={t('info.branchesPlaceholder')}
            options={mockBranches}
            value={branches}
            onChange={setBranches}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-neutral-700">{t('info.description')}</label>
          <textarea
            placeholder={t('info.descriptionPlaceholder')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-[8px] border border-neutral-300 bg-white px-3.5 py-3 text-sm text-neutral-900 placeholder:text-neutral-500 shadow-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
          />
        </div>

        {/* PDF */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">{t('info.pdfLabel')}</label>
          {pdf ? (
            <FileAttachmentRow
              fileName={pdf.name}
              date={pdf.date}
              size={pdf.size}
              onView={() => window.open(pdf.url)}
              onDownload={() => {}}
              onDelete={() => setPdf(undefined)}
            />
          ) : (
            <PdfUploadZone onUpload={handlePdfUpload} onDelete={() => {}} />
          )}
        </div>
      </div>

      <div className="relative z-10 flex gap-3 border-t border-table-border px-5 py-4 flex-shrink-0">
        <Button variant="secondary" fullWidth={false} size="md" onClick={onCancel} className="flex-1 md:flex-none">
          {t('edit.cancel')}
        </Button>
        <Button
          variant="primary"
          fullWidth={false}
          size="md"
          disabled={!isValid}
          onClick={onSave}
          className={`flex-1 md:flex-none${!isValid ? ' opacity-50 cursor-not-allowed' : ''}`}
        >
          {t('edit.save')}
        </Button>
      </div>
    </div>
  )
}
