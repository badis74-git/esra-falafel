'use client'

import { Checkbox } from '@/components/ui/Checkbox'
import { DietaryBadge } from '@/components/ui/DietaryBadge'
import { Product } from '@/lib/mock/menus'
import { UtensilsCrossed } from 'lucide-react'

interface ProductSelectionRowProps {
  product: Product
  selected: boolean
  onToggle: () => void
  view: 'grid' | 'list'
  readOnly?: boolean
}

function FoodImage({ src, name, size }: { src: string | null; name: string; size: number }) {
  return (
    <div
      className="rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0 overflow-hidden"
      style={{ width: size, height: size }}
    >
      {src
        ? <img src={src} alt={name} className="w-full h-full object-cover" />
        : <UtensilsCrossed size={size * 0.4} className="text-neutral-400" />
      }
    </div>
  )
}

export function ProductSelectionRow({
  product,
  selected,
  onToggle,
  view,
  readOnly = false,
}: ProductSelectionRowProps) {
  const checkboxEl = readOnly ? (
    <div className="pointer-events-none">
      <Checkbox id={`prod-${product.id}`} checked={selected} onChange={() => {}} />
    </div>
  ) : (
    <Checkbox id={`prod-${product.id}`} checked={selected} onChange={onToggle} />
  )

  if (view === 'grid') {
    return (
      <div className="flex items-center py-3 px-2 border-b border-neutral-200 last:border-b-0 gap-3">
        {checkboxEl}
        <FoodImage src={product.image} name={product.name} size={56} />
        <div className="flex-1 min-w-0">
          <DietaryBadge type={product.dietaryType} />
          <p className="text-xs text-neutral-500 mt-0.5">{product.category}</p>
          <p className="font-semibold text-sm text-neutral-900 truncate">{product.name}</p>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="font-semibold text-sm text-primary">{product.price.toFixed(2)} €</p>
          <p className="text-xs text-neutral-500">{product.prepTime}</p>
        </div>
      </div>
    )
  }

  return (
    <tr className="border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50">
      <td className="py-2.5 px-3 w-8">
        {checkboxEl}
      </td>
      <td className="py-2.5 px-3">
        <div className="flex items-center gap-2">
          <FoodImage src={product.image} name={product.name} size={32} />
          <span className="text-sm font-medium text-neutral-900 truncate max-w-[160px]">{product.name}</span>
        </div>
      </td>
      <td className="py-2.5 px-3 text-sm text-neutral-600">{product.category}</td>
      <td className="py-2.5 px-3">
        <DietaryBadge type={product.dietaryType} />
      </td>
      <td className="py-2.5 px-3 text-sm text-neutral-900 font-medium">{product.price.toFixed(2)} €</td>
      <td className="py-2.5 px-3 text-sm text-neutral-500">{product.discount}%</td>
    </tr>
  )
}
