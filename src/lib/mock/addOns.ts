export interface AddOn {
  id: string
  name: string
  groupId: string
  groupName: string
  additionalPrice: number
  products: number
  description: string
  status: 'active' | 'inactive' | 'archived'
}

export const mockAddOns: AddOn[] = [
  { id: 'ao1',  name: 'Tahini Sauce',   groupId: '1', groupName: 'Sauces',         additionalPrice: 0.00, products: 22, description: '', status: 'active' },
  { id: 'ao2',  name: 'Chilly',         groupId: '1', groupName: 'Sauces',         additionalPrice: 0.00, products: 15, description: '', status: 'active' },
  { id: 'ao3',  name: 'Garlic Sauce',   groupId: '1', groupName: 'Sauces',         additionalPrice: 0.50, products: 20, description: '', status: 'active' },
  { id: 'ao4',  name: 'Extra Falafel',  groupId: '2', groupName: 'Extra Toppings', additionalPrice: 2.00, products: 3,  description: '', status: 'active' },
  { id: 'ao5',  name: 'Extra Halloumi', groupId: '2', groupName: 'Extra Toppings', additionalPrice: 3.00, products: 50, description: '', status: 'active' },
  { id: 'ao6',  name: 'Bread (Laffa)',  groupId: '3', groupName: 'Bread Choice',   additionalPrice: 0.00, products: 4,  description: '', status: 'active' },
  { id: 'ao7',  name: 'Baguette',       groupId: '3', groupName: 'Bread Choice',   additionalPrice: 2.50, products: 4,  description: '', status: 'active' },
  { id: 'ao8',  name: 'Normal',         groupId: '5', groupName: 'Spicy Level',    additionalPrice: 0.00, products: 10, description: '', status: 'active' },
  { id: 'ao9',  name: 'Medium',         groupId: '5', groupName: 'Spicy Level',    additionalPrice: 0.00, products: 10, description: '', status: 'active' },
  { id: 'ao10', name: 'Spicy',          groupId: '5', groupName: 'Spicy Level',    additionalPrice: 0.00, products: 10, description: '', status: 'active' },
  { id: 'ao11', name: 'Fries',          groupId: '6', groupName: 'Side Choices',   additionalPrice: 2.50, products: 10, description: '', status: 'active' },
  { id: 'ao12', name: '0,33L',          groupId: '7', groupName: 'Drink Upgrade',  additionalPrice: 1.00, products: 4,  description: '', status: 'active' },
]

export const formatPrice = (price: number): string => `${price.toFixed(2)} €`
