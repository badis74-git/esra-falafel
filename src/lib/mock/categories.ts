export type CategoryStatus = 'active' | 'inactive' | 'archived'

export interface Category {
  id: string
  name: string
  image: string | null
  products: number
  subCategories: number
  addOnGroups: number
  description: string
  creationDate: string
  status: CategoryStatus
}

export const mockCategories: Category[] = [
  {
    id: 'c1',
    name: 'Sandwiches',
    image: null,
    products: 22,
    subCategories: 2,
    addOnGroups: 2,
    description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    creationDate: '11/02/2026',
    status: 'active',
  },
  {
    id: 'c2',
    name: 'Plates',
    image: null,
    products: 15,
    subCategories: 3,
    addOnGroups: 2,
    description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    creationDate: '10/02/2026',
    status: 'active',
  },
  {
    id: 'c3',
    name: 'Combos',
    image: null,
    products: 20,
    subCategories: 3,
    addOnGroups: 0,
    description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    creationDate: '11/02/2026',
    status: 'active',
  },
  {
    id: 'c4',
    name: 'Starters',
    image: null,
    products: 3,
    subCategories: 0,
    addOnGroups: 0,
    description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    creationDate: '10/02/2026',
    status: 'active',
  },
  {
    id: 'c5',
    name: 'Drinks',
    image: null,
    products: 50,
    subCategories: 3,
    addOnGroups: 0,
    description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    creationDate: '11/02/2026',
    status: 'active',
  },
  {
    id: 'c6',
    name: "Menu's Deals",
    image: null,
    products: 4,
    subCategories: 0,
    addOnGroups: 4,
    description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    creationDate: '10/02/2026',
    status: 'active',
  },
]
