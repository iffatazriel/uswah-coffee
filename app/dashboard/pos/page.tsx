import Sidebar from "@/components/pos/sidebar";
import ProductGrid from "@/components/pos/product-grid";
import OrderPanel from "@/components/pos/order-panel";


export default function POSPage() {
  return (
    <div className="flex h-screen bg-[#F8F8F8] overflow-hidden">
      {/* Kolom 1: Sidebar Navigasi (Kiri) */}
      <Sidebar />

      {/* Kolom 2: Area Menu & Produk (Tengah) */}
      <main className="flex-1 flex flex-col overflow-y-auto p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Menu</h1>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm">
            Close Order
          </button>
        </header>

        {/* Kategori Makanan */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {["Pizza", "Spaghetti", "French Fries", "Beverages"].map((cat) => (
            <button key={cat} className="flex flex-col items-center p-3 bg-white rounded-2xl min-w-[100px] border border-gray-100 shadow-sm hover:border-orange-500 transition-all">
              <span className="text-2xl mb-1">🍕</span>
              <span className="text-xs font-semibold text-gray-600">{cat}</span>
            </button>
          ))}
        </div>

        <ProductGrid />
      </main>

      {/* Kolom 3: Panel Pesanan (Kanan) */}
      <OrderPanel />
    </div>
  );
}