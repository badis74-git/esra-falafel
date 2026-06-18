'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { SearchInput } from '@/components/ui/SearchInput'
import { ViewToggle } from '@/components/ui/ViewToggle'
import { TeamMemberCard } from '@/components/ui/TeamMemberCard'
import { Button } from '@/components/ui/Button'
import type { TeamMember } from '@/lib/mock/restaurants'

interface Props {
  manager?: TeamMember
  drivers: TeamMember[]
  onSave: () => void
  onCancel: () => void
}

export function TeamSection({ manager, drivers, onSave, onCancel }: Props) {
  const t = useTranslations('restaurants')
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [memberStates, setMemberStates] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    if (manager) init[manager.id] = manager.active
    drivers.forEach((d) => { init[d.id] = d.active })
    return init
  })

  function toggleMember(id: string, val: boolean) {
    setMemberStates((prev) => ({ ...prev, [id]: val }))
  }

  const q = search.toLowerCase()
  const filteredManager = manager && manager.name.toLowerCase().includes(q) ? manager : undefined
  const filteredDrivers = drivers.filter((d) => d.name.toLowerCase().includes(q))

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-5 space-y-5">
        <h3 className="text-sm font-semibold text-primary">{t('team.title')}</h3>

        {/* Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <ViewToggle view={view} onChange={setView} />
          <SearchInput
            placeholder=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-44"
          />
        </div>

        {/* Manager sub-group */}
        {filteredManager && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-primary">{t('team.manager')}</h4>
            <TeamMemberCard
              member={filteredManager}
              active={memberStates[filteredManager.id] ?? filteredManager.active}
              onToggle={(val) => toggleMember(filteredManager.id, val)}
              onEdit={() => {}}
              onDelete={() => {}}
              editLabel={t('team.edit')}
              deleteLabel={t('team.delete')}
            />
          </div>
        )}

        {/* Drivers sub-group */}
        {filteredDrivers.length > 0 && (
          <div className="space-y-3">
            {filteredManager && <hr className="border-table-border" />}
            <h4 className="text-sm font-semibold text-primary">{t('team.drivers')}</h4>
            <div className={view === 'grid' ? 'space-y-3' : 'space-y-2'}>
              {filteredDrivers.map((driver) => (
                <TeamMemberCard
                  key={driver.id}
                  member={driver}
                  active={memberStates[driver.id] ?? driver.active}
                  onToggle={(val) => toggleMember(driver.id, val)}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  editLabel={t('team.edit')}
                  deleteLabel={t('team.delete')}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 flex items-center gap-3 border-t border-table-border px-5 py-4 flex-shrink-0">
        <Button variant="secondary" fullWidth={false} size="md" onClick={onCancel} className="flex-1 md:flex-none">{t('edit.cancel')}</Button>
        <Button variant="primary" fullWidth={false} size="md" onClick={onSave} className="flex-1 md:flex-none">{t('edit.save')}</Button>
      </div>
    </div>
  )
}
