'use client'

import { Avatar } from '@/components/ui/Avatar'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { Button } from '@/components/ui/Button'
import { Edit2, Trash2 } from 'lucide-react'
import type { TeamMember } from '@/lib/mock/restaurants'

interface TeamMemberCardProps {
  member: TeamMember
  active: boolean
  onToggle: (val: boolean) => void
  onEdit: () => void
  onDelete: () => void
  editLabel?: string
  deleteLabel?: string
}

export function TeamMemberCard({ member, active, onToggle, onEdit, onDelete, editLabel = 'Edit', deleteLabel = 'Delete' }: TeamMemberCardProps) {
  return (
    <div className="flex items-start gap-3 bg-primary-light rounded-[12px] p-4">
      {/* Identity block */}
      <Avatar name={member.name} src={member.avatar ?? undefined} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-bold text-neutral-900">{member.name}</span>
          <StatusToggle checked={active} onChange={onToggle} size="sm" />
        </div>
        <p className="text-xs text-neutral-500 mt-0.5 truncate">{member.roleLine}</p>
        <p className="text-xs text-neutral-700 mt-0.5">{member.phone}</p>
      </div>

      {/* Actions — stacked on desktop, below on mobile */}
      <div className="flex flex-row md:flex-col gap-2 flex-shrink-0 md:self-start self-end">
        <Button
          variant="primary"
          fullWidth={false}
          size="md"
          onClick={onEdit}
          className="flex items-center gap-1.5 !py-1.5 !px-3 text-xs"
        >
          <Edit2 size={12} /> {editLabel}
        </Button>
        <Button
          variant="secondary"
          fullWidth={false}
          size="md"
          onClick={onDelete}
          className="flex items-center gap-1.5 !py-1.5 !px-3 text-xs"
        >
          <Trash2 size={12} /> {deleteLabel}
        </Button>
      </div>
    </div>
  )
}
