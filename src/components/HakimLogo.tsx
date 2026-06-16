import React from "react";

export default function HakimLogo({ width = 160, height = 70 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 340 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="70" fontFamily="'Pacifico', 'Brush Script MT', cursive" fontSize="64" fill="#17543A" fontWeight="bold" letterSpacing="2">Hakimi</text>
      <g>
        <path d="M210 38 Q215 25 220 38 Q215 32 210 38Z" fill="none" stroke="#B89B4C" strokeWidth="2.5" />
        <path d="M215 38 Q215 30 220 38" fill="none" stroke="#17543A" strokeWidth="2" />
        <path d="M215 38 Q215 30 210 38" fill="none" stroke="#17543A" strokeWidth="2" />
      </g>
      <text x="18" y="110" fontFamily="'Montserrat', 'Arial', sans-serif" fontSize="28" fill="#B89B4C" letterSpacing="7" fontWeight="500" style={{ textTransform: "uppercase" }}>COSMETICS</text>
    </svg>
  );
}
