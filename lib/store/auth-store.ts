// lib/store/auth-store.ts
import { create } from "zustand";

export type Cashier = {
  id: string;
  name: string;
  shift: string;
  avatar: string;
  color: string;
};

export const CASHIERS: Cashier[] = [
  { id: "staff-1", name: "Broicad", shift: "10:00 AM – 22:00 PM", avatar: "B", color: "#c84b00" },
  { id: "staff-2", name: "Ayasha",  shift: "06:00 AM – 14:00 PM", avatar: "A", color: "#0077b6" },
  { id: "staff-3", name: "Rizky",   shift: "14:00 PM – 22:00 PM", avatar: "R", color: "#2d6a4f" },
];

type AuthStore = {
  pin: string;
  selectedCashier: Cashier;
  appendPin: (digit: string) => void;
  deletePin: () => void;
  clearPin: () => void;
  setCashier: (cashier: Cashier) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  pin: "",
  selectedCashier: CASHIERS[0],

  appendPin: (digit) =>
    set((s) => ({ pin: s.pin.length < 6 ? s.pin + digit : s.pin })),

  deletePin: () =>
    set((s) => ({ pin: s.pin.slice(0, -1) })),

  clearPin: () => set({ pin: "" }),

  setCashier: (cashier) => set({ selectedCashier: cashier, pin: "" }),
}));