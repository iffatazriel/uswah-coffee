"use client";

// app/dashboard/report/_components/report-table.tsx
import { useState } from "react";
import { REPORT_ITEMS, ITEMS_PER_PAGE, SERVICE_TYPE_COLORS } from "./constants/report";
import { Pagination } from "./pagination";

export default function ReportTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(REPORT_ITEMS.length / ITEMS_PER_PAGE);
  const paginated = REPORT_ITEMS.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const grandTotal = REPORT_ITEMS.reduce((s, i) => s + i.total, 0);
  const totalQty = REPORT_ITEMS.reduce((s, i) => s + i.qty, 0);

  // ── Download helpers ──────────────────────────────────────────────────────

  const downloadCSV = () => {
    const header = "No,Menu Name,Type Of Service,QTY,Total\n";
    const rows = REPORT_ITEMS.map(
      (item, idx) =>
        `${idx + 1},"${item.menuName}","${item.typeOfService}",${item.qty},$${item.total.toFixed(2)}`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>Report</title>
      <style>
        body { font-family: sans-serif; padding: 32px; color: #1a1a1a; }
        h1 { color: #FF5200; margin-bottom: 4px; }
        p { color: #999; font-size: 13px; margin-bottom: 24px; }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        th { text-align: left; padding: 10px 12px; background: #f9f9f9; color: #666; font-weight: 600; border-bottom: 2px solid #eee; }
        td { padding: 10px 12px; border-bottom: 1px solid #f0f0f0; }
        tfoot td { font-weight: 700; border-top: 2px solid #eee; padding-top: 14px; }
        .orange { color: #FF5200; }
      </style></head><body>
      <h1>Sales Report</h1>
      <p>Makaryo POS — Generated ${new Date().toLocaleDateString()}</p>
      <table>
        <thead><tr><th>#</th><th>Menu Name</th><th>Type Of Service</th><th>QTY</th><th>Total</th></tr></thead>
        <tbody>
          ${REPORT_ITEMS.map((item, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td>${item.menuName}</td>
              <td>${item.typeOfService}</td>
              <td>${item.qty}</td>
              <td class="orange">$${item.total.toFixed(2)}</td>
            </tr>
          `).join("")}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3"></td>
            <td>${totalQty}</td>
            <td class="orange">$${grandTotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <script>window.print();window.close();<\/script>
      </body></html>
    `);
    win.document.close();
  };

  // ── Styles ────────────────────────────────────────────────────────────────

  const thStyle: React.CSSProperties = {
    padding: "14px 16px", textAlign: "left", fontSize: 13,
    fontWeight: 600, color: "#999", background: "white",
    borderBottom: "1.5px solid #f0f0f0", whiteSpace: "nowrap",
  };

  const tdStyle: React.CSSProperties = {
    padding: "16px 16px", fontSize: 14, color: "#1a1a1a",
    borderBottom: "1px solid #f8f8f8", verticalAlign: "middle",
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", padding: "20px 28px" }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 16, flexShrink: 0 }}>
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>
            Sales Report
          </h1>
          <p style={{ fontSize: 13, color: "#bbb" }}>
            Track payment, and customer information.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Download PDF */}
          <button
            onClick={downloadPDF}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 18px", borderRadius: 12,
              border: "1.5px solid #e8e8e8", background: "white",
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600, fontSize: 13, color: "#c0392b",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#c0392b";
              e.currentTarget.style.background = "#fff5f5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e8e8e8";
              e.currentTarget.style.background = "white";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="18" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <polyline points="9 15 12 18 15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Download PDF
          </button>

          {/* Download xlsx */}
          <button
            onClick={downloadCSV}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 18px", borderRadius: 12,
              border: "1.5px solid #e8e8e8", background: "white",
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600, fontSize: 13, color: "#1e7e34",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#1e7e34";
              e.currentTarget.style.background = "#f0fff4";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e8e8e8";
              e.currentTarget.style.background = "white";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="18" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <polyline points="9 15 12 18 15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Download xlsx
          </button>

          {/* Close Order */}
          <button
            style={{
              padding: "10px 20px", borderRadius: 12, border: "none",
              background: "#b71c1c", color: "white",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              fontSize: 14, cursor: "pointer", transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#c62828")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#b71c1c")}
          >
            Close Order
          </button>
        </div>
      </div>

      {/* ── Summary chips ── */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexShrink: 0 }}>
        {[
          { label: "Total Items", value: REPORT_ITEMS.length, color: "#1a1a1a" },
          { label: "Total QTY",   value: totalQty,            color: "#FF5200" },
          { label: "Grand Total", value: `$${grandTotal.toFixed(2)}`, color: "#FF5200" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              background: "white", borderRadius: 12, padding: "10px 18px",
              border: "1.5px solid #f0f0f0", display: "flex", alignItems: "center", gap: 10,
            }}
          >
            <span style={{ fontSize: 12, color: "#bbb", fontWeight: 500 }}>{label}</span>
            <span style={{ fontSize: 15, fontWeight: 700, color }}>{value}</span>
          </div>
        ))}
      </div>

      {/* ── Table ── */}
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
                <th style={thStyle}>Menu Name</th>
                <th style={{ ...thStyle, width: 160 }}>Type Of Service</th>
                <th style={{ ...thStyle, width: 80, textAlign: "center" }}>QTY</th>
                <th style={{ ...thStyle, width: 100, textAlign: "right" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((item, idx) => (
                <tr
                  key={item.id}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                  style={{ transition: "background 0.1s" }}
                >
                  <td style={{ ...tdStyle, color: "#bbb", fontWeight: 500 }}>
                    {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                  </td>
                  <td style={{ ...tdStyle, fontWeight: 500 }}>{item.menuName}</td>
                  <td style={tdStyle}>
                    <span style={{
                      display: "inline-block", padding: "4px 12px", borderRadius: 20,
                      fontSize: 12, fontWeight: 600,
                      background: SERVICE_TYPE_COLORS[item.typeOfService]?.bg,
                      color: SERVICE_TYPE_COLORS[item.typeOfService]?.color,
                    }}>
                      {item.typeOfService}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: "center", fontWeight: 600 }}>{item.qty}</td>
                  <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, color: "#FF5200" }}>
                    ${item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Footer total row */}
            <tfoot>
              <tr style={{ background: "#fafafa" }}>
                <td colSpan={3} style={{ ...tdStyle, borderTop: "1.5px solid #f0f0f0", color: "#999", fontWeight: 600, fontSize: 13 }}>
                  Grand Total
                </td>
                <td style={{ ...tdStyle, borderTop: "1.5px solid #f0f0f0", textAlign: "center", fontWeight: 700 }}>
                  {totalQty}
                </td>
                <td style={{ ...tdStyle, borderTop: "1.5px solid #f0f0f0", textAlign: "right", fontWeight: 700, color: "#FF5200", fontSize: 15 }}>
                  ${grandTotal.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ borderTop: "1px solid #f0f0f0", padding: "12px 20px", flexShrink: 0 }}>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
      </div>
    </div>
  );
}