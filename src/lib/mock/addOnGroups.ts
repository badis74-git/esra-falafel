export type AddOnGroupStatus = 'active' | 'inactive' | 'archived'

export interface AddOnGroup {
  id: string
  name: string
  selectionType: 'single' | 'multiple'
  minSelection: number
  maxSelection: number
  required: boolean
  addOns: number
  products: number
  description: string
  status: AddOnGroupStatus
}

export const mockAddOnGroups: AddOnGroup[] = [
  {
    id: '1',
    name: 'Sauces',
    selectionType: 'multiple',
    minSelection: 0,
    maxSelection: 3,
    required: false,
    addOns: 5,
    products: 22,
    description: 'A variety of sauces to accompany your meal.',
    status: 'active',
  },
  {
    id: '2',
    name: 'Extra Toppings',
    selectionType: 'multiple',
    minSelection: 0,
    maxSelection: 2,
    required: true,
    addOns: 2,
    products: 15,
    description: 'Extra toppings to customize your order.',
    status: 'active',
  },
  {
    id: '3',
    name: 'Bread Choice',
    selectionType: 'single',
    minSelection: 1,
    maxSelection: 1,
    required: true,
    addOns: 2,
    products: 20,
    description: 'Choose your preferred bread type.',
    status: 'active',
  },
  {
    id: '4',
    name: 'Cheese Options',
    selectionType: 'single',
    minSelection: 0,
    maxSelection: 1,
    required: false,
    addOns: 4,
    products: 3,
    description: 'Optional cheese add-on for your meal.',
    status: 'active',
  },
  {
    id: '5',
    name: 'Spicy Level',
    selectionType: 'single',
    minSelection: 1,
    maxSelection: 1,
    required: true,
    addOns: 3,
    products: 50,
    description: 'Select your preferred spice level.',
    status: 'active',
  },
  {
    id: '6',
    name: 'Side Choices',
    selectionType: 'single',
    minSelection: 0,
    maxSelection: 1,
    required: false,
    addOns: 3,
    products: 4,
    description: 'Optional side dish to go with your order.',
    status: 'active',
  },
  {
    id: '7',
    name: 'Drink Upgrade',
    selectionType: 'single',
    minSelection: 0,
    maxSelection: 1,
    required: false,
    addOns: 2,
    products: 4,
    description: 'Upgrade your drink with this add-on group.',
    status: 'active',
  },
]
