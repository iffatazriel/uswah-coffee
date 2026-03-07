"use client";

// app/dashboard/_components/skeleton-home.tsx
import { Skeleton } from "./skeleton";

function CardSkeleton() {
  return (
    <div style={{ background: "white", borderRadius: 18, padding: "20px", border: "1.5px solid #f0f0f0", display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
          <Skeleton width={100} height={11} borderRadius={6} />
          <Skeleton width={70} height={26} borderRadius={8} />
        </div>
        <Skeleton width={46} height={46} borderRadius={14} />
      </div>
      <Skeleton width={120} height={12} borderRadius={6} />
    </div>
  );
}

function TableRowSkeleton() {
  return (
    <tr>
      <td style={{ padding: "13px 20px" }}><Skeleton width={40} height={13} /></td>
      <td style={{ padding: "13px 20px" }}><Skeleton width={70} height={13} /></td>
      <td style={{ padding: "13px 20px" }}><Skeleton width={140} height={13} /></td>
      <td style={{ padding: "13px 20px" }}><Skeleton width={50} height={13} /></td>
      <td style={{ padding: "13px 20px" }}><Skeleton width={80} height={24} borderRadius={20} /></td>
      <td style={{ padding: "13px 20px" }}><Skeleton width={60} height={13} /></td>
    </tr>
  );
}

export function SkeletonHome() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", padding: "24px 28px", gap: 20 }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Skeleton width={180} height={12} borderRadius={6} />
          <Skeleton width={260} height={24} borderRadius={8} />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[90, 110, 120, 110, 110].map((w, i) => (
            <Skeleton key={i} width={w} height={38} borderRadius={12} />
          ))}
        </div>
      </div>

      {/* Stats cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {[0,1,2,3].map((i) => <CardSkeleton key={i} />)}
      </div>

      {/* Bottom row */}
      <div style={{ display: "flex", gap: 16, flex: 1, overflow: "hidden" }}>
        {/* Recent Orders */}
        <div style={{ background: "white", borderRadius: 18, border: "1.5px solid #f0f0f0", overflow: "hidden", flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "18px 20px", borderBottom: "1.5px solid #f8f8f8" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <Skeleton width={130} height={15} borderRadius={6} />
              <Skeleton width={100} height={11} borderRadius={6} />
            </div>
            <Skeleton width={60} height={15} borderRadius={6} />
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {[0,1,2,3,4].map((i) => <TableRowSkeleton key={i} />)}
            </tbody>
          </table>
        </div>

        {/* Stock alerts */}
        <div style={{ background: "white", borderRadius: 18, border: "1.5px solid #f0f0f0", overflow: "hidden", width: 280, flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "18px 20px", borderBottom: "1.5px solid #f8f8f8" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <Skeleton width={100} height={15} borderRadius={6} />
              <Skeleton width={80} height={11} borderRadius={6} />
            </div>
            <Skeleton width={60} height={15} borderRadius={6} />
          </div>
          {[0,1,2,3,4].map((i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: "1px solid #f8f8f8" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Skeleton width={34} height={34} borderRadius={10} />
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <Skeleton width={100} height={13} borderRadius={6} />
                  <Skeleton width={70} height={11} borderRadius={6} />
                </div>
              </div>
              <Skeleton width={70} height={22} borderRadius={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}