'use client'

import { MultiSelectDropdown } from '@/components/ui/MultiSelectDropdown'
import { TimeInput } from '@/components/ui/TimeInput'
import { DAYS_OF_WEEK, OpeningHoursEntry } from '@/lib/mock/restaurants'
import { Trash2 } from 'lucide-react'

const DAY_OPTIONS = DAYS_OF_WEEK.map((d) => ({ label: d, value: d }))

interface OpeningHoursRowProps {
  row: OpeningHoursEntry
  onChange: (row: OpeningHoursEntry) => void
  onDelete: () => void
  isOnly: boolean
}

export function OpeningHoursRow({ row, onChange, onDelete, isOnly }: OpeningHoursRowProps) {
  return (
    <div className="flex items-end gap-3">
      <div className="flex-1 min-w-0">
        <MultiSelectDropdown
          options={DAY_OPTIONS}
          value={row.workingDays}
          onChange={(workingDays) => onChange({ ...row, workingDays })}
          placeholder="Select working days"
          label="Working Days"
        />
      </div>
      <div className="w-28 flex-shrink-0">
        <TimeInput
          label="From"
          value={row.from}
          onChange={(from) => onChange({ ...row, from })}
        />
      </div>
      <div className="w-28 flex-shrink-0">
        <TimeInput
          label="To"
          value={row.to}
          onChange={(to) => onChange({ ...row, to })}
        />
      </div>
      {!isOnly && (
        <button
          type="button"
          onClick={onDelete}
          className="mb-0.5 flex-shrink-0 p-2 text-danger hover:bg-danger-light rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  )
}
