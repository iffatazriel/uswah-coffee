"use client";

// app/dashboard/table/_components/search-bar.tsx

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  return (
    <div style={{ position: "relative", flex: 1, maxWidth: 360 }}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: "absolute",
          left: 14,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#bbb",
          pointerEvents: "none",
        }}
      >
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
        <path
          d="M21 21l-4.35-4.35"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 14px 10px 40px",
          border: "1.5px solid #e8e8e8",
          borderRadius: 12,
          fontSize: 14,
          fontFamily: "'DM Sans', sans-serif",
          color: "#333",
          outline: "none",
          background: "white",
          transition: "border-color 0.15s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#FF5200")}
        onBlur={(e) => (e.target.style.borderColor = "#e8e8e8")}
      />
    </div>
  );
}