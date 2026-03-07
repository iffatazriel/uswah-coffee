"use client";

// components/auth/pin-display.tsx
import { useAuthStore } from "@/lib/store/auth-store";

export default function PinDisplay() {
  const { pin } = useAuthStore();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 14,
          margin: "24px 0 8px",
        }}
        className="pin-row"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: `2px solid ${i < pin.length ? "#FF5200" : "#d97706"}`,
              background: i < pin.length ? "#FF5200" : "transparent",
              transform: i < pin.length ? "scale(1.15)" : "scale(1)",
              boxShadow: i < pin.length ? "0 0 10px rgba(255,82,0,0.5)" : "none",
              transition: "all 0.2s ease",
            }}
          />
        ))}
      </div>
    </>
  );
}