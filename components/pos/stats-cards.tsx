"use client";

// app/dashboard/_components/stats-cards.tsx

const STATS = [
  {
    label: "Total Orders Today",
    value: "247",
    delta: "+18 from yesterday",
    positive: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    bg: "#FF5200",
    glow: "rgba(255,82,0,0.25)",
  },
  {
    label: "Revenue Today",
    value: "Rp 4.2M",
    delta: "+12% from yesterday",
    positive: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <line x1="12" y1="1" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    bg: "#1a7f4b",
    glow: "rgba(26,127,75,0.2)",
  },
  {
    label: "Tables Occupied",
    value: "14 / 20",
    delta: "6 tables available",
    positive: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 6h18M3 6v12M21 6v12M3 18h18M8 6v12M16 6v12" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    bg: "#0077b6",
    glow: "rgba(0,119,182,0.2)",
  },
  {
    label: "Low Stock Alerts",
    value: "5 items",
    delta: "2 out of stock",
    positive: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="white" strokeWidth="2" />
        <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1" fill="white" />
      </svg>
    ),
    bg: "#c0392b",
    glow: "rgba(192,57,43,0.2)",
  },
];

export default function StatsCards() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
        marginBottom: 24,
      }}
    >
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          style={{
            background: "white",
            borderRadius: 18,
            padding: "20px 20px",
            border: "1.5px solid #f0f0f0",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            animation: `fadeSlideUp 0.5s ease ${i * 0.08}s both`,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 12, color: "#bbb", fontWeight: 500, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {stat.label}
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, color: "#1a1a1a", lineHeight: 1 }}>
                {stat.value}
              </p>
            </div>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                background: stat.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 4px 16px ${stat.glow}`,
                flexShrink: 0,
              }}
            >
              {stat.icon}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              {stat.positive
                ? <path d="M18 15l-6-6-6 6" stroke="#1a7f4b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                : <path d="M6 9l6 6 6-6" stroke="#c0392b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              }
            </svg>
            <span style={{ fontSize: 12, color: stat.positive ? "#1a7f4b" : "#c0392b", fontWeight: 500 }}>
              {stat.delta}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}