// app/dashboard/history/page.tsx
import HistoryTable from "@/components/pos/history-table";
import Sidebar from "@/components/pos/sidebar";

export default function HistoryPage() {
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
      {/* Sidebar di-reuse dari POS */}
      <Sidebar />

      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <HistoryTable />
      </main>
    </div>
  );
}