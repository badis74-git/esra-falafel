'use client'

import { Star } from 'lucide-react'

interface RatingStarsProps {
  value: number
  size?: number
}

export function RatingStars({ value, size = 16 }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = value >= i
        const half = !filled && value >= i - 0.5
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="text-star-empty" fill="currentColor" />
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? '100%' : '50%' }}
              >
                <Star size={size} className="text-star-filled" fill="currentColor" />
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}
