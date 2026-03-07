"use client";

// app/dashboard/_components/skeleton-table.tsx
// Dipakai oleh: History, Report, Supply (semua punya layout tabel serupa)
import { Skeleton } from "./skeleton";

type Props = {
  columns?: number;
  rows?: number;
  hasActionCol?: boolean;   // History & Supply punya kolom action
  hasStatusCol?: boolean;   // Supply punya badge status
  hasDownloadBtns?: boolean; // Report punya tombol download
};

export function SkeletonTable({
  columns = 5,
  rows = 12,
  hasActionCol = false,
  hasStatusCol = false,
  hasDownloadBtns = false,
}: Props) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", padding: "20px 28px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexShrink: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <Skeleton width={160} height={20} borderRadius={8} />
          <Skeleton width={220} height={12} borderRadius={6} />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {hasDownloadBtns && <>
            <Skeleton width={140} height={38} borderRadius={12} />
            <Skeleton width={150} height={38} borderRadius={12} />
          </>}
          <Skeleton width={120} height={38} borderRadius={12} />
        </div>
      </div>

      {/* Summary chips */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexShrink: 0 }}>
        {[140, 110, 130].map((w, i) => (
          <Skeleton key={i} width={w} height={38} borderRadius={12} />
        ))}
      </div>

      {/* Table */}
      <div style={{ flex: 1, background: "white", borderRadius: 16, overflow: "hidden", border: "1px solid #f0f0f0", display: "flex", flexDirection: "column" }}>
        <div style={{ overflowY: "auto", flex: 1 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>

            {/* Thead */}
            <thead>
              <tr style={{ borderBottom: "1.5px solid #f0f0f0" }}>
                {/* # */}
                <th style={{ padding: "14px 16px", width: 52 }}>
                  <Skeleton width={20} height={11} />
                </th>
                {/* Main columns */}
                {Array.from({ length: columns - 1 }).map((_, i) => (
                  <th key={i} style={{ padding: "14px 16px" }}>
                    <Skeleton width={[120, 100, 60, 80][i % 4]} height={11} />
                  </th>
                ))}
                {hasStatusCol && (
                  <th style={{ padding: "14px 16px", width: 140 }}>
                    <Skeleton width={60} height={11} />
                  </th>
                )}
                {hasActionCol && (
                  <th style={{ padding: "14px 16px", width: 90 }}>
                    <Skeleton width={50} height={11} />
                  </th>
                )}
              </tr>
            </thead>

            {/* Tbody */}
            <tbody>
              {Array.from({ length: rows }).map((_, rowIdx) => (
                <tr key={rowIdx} style={{ borderBottom: "1px solid #f8f8f8" }}>
                  <td style={{ padding: "16px 16px" }}>
                    <Skeleton width={24} height={13} />
                  </td>
                  {Array.from({ length: columns - 1 }).map((_, colIdx) => (
                    <td key={colIdx} style={{ padding: "16px 16px" }}>
                      <Skeleton width={[160, 90, 40, 70][colIdx % 4]} height={13} />
                    </td>
                  ))}
                  {hasStatusCol && (
                    <td style={{ padding: "16px 16px" }}>
                      <Skeleton width={90} height={24} borderRadius={20} />
                    </td>
                  )}
                  {hasActionCol && (
                    <td style={{ padding: "16px 16px", textAlign: "center" }}>
                      <Skeleton width={32} height={32} borderRadius={8} style={{ margin: "0 auto" }} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ borderTop: "1px solid #f0f0f0", padding: "12px 20px", display: "flex", justifyContent: "flex-end", gap: 6 }}>
          {[32, 32, 32, 32, 32].map((w, i) => (
            <Skeleton key={i} width={w} height={32} borderRadius={8} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Preset shortcut per halaman ───────────────────────────────────────────────
export function SkeletonHistory() {
  return <SkeletonTable columns={5} rows={13} hasActionCol={true} />;
}

export function SkeletonReport() {
  return <SkeletonTable columns={5} rows={13} hasDownloadBtns={true} />;
}

export function SkeletonSupply() {
  return <SkeletonTable columns={4} rows={12} hasStatusCol={true} hasActionCol={true} />;
}