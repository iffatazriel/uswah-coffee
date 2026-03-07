"use client";

// app/dashboard/page.tsx
import Link from "next/link";
import StatsCards from "@/components/pos/stats-cards";
import RecentOrders from "@/components/pos/recent-orders";
import LowStockPanel from "@/components/pos/low-stock-panel";
import TopSelling from "@/components/pos/top-selling";
import { Suspense } from "react";
import { SkeletonHome } from "@/components/pos/skeleton-home";

const QUICK_ACTIONS = [
  { label: "New Order",     href: "/dashboard/pos",     bg: "#FF5200", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg> },
  { label: "View Tables",   href: "/dashboard/table",   bg: "#0077b6", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 6v12M21 6v12M3 18h18" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg> },
  { label: "Stock Report",  href: "/dashboard/supply",  bg: "#1a7f4b", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" stroke="white" strokeWidth="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="white" strokeWidth="2"/></svg> },
  { label: "Sales Report",  href: "/dashboard/report",  bg: "#7b2d8b", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg> },
];

export default function DashboardHome() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <Suspense fallback={<SkeletonHome />}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          padding: "24px 28px",
          gap: 20,
        }}
      >
        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0);    }
          }
        `}</style>

        {/* ── Top header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            animation: "fadeSlideUp 0.4s ease both",
          }}
        >
          <div>
            <p style={{ fontSize: 13, color: "#bbb", fontWeight: 500, marginBottom: 4 }}>{dateStr}</p>
            <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 700, color: "#1a1a1a" }}>
              Good morning, Iffatazriel 👋
            </h1>
          </div>

          {/* Clock + Quick Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Live clock chip */}
            <div
              style={{
                background: "white",
                border: "1.5px solid #f0f0f0",
                borderRadius: 12,
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#bbb" strokeWidth="2"/>
                <path d="M12 6v6l4 2" stroke="#FF5200" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>
                {timeStr}
              </span>
            </div>

            {/* Quick action buttons */}
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 16px",
                  borderRadius: 12,
                  background: action.bg,
                  color: "white",
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "opacity 0.15s, transform 0.15s",
                  boxShadow: `0 4px 12px ${action.bg}40`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {action.icon}
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Stats Cards ── */}
        <div style={{ flexShrink: 0, animation: "fadeSlideUp 0.5s ease 0.1s both" }}>
          <StatsCards />
        </div>

        {/* ── Bottom row: Recent Orders + Low Stock ── */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flex: 1,
            overflow: "hidden",
            animation: "fadeSlideUp 0.5s ease 0.2s both",
          }}
        >
          <RecentOrders />
          <LowStockPanel />
        </div>

        {/* ── Top Selling ── */}
        <div
          style={{
            flexShrink: 0,
            animation: "fadeSlideUp 0.5s ease 0.3s both",
          }}
        >
          <TopSelling />
        </div>
      </div>
    </Suspense>
  );
}