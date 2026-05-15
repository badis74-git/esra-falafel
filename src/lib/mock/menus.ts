export type MenuStatus = 'active' | 'inactive' | 'archived'

export interface Menu {
  id: string
  name: string
  image: string | null
  branches: string[]
  products: number
  categories: number
  lastUpdated: string
  creationDate: string
  status: MenuStatus
  description: string
  assignedBranches: string[]
  selectedCategories: string[]
  selectedProducts: string[]
}

export interface Category {
  id: string
  name: string
  image: string | null
  products: number
  subCategories: string[]
}

export interface Product {
  id: string
  name: string
  image: string | null
  category: string
  dietaryType: 'vegan' | 'meat' | null
  price: number
  prepTime: string
  discount: number
}

export const mockMenus: Menu[] = [
  {
    id: '1',
    name: 'Vegan Falafel Menu',
    image: null,
    branches: ['Esraa Falafel 1', 'Esraa Falafel 2'],
    products: 37,
    categories: 8,
    lastUpdated: '06/05/2026',
    creationDate: '11/02/2026',
    status: 'active',
    description: '',
    assignedBranches: ['Esraa Falafel 1', 'Esraa Falafel 2'],
    selectedCategories: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'],
    selectedProducts: ['p1', 'p2', 'p5', 'p6'],
  },
  {
    id: '2',
    name: 'Our Menu',
    image: null,
    branches: ['Esraa Falafel 3'],
    products: 25,
    categories: 7,
    lastUpdated: '03/01/2026',
    creationDate: '11/02/2026',
    status: 'active',
    description: '',
    assignedBranches: ['Esraa Falafel 3'],
    selectedCategories: [],
    selectedProducts: [],
  },
  {
    id: '3',
    name: 'Ramadan Special Menu',
    image: null,
    branches: ['Esraa Falafel 1', 'Esraa Falafel 2', 'Esraa Falafel 3'],
    products: 15,
    categories: 5,
    lastUpdated: '25/03/2026',
    creationDate: '10/02/2026',
    status: 'inactive',
    description: '',
    assignedBranches: ['Esraa Falafel 1', 'Esraa Falafel 2', 'Esraa Falafel 3'],
    selectedCategories: [],
    selectedProducts: [],
  },
]

export const mockCategories: Category[] = [
  { id: 'c1', name: 'Sandwiches', image: null, products: 22, subCategories: ['Bread(Laffa)', 'Baguettes'] },
  { id: 'c2', name: 'Plates', image: null, products: 15, subCategories: ['Regular', 'Special'] },
  { id: 'c3', name: 'Combos', image: null, products: 20, subCategories: ['Bread Combos', 'Baguette Combos', 'Plates Combos'] },
  { id: 'c4', name: 'Drinks', image: null, products: 50, subCategories: ['Hot Drinks', 'Cold Drinks', 'Coffe To Go'] },
  { id: 'c5', name: 'Starters', image: null, products: 3, subCategories: [] },
  { id: 'c6', name: "Menu's Deals", image: null, products: 4, subCategories: [] },
]

export const mockProducts: Product[] = [
  { id: 'p1', name: 'Falafel Veggies in Bread (Laffa)', image: null, category: 'Bread', dietaryType: 'vegan', price: 6.00, prepTime: '10 - 15 min', discount: 0 },
  { id: 'p2', name: 'Falafel Plate Veggies', image: null, category: 'Plates', dietaryType: 'vegan', price: 11.80, prepTime: '20 - 25 min', discount: 0 },
  { id: 'p3', name: 'Hummus', image: null, category: 'Starters', dietaryType: 'vegan', price: 3.50, prepTime: '10 - 15 min', discount: 0 },
  { id: 'p4', name: 'Falafel Makali Plate', image: null, category: 'Combos', dietaryType: 'vegan', price: 12.00, prepTime: '20 - 25 min', discount: 0 },
  { id: 'p5', name: 'Baba Ganoush', image: null, category: 'Starters', dietaryType: 'vegan', price: 3.50, prepTime: '10 - 15 min', discount: 0 },
  { id: 'p6', name: 'Grilled Merguez Plate', image: null, category: 'Plates', dietaryType: 'meat', price: 13.00, prepTime: '20 - 25 min', discount: 0 },
  { id: 'p7', name: 'Halloumi Plate Veggies', image: null, category: 'Plate', dietaryType: 'vegan', price: 11.00, prepTime: '20 - 25 min', discount: 0 },
  { id: 'p8', name: 'Sprite Drink', image: null, category: 'Drinks > Cold Drinks', dietaryType: null, price: 2.00, prepTime: '5 min', discount: 0 },
  { id: 'p9', name: 'Coca Cola Drink', image: null, category: 'Drinks > Cold Drinks', dietaryType: null, price: 2.00, prepTime: '5 min', discount: 0 },
  { id: 'p10', name: 'Althaus Tea', image: null, category: 'Drinks > Hot Drinks', dietaryType: null, price: 1.50, prepTime: '5 min', discount: 0 },
  { id: 'p11', name: 'Tabboulah Salade', image: null, category: 'Starters', dietaryType: 'vegan', price: 3.50, prepTime: '10 - 15 min', discount: 0 },
]
