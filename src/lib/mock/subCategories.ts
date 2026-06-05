export type SubCategoryStatus = 'active' | 'inactive' | 'archived'

export interface SubCategory {
  id: string
  name: string
  parentCategory: string
  products: number
  subCategories: number
  addOnGroups: number
  creationDate: string
  status: SubCategoryStatus
  description: string
}

export const mockSubCategories: SubCategory[] = [
  { id: 'sc1', name: 'Bread (Laffa)', parentCategory: 'Sandwiches', products: 22, subCategories: 2, addOnGroups: 2, creationDate: '11/02/2026', status: 'active', description: '' },
  { id: 'sc2', name: 'Baguettes', parentCategory: 'Sandwiches', products: 15, subCategories: 3, addOnGroups: 2, creationDate: '11/02/2026', status: 'active', description: '' },
  { id: 'sc3', name: 'Regular Plates', parentCategory: 'Plates', products: 20, subCategories: 3, addOnGroups: 0, creationDate: '10/02/2026', status: 'active', description: '' },
  { id: 'sc4', name: 'Special Plates', parentCategory: 'Plates', products: 3, subCategories: 0, addOnGroups: 0, creationDate: '10/02/2026', status: 'active', description: '' },
  { id: 'sc5', name: 'Bread Combos', parentCategory: 'Combos', products: 50, subCategories: 3, addOnGroups: 0, creationDate: '11/02/2026', status: 'active', description: '' },
  { id: 'sc6', name: 'Baguettes Combos', parentCategory: 'Combos', products: 4, subCategories: 0, addOnGroups: 4, creationDate: '10/02/2026', status: 'active', description: '' },
  { id: 'sc7', name: 'Plates Combos', parentCategory: 'Combos', products: 4, subCategories: 0, addOnGroups: 4, creationDate: '10/02/2026', status: 'active', description: '' },
  { id: 'sc8', name: 'Hot Drinks', parentCategory: 'Drinks', products: 4, subCategories: 0, addOnGroups: 4, creationDate: '10/02/2026', status: 'active', description: '' },
  { id: 'sc9', name: 'Cold Drinks', parentCategory: 'Drinks', products: 4, subCategories: 0, addOnGroups: 4, creationDate: '10/02/2026', status: 'active', description: '' },
  { id: 'sc10', name: 'Coffee To Go', parentCategory: 'Drinks', products: 4, subCategories: 0, addOnGroups: 4, creationDate: '10/02/2026', status: 'active', description: '' },
]

export const parentCategoryOptions = [
  { label: 'Sandwiches', value: 'Sandwiches' },
  { label: 'Plates', value: 'Plates' },
  { label: 'Combos', value: 'Combos' },
  { label: 'Starters', value: 'Starters' },
  { label: 'Drinks', value: 'Drinks' },
  { label: "Menu's Deals", value: "Menu's Deals" },
]
