"use client";

// app/dashboard/table/_components/table-grid.tsx
import { useState } from "react";
import TableCard from "./table-card";
import { ITEMS_PER_PAGE, TableData, TABLES } from "./constans";
import { SearchBar } from "./search-bar";
import { FloorFilter } from "./floor-filter";
import { Pagination } from "./pagination";


export default function TableGrid() {
  const [search, setSearch] = useState("");
  const [floor, setFloor] = useState("1st floor");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null);

  const filtered = TABLES.filter(
    (t) =>
      t.floor === floor &&
      t.name.toLowerCase().includes(search.toLowerCase())
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

  const handleFloor = (val: string) => {
    setFloor(val);
    setCurrentPage(1);
  };

  const availableCount = filtered.filter((t) => t.status === "Available").length;
  const usedCount = filtered.filter((t) => t.status === "Used").length;

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
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          flexShrink: 0,
          gap: 16,
        }}
      >
        {/* Title + stats */}
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
            Efficient Order Management
          </h1>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ fontSize: 12, color: "#FF5200", fontWeight: 600 }}>
              ● {availableCount} Available
            </span>
            <span style={{ fontSize: 12, color: "#bbb", fontWeight: 600 }}>
              ● {usedCount} Used
            </span>
          </div>
        </div>

        {/* Search + Floor filter */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <SearchBar value={search} onChange={handleSearch} />
          <FloorFilter value={floor} onChange={handleFloor} />
        </div>

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
            flexShrink: 0,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#c62828")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#b71c1c")}
        >
          Close Order
        </button>
      </div>

      {/* Table Grid */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 14,
          alignContent: "start",
          paddingRight: 4,
        }}
      >
        {paginated.length === 0 ? (
          <div
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
              padding: "60px 20px",
              color: "#ccc",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🪑</div>
            <p style={{ fontSize: 14 }}>No tables found.</p>
          </div>
        ) : (
          paginated.map((table) => (
            <TableCard
              key={table.id}
              table={table}
              onClick={(t) => setSelectedTable(t)}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Simple modal on table click */}
      {selectedTable && (
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
          onClick={() => setSelectedTable(null)}
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
            <h2
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#1a1a1a",
                marginBottom: 8,
              }}
            >
              {selectedTable.name}
            </h2>
            <p style={{ fontSize: 14, color: "#bbb", marginBottom: 20 }}>
              {selectedTable.floor} • {selectedTable.guest}
            </p>
            <div
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: 20,
                background:
                  selectedTable.status === "Available" ? "#fff5ef" : "#f5f5f5",
                color:
                  selectedTable.status === "Available" ? "#FF5200" : "#bbb",
                fontWeight: 600,
                fontSize: 13,
                marginBottom: 24,
              }}
            >
              {selectedTable.status}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setSelectedTable(null)}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: 12,
                  border: "1.5px solid #e8e8e8",
                  background: "white",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#666",
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: 12,
                  border: "none",
                  background: "#FF5200",
                  color: "white",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {selectedTable.status === "Available"
                  ? "Assign Table"
                  : "View Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}