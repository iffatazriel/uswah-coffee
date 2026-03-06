import TopBar from "@/components/pos/top-bar";
import ProductGrid from "@/components/pos/product-grid";
import OrderPanel from "@/components/pos/order-panel";

export default function POSPage() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <TopBar />
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <ProductGrid />
        <OrderPanel />
      </div>
    </div>
  );
}