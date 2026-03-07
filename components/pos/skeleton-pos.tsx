"use client";

// app/dashboard/_components/skeleton-pos.tsx
import { Skeleton } from "./skeleton";

export function SkeletonPOS() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* TopBar skeleton */}
      <div style={{ background: "white", borderBottom: "1px solid #f0f0f0", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 10 }}>
          {[80, 90, 80, 90, 80].map((w, i) => (
            <Skeleton key={i} width={w} height={34} borderRadius={20} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Skeleton width={120} height={34} borderRadius={12} />
          <Skeleton width={38} height={38} borderRadius={10} />
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Product grid skeleton */}
        <div style={{ flex: 1, padding: "16px 20px", overflowY: "auto" }}>
          {/* Category pills */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {[70, 90, 80, 100, 70].map((w, i) => (
              <Skeleton key={i} width={w} height={34} borderRadius={20} />
            ))}
          </div>
          {/* Product cards grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{ background: "white", borderRadius: 16, padding: 14, border: "1.5px solid #f0f0f0", display: "flex", flexDirection: "column", gap: 10 }}>
                <Skeleton width="100%" height={90} borderRadius={12} />
                <Skeleton width="80%" height={14} borderRadius={6} />
                <Skeleton width="50%" height={13} borderRadius={6} />
              </div>
            ))}
          </div>
        </div>

        {/* Order panel skeleton */}
        <aside style={{ width: 320, background: "white", borderLeft: "1px solid #f0f0f0", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 14, flexShrink: 0 }}>
          {/* Dropdowns */}
          <div style={{ display: "flex", gap: 8 }}>
            <Skeleton width="50%" height={38} borderRadius={10} />
            <Skeleton width="50%" height={38} borderRadius={10} />
          </div>

          {/* Cart items */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, minHeight: 200 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Skeleton width={50} height={50} borderRadius={12} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                  <Skeleton width="80%" height={13} borderRadius={6} />
                  <Skeleton width="50%" height={13} borderRadius={6} />
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <Skeleton width={28} height={28} borderRadius={8} />
                  <Skeleton width={20} height={28} borderRadius={6} />
                  <Skeleton width={28} height={28} borderRadius={8} />
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <Skeleton width="100%" height={1} borderRadius={0} />

          {/* Totals */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[0,1,2].map((i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                <Skeleton width={80} height={13} borderRadius={6} />
                <Skeleton width={60} height={13} borderRadius={6} />
              </div>
            ))}
          </div>

          {/* Payment method */}
          <div style={{ display: "flex", gap: 8 }}>
            {[0,1,2].map((i) => (
              <Skeleton key={i} width="33%" height={72} borderRadius={14} />
            ))}
          </div>

          {/* Button */}
          <Skeleton width="100%" height={52} borderRadius={16} />
        </aside>
      </div>
    </div>
  );
}