import { Store } from 'lucide-react'

interface BranchPillsProps {
  branches: string[]
  maxVisible?: number
}

export function BranchPills({ branches, maxVisible = 2 }: BranchPillsProps) {
  const visible = branches.slice(0, maxVisible)
  const remaining = branches.length - maxVisible

  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((branch) => (
        <span
          key={branch}
          className="bg-primary text-white rounded-full px-2 py-0.5 text-[11px] font-medium inline-flex items-center gap-1"
        >
          <Store size={10} />
          {branch}
        </span>
      ))}
      {remaining > 0 && (
        <span className="bg-primary text-white rounded-full px-2 py-0.5 text-[11px] font-medium">
          +{remaining}
        </span>
      )}
    </div>
  )
}
