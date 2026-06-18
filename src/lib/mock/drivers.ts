import { mockReviews } from './reviews'

export interface FileMeta {
  name: string
  date: string
  size: string
  url: string
}

export interface Review {
  id: string
  reviewer: string
  avatar: string
  rating: number
  comment: string
  time: string
}

export interface AssignedOrder {
  id: string
  number: string
  pickupState: 'pickup' | 'pickedup'
  timeHint: string
  restaurant: string
  status: 'new' | 'preparing' | 'ready' | 'ontheway'
  customer: string
  address: string
  payment: { method: 'card' | 'cash'; amount: number }
  items: number
  distanceKm: number
}

export interface Driver {
  id: string
  firstName: string
  lastName: string
  avatar: string | null
  email: string
  phone: string
  dateOfBirth?: string
  role: 'Delivery Driver'
  zones: string[]
  restaurants: string[]
  address: { street: string; number: string; zip: string; city: string }
  idFront?: string
  idBack?: string
  vehicle: { picture?: string; type: string; plate: string; registrationDoc?: FileMeta }
  joinDate: string
  verification: 'verified' | 'pending'
  status: 'active' | 'inactive' | 'archived'
  rating: number
  reviews: Review[]
  assignedOrders: AssignedOrder[]
}

export const mockDrivers: Driver[] = [
  {
    id: 'd1',
    firstName: 'Orlando',
    lastName: 'Diggs',
    avatar: null,
    email: 'orlando@company.com',
    phone: '+49 76 234 56 81',
    role: 'Delivery Driver',
    zones: ['Zone A'],
    restaurants: ['Esra Falafel 1', 'Esra Falafel 2'],
    address: { street: '', number: '', zip: '', city: '' },
    vehicle: { type: '', plate: '' },
    joinDate: '11/02/2026',
    verification: 'verified',
    status: 'active',
    rating: 4.5,
    reviews: mockReviews,
    assignedOrders: [
      {
        id: 'o1-1',
        number: '#34701',
        pickupState: 'pickup',
        timeHint: 'In 5min',
        restaurant: 'Esra Falafel 1',
        status: 'new',
        customer: 'Sophie Braun',
        address: 'Kottbusser Damm 24, 10967 Berlin',
        payment: { method: 'card', amount: 18.5 },
        items: 2,
        distanceKm: 2.8,
      },
      {
        id: 'o1-2',
        number: '#34688',
        pickupState: 'pickup',
        timeHint: 'In 12min',
        restaurant: 'Esra Falafel 2',
        status: 'preparing',
        customer: 'Felix Hoffmann',
        address: 'Gneisenaustraße 12, 10961 Berlin',
        payment: { method: 'cash', amount: 24.0 },
        items: 3,
        distanceKm: 3.1,
      },
      {
        id: 'o1-3',
        number: '#34670',
        pickupState: 'pickedup',
        timeHint: 'At 10:15 PM',
        restaurant: 'Esra Falafel 1',
        status: 'ontheway',
        customer: 'Anna Weber',
        address: 'Bergmannstraße 55, 10961 Berlin',
        payment: { method: 'card', amount: 12.5 },
        items: 1,
        distanceKm: 1.9,
      },
    ],
  },
  {
    id: 'd2',
    firstName: 'Drew',
    lastName: 'Cano',
    avatar: null,
    email: 'drew@company.com',
    phone: '+49 78 945 23 67',
    role: 'Delivery Driver',
    zones: ['Zone A', 'Zone B'],
    restaurants: ['Esra Falafel 1', 'Esra Falafel 2'],
    address: { street: 'Musterstrasse', number: '12', zip: '3000', city: 'Bern' },
    vehicle: {
      type: '🛵 Motorcycle / Scooter',
      plate: '12345678',
      registrationDoc: {
        name: 'File Name.pdf',
        date: '16 Mai 2026 · 12:30',
        size: '5MB',
        url: '#',
      },
    },
    joinDate: '11/02/2026',
    verification: 'verified',
    status: 'active',
    rating: 4.5,
    reviews: [
      {
        id: 'r1',
        reviewer: 'Victoria Champain',
        avatar: '',
        rating: 5,
        comment: 'Great Service',
        time: 'Today, 09:12',
      },
      {
        id: 'r2',
        reviewer: 'Laura Smith',
        avatar: '',
        rating: 3,
        comment: 'Friendly Driver',
        time: 'Yesterday, 16:40',
      },
      {
        id: 'r3',
        reviewer: 'Maximilian W.',
        avatar: '',
        rating: 4,
        comment: 'Professional, Careful Handling',
        time: '10/05/2026',
      },
    ],
    assignedOrders: [
      {
        id: 'o1',
        number: '#34632',
        pickupState: 'pickedup',
        timeHint: 'At 11:45 PM',
        restaurant: 'Esra Falafel 1',
        status: 'ontheway',
        customer: 'Liam Becker',
        address: 'Skalitzer Straße 88, 10997 Berlin',
        payment: { method: 'card', amount: 14.5 },
        items: 2,
        distanceKm: 4.5,
      },
      {
        id: 'o2',
        number: '#34551',
        pickupState: 'pickup',
        timeHint: 'In 2min',
        restaurant: 'Esra Falafel 2',
        status: 'ready',
        customer: 'Emma Schneider',
        address: 'Reichenberger Straße 42, 10999 Berlin',
        payment: { method: 'cash', amount: 16.0 },
        items: 2,
        distanceKm: 3.5,
      },
      {
        id: 'o3',
        number: '#34552',
        pickupState: 'pickup',
        timeHint: 'In 15min',
        restaurant: 'Esra Falafel 2',
        status: 'preparing',
        customer: 'Laura Fischer',
        address: 'Schönhauser Allee 73, 10437 Berlin',
        payment: { method: 'card', amount: 22.5 },
        items: 2,
        distanceKm: 4.2,
      },
      {
        id: 'o4',
        number: '#34432',
        pickupState: 'pickup',
        timeHint: 'At 10:30 PM',
        restaurant: 'Esra Falafel 1',
        status: 'new',
        customer: 'Noah Wagner',
        address: 'Warschauer Straße 51, 10243 Berlin',
        payment: { method: 'cash', amount: 32.0 },
        items: 3,
        distanceKm: 4.5,
      },
    ],
  },
  {
    id: 'd3',
    firstName: 'Luca',
    lastName: 'Muller',
    avatar: null,
    email: 'lucamuller@company.com',
    phone: '+49 79 312 84 59',
    role: 'Delivery Driver',
    zones: ['Zone C'],
    restaurants: [],
    address: { street: '', number: '', zip: '', city: '' },
    vehicle: { type: '', plate: '' },
    joinDate: '10/02/2026',
    verification: 'pending',
    status: 'inactive',
    rating: 0,
    reviews: [],
    assignedOrders: [
      {
        id: 'o3-1',
        number: '#34810',
        pickupState: 'pickup',
        timeHint: 'In 8min',
        restaurant: 'Esra Falafel 3',
        status: 'ready',
        customer: 'Jonas Schulz',
        address: 'Karl-Marx-Allee 78, 10243 Berlin',
        payment: { method: 'cash', amount: 9.5 },
        items: 1,
        distanceKm: 5.2,
      },
      {
        id: 'o3-2',
        number: '#34799',
        pickupState: 'pickedup',
        timeHint: 'At 09:30 PM',
        restaurant: 'Esra Falafel 3',
        status: 'ontheway',
        customer: 'Mia Zimmermann',
        address: 'Frankfurter Allee 30, 10247 Berlin',
        payment: { method: 'card', amount: 21.0 },
        items: 2,
        distanceKm: 4.0,
      },
      {
        id: 'o3-3',
        number: '#34780',
        pickupState: 'pickup',
        timeHint: 'At 11:00 PM',
        restaurant: 'Esra Falafel 3',
        status: 'new',
        customer: 'Leon Müller',
        address: 'Boxhagener Straße 14, 10245 Berlin',
        payment: { method: 'card', amount: 15.5 },
        items: 2,
        distanceKm: 3.3,
      },
    ],
  },
]

export const mockZones = [
  { label: 'Zone A', value: 'Zone A' },
  { label: 'Zone B', value: 'Zone B' },
  { label: 'Zone C', value: 'Zone C' },
]

export const mockRestaurantsForDrivers = [
  { label: 'Esra Falafel 1', value: 'Esra Falafel 1' },
  { label: 'Esra Falafel 2', value: 'Esra Falafel 2' },
  { label: 'Esra Falafel 3', value: 'Esra Falafel 3' },
]

export const mockVehicleTypes = [
  { label: '🛵 Motorcycle / Scooter', value: '🛵 Motorcycle / Scooter' },
  { label: '🚗 Car', value: '🚗 Car' },
  { label: '🚲 Bicycle', value: '🚲 Bicycle' },
]
