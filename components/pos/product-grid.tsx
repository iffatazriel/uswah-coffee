"use client";

import { usePOSStore } from "@/lib/store/pos-store";
// app/dashboard/pos/_components/product-grid.tsx
import { useState } from "react";
import { CATEGORIES, PRODUCTS } from "./types";


export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = usePOSStore();

  const filtered =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        padding: "20px 20px 20px 24px",
      }}
    >
      {/* Category Pills */}
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 16,
          flexShrink: 0,
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 18px",
                borderRadius: 20,
                border: `1.5px solid ${isActive ? "#FF5200" : "#e8e8e8"}`,
                background: isActive ? "#FF5200" : "white",
                color: isActive ? "white" : "#666",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.15s",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
          gap: 12,
          alignContent: "start",
          paddingRight: 4,
        }}
      >
        {filtered.map((product) => (
          <div
            key={product.id}
            onClick={() => addToCart(product)}
            style={{
              background: "white",
              borderRadius: 16,
              padding: 14,
              cursor: "pointer",
              border: "1.5px solid transparent",
              transition: "all 0.2s",
              userSelect: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(255,82,0,0.12)";
              e.currentTarget.style.borderColor = "#FF5200";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "transparent";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.97)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
          >
            {/* Emoji thumbnail */}
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                background: "#f9f4f0",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 44,
                marginBottom: 12,
              }}
            >
              {product.emoji}
            </div>

            <p
              style={{
                fontWeight: 600,
                fontSize: 13,
                color: "#1a1a1a",
                marginBottom: 6,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {product.name}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  background: "#fff5ef",
                  color: "#FF5200",
                  padding: "2px 8px",
                  borderRadius: 20,
                  fontWeight: 500,
                }}
              >
                {product.category}
              </span>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#1a1a1a",
                }}
              >
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}