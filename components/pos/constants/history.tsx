// app/dashboard/history/_components/constants.ts

export type ServiceType = "Dine in" | "Take Away" | "Delivery";

export type HistoryItem = {
  id: number;
  menuName: string;
  typeOfService: ServiceType;
  qty: number;
  total: number;
  date: string;
};

export const HISTORY_ITEMS: HistoryItem[] = [
  { id: 1,  menuName: "Avogato",             typeOfService: "Dine in",   qty: 1, total: 1.50, date: "2025-03-07" },
  { id: 2,  menuName: "Avogato",             typeOfService: "Dine in",   qty: 1, total: 1.50, date: "2025-03-07" },
  { id: 3,  menuName: "Avogato",             typeOfService: "Dine in",   qty: 1, total: 1.50, date: "2025-03-07" },
  { id: 4,  menuName: "Avogato",             typeOfService: "Dine in",   qty: 1, total: 1.50, date: "2025-03-07" },
  { id: 5,  menuName: "Avogato",             typeOfService: "Dine in",   qty: 1, total: 1.50, date: "2025-03-07" },
  { id: 6,  menuName: "Avogato",             typeOfService: "Dine in",   qty: 1, total: 1.50, date: "2025-03-07" },
  { id: 7,  menuName: "Beef Burger",         typeOfService: "Take Away",  qty: 2, total: 3.00, date: "2025-03-07" },
  { id: 8,  menuName: "Cheeseburger",        typeOfService: "Dine in",   qty: 1, total: 1.50, date: "2025-03-07" },
  { id: 9,  menuName: "Pepperoni Pizza",     typeOfService: "Delivery",  qty: 3, total: 7.50, date: "2025-03-07" },
  { id: 10, menuName: "Spaghetti Carbonara", typeOfService: "Dine in",   qty: 2, total: 7.00, date: "2025-03-07" },
  { id: 11, menuName: "French Fries",        typeOfService: "Take Away",  qty: 4, total: 4.80, date: "2025-03-07" },
  { id: 12, menuName: "Orange Juice",        typeOfService: "Dine in",   qty: 2, total: 2.00, date: "2025-03-07" },
  { id: 13, menuName: "Hawaiian Pizza",      typeOfService: "Delivery",  qty: 1, total: 2.60, date: "2025-03-06" },
  { id: 14, menuName: "Classic Burger",      typeOfService: "Dine in",   qty: 3, total: 4.50, date: "2025-03-06" },
  { id: 15, menuName: "Iced Tea",            typeOfService: "Take Away",  qty: 2, total: 1.60, date: "2025-03-06" },
  { id: 16, menuName: "Loaded Fries",        typeOfService: "Dine in",   qty: 1, total: 1.80, date: "2025-03-06" },
  { id: 17, menuName: "Avogato",             typeOfService: "Dine in",   qty: 1, total: 1.50, date: "2025-03-06" },
  { id: 18, menuName: "Margherita Pizza",    typeOfService: "Delivery",  qty: 2, total: 4.40, date: "2025-03-06" },
  { id: 19, menuName: "Beef Burger",         typeOfService: "Dine in",   qty: 1, total: 1.50, date: "2025-03-06" },
  { id: 20, menuName: "Lemonade",            typeOfService: "Take Away",  qty: 3, total: 3.60, date: "2025-03-06" },
  { id: 21, menuName: "Spaghetti Bolognese", typeOfService: "Dine in",   qty: 2, total: 6.00, date: "2025-03-05" },
  { id: 22, menuName: "Avogato",             typeOfService: "Dine in",   qty: 1, total: 1.50, date: "2025-03-05" },
  { id: 23, menuName: "Crispy Burger",       typeOfService: "Take Away",  qty: 2, total: 4.00, date: "2025-03-05" },
  { id: 24, menuName: "Cheese Pizza",        typeOfService: "Delivery",  qty: 1, total: 2.40, date: "2025-03-05" },
  { id: 25, menuName: "French Fries",        typeOfService: "Dine in",   qty: 5, total: 6.00, date: "2025-03-05" },
];

export const SERVICE_TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  "Dine in":   { bg: "#fff5ef", color: "#FF5200" },
  "Take Away": { bg: "#e8f5e9", color: "#2e7d32" },
  "Delivery":  { bg: "#e3f2fd", color: "#1565c0" },
};

export const ITEMS_PER_PAGE = 13;