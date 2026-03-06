// app/dashboard/report/page.tsx

import ReportTable from "@/components/pos/report-table";
import Sidebar from "@/components/pos/sidebar";


export default function ReportPage() {
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
        <ReportTable />
      </main>
    </div>
  );
}