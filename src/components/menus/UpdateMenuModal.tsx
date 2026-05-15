'use client'

import { MenuWizardModal, MenuFormData } from '@/components/menus/MenuWizardModal'
import { Menu } from '@/lib/mock/menus'

interface UpdateMenuModalProps {
  isOpen: boolean
  menu: Menu | null
  onClose: () => void
  onSaved: () => void
}

export function UpdateMenuModal({ isOpen, menu, onClose, onSaved }: UpdateMenuModalProps) {
  if (!menu) return null

  const initialData: Partial<MenuFormData> = {
    image: menu.image,
    name: menu.name,
    assignedBranches: menu.assignedBranches,
    description: menu.description,
    pdfFile: null,
    selectedCategories: menu.selectedCategories,
    selectedProducts: menu.selectedProducts,
    status: menu.status === 'active',
  }

  return (
    <MenuWizardModal
      isOpen={isOpen}
      onClose={onClose}
      onCreated={onSaved}
      initialData={initialData}
      mode="update"
    />
  )
}
