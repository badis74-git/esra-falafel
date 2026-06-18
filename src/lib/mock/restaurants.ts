import { mockReviews, avgRating, type SharedReview } from './reviews'

export type RestaurantStatus = 'active' | 'inactive' | 'archived'

// Re-export for section components
export type RestaurantReview = SharedReview

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

export interface TeamMember {
  id: string
  name: string
  avatar: string | null
  roleLine: string
  phone: string
  active: boolean
}

export interface RestaurantOrder {
  id: string
  status: 'new' | 'preparing' | 'ready' | 'ontheway' | 'pickedup' | 'delivered' | 'cancelled'
  driverName?: string
  time: string
  customer: string
  address: string
  payment: 'cash' | 'card'
  amount: number
  items: number
  distanceKm: number
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
  // Edit modal extended fields
  rating?: number
  reviews?: SharedReview[]
  recentOrders?: RestaurantOrder[]
  teamManager?: TeamMember
  teamDrivers?: TeamMember[]
  support?: { phone: string; whatsapp?: string; website?: string; email: string }
  menuPreview?: { name: string; cover?: string; lastUpdated: string; products: number; categories: number }
}

// Shared seed orders — used for seeded restaurants
const seedOrders: RestaurantOrder[] = [
  { id: 'ro1', status: 'new',       driverName: undefined,     time: '12:30 PM', customer: 'Emma Schneider', address: 'Reichenberger Straße 42, 10999 Berlin', payment: 'cash', amount: 32.00, items: 3, distanceKm: 4.5 },
  { id: 'ro2', status: 'preparing', driverName: 'Luca Muller', time: '14:10 PM', customer: 'Emma Schneider', address: 'Reichenberger Straße 42, 10999 Berlin', payment: 'card', amount: 22.50, items: 2, distanceKm: 4.2 },
  { id: 'ro3', status: 'ontheway',  driverName: 'Luca Muller', time: '14:10 PM', customer: 'Laura Fischer',  address: 'Schönhauser Allee 73, 10437 Berlin',    payment: 'card', amount: 22.50, items: 2, distanceKm: 4.2 },
  { id: 'ro4', status: 'ready',     driverName: 'Luca Muller', time: '14:10 PM', customer: 'Emma Schneider', address: 'Reichenberger Straße 42, 10999 Berlin', payment: 'card', amount: 22.50, items: 2, distanceKm: 4.2 },
  { id: 'ro5', status: 'cancelled', driverName: 'Luca Muller', time: '14:10 PM', customer: 'Emma Schneider', address: 'Reichenberger Straße 42, 10999 Berlin', payment: 'card', amount: 22.50, items: 2, distanceKm: 4.2 },
]

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Esra Falafel 1',
    email: 'Contact@esrafalafel1.net',
    phone: '+49 52 043 32 53',
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
    description: 'Authentic falafel and Middle Eastern cuisine in the heart of Berlin.',
    rating: avgRating,
    reviews: mockReviews,
    recentOrders: seedOrders,
    teamManager: { id: 'tm-mgr1', name: 'Orlando Diggs', avatar: null, roleLine: 'Restaurant Manager : Esra Falafel 1', phone: '+49 72 542 00 20', active: true },
    teamDrivers: [
      { id: 'td-d1', name: 'Drew Cano',   avatar: null, roleLine: 'Delivery Driver : Zone A, Zone B', phone: '+49 72 235 00 20', active: true },
      { id: 'td-d2', name: 'Luca Muller', avatar: null, roleLine: 'Delivery Driver : Zone A, Zone B', phone: '+49 72 278 11 34', active: true },
    ],
    support: { phone: '+49 72 542 00 20', whatsapp: '+49 72 542 00 20', website: 'www.esrafalafel.com', email: 'contact@esrafalafel.com' },
    menuPreview: { name: 'Our Menu', cover: undefined, lastUpdated: '03/01/2026', products: 25, categories: 7 },
  },
  {
    // Intentionally minimal — demonstrates empty state
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
    email: 'esrafalafel3@domain.com', phone: '+49 52 043 32 53',
    logo: null,
    manager: { id: 'm6', name: 'Orlando Diggs', email: 'orlando@company.com', avatar: null },
    drivers: 2, customers: 120, orders: 185,
    street: 'Musterstrasse', number: '12', zip: '3000', city: 'Bern',
    activeMenu: 'Our Menu', enableDelivery: true, enableCashOnDelivery: true,
    openingHours: [
      { workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], from: '09:00', to: '23:00' },
      { workingDays: ['Saturday', 'Sunday'], from: '09:00', to: '00:00' },
    ],
    website: 'www.esrafalafel.com',
    facebook: 'https://www.facebook.com/esrafalafel',
    instagram: 'https://www.instagram.com/esrafalafel',
    tiktok: 'https://www.tiktok.com/@esrafalafel',
    creationDate: '10/02/2026', status: 'active',
    description: 'Authentic falafel and Middle Eastern cuisine in the heart of Bern.',
    rating: avgRating,
    reviews: mockReviews,
    recentOrders: seedOrders,
    teamManager: { id: 'tm-mgr3', name: 'Orlando Diggs', avatar: null, roleLine: 'Restaurant Manager : Esra Falafel 1', phone: '+49 72 542 00 20', active: true },
    teamDrivers: [
      { id: 'tm-td1', name: 'Drew Cano',   avatar: null, roleLine: 'Delivery Driver : Zone A, Zone B', phone: '+49 72 235 00 20', active: true },
      { id: 'tm-td2', name: 'Luca Muller', avatar: null, roleLine: 'Delivery Driver : Zone A, Zone B', phone: '+49 72 278 11 34', active: true },
    ],
    support: { phone: '+49 72 542 00 20', whatsapp: '+49 72 542 00 20', website: 'www.esrafalafel.com', email: 'contact@esrafalafel.com' },
    menuPreview: { name: 'Our Menu', cover: undefined, lastUpdated: '03/01/2026', products: 25, categories: 7 },
  },
]

export const mockManagerOptions = [
  { id: 'm1', name: 'Phoenix Baker',    email: 'phoenix@company.com', avatar: null },
  { id: 'm2', name: 'Olivia Rhye',      email: 'olivia@company.com',  avatar: null },
  { id: 'm3', name: 'Lana Steiner',     email: 'lana@company.com',    avatar: null },
  { id: 'm4', name: 'Demi Wilkinson',   email: 'demi@company.com',    avatar: null },
  { id: 'm5', name: 'Candice Wu',       email: 'candice@company.com', avatar: null },
  { id: 'm6', name: 'Natali Craig',     email: 'natali@company.com',  avatar: null },
  { id: 'm7', name: 'Drew Cano',        email: 'drew@company.com',    avatar: null },
]

export const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
]

export const MENU_OPTIONS = [
  { label: 'Our Menu',    value: 'Our Menu' },
  { label: 'Summer Menu', value: 'Summer Menu' },
]
