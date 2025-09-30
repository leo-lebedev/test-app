import { defineStore } from 'pinia'

export type Toast = { id: number; type: 'success' | 'error'; message: string; timeout?: number }

let nextId = 1

export const useToastsStore = defineStore('toasts', {
  state: () => ({ toasts: [] as Toast[] }),
  actions: {
    push(message: string, type: Toast['type'] = 'success', timeout = 3000) {
      const id = nextId++
      this.toasts.push({ id, type, message, timeout })
      if (timeout) setTimeout(() => this.remove(id), timeout)
    },
    remove(id: number) {
      this.toasts = this.toasts.filter(t => t.id !== id)
    },
  },
})


