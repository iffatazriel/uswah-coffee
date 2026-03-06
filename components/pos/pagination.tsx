"use client";

// app/dashboard/table/_components/pagination.tsx

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const getPages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const btnStyle = (active = false, disabled = false): React.CSSProperties => ({
    width: 36,
    height: 36,
    borderRadius: 10,
    border: `1.5px solid ${active ? "#FF5200" : "#e8e8e8"}`,
    background: active ? "#FF5200" : "white",
    color: active ? "white" : disabled ? "#ccc" : "#333",
    fontWeight: active ? 700 : 500,
    fontSize: 14,
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.15s",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 6,
        padding: "16px 0 4px",
        flexShrink: 0,
      }}
    >
      {/* First */}
      <button
        style={btnStyle(false, currentPage === 1)}
        onClick={() => currentPage > 1 && onPageChange(1)}
        disabled={currentPage === 1}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Pages */}
      {getPages().map((page, i) =>
        page === "..." ? (
          <span key={`dot-${i}`} style={{ width: 36, textAlign: "center", color: "#bbb", fontSize: 14 }}>
            ...
          </span>
        ) : (
          <button
            key={page}
            style={btnStyle(page === currentPage)}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </button>
        )
      )}

      {/* Last */}
      <button
        style={btnStyle(false, currentPage === totalPages)}
        onClick={() => currentPage < totalPages && onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M13 17l5-5-5-5M6 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}