'use client'

import { useTranslations } from 'next-intl'
import { Avatar } from '@/components/ui/Avatar'
import { RatingStars } from '@/components/ui/RatingStars'
import { RatingBarChart } from '@/components/ui/RatingBarChart'
import { Button } from '@/components/ui/Button'
import type { Review } from '@/lib/mock/drivers'

interface Props {
  rating: number
  reviews: Review[]
  onSave: () => void
  onCancel: () => void
}

export function ReviewsSection({ rating, reviews, onSave, onCancel }: Props) {
  const t = useTranslations('drivers')

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.forEach((r) => {
    const star = Math.round(r.rating) as 1 | 2 | 3 | 4 | 5
    if (star >= 1 && star <= 5) distribution[star]++
  })

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-5 p-5">
        <h3 className="text-sm font-semibold text-primary">{t('edit.nav.reviews')}</h3>

        {/* Summary row */}
        <div className="flex items-start gap-6">
          <div className="flex flex-col items-center">
            <span className="text-[40px] font-bold text-neutral-900 leading-none">{rating.toFixed(1)}</span>
            <div className="mt-1.5">
              <RatingStars value={rating} size={16} />
            </div>
            <span className="text-xs text-neutral-500 mt-1">{t('reviews.count', { count: reviews.length })}</span>
          </div>
          <div className="flex-1">
            <RatingBarChart distribution={distribution} />
          </div>
        </div>

        {/* Review list */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="flex gap-3">
              <Avatar name={review.reviewer} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-neutral-900">{review.reviewer}</span>
                  <span className="text-xs text-neutral-500 flex-shrink-0">{review.time}</span>
                </div>
                <div className="mt-0.5 mb-1">
                  <RatingStars value={review.rating} size={12} />
                </div>
                <p className="text-[13px] text-neutral-700 italic">"{review.comment}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-10 flex items-center gap-3 border-t border-table-border px-5 py-4 flex-shrink-0">
        <Button variant="secondary" fullWidth={false} size="md" onClick={onCancel} className="flex-1 md:flex-none">{t('edit.cancel')}</Button>
        <Button variant="primary" fullWidth={false} size="md" onClick={onSave} className="flex-1 md:flex-none">{t('edit.save')}</Button>
      </div>
    </div>
  )
}
