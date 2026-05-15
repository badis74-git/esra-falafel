export type RestaurantStatus = 'active' | 'inactive' | 'archived'

export interface OpeningHoursEntry {
  workingDays: string[]
  from: string
  to: string
}

export interface RestaurantManager {
  id: string
  name: string
  email: string
  avatar: string | null
}

export interface Restaurant {
  id: string
  name: string
  email: string
  phone: string
  logo: string | null
  manager: RestaurantManager | null
  drivers: number
  customers: number
  orders: number
  street: string
  number: string
  zip: string
  city: string
  activeMenu: string
  enableDelivery: boolean
  enableCashOnDelivery: boolean
  openingHours: OpeningHoursEntry[]
  website: string
  facebook: string
  instagram: string
  tiktok: string
  creationDate: string
  status: RestaurantStatus
  description?: string
}

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Esra Falafel 1',
    email: 'Contact@esrafalafel1.net',
    phone: '+41 72 542 00 20',
    logo: null,
    manager: { id: 'm1', name: 'Orlando Diggs', email: 'orlando@company.com', avatar: null },
    drivers: 4, customers: 235, orders: 270,
    street: 'Musterstrasse', number: '12', zip: '3000', city: 'Bern',
    activeMenu: 'Our Menu',
    enableDelivery: true, enableCashOnDelivery: false,
    openingHours: [
      { workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], from: '09:00', to: '23:00' },
      { workingDays: ['Saturday', 'Sunday'], from: '09:00', to: '00:00' },
    ],
    website: 'www.esrafalafel.com',
    facebook: 'https://www.facebook.com/esrafalafel',
    instagram: 'https://www.instagram.com/esrafalafel',
    tiktok: 'https://www.tiktok.com/@esrafalafel',
    creationDate: '11/02/2026', status: 'active',
  },
  {
    id: '2',
    name: 'Esra Falafel 2',
    email: 'Contact@esrafalafel2.net', phone: '+41 72 542 00 30',
    logo: null, manager: null,
    drivers: 0, customers: 0, orders: 0,
    street: '', number: '', zip: '', city: '',
    activeMenu: '', enableDelivery: false, enableCashOnDelivery: false,
    openingHours: [], website: '', facebook: '', instagram: '', tiktok: '',
    creationDate: '11/02/2026', status: 'inactive',
  },
  {
    id: '3',
    name: 'Esra Falafel 3',
    email: 'Contact@esrafalafel3.net', phone: '+41 72 311 52 21',
    logo: null,
    manager: { id: 'm6', name: 'Natali Craig', email: 'natali@company.com', avatar: null },
    drivers: 2, customers: 120, orders: 185,
    street: 'Musterstrasse', number: '12', zip: '3000', city: 'Bern',
    activeMenu: 'Our Menu', enableDelivery: true, enableCashOnDelivery: true,
    openingHours: [
      { workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], from: '09:00', to: '23:00' },
    ],
    website: 'www.esrafalafel.com', facebook: '', instagram: '', tiktok: '',
    creationDate: '10/02/2026', status: 'active',
  },
]

export const mockManagerOptions = [
  { id: 'm1', name: 'Phoenix Baker', email: 'phoenix@company.com', avatar: null },
  { id: 'm2', name: 'Olivia Rhye', email: 'olivia@company.com', avatar: null },
  { id: 'm3', name: 'Lana Steiner', email: 'lana@company.com', avatar: null },
  { id: 'm4', name: 'Demi Wilkinson', email: 'demi@company.com', avatar: null },
  { id: 'm5', name: 'Candice Wu', email: 'candice@company.com', avatar: null },
  { id: 'm6', name: 'Natali Craig', email: 'natali@company.com', avatar: null },
  { id: 'm7', name: 'Drew Cano', email: 'drew@company.com', avatar: null },
]

export const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
]

export const MENU_OPTIONS = [
  { label: 'Our Menu', value: 'Our Menu' },
  { label: 'Summer Menu', value: 'Summer Menu' },
]
