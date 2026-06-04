'use client'

import { Button } from '@/components/ui/Button'
import { MapPreview } from '@/components/ui/MapPreview'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { Zone } from '@/lib/mock/zones'
import { useTranslations } from 'next-intl'
import { Edit, Trash2 } from 'lucide-react'

interface ZoneGridCardProps {
  zone: Zone
  onEdit: (zone: Zone) => void
  onDelete: (zone: Zone) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function ZoneGridCard({ zone, onEdit, onDelete, onToggleStatus }: ZoneGridCardProps) {
  const t = useTranslations('zones')
  const tCommon = useTranslations('common')
  const archived = zone.status === 'archived'

  return (
    <div className={`bg-white rounded-[12px] shadow-card p-4 flex flex-col gap-3 ${archived ? 'opacity-60' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-sm text-neutral-900">{zone.name}</span>
        <StatusToggle
          checked={zone.status === 'active'}
          onChange={(val) => onToggleStatus(zone.id, val)}
          disabled={archived}
          size="md"
        />
      </div>

      {/* Map */}
      <MapPreview />

      {/* Stats */}
      <div className="grid grid-cols-4 border-t border-table-border pt-3 text-center gap-1">
        {[
          { label: t('card.restaurants'), value: zone.restaurants },
          { label: t('card.drivers'), value: zone.drivers },
          { label: t('card.customers'), value: zone.customers },
          { label: t('card.orders'), value: zone.orders },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center">
            <span className={`font-bold text-sm ${archived ? 'text-table-archived' : 'text-neutral-900'}`}>
              {value}
            </span>
            <span className="text-xs text-neutral-500 leading-tight">{label}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 border-t border-table-border pt-3">
        <Button
          variant="secondary"
          fullWidth={false}
          size="md"
          className="flex-1 gap-1.5"
          disabled={archived}
          onClick={() => onDelete(zone)}
        >
          <Trash2 size={14} /> {tCommon('delete')}
        </Button>
        <Button
          variant="primary"
          fullWidth={false}
          size="md"
          className="flex-1 gap-1.5"
          disabled={archived}
          onClick={() => onEdit(zone)}
        >
          <Edit size={14} /> {t('card.editZone')}
        </Button>
      </div>
    </div>
  )
}
