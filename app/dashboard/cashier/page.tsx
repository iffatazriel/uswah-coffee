import TopBar from "@/components/pos/top-bar";
import ProductGrid from "@/components/pos/product-grid";
import OrderPanel from "@/components/pos/order-panel";
import { Suspense } from "react";
import { SkeletonPOS } from "@/components/pos/skeleton-pos";

export default function POSPage() {
  return (
   <Suspense fallback={<SkeletonPOS />}>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <TopBar />
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <ProductGrid />
        <OrderPanel />
      </div>
    </div>
   </Suspense> 
  );
}