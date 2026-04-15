import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Digital Nomad Kenya - Permit Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ background: "linear-gradient(135deg, #064e3b 0%, #0f172a 100%)", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
        <span style={{ fontSize: "72px", fontWeight: 700, color: "white", letterSpacing: "-2px" }}>Digital Nomad Kenya</span>
        <span style={{ fontSize: "28px", color: "rgba(255,255,255,0.7)", marginTop: "16px" }}>AI-Powered Kenya Permit Automation</span>
        <span style={{ fontSize: "20px", color: "#10b981", marginTop: "24px" }}>13+ Nationalities | 8 Locations | From $20</span>
      </div>
    ),
    { ...size }
  );
}
