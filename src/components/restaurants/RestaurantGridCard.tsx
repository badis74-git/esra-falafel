'use client'

import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { Restaurant } from '@/lib/mock/restaurants'
import { useTranslations } from 'next-intl'
import { Edit, Trash2 } from 'lucide-react'

interface RestaurantGridCardProps {
  restaurant: Restaurant
  onEdit: (r: Restaurant) => void
  onDelete: (r: Restaurant) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function RestaurantGridCard({ restaurant, onEdit, onDelete, onToggleStatus }: RestaurantGridCardProps) {
  const t = useTranslations('restaurants')
  const tCommon = useTranslations('common')
  const archived = restaurant.status === 'archived'

  return (
    <div className={`bg-white rounded-[12px] shadow-card p-6 flex flex-col ${archived ? 'opacity-60' : ''}`}>
      {/* Header */}
      <div className="flex flex-col items-center relative mb-3">
        <div className="absolute top-0 right-0">
          <StatusToggle
            checked={restaurant.status === 'active'}
            onChange={(val) => onToggleStatus(restaurant.id, val)}
            disabled={archived}
          />
        </div>
        <Avatar
          name={restaurant.name}
          src={restaurant.logo}
          size="lg"
          grayscale={archived}
        />
      </div>

      {/* Info */}
      <div className="text-center mb-1">
        <p className={`font-bold text-sm ${archived ? 'text-table-archived' : 'text-neutral-900'}`}>
          {restaurant.name}
        </p>
        <p className="text-xs text-neutral-500 mt-0.5">{restaurant.email}</p>
        <p className="text-xs text-neutral-500">{restaurant.phone}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 border-t border-table-border mt-3 pt-3 text-center gap-1">
        {[
          { label: t('card.drivers'), value: restaurant.drivers },
          { label: t('card.customers'), value: restaurant.customers },
          { label: t('card.orders'), value: restaurant.orders },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center">
            <span className={`font-bold text-sm ${archived ? 'text-table-archived' : 'text-neutral-900'}`}>
              {value}
            </span>
            <span className="text-xs text-neutral-500">{label}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 border-t border-table-border mt-3 pt-3">
        <Button
          variant="secondary"
          fullWidth={false}
          size="md"
          className="flex-1 gap-1.5"
          disabled={archived}
          onClick={() => onDelete(restaurant)}
        >
          <Trash2 size={14} /> {tCommon('delete')}
        </Button>
        <Button
          variant="primary"
          fullWidth={false}
          size="md"
          className="flex-1 gap-1.5"
          disabled={archived}
          onClick={() => onEdit(restaurant)}
        >
          <Edit size={14} /> {t('card.editRestaurant')}
        </Button>
      </div>
    </div>
  )
}
