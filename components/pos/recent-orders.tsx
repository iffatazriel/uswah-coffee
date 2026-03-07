"use client";

// app/dashboard/_components/recent-orders.tsx
import Link from "next/link";

const RECENT_ORDERS = [
  { id: "#024", table: "Table 4C", items: "3x Burger, 2x OJ", total: 9.50,  status: "Delivered",    time: "2 min ago"  },
  { id: "#023", table: "Table 2A", items: "1x Pizza, 1x Tea",  total: 3.40,  status: "Being Cooked", time: "5 min ago"  },
  { id: "#022", table: "Table 7B", items: "2x Spaghetti",      total: 7.00,  status: "Delivered",    time: "12 min ago" },
  { id: "#021", table: "Table 1A", items: "4x Fries, 3x OJ",   total: 7.80,  status: "Delivered",    time: "18 min ago" },
  { id: "#020", table: "Table 5C", items: "2x Pizza, 1x Juice", total: 6.20, status: "Cancelled",    time: "24 min ago" },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  "Delivered":    { bg: "#e8f5e9", color: "#2e7d32" },
  "Being Cooked": { bg: "#fff3e0", color: "#e65100" },
  "Cancelled":    { bg: "#ffebee", color: "#c62828" },
};

export default function RecentOrders() {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 18,
        border: "1.5px solid #f0f0f0",
        overflow: "hidden",
        flex: 1,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 20px",
          borderBottom: "1.5px solid #f8f8f8",
        }}
      >
        <div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>
            Recent Orders
          </h2>
          <p style={{ fontSize: 12, color: "#bbb", marginTop: 2 }}>Last 5 transactions</p>
        </div>
        <Link
          href="/dashboard/history"
          style={{
            fontSize: 13,
            color: "#FF5200",
            fontWeight: 600,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          View all
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Link>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["Order", "Table", "Items", "Total", "Status", "Time"].map((h) => (
              <th
                key={h}
                style={{
                  padding: "10px 20px",
                  textAlign: "left",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#bbb",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  borderBottom: "1px solid #f8f8f8",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RECENT_ORDERS.map((order) => (
            <tr
              key={order.id}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
              style={{ transition: "background 0.1s", cursor: "default" }}
            >
              <td style={{ padding: "13px 20px", fontSize: 13, fontWeight: 700, color: "#FF5200" }}>{order.id}</td>
              <td style={{ padding: "13px 20px", fontSize: 13, color: "#1a1a1a", fontWeight: 500 }}>{order.table}</td>
              <td style={{ padding: "13px 20px", fontSize: 12, color: "#888", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{order.items}</td>
              <td style={{ padding: "13px 20px", fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>${order.total.toFixed(2)}</td>
              <td style={{ padding: "13px 20px" }}>
                <span style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 600,
                  background: STATUS_STYLES[order.status]?.bg,
                  color: STATUS_STYLES[order.status]?.color,
                }}>
                  {order.status}
                </span>
              </td>
              <td style={{ padding: "13px 20px", fontSize: 12, color: "#bbb" }}>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}