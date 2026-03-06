"use client";

import { TableData } from "./constants/item";

// app/dashboard/table/_components/table-card.tsx

type Props = {
  table: TableData;
  onClick?: (table: TableData) => void;
};

export default function TableCard({ table, onClick }: Props) {
  const isAvailable = table.status === "Available";

  return (
    <div
      onClick={() => onClick?.(table)}
      style={{
        background: "white",
        borderRadius: 16,
        padding: "18px 16px",
        cursor: "pointer",
        border: `1.5px solid ${isAvailable ? "#ffe0cc" : "#f0f0f0"}`,
        transition: "all 0.2s ease",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = isAvailable
          ? "0 8px 24px rgba(255,82,0,0.15)"
          : "0 8px 24px rgba(0,0,0,0.07)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Table name row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Table icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          style={{ color: isAvailable ? "#FF5200" : "#bbb", flexShrink: 0 }}
        >
          <path
            d="M3 6h18M3 6v12M21 6v12M3 18h18M8 6v12M16 6v12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span
          style={{
            fontWeight: 600,
            fontSize: 14,
            color: "#1a1a1a",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {table.name}
        </span>
      </div>

      {/* Guest label */}
      <p style={{ fontSize: 13, color: "#bbb", fontWeight: 400 }}>
        {table.guest}
      </p>

      {/* Status badge */}
      <div
        style={{
          width: "100%",
          padding: "10px 0",
          borderRadius: 10,
          background: isAvailable ? "#FF5200" : "#e8e8e8",
          color: isAvailable ? "white" : "#bbb",
          textAlign: "center",
          fontWeight: 600,
          fontSize: 13,
          fontFamily: "'DM Sans', sans-serif",
          transition: "background 0.15s",
        }}
      >
        {table.status}
      </div>
    </div>
  );
}