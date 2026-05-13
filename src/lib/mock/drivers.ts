export type DriverStatus = 'active' | 'inactive' | 'archived'

export interface Driver {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  zones: string[]
  joinDate: string
  status: DriverStatus
  avatar: string | null
}

export const mockDrivers: Driver[] = [
  {
    id: '1',
    firstName: 'Orlando', lastName: 'Diggs',
    email: 'orlando@company.com', phone: '+41 76 234 56 81',
    role: 'Delivery Driver', zones: ['Zone A'],
    joinDate: '11/02/2026', status: 'active', avatar: null,
  },
  {
    id: '2',
    firstName: 'Drew', lastName: 'Cano',
    email: 'drew@company.com', phone: '+41 78 945 23 67',
    role: 'Delivery Driver', zones: ['Zone A', 'Zone B'],
    joinDate: '11/02/2026', status: 'active', avatar: null,
  },
  {
    id: '3',
    firstName: 'Luca', lastName: 'Muller',
    email: 'lucamuller@company.com', phone: '+41 79 312 84 59',
    role: 'Delivery Driver', zones: ['Zone C'],
    joinDate: '10/02/2026', status: 'inactive', avatar: null,
  },
]

export const mockZones = [
  { label: 'Zone A', value: 'Zone A' },
  { label: 'Zone B', value: 'Zone B' },
  { label: 'Zone C', value: 'Zone C' },
  { label: 'Zone A, Zone B', value: 'Zone A, Zone B' },
]

export const mockRestaurantsForDrivers = [
  { label: 'Esra Falafel 1', value: 'esra-1' },
  { label: 'Esra Falafel 2', value: 'esra-2' },
  { label: 'Esra Falafel 3', value: 'esra-3' },
  { label: 'Esra Falafel 1 - Esra Falafel 2', value: 'esra-1-2' },
]

export const mockDriverStatuses = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]
