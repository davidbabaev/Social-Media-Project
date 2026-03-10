import { useState } from "react";

const CARDS = Array.from({ length: 25 }, (_, i) => `Card ${i}`);
const PAGE_SIZE = 10;

export default function PaginationDiagram() {
  const [currentPage, setCurrentPage] = useState(1);

  const start = (currentPage - 1) * PAGE_SIZE;
  const end = currentPage * PAGE_SIZE;
  const visibleCards = CARDS.slice(start, end);
  const totalPages = Math.ceil(CARDS.length / PAGE_SIZE);

  return (
    <div style={{ fontFamily: "'Courier New', monospace", background: "#0f0f0f", minHeight: "100vh", padding: "32px", color: "#e0e0e0" }}>
      <h2 style={{ color: "#ffd700", marginBottom: 8, fontSize: 22 }}>Pagination — How .slice() Works</h2>

      {/* Formula bar */}
      <div style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8, padding: "16px 20px", marginBottom: 24, fontSize: 15 }}>
        <div style={{ marginBottom: 8, color: "#888" }}>Current formula with <span style={{ color: "#ffd700" }}>currentPage = {currentPage}</span>:</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ color: "#888" }}>.slice(</span>
          <span style={{ background: "#1e3a5f", border: "1px solid #4a9eff", borderRadius: 4, padding: "2px 10px", color: "#4a9eff" }}>
            ({currentPage} - 1) × {PAGE_SIZE} = <strong>{start}</strong>
          </span>
          <span style={{ color: "#888" }}>,</span>
          <span style={{ background: "#3a1e1e", border: "1px solid #ff6b6b", borderRadius: 4, padding: "2px 10px", color: "#ff6b6b" }}>
            {currentPage} × {PAGE_SIZE} = <strong>{end}</strong>
          </span>
          <span style={{ color: "#888" }}>)</span>
        </div>
      </div>

      {/* Array visualization */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ color: "#888", marginBottom: 10, fontSize: 13 }}>All 25 cards — highlighted = what .slice() returns on page {currentPage}:</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {CARDS.map((card, i) => {
            const isVisible = i >= start && i < end;
            return (
              <div key={i} style={{
                padding: "6px 10px",
                borderRadius: 4,
                fontSize: 12,
                border: `1px solid ${isVisible ? "#ffd700" : "#333"}`,
                background: isVisible ? "#2a2200" : "#1a1a1a",
                color: isVisible ? "#ffd700" : "#555",
                transition: "all 0.2s",
                position: "relative"
              }}>
                [{i}] {card}
              </div>
            );
          })}
        </div>
      </div>

      {/* Result */}
      <div style={{ background: "#1a1a1a", border: "1px solid #2a2200", borderRadius: 8, padding: 16, marginBottom: 24 }}>
        <div style={{ color: "#888", fontSize: 13, marginBottom: 8 }}>
          Result: <span style={{ color: "#ffd700" }}>{visibleCards.length} cards</span> (indexes {start} → {end - 1})
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {visibleCards.map((card, i) => (
            <div key={i} style={{ padding: "4px 12px", borderRadius: 4, background: "#2a2200", border: "1px solid #ffd700", color: "#ffd700", fontSize: 13 }}>
              {card}
            </div>
          ))}
        </div>
      </div>

      {/* Page buttons */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{ color: "#888", fontSize: 13 }}>Switch page:</span>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button key={page} onClick={() => setCurrentPage(page)} style={{
            padding: "8px 18px",
            borderRadius: 4,
            border: `1px solid ${currentPage === page ? "#ffd700" : "#444"}`,
            background: currentPage === page ? "#2a2200" : "#1a1a1a",
            color: currentPage === page ? "#ffd700" : "#888",
            cursor: "pointer",
            fontSize: 14,
            transition: "all 0.15s"
          }}>
            Page {page}
          </button>
        ))}
      </div>

      {/* Explanation */}
      <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#1e3a5f22", border: "1px solid #4a9eff44", borderRadius: 8, padding: 14 }}>
          <div style={{ color: "#4a9eff", fontWeight: "bold", marginBottom: 6 }}>START = (currentPage - 1) × PAGE_SIZE</div>
          <div style={{ color: "#888", fontSize: 13 }}>The "-1" is because arrays start at 0.<br />Page 1 → index 0, Page 2 → index 10...</div>
        </div>
        <div style={{ background: "#3a1e1e22", border: "1px solid #ff6b6b44", borderRadius: 8, padding: 14 }}>
          <div style={{ color: "#ff6b6b", fontWeight: "bold", marginBottom: 6 }}>END = currentPage × PAGE_SIZE</div>
          <div style={{ color: "#888", fontSize: 13 }}>.slice() END is exclusive (not included).<br />Page 1 → 10 means indexes 0-9 only.</div>
        </div>
      </div>
    </div>
  );
}