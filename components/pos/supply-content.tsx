"use client";

// app/dashboard/supply/_components/supply-content.tsx
import { useState } from "react";
import { SUPPLY_ITEMS, ITEMS_PER_PAGE, STATUS_STYLES, type SupplyItem, type StockStatus } from "./constants/supply";
import { Pagination } from "./pagination";

type ViewMode = "list" | "grid";

const STATUSES: StockStatus[] = ["Stock is safe", "Running low", "Out of stock"];

export default function SupplyContent() {
  const [items, setItems] = useState<SupplyItem[]>(SUPPLY_ITEMS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StockStatus | "All">("All");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingItem, setEditingItem] = useState<SupplyItem | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", quantity: "", status: "Stock is safe" as StockStatus });

  const filtered = items.filter((i) => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || i.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSearch = (val: string) => { setSearch(val); setCurrentPage(1); };
  const handleStatusFilter = (val: StockStatus | "All") => { setStatusFilter(val); setCurrentPage(1); };

  const handleSaveEdit = (updated: SupplyItem) => {
    setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    setEditingItem(null);
  };

  const handleAddNew = () => {
    const id = Math.max(...items.map((i) => i.id)) + 1;
    const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    setItems((prev) => [...prev, {
      id, name: newItem.name, dateOfUpdate: today,
      quantity: newItem.quantity, quantityValue: parseFloat(newItem.quantity) || 0,
      unit: "g", status: newItem.status,
    }]);
    setNewItem({ name: "", quantity: "", status: "Stock is safe" });
    setAddingNew(false);
  };

  const thStyle: React.CSSProperties = {
    padding: "12px 16px", textAlign: "left", fontSize: 12,
    fontWeight: 600, color: "#999", background: "white",
    borderBottom: "1.5px solid #f0f0f0", whiteSpace: "nowrap",
    textTransform: "uppercase", letterSpacing: "0.5px",
  };
  const tdStyle: React.CSSProperties = {
    padding: "15px 16px", fontSize: 14, color: "#1a1a1a",
    borderBottom: "1px solid #f8f8f8", verticalAlign: "middle",
  };

  const statusCounts = {
    safe: items.filter((i) => i.status === "Stock is safe").length,
    low: items.filter((i) => i.status === "Running low").length,
    out: items.filter((i) => i.status === "Out of stock").length,
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", padding: "20px 28px" }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 16, flexShrink: 0 }}>
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>
            Supply Inventory
          </h1>
          <p style={{ fontSize: 13, color: "#bbb" }}>Track availability, quantity and stock status.</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Search */}
          <div style={{ position: "relative" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#bbb", pointerEvents: "none" }}>
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input type="text" placeholder="Search" value={search} onChange={(e) => handleSearch(e.target.value)}
              style={{
                padding: "9px 14px 9px 36px", border: "1.5px solid #e8e8e8", borderRadius: 12,
                fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#333",
                outline: "none", width: 220, transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#FF5200")}
              onBlur={(e) => (e.target.style.borderColor = "#e8e8e8")}
            />
          </div>

          {/* View toggle: grid / list */}
          <div style={{ display: "flex", border: "1.5px solid #e8e8e8", borderRadius: 12, overflow: "hidden" }}>
            {(["grid", "list"] as ViewMode[]).map((mode) => (
              <button key={mode} onClick={() => setViewMode(mode)}
                style={{
                  width: 38, height: 38, border: "none", cursor: "pointer",
                  background: viewMode === mode ? "#FF5200" : "white",
                  color: viewMode === mode ? "white" : "#bbb",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s",
                }}
              >
                {mode === "grid" ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Filter by status */}
          <div style={{ position: "relative" }}>
            <select value={statusFilter} onChange={(e) => handleStatusFilter(e.target.value as any)}
              style={{
                appearance: "none", background: "white", border: "1.5px solid #e8e8e8",
                borderRadius: 12, padding: "9px 32px 9px 14px", fontSize: 13,
                fontFamily: "'DM Sans', sans-serif", color: "#333", cursor: "pointer",
                fontWeight: 500, outline: "none",
              }}
            >
              <option value="All">All Status</option>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#999" }}>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Add New */}
          <button onClick={() => setAddingNew(true)}
            style={{
              padding: "9px 18px", borderRadius: 12, border: "none",
              background: "#FF5200", color: "white",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              fontSize: 13, cursor: "pointer", display: "flex",
              alignItems: "center", gap: 6, transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e04800")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#FF5200")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            Add Item
          </button>

          {/* Close Order */}
          <button
            style={{
              padding: "9px 18px", borderRadius: 12, border: "none",
              background: "#b71c1c", color: "white",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#c62828")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#b71c1c")}
          >
            Close Order
          </button>
        </div>
      </div>

      {/* ── Status Summary Chips ── */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexShrink: 0 }}>
        {[
          { label: "Stock is safe", count: statusCounts.safe, ...STATUS_STYLES["Stock is safe"] },
          { label: "Running low",   count: statusCounts.low,  ...STATUS_STYLES["Running low"]   },
          { label: "Out of stock",  count: statusCounts.out,  ...STATUS_STYLES["Out of stock"]  },
        ].map(({ label, count, bg, color }) => (
          <button key={label}
            onClick={() => handleStatusFilter(statusFilter === label ? "All" : label as StockStatus)}
            style={{
              padding: "8px 16px", borderRadius: 20, border: `1.5px solid ${statusFilter === label ? color : "transparent"}`,
              background: bg, color, fontWeight: 600, fontSize: 12,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s",
            }}
          >
            <span>{label}</span>
            <span style={{
              background: color, color: "white", borderRadius: "50%",
              width: 20, height: 20, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 11, fontWeight: 700,
            }}>{count}</span>
          </button>
        ))}
      </div>

      {/* ── LIST VIEW ── */}
      {viewMode === "list" && (
        <div style={{
          flex: 1, background: "white", borderRadius: 16,
          overflow: "hidden", border: "1px solid #f0f0f0",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ overflowY: "auto", flex: 1 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
                <tr>
                  <th style={{ ...thStyle, width: 52 }}>#</th>
                  <th style={thStyle}>Item Name</th>
                  <th style={thStyle}>Date of Update</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>Quantity</th>
                  <th style={{ ...thStyle, width: 140, textAlign: "center" }}>Status</th>
                  <th style={{ ...thStyle, width: 90, textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: "center", padding: "60px", color: "#ccc", fontSize: 14 }}>No items found.</td></tr>
                ) : paginated.map((item, idx) => (
                  <tr key={item.id}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                    style={{ transition: "background 0.1s" }}
                  >
                    <td style={{ ...tdStyle, color: "#bbb", fontWeight: 500 }}>
                      {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 500 }}>{item.name}</td>
                    <td style={{ ...tdStyle, color: "#888" }}>{item.dateOfUpdate}</td>
                    <td style={{ ...tdStyle, textAlign: "right", fontWeight: 600 }}>{item.quantity}</td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                        background: STATUS_STYLES[item.status].bg,
                        color: STATUS_STYLES[item.status].color,
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          {item.status === "Stock is safe" && <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>}
                          {item.status === "Running low"   && <><path d="M12 9v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="12" cy="17" r="1" fill="currentColor"/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2"/></>}
                          {item.status === "Out of stock"  && <><line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></>}
                        </svg>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      <button onClick={() => setEditingItem(item)}
                        style={{
                          width: 32, height: 32, borderRadius: 8,
                          border: "1.5px solid #e8e8e8", background: "white",
                          cursor: "pointer", display: "inline-flex",
                          alignItems: "center", justifyContent: "center",
                          color: "#999", transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FF5200"; e.currentTarget.style.color = "#FF5200"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8e8e8"; e.currentTarget.style.color = "#999"; }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div style={{ borderTop: "1px solid #f0f0f0", padding: "10px 20px", flexShrink: 0 }}>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </div>
      )}

      {/* ── GRID VIEW ── */}
      {viewMode === "grid" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{
            flex: 1, overflowY: "auto",
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 12, alignContent: "start",
          }}>
            {paginated.map((item) => (
              <div key={item.id}
                style={{
                  background: "white", borderRadius: 14, padding: "16px",
                  border: `1.5px solid ${STATUS_STYLES[item.status].bg}`,
                  cursor: "pointer", transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                onClick={() => setEditingItem(item)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <p style={{ fontWeight: 600, fontSize: 13, color: "#1a1a1a", lineHeight: 1.4 }}>{item.name}</p>
                  <span style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0, marginLeft: 8,
                    background: STATUS_STYLES[item.status].bg,
                    color: STATUS_STYLES[item.status].color,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700,
                  }}>
                    {item.status === "Stock is safe" ? "✓" : item.status === "Running low" ? "!" : "✕"}
                  </span>
                </div>
                <p style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>{item.quantity}</p>
                <p style={{ fontSize: 11, color: "#bbb", marginBottom: 10 }}>{item.dateOfUpdate}</p>
                <span style={{
                  display: "inline-block", padding: "3px 10px", borderRadius: 20,
                  fontSize: 11, fontWeight: 600,
                  background: STATUS_STYLES[item.status].bg,
                  color: STATUS_STYLES[item.status].color,
                }}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div style={{ paddingTop: 12, flexShrink: 0 }}>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {editingItem && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}
          onClick={() => setEditingItem(null)}>
          <div style={{ background: "white", borderRadius: 20, padding: 32, width: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
            onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 700, color: "#1a1a1a", marginBottom: 20 }}>Edit Supply Item</h2>

            {[{ label: "Item Name", key: "name", type: "text" }, { label: "Quantity", key: "quantity", type: "text" }].map(({ label, key, type }) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>{label}</label>
                <input type={type} value={(editingItem as any)[key]}
                  onChange={(e) => setEditingItem({ ...editingItem, [key]: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e8e8e8", borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", color: "#333" }}
                />
              </div>
            ))}

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Status</label>
              <div style={{ display: "flex", gap: 8 }}>
                {STATUSES.map((s) => (
                  <button key={s} onClick={() => setEditingItem({ ...editingItem, status: s })}
                    style={{
                      flex: 1, padding: "8px 4px", borderRadius: 10, fontSize: 11, fontWeight: 600,
                      border: `1.5px solid ${editingItem.status === s ? STATUS_STYLES[s].color : "#e8e8e8"}`,
                      background: editingItem.status === s ? STATUS_STYLES[s].bg : "white",
                      color: editingItem.status === s ? STATUS_STYLES[s].color : "#bbb",
                      cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                    }}
                  >{s}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setEditingItem(null)}
                style={{ flex: 1, padding: "12px", borderRadius: 12, border: "1.5px solid #e8e8e8", background: "white", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#666" }}>
                Cancel
              </button>
              <button onClick={() => handleSaveEdit(editingItem)}
                style={{ flex: 1, padding: "12px", borderRadius: 12, border: "none", background: "#FF5200", color: "white", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14 }}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ADD MODAL ── */}
      {addingNew && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}
          onClick={() => setAddingNew(false)}>
          <div style={{ background: "white", borderRadius: 20, padding: 32, width: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
            onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 700, color: "#1a1a1a", marginBottom: 20 }}>Add Supply Item</h2>

            {[{ label: "Item Name", key: "name" }, { label: "Quantity (e.g. 1.5 Kg)", key: "quantity" }].map(({ label, key }) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>{label}</label>
                <input value={(newItem as any)[key]}
                  onChange={(e) => setNewItem({ ...newItem, [key]: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e8e8e8", borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", color: "#333" }}
                />
              </div>
            ))}

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Status</label>
              <div style={{ display: "flex", gap: 8 }}>
                {STATUSES.map((s) => (
                  <button key={s} onClick={() => setNewItem({ ...newItem, status: s })}
                    style={{
                      flex: 1, padding: "8px 4px", borderRadius: 10, fontSize: 11, fontWeight: 600,
                      border: `1.5px solid ${newItem.status === s ? STATUS_STYLES[s].color : "#e8e8e8"}`,
                      background: newItem.status === s ? STATUS_STYLES[s].bg : "white",
                      color: newItem.status === s ? STATUS_STYLES[s].color : "#bbb",
                      cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                    }}
                  >{s}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setAddingNew(false)}
                style={{ flex: 1, padding: "12px", borderRadius: 12, border: "1.5px solid #e8e8e8", background: "white", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#666" }}>
                Cancel
              </button>
              <button onClick={handleAddNew} disabled={!newItem.name || !newItem.quantity}
                style={{ flex: 1, padding: "12px", borderRadius: 12, border: "none", background: newItem.name && newItem.quantity ? "#FF5200" : "#f0e8e0", color: newItem.name && newItem.quantity ? "white" : "#ccc", cursor: newItem.name && newItem.quantity ? "pointer" : "not-allowed", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14 }}>
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}