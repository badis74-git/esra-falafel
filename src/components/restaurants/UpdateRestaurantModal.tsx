'use client'

import { WizardModal, RestaurantFormData } from '@/components/restaurants/RestaurantWizardModal'
import { Restaurant } from '@/lib/mock/restaurants'
import { useTranslations } from 'next-intl'

interface UpdateRestaurantModalProps {
  isOpen: boolean
  restaurant: Restaurant
  onClose: () => void
  onSaved: () => void
}

function restaurantToFormData(r: Restaurant): Partial<RestaurantFormData> {
  return {
    logo: r.logo,
    name: r.name,
    email: r.email,
    phone: r.phone,
    managerId: r.manager?.id ?? '',
    description: r.description ?? '',
    street: r.street,
    houseNumber: r.number,
    zip: r.zip,
    city: r.city,
    activeMenu: r.activeMenu,
    enableDelivery: r.enableDelivery,
    enableCashOnDelivery: r.enableCashOnDelivery,
    openingHours: r.openingHours.length > 0
      ? r.openingHours
      : [{ workingDays: [], from: '', to: '' }],
    website: r.website,
    facebook: r.facebook,
    instagram: r.instagram,
    tiktok: r.tiktok,
    status: r.status === 'active',
  }
}

export function UpdateRestaurantModal({
  isOpen,
  restaurant,
  onClose,
  onSaved,
}: UpdateRestaurantModalProps) {
  const t = useTranslations('restaurants')
  return (
    <WizardModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSaved}
      submitLabel={t('wizard.submitUpdate')}
      headerTitle={restaurant.name}
      initialData={restaurantToFormData(restaurant)}
    />
  )
}
