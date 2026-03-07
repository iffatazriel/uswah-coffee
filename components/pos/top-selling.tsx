"use client";

// app/dashboard/_components/top-selling.tsx
import Link from "next/link";

const TOP_ITEMS = [
  { rank: 1, name: "Avogato",          sold: 89, revenue: 133.50, emoji: "☕", change: 12  },
  { rank: 2, name: "Beef Burger",      sold: 64, revenue: 96.00,  emoji: "🍔", change: 5   },
  { rank: 3, name: "Pepperoni Pizza",  sold: 51, revenue: 127.50, emoji: "🍕", change: -3  },
  { rank: 4, name: "French Fries",     sold: 48, revenue: 57.60,  emoji: "🍟", change: 8   },
  { rank: 5, name: "Spaghetti Carb.",  sold: 32, revenue: 112.00, emoji: "🍝", change: 2   },
];

const MAX_SOLD = Math.max(...TOP_ITEMS.map((i) => i.sold));

export default function TopSelling() {
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
            Top Selling Today
          </h2>
          <p style={{ fontSize: 12, color: "#bbb", marginTop: 2 }}>Best performing items</p>
        </div>
        <Link
          href="/dashboard/report"
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
          Full report
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Link>
      </div>

      {/* Items */}
      <div style={{ padding: "8px 0" }}>
        {TOP_ITEMS.map((item) => (
          <div
            key={item.rank}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 20px",
              transition: "background 0.1s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            {/* Rank */}
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: item.rank === 1 ? "#FF5200" : "#f5f5f5",
                color: item.rank === 1 ? "white" : "#bbb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {item.rank}
            </span>

            {/* Emoji */}
            <span style={{ fontSize: 24, flexShrink: 0 }}>{item.emoji}</span>

            {/* Name + bar */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{item.name}</span>
                <span style={{ fontSize: 12, color: "#bbb" }}>{item.sold} sold</span>
              </div>
              <div style={{ height: 5, borderRadius: 10, background: "#f0f0f0", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    borderRadius: 10,
                    background: item.rank === 1 ? "#FF5200" : "#ffb899",
                    width: `${(item.sold / MAX_SOLD) * 100}%`,
                    transition: "width 0.8s ease",
                  }}
                />
              </div>
            </div>

            {/* Revenue + change */}
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>
                ${item.revenue.toFixed(2)}
              </p>
              <p style={{ fontSize: 11, color: item.change >= 0 ? "#1a7f4b" : "#c0392b", marginTop: 1 }}>
                {item.change >= 0 ? "+" : ""}{item.change}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}