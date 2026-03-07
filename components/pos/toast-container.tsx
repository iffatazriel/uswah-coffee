"use client";

// app/dashboard/_components/toast-container.tsx
import { useToastStore, type Toast, type ToastType } from "@/lib/store/toast-store";
import { useEffect, useState } from "react";

const CONFIG: Record<ToastType, { bg: string; border: string; color: string; icon: React.ReactNode }> = {
  success: {
    bg: "#f0fdf4",
    border: "#86efac",
    color: "#15803d",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#15803d" />
        <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  error: {
    bg: "#fff1f2",
    border: "#fca5a5",
    color: "#b91c1c",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#b91c1c" />
        <path d="M15 9l-6 6M9 9l6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  warning: {
    bg: "#fffbeb",
    border: "#fcd34d",
    color: "#b45309",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="#b45309" />
        <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1.2" fill="white" />
      </svg>
    ),
  },
  info: {
    bg: "#eff6ff",
    border: "#93c5fd",
    color: "#1d4ed8",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#1d4ed8" />
        <line x1="12" y1="8" x2="12" y2="8" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <line x1="12" y1="12" x2="12" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
};

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  const [visible, setVisible] = useState(false);
  const cfg = CONFIG[toast.type];

  useEffect(() => {
    // Trigger slide-in
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onRemove, 300);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        background: cfg.bg,
        border: `1.5px solid ${cfg.border}`,
        borderRadius: 14,
        padding: "14px 16px",
        minWidth: 300,
        maxWidth: 380,
        boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
        transform: visible ? "translateX(0)" : "translateX(110%)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 3,
          background: cfg.color,
          borderRadius: "0 0 0 14px",
          animation: `shrink ${(toast.duration ?? 3500)}ms linear forwards`,
          opacity: 0.4,
        }}
      />

      {/* Icon */}
      <div style={{ flexShrink: 0, marginTop: 1 }}>{cfg.icon}</div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: cfg.color, fontFamily: "'DM Sans', sans-serif" }}>
          {toast.title}
        </p>
        {toast.message && (
          <p style={{ fontSize: 12, color: cfg.color, opacity: 0.75, marginTop: 3, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
            {toast.message}
          </p>
        )}
      </div>

      {/* Close */}
      <button
        onClick={handleClose}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: cfg.color,
          opacity: 0.5,
          padding: 2,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          borderRadius: 4,
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%;   }
        }
      `}</style>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts, remove } = useToastStore();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        pointerEvents: "none",
      }}
    >
      {toasts.map((t) => (
        <div key={t.id} style={{ pointerEvents: "all" }}>
          <ToastItem toast={t} onRemove={() => remove(t.id)} />
        </div>
      ))}
    </div>
  );
}