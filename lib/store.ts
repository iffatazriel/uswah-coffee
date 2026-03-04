// lib/store.ts
import { create } from 'zustand'

interface AuthStore {
  pin: string
  addNumber: (num: string) => void
  deleteNumber: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  pin: "",
  addNumber: (num) => set((state) => ({ 
    pin: state.pin.length < 6 ? state.pin + num : state.pin 
  })),
  deleteNumber: () => set((state) => ({ 
    pin: state.pin.slice(0, -1) 
  })),
}))