"use client";

import { FLOORS } from "./constants/item";

// app/dashboard/table/_components/floor-filter.tsx

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export function FloorFilter({ value, onChange }: Props) {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          appearance: "none",
          background: "white",
          border: "1.5px solid #e8e8e8",
          borderRadius: 12,
          padding: "10px 36px 10px 14px",
          fontSize: 14,
          fontFamily: "'DM Sans', sans-serif",
          color: "#333",
          cursor: "pointer",
          fontWeight: 500,
          outline: "none",
          minWidth: 130,
        }}
      >
        {FLOORS.map((f) => (
          <option key={f}>{f}</option>
        ))}
      </select>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          color: "#999",
        }}
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}