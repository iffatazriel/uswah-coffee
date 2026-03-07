"use client";

// app/dashboard/pos/_components/order-panel.tsx
import { useState } from "react";
import { usePOSStore, type PaymentMethod } from "@/lib/store/pos-store";
import { toast } from "@/lib/store/toast-store";
import { PRODUCTS } from "./types";
import { placeOrderAction } from "@/app/actions/pos";


const PAYMENT_OPTIONS: { id: PaymentMethod; icon: React.ReactNode }[] = [
  {
    id: "Credit Card",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M2 10h20" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "Cash",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "QRIS",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
        <path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

// Map UI value → Prisma enum
const SERVICE_TYPE_MAP: Record<string, "DINE_IN" | "TAKE_AWAY" | "DELIVERY"> = {
  "Dine in":  "DINE_IN",
  "Take Away": "TAKE_AWAY",
  "Delivery":  "DELIVERY",
};
const PAYMENT_MAP: Record<PaymentMethod, "CASH" | "CREDIT_CARD" | "QRIS"> = {
  Cash:          "CASH",
  "Credit Card": "CREDIT_CARD",
  QRIS:          "QRIS",
};

// TODO: replace with session/auth
const HARDCODED_SHIFT_ID = "SHIFT_ID_FROM_SESSION";

export default function OrderPanel() {
  const {
    cart,
    updateQty,
    tableNo,
    orderType,
    paymentMethod,
    setTableNo,
    setOrderType,
    setPaymentMethod,
    clearCart,
  } = usePOSStore();

  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax      = subtotal * 0.11;
  const total    = subtotal + tax;

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast.warning("Cart kosong", "Tambahkan item sebelum membuat order.");
      return;
    }

    setLoading(true);
    try {
      await placeOrderAction({
        shiftId:       HARDCODED_SHIFT_ID,
        typeOfService: SERVICE_TYPE_MAP[orderType] ?? "DINE_IN",
        paymentMethod: PAYMENT_MAP[paymentMethod],
        items: cart.map((item) => ({
          productId: item.id,
          name:      item.name,
          price:     item.price,
          qty:       item.qty,
        })),
      });

      clearCart();
      toast.success("Order berhasil!", `${cart.length} item dikirim ke dapur. Total: $${total.toFixed(2)}`);
    } catch (err) {
      console.error(err);
      toast.error("Gagal membuat order", "Periksa koneksi database dan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside
      style={{
        width: 320,
        background: "white",
        borderLeft: "1px solid #f0f0f0",
        display: "flex",
        flexDirection: "column",
        padding: "20px 16px",
        gap: 12,
        flexShrink: 0,
        overflowY: "auto",
      }}
    >
      {/* ── Table & Order Type ── */}
      <div style={{ display: "flex", gap: 8 }}>
        {[
          {
            value: tableNo,
            setter: setTableNo,
            options: ["Table 20", "Table 1", "Table 2", "Table 3", "Table 4", "Table 5"],
          },
          {
            value: orderType,
            setter: setOrderType,
            options: ["Dine in", "Take Away", "Delivery"],
          },
        ].map(({ value, setter, options }) => (
          <div key={value} style={{ flex: 1, position: "relative" }}>
            <select
              value={value}
              onChange={(e) => setter(e.target.value)}
              style={{
                width: "100%",
                appearance: "none",
                background: "white",
                border: "1.5px solid #e8e8e8",
                borderRadius: 10,
                padding: "8px 28px 8px 12px",
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                color: "#333",
                cursor: "pointer",
                fontWeight: 500,
                outline: "none",
              }}
            >
              {options.map((o) => <option key={o}>{o}</option>)}
            </select>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <path d="M6 9l6 6 6-6" stroke="#999" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        ))}
      </div>

      {/* ── Cart Items ── */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          minHeight: 120,
        }}
      >
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "32px 20px", color: "#ccc" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🛒</div>
            <p style={{ fontSize: 13 }}>No items yet. Tap a product to add.</p>
          </div>
        ) : (
          cart.map((item) => {
            const product = PRODUCTS.find((p) => p.id === item.id);
            return (
              <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Thumbnail */}
                <div
                  style={{
                    width: 50, height: 50, borderRadius: 12,
                    background: "#f9f4f0", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: 24, flexShrink: 0,
                  }}
                >
                  {product?.emoji ?? "🍽️"}
                </div>

                {/* Name & Price */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: 13, color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: 13, color: "#FF5200", fontWeight: 700 }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>

                {/* Qty Controls */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <button onClick={() => updateQty(item.id, -1)}
                    style={{
                      width: 28, height: 28, borderRadius: 8, border: "1.5px solid #e8e8e8",
                      background: "white", cursor: "pointer", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: 16, color: "#333", fontFamily: "'DM Sans', sans-serif",
                    }}>−</button>
                  <span style={{ fontWeight: 600, fontSize: 14, minWidth: 20, textAlign: "center" }}>
                    {item.qty}
                  </span>
                  <button onClick={() => updateQty(item.id, 1)}
                    style={{
                      width: 28, height: 28, borderRadius: 8, border: "1.5px solid #e8e8e8",
                      background: "white", cursor: "pointer", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: 16, color: "#333", fontFamily: "'DM Sans', sans-serif",
                    }}>+</button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: "#f0f0f0", flexShrink: 0 }} />

      {/* ── Totals ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
        {[
          { label: "Sub Total", value: `$${subtotal.toFixed(2)}` },
          { label: "Tax (11%)", value: `$${tax.toFixed(2)}` },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#999" }}>
            <span>{label}</span>
            <span style={{ color: "#333", fontWeight: 500 }}>{value}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginTop: 4 }}>
          <span>Total</span>
          <span style={{ color: "#FF5200" }}>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* ── Payment Method ── */}
      <div style={{ flexShrink: 0 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
          Payment Method
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          {PAYMENT_OPTIONS.map(({ id, icon }) => {
            const isActive = paymentMethod === id;
            return (
              <button key={id} onClick={() => setPaymentMethod(id)}
                style={{
                  flex: 1, padding: "12px 6px", borderRadius: 14,
                  border: `2px solid ${isActive ? "#FF5200" : "#e8e8e8"}`,
                  background: isActive ? "#fff5ef" : "white",
                  cursor: "pointer", display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 6, fontSize: 11,
                  color: isActive ? "#FF5200" : "#666",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 500, transition: "all 0.15s",
                }}>
                {icon}
                {id}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Place Order ── */}
      <button
        onClick={handlePlaceOrder}
        disabled={cart.length === 0 || loading}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: 16,
          border: "none",
          background: cart.length === 0 || loading ? "#f0e8e0" : "#FF5200",
          color: cart.length === 0 || loading ? "#ccc" : "white",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: 16,
          cursor: cart.length === 0 || loading ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          boxShadow: cart.length > 0 && !loading ? "0 4px 16px rgba(255,82,0,0.3)" : "none",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
        onMouseEnter={(e) => {
          if (cart.length > 0 && !loading) {
            e.currentTarget.style.background = "#e04800";
            e.currentTarget.style.transform = "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          if (cart.length > 0 && !loading) {
            e.currentTarget.style.background = "#FF5200";
            e.currentTarget.style.transform = "translateY(0)";
          }
        }}
      >
        {loading ? (
          <>
            {/* Spinner */}
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              style={{ animation: "spin 0.8s linear infinite" }}
            >
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Processing...
          </>
        ) : (
          "Place Order"
        )}

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
        `}</style>
      </button>
    </aside>
  );
}