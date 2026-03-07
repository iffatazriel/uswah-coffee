"use client";

// app/dashboard/_components/skeleton.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Primitive skeleton block — dipakai oleh semua skeleton page
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";

type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  style?: React.CSSProperties;
};

export function Skeleton({ width = "100%", height = 16, borderRadius = 8, style }: SkeletonProps) {
  return (
    <>
      <div
        style={{
          width,
          height,
          borderRadius,
          background: "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.4s infinite",
          flexShrink: 0,
          ...style,
        }}
      />
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
}