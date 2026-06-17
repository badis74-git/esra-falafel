'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SelectDropdown } from '@/components/ui/SelectDropdown'
import { MultiSelectDropdown } from '@/components/ui/MultiSelectDropdown'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { ProfilePictureUpload } from '@/components/ui/ProfilePictureUpload'
import { AllergenAdditiveSelector } from '@/components/products/AllergenAdditiveSelector'
import {
  mockCategories,
  mockSubCategories,
  mockDietaryTypes,
  mockAddOnGroups,
  mockAssignedMenus,
  Product,
} from '@/lib/mock/products'
import { useTranslations } from 'next-intl'
import { X } from 'lucide-react'

interface EditProductModalProps {
  isOpen: boolean
  product: Product
  onClose: () => void
  onSaved: () => void
}

interface FormData {
  image: string | null
  name: string
  description: string
  category: string
  subCategory: string
  dietaryType: string
  addOnGroups: string[]
  prepTimeMin: string
  prepTimeMax: string
  assignedMenus: string[]
  basePrice: string
  displayOrder: string
  status: boolean
  allergens: string[]
  additives: string[]
}

export function EditProductModal({ isOpen, product, onClose, onSaved }: EditProductModalProps) {
  const t = useTranslations('products')
  const tCommon = useTranslations('common')

  const [form, setForm] = useState<FormData>({
    image: product.image,
    name: product.name,
    description: product.description,
    category: product.category,
    subCategory: product.subCategory,
    dietaryType: product.dietaryType ?? '',
    addOnGroups: product.addOnGroups,
    prepTimeMin: product.prepTimeMin,
    prepTimeMax: product.prepTimeMax,
    assignedMenus: product.assignedMenus,
    basePrice: String(product.basePrice),
    displayOrder: String(product.displayOrder),
    status: product.status === 'active',
    allergens: product.allergens,
    additives: product.additives,
  })

  if (!isOpen) return null

  function update(patch: Partial<FormData>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  const isValid =
    form.name.trim() !== '' &&
    form.category !== '' &&
    form.subCategory !== '' &&
    form.dietaryType !== '' &&
    form.prepTimeMin.trim() !== '' &&
    form.prepTimeMax.trim() !== '' &&
    form.basePrice.trim() !== ''

  function handleSubmit() {
    if (!isValid) return
    onSaved()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-table-border flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <h2 className="font-bold text-neutral-900 text-base truncate">{product.name}</h2>
            <StatusToggle checked={form.status} onChange={(val) => update({ status: val })} />
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 transition-colors ml-2 flex-shrink-0">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">

          {/* Picture upload */}
          <ProfilePictureUpload
            src={form.image}
            onChange={(src) => update({ image: src })}
            onDelete={() => update({ image: null })}
          />

          {/* Product Name */}
          <Input
            label={t('form.productName')}
            placeholder={t('form.productNamePlaceholder')}
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

          {/* Category + Sub-Category */}
          <div className="grid grid-cols-2 gap-4">
            <SelectDropdown
              label={t('form.category')}
              placeholder={t('form.categoryPlaceholder')}
              options={mockCategories}
              value={form.category}
              onChange={(val) => update({ category: val })}
              required
            />
            <SelectDropdown
              label={t('form.subCategory')}
              placeholder={t('form.subCategoryPlaceholder')}
              options={mockSubCategories}
              value={form.subCategory}
              onChange={(val) => update({ subCategory: val })}
              required
            />
          </div>

          {/* Dietary Type + Add-on Groups */}
          <div className="grid grid-cols-2 gap-4">
            <SelectDropdown
              label={t('form.dietaryType')}
              placeholder={t('form.dietaryTypePlaceholder')}
              options={mockDietaryTypes}
              value={form.dietaryType}
              onChange={(val) => update({ dietaryType: val })}
              required
            />
            <MultiSelectDropdown
              label={t('form.addOnGroups')}
              placeholder={t('form.addOnGroupsPlaceholder')}
              options={mockAddOnGroups}
              value={form.addOnGroups}
              onChange={(vals) => update({ addOnGroups: vals })}
            />
          </div>

          {/* Min Prep Time + Max Prep Time */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('form.minPrepTime')}
              placeholder={t('form.prepTimePlaceholder')}
              value={form.prepTimeMin}
              onChange={(e) => update({ prepTimeMin: e.target.value })}
              required
            />
            <Input
              label={t('form.maxPrepTime')}
              placeholder={t('form.prepTimePlaceholder')}
              value={form.prepTimeMax}
              onChange={(e) => update({ prepTimeMax: e.target.value })}
              required
            />
          </div>

          {/* Assigned Menus + Base Price */}
          <div className="grid grid-cols-2 gap-4">
            <MultiSelectDropdown
              label={t('form.assignedMenus')}
              placeholder={t('form.assignedMenusPlaceholder')}
              options={mockAssignedMenus}
              value={form.assignedMenus}
              onChange={(vals) => update({ assignedMenus: vals })}
            />
            <Input
              label={t('form.basePrice')}
              placeholder={t('form.basePricePlaceholder')}
              value={form.basePrice}
              onChange={(e) => update({ basePrice: e.target.value })}
              required
            />
          </div>

          {/* Display Order */}
          <Input
            label={t('form.displayOrder')}
            placeholder={t('form.displayOrderPlaceholder')}
            type="number"
            value={form.displayOrder}
            onChange={(e) => update({ displayOrder: e.target.value })}
          />

          {/* Allergens & Additives section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-primary">{t('form.allergensTitle')}</h3>
            <AllergenAdditiveSelector
              allergens={form.allergens}
              additives={form.additives}
              onAllergenChange={(vals) => update({ allergens: vals })}
              onAdditiveChange={(vals) => update({ additives: vals })}
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
