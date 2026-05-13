export type ManagerStatus = 'active' | 'inactive' | 'archived'

export interface Manager {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  restaurant: string
  joinDate: string
  status: ManagerStatus
  avatar: string | null
}

export const mockManagers: Manager[] = [
  {
    id: '1',
    firstName: 'Orlando', lastName: 'Diggs',
    email: 'orlando@company.com', phone: '+41 76 234 56 81',
    role: 'Manager', restaurant: 'Esra Falafel 1',
    joinDate: '11/02/2026', status: 'active', avatar: null,
  },
  {
    id: '2',
    firstName: 'Candice', lastName: 'Wu',
    email: 'candice@company.com', phone: '+41 78 945 23 67',
    role: 'Manager', restaurant: 'Esra Falafel 3',
    joinDate: '11/02/2026', status: 'active', avatar: null,
  },
  {
    id: '3',
    firstName: 'Natali', lastName: 'Craig',
    email: 'natali@company.com', phone: '+41 79 312 84 59',
    role: 'Manager', restaurant: 'Esra Falafel 2',
    joinDate: '10/02/2026', status: 'inactive', avatar: null,
  },
  {
    id: '4',
    firstName: 'Drew', lastName: 'Cano',
    email: 'drew@company.com', phone: '+41 77 658 19 24',
    role: 'Manager', restaurant: 'Esra Falafel 1',
    joinDate: '10/02/2026', status: 'active', avatar: null,
  },
  {
    id: '5',
    firstName: 'Luca', lastName: 'Muller',
    email: 'lucamuller@company.com', phone: '+41 77 658 19 24',
    role: 'Manager', restaurant: 'Esra Falafel 2',
    joinDate: '10/02/2026', status: 'archived', avatar: null,
  },
]

export const mockRestaurants = [
  { label: 'Esra Falafel 1', value: 'esra-1' },
  { label: 'Esra Falafel 2', value: 'esra-2' },
  { label: 'Esra Falafel 3', value: 'esra-3' },
]
