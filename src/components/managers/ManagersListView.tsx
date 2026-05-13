'use client'

import { Manager } from '@/lib/mock/managers'
import { ManagerTableRow } from './ManagerTableRow'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface ManagersListViewProps {
  managers: Manager[]
  onEdit: (m: Manager) => void
  onDelete: (m: Manager) => void
  onToggleStatus: (id: string, val: boolean) => void
}

export function ManagersListView({ managers, onEdit, onDelete, onToggleStatus }: ManagersListViewProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [allChecked, setAllChecked] = useState(false)

  function toggleAll() {
    if (allChecked) { setSelected(new Set()); setAllChecked(false) }
    else { setSelected(new Set(managers.map((m) => m.id))); setAllChecked(true) }
  }

  function toggleOne(id: string) {
    setSelected((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })
  }

  const mobileHideCols = new Set([1, 2, 3, 4])
  const columns = ['Full Name', 'Phone', 'Role', 'Restaurant Name', 'Join Date', 'Status', 'Actions']

  return (
    <div>
      <div className="overflow-x-auto rounded-[12px] border border-table-border bg-white">
        <table className="w-full min-w-0">
          <thead>
            <tr className="bg-table-header border-b border-table-border">
              <th className="py-3 pl-4 pr-2 w-10">
                <input type="checkbox" checked={allChecked} onChange={toggleAll} className="w-4 h-4 accent-primary rounded" />
              </th>
              {columns.map((col, i) => (
                <th
                  key={col}
                  className={cn(
                    'py-3 px-4 text-left text-xs font-semibold text-neutral-500 whitespace-nowrap',
                    mobileHideCols.has(i) && 'hidden md:table-cell'
                  )}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {managers.map((m) => (
              <ManagerTableRow
                key={m.id}
                manager={m}
                selected={selected.has(m.id)}
                onSelect={toggleOne}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleStatus={onToggleStatus}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-4">
        <button className="flex items-center gap-1 px-3 text-sm border border-neutral-300 rounded-lg bg-white hover:bg-neutral-100 transition-colors text-neutral-700 min-h-[44px]">
          <ChevronLeft size={14} /> Previous
        </button>
        <button className="min-w-[44px] min-h-[44px] text-sm border border-neutral-300 rounded-lg bg-white font-medium text-neutral-900 hover:bg-neutral-100 transition-colors">
          1
        </button>
        <button className="flex items-center gap-1 px-3 text-sm border border-neutral-300 rounded-lg bg-white hover:bg-neutral-100 transition-colors text-neutral-700 min-h-[44px]">
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}
