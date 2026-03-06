// app/dashboard/supply/page.tsx
import Sidebar from "@/components/pos/sidebar";
import SupplyContent from "@/components/pos/supply-content";

export default function SupplyPage() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        background: "#f5f5f5",
        overflow: "hidden",
      }}
    >
      <Sidebar />
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <SupplyContent />
      </main>
    </div>
  );
}