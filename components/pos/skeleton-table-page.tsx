"use client";

// app/dashboard/_components/skeleton-table-page.tsx
import { Skeleton } from "./skeleton";

export function SkeletonTablePage() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", padding: "20px 28px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexShrink: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <Skeleton width={160} height={20} borderRadius={8} />
          <Skeleton width={200} height={12} borderRadius={6} />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Skeleton width={200} height={38} borderRadius={12} />
          <Skeleton width={130} height={38} borderRadius={12} />
          <Skeleton width={120} height={38} borderRadius={12} />
        </div>
      </div>

      {/* Grid of table cards */}
      <div style={{
        flex: 1, overflowY: "auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
        gap: 12,
        alignContent: "start",
      }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} style={{
            background: "white", borderRadius: 16,
            padding: "16px 14px", border: "1.5px solid #f0f0f0",
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Skeleton width={60} height={14} borderRadius={6} />
              <Skeleton width={24} height={24} borderRadius={8} />
            </div>
            <Skeleton width="100%" height={8} borderRadius={20} />
            <Skeleton width={70} height={22} borderRadius={20} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ paddingTop: 12, display: "flex", justifyContent: "flex-end", gap: 6 }}>
        {[32, 32, 32, 32, 32].map((w, i) => (
          <Skeleton key={i} width={w} height={32} borderRadius={8} />
        ))}
      </div>
    </div>
  );
}