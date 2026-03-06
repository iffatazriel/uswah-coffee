// app/dashboard/pos/_components/types.ts

export const NAV_ITEMS = [
  {
    id: "cashier",
    label: "Cashier",
    href: "/dashboard/pos",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M2 10h20" stroke="currentColor" strokeWidth="2"/></svg>`,
  },
  {
    id: "table",
    label: "Table",
    href: "/dashboard/table",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
  },
  {
    id: "report",
    label: "Report",
    href: "/dashboard/report",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
  },
  {
    id: "history",
    label: "History",
    href: "/dashboard/history",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
  },
  {
    id: "supply",
    label: "Supply",
    href: "/dashboard/supply",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="2"/></svg>`,
  },
];

export const CATEGORIES = [
  "All",
  "Pizza",
  "Burger",
  "Spaghetti",
  "French Fries",
  "Beverage",
];

export const PRODUCTS = [
  { id: 1, name: "Beef Burger", price: 1.5, category: "Burger", emoji: "🍔" },
  { id: 2, name: "Cheeseburger", price: 1.5, category: "Burger", emoji: "🍔" },
  { id: 3, name: "Classic Burger", price: 1.5, category: "Burger", emoji: "🍔" },
  { id: 4, name: "Crispy Burger", price: 2.0, category: "Burger", emoji: "🍔" },
  { id: 5, name: "Pepperoni Pizza", price: 2.5, category: "Pizza", emoji: "🍕" },
  { id: 6, name: "Hawaiian Pizza", price: 2.6, category: "Pizza", emoji: "🍕" },
  { id: 7, name: "Cheese Pizza", price: 2.4, category: "Pizza", emoji: "🍕" },
  { id: 8, name: "Margherita Pizza", price: 2.2, category: "Pizza", emoji: "🍕" },
  { id: 9, name: "Spaghetti Bolognese", price: 3.0, category: "Spaghetti", emoji: "🍝" },
  { id: 10, name: "Spaghetti Carbonara", price: 3.5, category: "Spaghetti", emoji: "🍝" },
  { id: 11, name: "French Fries", price: 1.2, category: "French Fries", emoji: "🍟" },
  { id: 12, name: "Loaded Fries", price: 1.8, category: "French Fries", emoji: "🍟" },
  { id: 13, name: "Orange Juice", price: 1.0, category: "Beverage", emoji: "🧃" },
  { id: 14, name: "Iced Tea", price: 0.8, category: "Beverage", emoji: "🧋" },
  { id: 15, name: "Lemonade", price: 1.2, category: "Beverage", emoji: "🍋" },
];

export const ACTIVE_ORDERS = [
  {
    id: "#016",
    cashier: "Broicad",
    items: 4,
    table: "4C",
    order: "3x Burgers 3x Orange juice",
    status: "Being Cooked" as const,
  },
  {
    id: "#017",
    cashier: "Broicad",
    items: 4,
    table: "4C",
    order: "3x Burgers 3x Orange juice",
    status: "Delivered" as const,
  },
  {
    id: "#018",
    cashier: "Broicad",
    items: 3,
    table: "2A",
    order: "2x Pizza 1x Lemonade",
    status: "Delivered" as const,
  },
];

export const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  "Being Cooked": { bg: "#fff3e0", color: "#e65100" },
  Delivered: { bg: "#e8f5e9", color: "#2e7d32" },
};