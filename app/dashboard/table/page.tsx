// app/dashboard/table/page.tsx
import Sidebar from "@/components/pos/sidebar";
import TableGrid from "@/components/pos/table-grid";

export default function TablePage() {
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

      {/* Konten utama */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <TableGrid />
      </main>
    </div>
  );
}