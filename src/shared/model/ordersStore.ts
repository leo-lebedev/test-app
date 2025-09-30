import { defineStore } from 'pinia'
import type { OrderEntity } from './orderStore'

const STORAGE_KEY = 'orders-list-v1'

const sample: OrderEntity[] = [
  {
    id: '1',
    title: 'Полное название заказа',
    city: 'Москва',
    paymentType: 'Материал',
    weightKg: 200,
    deadline: '2025-06-04',
    prepay: true,
    features: ['Дизайн', 'B2B'],
    description: 'Необходимо создать фирменный стиль компании...'
  },
]

function load(): OrderEntity[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return sample
    return JSON.parse(raw)
  } catch {
    return sample
  }
}

export const useOrdersStore = defineStore('orders', {
  state: () => ({ orders: load() as OrderEntity[] }),
  actions: {
    createBlank(): OrderEntity {
      const id = String(Date.now())
      const blank: OrderEntity = {
        id,
        title: '',
        city: '',
        paymentType: 'Материал',
        weightKg: null,
        deadline: null,
        prepay: false,
        features: [],
        description: '',
      }
      this.orders.push(blank)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.orders))
      return blank
    },
    getById(id: string) {
      return this.orders.find(o => o.id === id)
    },
    update(next: OrderEntity) {
      const idx = this.orders.findIndex(o => o.id === next.id)
      if (idx !== -1) this.orders[idx] = { ...next }
      else this.orders.push({ ...next })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.orders))
    },
  },
})

export type { OrderEntity as Order }

