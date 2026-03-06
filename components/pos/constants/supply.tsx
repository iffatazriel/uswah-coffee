// app/dashboard/supply/_components/constants.ts

export type StockStatus = "Stock is safe" | "Running low" | "Out of stock";

export type SupplyItem = {
  id: number;
  name: string;
  dateOfUpdate: string;
  quantity: string;
  quantityValue: number; // for sorting
  unit: string;
  status: StockStatus;
};

export const STATUS_STYLES: Record<StockStatus, { bg: string; color: string; icon: string }> = {
  "Stock is safe": { bg: "#e8f5e9", color: "#2e7d32",  icon: "✓" },
  "Running low":   { bg: "#fff8e1", color: "#f57f17",  icon: "⚠" },
  "Out of stock":  { bg: "#ffebee", color: "#c62828",  icon: "✕" },
};

export const SUPPLY_ITEMS: SupplyItem[] = [
  { id: 1,  name: "Arabica Coffee Beans",  dateOfUpdate: "Sunday, 17 March 2025", quantity: "1.5 Kg",    quantityValue: 1500, unit: "g",  status: "Stock is safe" },
  { id: 2,  name: "Robusta Coffee Beans",  dateOfUpdate: "Sunday, 17 March 2025", quantity: "1.5 Kg",    quantityValue: 1500, unit: "g",  status: "Stock is safe" },
  { id: 3,  name: "Whole Milk",            dateOfUpdate: "Sunday, 17 March 2025", quantity: "1.5 Kg",    quantityValue: 1500, unit: "g",  status: "Stock is safe" },
  { id: 4,  name: "Oat Milk",              dateOfUpdate: "Sunday, 17 March 2025", quantity: "1.5 Kg",    quantityValue: 1500, unit: "g",  status: "Stock is safe" },
  { id: 5,  name: "White Sugar",           dateOfUpdate: "Sunday, 17 March 2025", quantity: "2 kg",      quantityValue: 2000, unit: "g",  status: "Stock is safe" },
  { id: 6,  name: "Brown Sugar",           dateOfUpdate: "Sunday, 17 March 2025", quantity: "500 Kg",    quantityValue: 500,  unit: "g",  status: "Running low"   },
  { id: 7,  name: "Vanilla Syrup",         dateOfUpdate: "Sunday, 17 March 2025", quantity: "250 grams", quantityValue: 250,  unit: "ml", status: "Running low"   },
  { id: 8,  name: "Caramel Syrup",         dateOfUpdate: "Sunday, 17 March 2025", quantity: "200 grams", quantityValue: 200,  unit: "ml", status: "Running low"   },
  { id: 9,  name: "Hazelnut Syrup",        dateOfUpdate: "Sunday, 17 March 2025", quantity: "200 grams", quantityValue: 200,  unit: "ml", status: "Running low"   },
  { id: 10, name: "Espresso Cups (S)",     dateOfUpdate: "Sunday, 17 March 2025", quantity: "0 kg",      quantityValue: 0,    unit: "pcs", status: "Out of stock" },
  { id: 11, name: "Takeaway Cups (M)",     dateOfUpdate: "Sunday, 17 March 2025", quantity: "0 kg",      quantityValue: 0,    unit: "pcs", status: "Out of stock" },
  { id: 12, name: "Cocoa Powder",          dateOfUpdate: "Sunday, 17 March 2025", quantity: "1.2 Kg",    quantityValue: 1200, unit: "g",  status: "Stock is safe" },
  { id: 13, name: "Matcha Powder",         dateOfUpdate: "Sunday, 17 March 2025", quantity: "300 grams", quantityValue: 300,  unit: "g",  status: "Running low"   },
  { id: 14, name: "Whipping Cream",        dateOfUpdate: "Sunday, 17 March 2025", quantity: "0 kg",      quantityValue: 0,    unit: "ml", status: "Out of stock"  },
  { id: 15, name: "Ice Cubes",             dateOfUpdate: "Sunday, 17 March 2025", quantity: "5 kg",      quantityValue: 5000, unit: "g",  status: "Stock is safe" },
  { id: 16, name: "Paper Straws",          dateOfUpdate: "Sunday, 17 March 2025", quantity: "150 grams", quantityValue: 150,  unit: "pcs", status: "Running low"  },
  { id: 17, name: "Napkins",              dateOfUpdate: "Sunday, 17 March 2025", quantity: "2 kg",       quantityValue: 2000, unit: "pcs", status: "Stock is safe" },
  { id: 18, name: "Chocolate Sauce",      dateOfUpdate: "Sunday, 17 March 2025", quantity: "400 grams",  quantityValue: 400,  unit: "ml", status: "Running low"   },
  { id: 19, name: "Lemon Juice",          dateOfUpdate: "Sunday, 17 March 2025", quantity: "0 kg",       quantityValue: 0,    unit: "ml", status: "Out of stock"  },
  { id: 20, name: "Sparkling Water",      dateOfUpdate: "Sunday, 17 March 2025", quantity: "1.8 Kg",     quantityValue: 1800, unit: "ml", status: "Stock is safe" },
];

export const ITEMS_PER_PAGE = 12;