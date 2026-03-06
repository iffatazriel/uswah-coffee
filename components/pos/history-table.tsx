"use client";

// app/dashboard/history/_components/history-table.tsx
import { useState } from "react";
import {
  HISTORY_ITEMS,
  ITEMS_PER_PAGE,
  SERVICE_TYPE_COLORS,
  type HistoryItem,
} from "./constants/history";
import { Pagination } from "./pagination";

export default function HistoryTable() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<HistoryItem[]>(HISTORY_ITEMS);
  const [editingItem, setEditingItem] = useState<HistoryItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = items.filter((i) =>
    i.menuName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleteId(null);
  };

  const handleEdit = (updated: HistoryItem) => {
    setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    setEditingItem(null);
  };

  const COL_WIDTHS = {
    no: 52,
    menu: "auto",
    service: 160,
    qty: 80,
    total: 100,
    action: 110,
  };

  const thStyle: React.CSSProperties = {
    padding: "14px 16px",
    textAlign: "left",
    fontSize: 13,
    fontWeight: 600,
    color: "#999",
    background: "white",
    borderBottom: "1.5px solid #f0f0f0",
    whiteSpace: "nowrap",
  };

  const tdStyle: React.CSSProperties = {
    padding: "16px 16px",
    fontSize: 14,
    color: "#1a1a1a",
    borderBottom: "1px solid #f8f8f8",
    verticalAlign: "middle",
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        padding: "20px 28px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          gap: 16,
          flexShrink: 0,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: "#1a1a1a",
              marginBottom: 4,
            }}
          >
            Customer details for today
          </h1>
          <p style={{ fontSize: 13, color: "#bbb" }}>
            {filtered.length} total records
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Search */}
          <div style={{ position: "relative" }}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#bbb",
                pointerEvents: "none",
              }}
            >
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                padding: "10px 14px 10px 36px",
                border: "1.5px solid #e8e8e8",
                borderRadius: 12,
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                color: "#333",
                outline: "none",
                width: 280,
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#FF5200")}
              onBlur={(e) => (e.target.style.borderColor = "#e8e8e8")}
            />
          </div>

          {/* Filter icon button */}
          <button
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              border: "1.5px solid #e8e8e8",
              background: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#FF5200";
              e.currentTarget.style.color = "#FF5200";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e8e8e8";
              e.currentTarget.style.color = "#999";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Close Order */}
          <button
            style={{
              padding: "10px 20px",
              borderRadius: 12,
              border: "none",
              background: "#b71c1c",
              color: "white",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#c62828")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#b71c1c")}
          >
            Close Order
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          flex: 1,
          background: "white",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid #f0f0f0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ overflowY: "auto", flex: 1 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
              <tr>
                <th style={{ ...thStyle, width: COL_WIDTHS.no }}>#</th>
                <th style={{ ...thStyle }}>Menu Name</th>
                <th style={{ ...thStyle, width: COL_WIDTHS.service }}>Type Of Service</th>
                <th style={{ ...thStyle, width: COL_WIDTHS.qty, textAlign: "center" }}>QTY</th>
                <th style={{ ...thStyle, width: COL_WIDTHS.total, textAlign: "right" }}>Total</th>
                <th style={{ ...thStyle, width: COL_WIDTHS.action, textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      textAlign: "center",
                      padding: "60px 20px",
                      color: "#ccc",
                      fontSize: 14,
                    }}
                  >
                    No records found.
                  </td>
                </tr>
              ) : (
                paginated.map((item, idx) => (
                  <tr
                    key={item.id}
                    style={{ transition: "background 0.1s" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#fafafa")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "white")
                    }
                  >
                    {/* No */}
                    <td style={{ ...tdStyle, color: "#bbb", fontWeight: 500 }}>
                      {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                    </td>

                    {/* Menu Name */}
                    <td style={{ ...tdStyle, fontWeight: 500 }}>
                      {item.menuName}
                    </td>

                    {/* Type of Service */}
                    <td style={tdStyle}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 600,
                          background: SERVICE_TYPE_COLORS[item.typeOfService]?.bg,
                          color: SERVICE_TYPE_COLORS[item.typeOfService]?.color,
                        }}
                      >
                        {item.typeOfService}
                      </span>
                    </td>

                    {/* QTY */}
                    <td style={{ ...tdStyle, textAlign: "center", fontWeight: 600 }}>
                      {item.qty}
                    </td>

                    {/* Total */}
                    <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, color: "#FF5200" }}>
                      ${item.total.toFixed(2)}
                    </td>

                    {/* Actions */}
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          justifyContent: "center",
                        }}
                      >
                        {/* Edit */}
                        <button
                          onClick={() => setEditingItem(item)}
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            border: "1.5px solid #e8e8e8",
                            background: "white",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#999",
                            transition: "all 0.15s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#FF5200";
                            e.currentTarget.style.color = "#FF5200";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#e8e8e8";
                            e.currentTarget.style.color = "#999";
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteId(item.id)}
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            border: "none",
                            background: "#b71c1c",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#c62828")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "#b71c1c")
                          }
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination inside table card */}
        {totalPages > 1 && (
          <div
            style={{
              borderTop: "1px solid #f0f0f0",
              padding: "12px 20px",
              flexShrink: 0,
            }}
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* ── DELETE CONFIRM MODAL ── */}
      {deleteId !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
          onClick={() => setDeleteId(null)}
        >
          <div
            style={{
              background: "white",
              borderRadius: 20,
              padding: 32,
              width: 340,
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#fff0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <polyline points="3 6 5 6 21 6" stroke="#b71c1c" strokeWidth="2" strokeLinecap="round" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="#b71c1c" strokeWidth="2" strokeLinecap="round" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="#b71c1c" strokeWidth="2" />
              </svg>
            </div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 700, color: "#1a1a1a", textAlign: "center", marginBottom: 8 }}>
              Delete Record?
            </h2>
            <p style={{ fontSize: 14, color: "#bbb", textAlign: "center", marginBottom: 24 }}>
              This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setDeleteId(null)}
                style={{
                  flex: 1, padding: "12px", borderRadius: 12,
                  border: "1.5px solid #e8e8e8", background: "white",
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600, fontSize: 14, color: "#666",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                style={{
                  flex: 1, padding: "12px", borderRadius: 12,
                  border: "none", background: "#b71c1c", color: "white",
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600, fontSize: 14,
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {editingItem && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
          onClick={() => setEditingItem(null)}
        >
          <div
            style={{
              background: "white",
              borderRadius: 20,
              padding: 32,
              width: 380,
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 700, color: "#1a1a1a", marginBottom: 20 }}>
              Edit Record
            </h2>

            {/* Menu Name */}
            <label style={{ fontSize: 12, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
              Menu Name
            </label>
            <input
              value={editingItem.menuName}
              onChange={(e) => setEditingItem({ ...editingItem, menuName: e.target.value })}
              style={{
                width: "100%", padding: "10px 14px", border: "1.5px solid #e8e8e8",
                borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                marginBottom: 16, outline: "none", color: "#333",
              }}
            />

            {/* Type of Service */}
            <label style={{ fontSize: 12, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
              Type of Service
            </label>
            <select
              value={editingItem.typeOfService}
              onChange={(e) => setEditingItem({ ...editingItem, typeOfService: e.target.value as any })}
              style={{
                width: "100%", padding: "10px 14px", border: "1.5px solid #e8e8e8",
                borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                marginBottom: 16, outline: "none", color: "#333", appearance: "none",
              }}
            >
              {["Dine in", "Take Away", "Delivery"].map((s) => <option key={s}>{s}</option>)}
            </select>

            {/* QTY & Total */}
            <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>QTY</label>
                <input
                  type="number"
                  min={1}
                  value={editingItem.qty}
                  onChange={(e) => setEditingItem({ ...editingItem, qty: Number(e.target.value) })}
                  style={{
                    width: "100%", padding: "10px 14px", border: "1.5px solid #e8e8e8",
                    borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                    outline: "none", color: "#333",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Total ($)</label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={editingItem.total}
                  onChange={(e) => setEditingItem({ ...editingItem, total: Number(e.target.value) })}
                  style={{
                    width: "100%", padding: "10px 14px", border: "1.5px solid #e8e8e8",
                    borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                    outline: "none", color: "#333",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setEditingItem(null)}
                style={{
                  flex: 1, padding: "12px", borderRadius: 12,
                  border: "1.5px solid #e8e8e8", background: "white",
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600, fontSize: 14, color: "#666",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleEdit(editingItem)}
                style={{
                  flex: 1, padding: "12px", borderRadius: 12,
                  border: "none", background: "#FF5200", color: "white",
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600, fontSize: 14,
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}