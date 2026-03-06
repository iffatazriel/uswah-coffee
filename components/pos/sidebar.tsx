"use client";

import { usePOSStore } from "@/lib/store/pos-store";
// app/dashboard/pos/_components/sidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./types";


export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = usePOSStore();
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: sidebarCollapsed ? 72 : 260,
        background: "white",
        display: "flex",
        flexDirection: "column",
        padding: "20px 12px",
        borderRight: "1px solid #f0f0f0",
        transition: "width 0.25s ease",
        overflow: "hidden",
        flexShrink: 0,
        height: "100vh",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "4px 8px",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            background: "#FF5200",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" stroke="white" strokeWidth="2" />
            <line x1="6" y1="1" x2="6" y2="4" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="10" y1="1" x2="10" y2="4" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="14" y1="1" x2="14" y2="4" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {!sidebarCollapsed && (
          <span
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: "#1a1a1a",
              whiteSpace: "nowrap",
            }}
          >
            Makaryo
          </span>
        )}

        <button
          onClick={toggleSidebar}
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#bbb",
            flexShrink: 0,
            padding: 4,
            borderRadius: 6,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="2" rx="1" fill="currentColor" />
            <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
            <rect x="3" y="18" width="18" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Cashier Info */}
      {!sidebarCollapsed && (
        <div
          style={{
            border: "1.5px solid #f0f0f0",
            borderRadius: 14,
            padding: "12px 14px",
            marginBottom: 20,
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "#bbb",
              fontWeight: 500,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Cashier
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#c84b00",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                B
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, color: "#1a1a1a" }}>Broicad</p>
                <p style={{ fontSize: 11, color: "#bbb" }}>10:00 Am – 22:00 Pm</p>
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M7 15l5-5 5 5" stroke="#bbb" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 9l5 5 5-5" stroke="#bbb" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 16px",
                borderRadius: 12,
                textDecoration: "none",
                color: isActive ? "white" : "#aaa",
                background: isActive ? "#FF5200" : "transparent",
                fontWeight: 500,
                fontSize: 14,
                transition: "all 0.15s",
              }}
            >
              <span
                style={{ flexShrink: 0 }}
                dangerouslySetInnerHTML={{ __html: item.icon }}
              />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "11px 16px",
          borderRadius: 12,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#FF5200",
          fontWeight: 500,
          fontSize: 14,
          marginTop: 8,
          width: "100%",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {!sidebarCollapsed && <span>Log out</span>}
      </button>
    </aside>
  );
}