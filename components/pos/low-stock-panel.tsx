"use client";

// app/dashboard/_components/low-stock-panel.tsx
import Link from "next/link";

const LOW_STOCK = [
  { name: "Vanilla Syrup",  qty: "250 ml",  status: "Running low"  },
  { name: "Caramel Syrup",  qty: "200 ml",  status: "Running low"  },
  { name: "Hazelnut Syrup", qty: "200 ml",  status: "Running low"  },
  { name: "Whipping Cream", qty: "0 ml",    status: "Out of stock" },
  { name: "Lemon Juice",    qty: "0 ml",    status: "Out of stock" },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  "Running low":   { bg: "#fff8e1", color: "#f57f17" },
  "Out of stock":  { bg: "#ffebee", color: "#c62828" },
};

export default function LowStockPanel() {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 18,
        border: "1.5px solid #f0f0f0",
        overflow: "hidden",
        width: 280,
        flexShrink: 0,
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
            Stock Alerts
          </h2>
          <p style={{ fontSize: 12, color: "#bbb", marginTop: 2 }}>Needs attention</p>
        </div>
        <Link
          href="/dashboard/supply"
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
          Manage
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Link>
      </div>

      {/* Items */}
      <div style={{ padding: "8px 0" }}>
        {LOW_STOCK.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 20px",
              borderBottom: i < LOW_STOCK.length - 1 ? "1px solid #f8f8f8" : "none",
              transition: "background 0.1s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: STATUS_STYLES[item.status]?.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  {item.status === "Running low" ? (
                    <>
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke={STATUS_STYLES[item.status].color} strokeWidth="2" />
                      <line x1="12" y1="9" x2="12" y2="13" stroke={STATUS_STYLES[item.status].color} strokeWidth="2" strokeLinecap="round" />
                      <circle cx="12" cy="17" r="1" fill={STATUS_STYLES[item.status].color} />
                    </>
                  ) : (
                    <>
                      <circle cx="12" cy="12" r="10" stroke={STATUS_STYLES[item.status].color} strokeWidth="2" />
                      <line x1="15" y1="9" x2="9" y2="15" stroke={STATUS_STYLES[item.status].color} strokeWidth="2" strokeLinecap="round" />
                      <line x1="9" y1="9" x2="15" y2="15" stroke={STATUS_STYLES[item.status].color} strokeWidth="2" strokeLinecap="round" />
                    </>
                  )}
                </svg>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{item.name}</p>
                <p style={{ fontSize: 11, color: "#bbb", marginTop: 1 }}>{item.qty} remaining</p>
              </div>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 8px",
                borderRadius: 20,
                background: STATUS_STYLES[item.status]?.bg,
                color: STATUS_STYLES[item.status]?.color,
                whiteSpace: "nowrap",
              }}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}