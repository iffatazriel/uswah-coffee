"use client";

// app/page.tsx
import { startShiftAction } from "@/app/actions/auth";

import { useState } from "react";
import Numpad from "@/components/auth/numpad";
import PinDisplay from "@/components/auth/pin-display";
import { CASHIERS, useAuthStore } from "@/lib/store/auth-store";

export default function LoginPage() {
  const { pin, selectedCashier, setCashier } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState("");

  return (
    <main style={{ minHeight: "100vh", display: "flex", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .left-panel {
          width: 48%;
          background: #1a0a00;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 56px 52px;
        }
        @media (max-width: 900px) {
          .left-panel { display: none; }
          .right-panel { width: 100% !important; }
        }

        .glow-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
        }

        .cashier-option { transition: background 0.15s; cursor: pointer; }
        .cashier-option:hover { background: #fff5ef; }

        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .shake { animation: shake 0.5s ease; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.6s ease both; }
      `}</style>

      {/* ── LEFT PANEL ── */}
      <div className="left-panel">
        <div className="glow-blob" style={{ width: 360, height: 360, background: "#FF5200", top: -100, left: -100 }} />
        <div className="glow-blob" style={{ width: 240, height: 240, background: "#c84b00", bottom: 60, right: -60 }} />

        <div style={{ position: "relative", zIndex: 2 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 64 }}>
            <div style={{ width: 44, height: 44, background: "#FF5200", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(255,82,0,0.4)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" stroke="white" strokeWidth="2"/>
                <line x1="6" y1="1" x2="6" y2="4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="10" y1="1" x2="10" y2="4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="14" y1="1" x2="14" y2="4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ color: "#fff", fontWeight: 500, fontSize: 15, letterSpacing: 2, textTransform: "uppercase", opacity: 0.8 }}>
              Uswah Coffee
            </span>
          </div>

          <p style={{ color: "#FF7733", fontWeight: 300, fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>
            Point of Sale
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "clamp(36px,4vw,52px)", lineHeight: 1.15, fontWeight: 700, marginBottom: 16 }}>
            Transform Your<br/>
            <em style={{ color: "#FF7733" }}>Business</em><br/>
            with Makaryo.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300, fontSize: 15, lineHeight: 1.7 }}>
            Fast transactions. Smooth operations.<br/>Everything a modern café needs.
          </p>
        </div>

        {/* Stats */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", gap: 40 }}>
          {[["247", "Orders Today"], ["Rp 4.2M", "Revenue"], ["98%", "Uptime"]].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 28, fontWeight: 700 }}>{val}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        className="right-panel"
        style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", background: "#fdf8f4" }}
      >
        <div className="fade-in" style={{ width: "100%", maxWidth: 380 }}>

          {/* Header */}
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <p style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#FF5200", fontWeight: 500, marginBottom: 10 }}>
              Welcome back
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#1a0a00", fontWeight: 700 }}>
              Cashier Login
            </h2>
            <p style={{ color: "#aaa", fontSize: 14, marginTop: 6 }}>
              Select your profile and enter your PIN.
            </p>
          </div>

          <form
            action={async (formData) => {
              setError("");
              try {
                await startShiftAction(formData);
              } catch (e: any) {
                setError(e.message ?? "Terjadi kesalahan.");
              }
            }}
          >
            {/* Hidden fields */}
            <input type="hidden" name="pin"     value={pin} />
            <input type="hidden" name="staffId" value={selectedCashier.id} />

            {/* Cashier selector */}
            <div style={{ marginBottom: 24, position: "relative" }}>
              <div
                onClick={() => setDropdownOpen((o) => !o)}
                style={{
                  border: `1.5px solid ${dropdownOpen ? "#FF5200" : "#edddd0"}`,
                  borderRadius: 16, padding: "12px 16px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  cursor: "pointer", background: "white", transition: "all 0.2s",
                  boxShadow: dropdownOpen ? "0 4px 20px rgba(255,82,0,0.12)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: selectedCashier.color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700 }}>
                    {selectedCashier.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14, color: "#1a0a00" }}>{selectedCashier.name}</div>
                    <div style={{ fontSize: 12, color: "#bbb" }}>{selectedCashier.shift}</div>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                  <path d="M6 9l6 6 6-6" stroke="#bbb" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              {dropdownOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, background: "white", border: "1.5px solid #edddd0", borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.1)", zIndex: 10 }}>
                  {CASHIERS.map((c) => (
                    <div
                      key={c.id}
                      className="cashier-option"
                      onClick={() => { setCashier(c); setDropdownOpen(false); }}
                      style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, background: c.id === selectedCashier.id ? "#fff5ef" : "white" }}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700 }}>
                        {c.avatar}
                      </div>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 14, color: "#1a0a00" }}>{c.name}</div>
                        <div style={{ fontSize: 12, color: "#bbb" }}>{c.shift}</div>
                      </div>
                      {c.id === selectedCashier.id && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginLeft: "auto" }}>
                          <path d="M20 6L9 17l-5-5" stroke="#FF5200" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PIN label */}
            <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#bbb", textAlign: "center", marginBottom: 4 }}>
              Enter your PIN
            </p>

            {/* PIN dots */}
            <PinDisplay />

            {/* Error message */}
            {error && (
              <p style={{ color: "#c0392b", fontSize: 13, textAlign: "center", marginTop: 8, fontWeight: 500 }}>
                ⚠ {error}
              </p>
            )}

            {/* Forgot PIN */}
            <div style={{ textAlign: "center", margin: "10px 0 20px" }}>
              <button type="button" style={{ background: "none", border: "none", fontSize: 13, color: "#FF5200", cursor: "pointer", opacity: 0.8 }}>
                Forgot PIN?
              </button>
            </div>

            {/* Numpad */}
            <Numpad />

            {/* Start Shift */}
            <button
              type="submit"
              disabled={pin.length < 4}
              style={{
                width: "100%", padding: "16px", borderRadius: 16, border: "none",
                background: pin.length >= 4 ? "#FF5200" : "#f0e8e0",
                color: pin.length >= 4 ? "white" : "#ccc",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16,
                cursor: pin.length >= 4 ? "pointer" : "not-allowed",
                transition: "all 0.2s ease",
                boxShadow: pin.length >= 4 ? "0 8px 28px rgba(255,82,0,0.3)" : "none",
              }}
            >
              Start Shift ☕
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}