'use client'

import { DietaryBadge } from '@/components/ui/DietaryBadge'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { Edit2, Trash2, UtensilsCrossed } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Product } from '@/lib/mock/products'

interface ProductGridCardProps {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function ProductGridCard({ product, onEdit, onDelete, onToggleStatus }: ProductGridCardProps) {
  const t = useTranslations('products')
  const archived = product.status === 'archived'

  return (
    <div className={cn('bg-white rounded-[12px] shadow-card overflow-hidden flex flex-col', archived && 'opacity-60')}>
      {/* Image area */}
      <div className="relative h-48 bg-neutral-100 flex-shrink-0">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <UtensilsCrossed size={40} className="text-neutral-300" />
          </div>
        )}
        {product.dietaryType && (
          <div className="absolute top-2 left-2">
            <DietaryBadge type={product.dietaryType} />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <StatusToggle
            checked={product.status === 'active'}
            onChange={(val) => !archived && onToggleStatus(product.id, val)}
            disabled={archived}
            size="sm"
          />
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1">
        <p className="text-xs text-neutral-500 mb-0.5">{product.category}</p>
        <div className="flex items-start justify-between gap-2">
          <p className="font-bold text-sm text-neutral-900 leading-snug flex-1">{product.name}</p>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-bold text-primary">{product.basePrice.toFixed(2)} €</p>
            <p className="text-xs text-neutral-500">
              {product.prepTimeMin === product.prepTimeMax
                ? product.prepTimeMin
                : `${product.prepTimeMin} - ${product.prepTimeMax}`}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-table-border px-4 pt-3 pb-4 flex items-stretch gap-2">
        <Button
          variant="secondary"
          size="md"
          fullWidth={false}
          disabled={archived}
          onClick={() => !archived && onDelete(product)}
          className="flex-1"
        >
          <Trash2 size={14} /> {t('card.delete')}
        </Button>
        <Button
          variant="primary"
          size="md"
          fullWidth={false}
          disabled={archived}
          onClick={() => !archived && onEdit(product)}
          className="flex-1"
        >
          <Edit2 size={14} /> {t('card.editProduct')}
        </Button>
      </div>
    </div>
  )
}
