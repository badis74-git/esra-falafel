'use client'

interface RatingBarChartProps {
  distribution: { 5: number; 4: number; 3: number; 2: number; 1: number }
}

export function RatingBarChart({ distribution }: RatingBarChartProps) {
  const maxVal = Math.max(...Object.values(distribution), 1)
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {([5, 4, 3, 2, 1] as const).map((star) => {
        const count = distribution[star]
        const pct = (count / maxVal) * 100
        return (
          <div key={star} className="flex items-center gap-2">
            <span className="text-xs text-neutral-700 w-3 text-right flex-shrink-0">{star}</span>
            <div className="flex-1 h-2 rounded-full bg-star-empty overflow-hidden">
              <div
                className="h-full rounded-full bg-star-filled transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs text-neutral-500 w-4 text-left flex-shrink-0">{count}</span>
          </div>
        )
      })}
    </div>
  )
}
