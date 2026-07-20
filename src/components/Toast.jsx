import React from "react";

function Toast({ visible, message, type = "success" }) {
  if (!visible) return null;

  const bg = type === "error" ? "#fee2e2" : "#dcfce7";
  const color = type === "error" ? "#991b1b" : "#166534";

  const style = {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: bg,
    color: color,
    padding: "12px 18px",
    borderRadius: "10px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    zIndex: 2000,
    minWidth: "220px",
    fontWeight: 600,
  };

  return (
    <div style={style} role="status" aria-live="polite">
      {message}
    </div>
  );
}

export default Toast;

