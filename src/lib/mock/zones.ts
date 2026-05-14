export type ZoneStatus = 'active' | 'inactive' | 'archived'

export interface Zone {
  id: string
  name: string
  description: string
  restaurants: number
  drivers: number
  customers: number
  orders: number
  assignedRestaurants: string[]
  assignedDrivers: string[]
  creationDate: string
  status: ZoneStatus
  polygon: null
}

export const mockZones: Zone[] = [
  {
    id: '1', name: 'Zone A',
    description: 'Zone A contains two stores : Esra Falafel 1 and Esra Falafel 2.',
    restaurants: 2, drivers: 4, customers: 235, orders: 270,
    assignedRestaurants: ['esra-1', 'esra-2'],
    assignedDrivers: ['orlando-diggs'],
    creationDate: '11/02/2026', status: 'active', polygon: null,
  },
  {
    id: '2', name: 'Zone B',
    description: 'Lorem Ipsum is simply dummy',
    restaurants: 1, drivers: 2, customers: 130, orders: 210,
    assignedRestaurants: ['esra-1'],
    assignedDrivers: ['drew-cano', 'natali-craig'],
    creationDate: '11/02/2026', status: 'active', polygon: null,
  },
  {
    id: '3', name: 'Zone C',
    description: 'Lorem Ipsum is simply dummy',
    restaurants: 1, drivers: 1, customers: 0, orders: 0,
    assignedRestaurants: ['esra-3'],
    assignedDrivers: ['luca-muller'],
    creationDate: '10/02/2026', status: 'inactive', polygon: null,
  },
]

export const restaurantOptions = [
  { label: 'Esra Falafel 1', value: 'esra-1' },
  { label: 'Esra Falafel 2', value: 'esra-2' },
  { label: 'Esra Falafel 3', value: 'esra-3' },
]

export const driverOptions = [
  { label: 'Orlando Diggs', value: 'orlando-diggs', avatar: '' },
  { label: 'Drew Cano', value: 'drew-cano', avatar: '' },
  { label: 'Natali Craig', value: 'natali-craig', avatar: '' },
  { label: 'Luca Muller', value: 'luca-muller', avatar: '' },
  { label: 'Candice Wu', value: 'candice-wu', avatar: '' },
]
