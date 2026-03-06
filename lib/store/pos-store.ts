// lib/store/pos-store.ts
import { create } from "zustand";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  emoji: string;
};

export type PaymentMethod = "Credit Card" | "Cash" | "QRIS";

type POSStore = {
  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  updateQty: (id: number, delta: number) => void;
  clearCart: () => void;

  // Order settings
  tableNo: string;
  orderType: string;
  paymentMethod: PaymentMethod;
  setTableNo: (val: string) => void;
  setOrderType: (val: string) => void;
  setPaymentMethod: (val: PaymentMethod) => void;

  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
};

export const usePOSStore = create<POSStore>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.id === item.id);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { ...item, qty: 1 }] };
    }),
  updateQty: (id, delta) =>
    set((state) => ({
      cart: state.cart
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    })),
  clearCart: () => set({ cart: [] }),

  tableNo: "Table 20",
  orderType: "Dine in",
  paymentMethod: "QRIS",
  setTableNo: (val) => set({ tableNo: val }),
  setOrderType: (val) => set({ orderType: val }),
  setPaymentMethod: (val) => set({ paymentMethod: val }),

  sidebarCollapsed: false,
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));