"use client";

import { ACTIVE_ORDERS, STATUS_STYLES } from "./types";

// app/dashboard/pos/_components/top-bar.tsx


export default function TopBar() {
  return (
    <header
      style={{
        background: "white",
        borderBottom: "1px solid #f0f0f0",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        flexShrink: 0,
      }}
    >
      {/* Close Order */}
      <button
        style={{
          padding: "10px 20px",
          borderRadius: 12,
          border: "none",
          background: "#b71c1c",
          color: "white",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
          flexShrink: 0,
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#c62828")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#b71c1c")}
      >
        Close Order
      </button>

      {/* Active Orders Scroll */}
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: 12,
          overflowX: "auto",
          padding: "2px 0",
        }}
      >
        {ACTIVE_ORDERS.map((order) => (
          <div
            key={order.id}
            style={{
              background: "white",
              border: "1.5px solid #f0f0f0",
              borderRadius: 14,
              padding: "12px 14px",
              minWidth: 220,
              cursor: "pointer",
              transition: "border-color 0.15s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "#FF5200")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "#f0f0f0")
            }
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: "#fff5ef",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 11l3 3L22 4"
                    stroke="#FF5200"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                    stroke="#FF5200"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span
                style={{ fontWeight: 600, fontSize: 13, color: "#1a1a1a" }}
              >
                {order.cashier}
              </span>
              <span
                style={{ fontSize: 12, color: "#bbb", marginLeft: "auto" }}
              >
                {order.id}
              </span>
            </div>

            <p style={{ fontSize: 12, color: "#999", marginBottom: 4 }}>
              {order.items} Items • Table {order.table}
            </p>
            <p
              style={{
                fontSize: 11,
                color: "#ccc",
                marginBottom: 8,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Order: {order.order}
            </p>

            <span
              style={{
                display: "inline-block",
                padding: "3px 10px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 600,
                background: STATUS_STYLES[order.status]?.bg,
                color: STATUS_STYLES[order.status]?.color,
              }}
            >
              {order.status}
            </span>
          </div>
        ))}
      </div>

      {/* Staff Info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <div style={{ textAlign: "right" }}>
          <p style={{ fontWeight: 600, fontSize: 14, color: "#1a1a1a" }}>
            Avita Desi
          </p>
          <p style={{ fontSize: 12, color: "#bbb" }}>#0022</p>
        </div>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "#0077b6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          A
        </div>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#bbb",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}