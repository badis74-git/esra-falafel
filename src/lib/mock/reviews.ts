// Shared review fixture — used by both Drivers and Restaurants sections
// (5 + 5 + 4 + 4) / 4 = 4.5

export interface SharedReview {
  id: string
  reviewer: string
  avatar: string
  rating: number
  comment: string
  time: string
}

export const mockReviews: SharedReview[] = [
  {
    id: 'rv1',
    reviewer: 'Daniel Hoffmann',
    avatar: '',
    rating: 5,
    comment: 'Fresh ingredients and very generous portion size.',
    time: 'Today, 16:40',
  },
  {
    id: 'rv2',
    reviewer: 'Victoria Champan',
    avatar: '',
    rating: 5,
    comment: 'Loved the mix of falafel and halloumi. Fresh salad and excellent hummus.',
    time: 'Today, 08:12',
  },
  {
    id: 'rv3',
    reviewer: 'Laura Smith',
    avatar: '',
    rating: 4,
    comment: 'Loved the halloumi and sauces. Delivery was fast.',
    time: 'Yesterday, 16:40',
  },
  {
    id: 'rv4',
    reviewer: 'Maximilian W.',
    avatar: '',
    rating: 4,
    comment: 'Perfect choice for vegetarians. Fresh salad, warm bread, and delicious halloumi.',
    time: '10/10/2026',
  },
]

export const avgRating = 4.5
