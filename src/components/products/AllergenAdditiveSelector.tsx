'use client'

import { Checkbox } from '@/components/ui/Checkbox'
import { useTranslations } from 'next-intl'
import { mockAllergens, mockAdditives } from '@/lib/mock/products'

interface AllergenAdditiveSelectorProps {
  allergens: string[]
  additives: string[]
  onAllergenChange: (values: string[]) => void
  onAdditiveChange: (values: string[]) => void
}

export function AllergenAdditiveSelector({
  allergens,
  additives,
  onAllergenChange,
  onAdditiveChange,
}: AllergenAdditiveSelectorProps) {
  const t = useTranslations('products.form')

  const isAllAllergens = mockAllergens.every((a) => allergens.includes(a))
  const isAllAdditives = mockAdditives.every((d) => additives.includes(d))

  function toggleAllAllergens() {
    onAllergenChange(isAllAllergens ? [] : [...mockAllergens])
  }

  function toggleAllergen(code: string) {
    onAllergenChange(
      allergens.includes(code)
        ? allergens.filter((a) => a !== code)
        : [...allergens, code]
    )
  }

  function toggleAllAdditives() {
    onAdditiveChange(isAllAdditives ? [] : [...mockAdditives])
  }

  function toggleAdditive(code: string) {
    onAdditiveChange(
      additives.includes(code)
        ? additives.filter((d) => d !== code)
        : [...additives, code]
    )
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Allergens column */}
      <div>
        <p className="text-sm font-semibold text-neutral-900 mb-3">{t('allergensLabel')}</p>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer pb-2 border-b border-neutral-100">
            <div
              className="relative flex items-center justify-center cursor-pointer"
              onClick={toggleAllAllergens}
            >
              <input type="checkbox" className="sr-only" readOnly checked={isAllAllergens} />
              <div className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${isAllAllergens ? 'bg-primary border-primary' : 'bg-white border-neutral-300'}`}>
                {isAllAllergens && (
                  <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 text-white" fill="none">
                    <polyline points="1.5,5 4,7.5 8.5,2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm font-medium text-neutral-700">{t('selectAll')}</span>
          </label>
          {mockAllergens.map((code) => (
            <Checkbox
              key={code}
              id={`allergen-${code}`}
              checked={allergens.includes(code)}
              onChange={() => toggleAllergen(code)}
              label={t(`allergenLabels.${code}` as Parameters<typeof t>[0])}
            />
          ))}
        </div>
      </div>

      {/* Additives column */}
      <div>
        <p className="text-sm font-semibold text-neutral-900 mb-3">{t('additivesLabel')}</p>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer pb-2 border-b border-neutral-100">
            <div
              className="relative flex items-center justify-center cursor-pointer"
              onClick={toggleAllAdditives}
            >
              <input type="checkbox" className="sr-only" readOnly checked={isAllAdditives} />
              <div className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${isAllAdditives ? 'bg-primary border-primary' : 'bg-white border-neutral-300'}`}>
                {isAllAdditives && (
                  <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 text-white" fill="none">
                    <polyline points="1.5,5 4,7.5 8.5,2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm font-medium text-neutral-700">{t('selectAll')}</span>
          </label>
          {mockAdditives.map((code) => (
            <Checkbox
              key={code}
              id={`additive-${code}`}
              checked={additives.includes(code)}
              onChange={() => toggleAdditive(code)}
              label={t(`additiveLabels.${code}` as Parameters<typeof t>[0])}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
