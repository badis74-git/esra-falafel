interface DietaryBadgeProps {
  type: 'vegan' | 'meat' | null
}

export function DietaryBadge({ type }: DietaryBadgeProps) {
  if (!type) return null

  if (type === 'vegan') {
    return (
      <span className="rounded-full px-2 py-0.5 text-[11px] font-medium inline-flex items-center gap-1 bg-vegan-badge-bg text-vegan-badge-text">
        🌱 Vegan
      </span>
    )
  }

  return (
    <span className="rounded-full px-2 py-0.5 text-[11px] font-medium inline-flex items-center gap-1 bg-meat-badge-bg text-meat-badge-text">
      🥩 Meat
    </span>
  )
}
