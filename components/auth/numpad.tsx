"use client";

// components/auth/numpad.tsx
import { useAuthStore } from "@/lib/store/auth-store";

const KEYS = ["1","2","3","4","5","6","7","8","9","⌫","0","✓"];

export default function Numpad() {
  const { appendPin, deletePin } = useAuthStore();

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          margin: "0 0 24px",
        }}
      >
        {KEYS.map((k) => {
          const isDel    = k === "⌫";
          const isSubmit = k === "✓";

          return (
            <button
              key={k}
              type={isSubmit ? "submit" : "button"}
              onClick={isDel ? deletePin : isSubmit ? undefined : () => appendPin(k)}
              className={`numpad-btn ${isSubmit ? "action" : isDel ? "del" : ""}`}
              style={{
                aspectRatio: "1",
                borderRadius: 16,
                border: `1.5px solid ${isSubmit ? "#FF5200" : "#ffe8d6"}`,
                background: isSubmit ? "#FF5200" : isDel ? "#fff5ef" : "white",
                fontSize: 22,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                color: isSubmit ? "white" : isDel ? "#FF5200" : "#1a0a00",
                cursor: "pointer",
                transition: "all 0.15s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {isDel ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="18" y1="9" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="12" y1="9" x2="18" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : isSubmit ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : k}
            </button>
          );
        })}
      </div>

      <style>{`
        .numpad-btn:hover {
          background: #fff5ef !important;
          border-color: #FF5200 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(255,82,0,0.15) !important;
        }
        .numpad-btn.action:hover {
          background: #e04800 !important;
        }
        .numpad-btn:active { transform: scale(0.94) !important; }
      `}</style>
    </>
  );
}