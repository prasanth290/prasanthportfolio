import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Prasanth | Custom Web Development & Business Software Studio";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#020617",
          padding: "60px 80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header Branding */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "linear-gradient(to top right, #06b6d4, #34d399)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#020617",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            &lt;/&gt;
          </div>
          <div style={{ display: "flex", alignItems: "center", fontSize: "28px", fontWeight: "bold", letterSpacing: "-0.5px" }}>
            <span>Prasanth</span>
            <span style={{ color: "#34d399" }}>.dev</span>
          </div>
        </div>

        {/* Center Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "14px",
              fontWeight: "600",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#34d399",
              background: "rgba(52, 211, 153, 0.1)",
              border: "1px solid rgba(52, 211, 153, 0.3)",
              padding: "6px 16px",
              borderRadius: "20px",
              alignSelf: "flex-start",
            }}
          >
            Bespoke Business Software Studio
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "52px",
              fontWeight: "800",
              lineHeight: "1.15",
              color: "#ffffff",
            }}
          >
            Real Business Software Built & Tested Live.
          </div>

          <div style={{ display: "flex", fontSize: "22px", color: "#94a3b8", lineHeight: "1.4" }}>
            Rental Management Systems • Inventory & Stock Control • Custom Web Platforms
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #1e293b",
            paddingTop: "24px",
            fontSize: "16px",
            color: "#64748b",
          }}
        >
          <div style={{ display: "flex" }}>Interactive Demos Available</div>
          <div style={{ display: "flex", color: "#34d399", fontWeight: "600" }}>prasanthportfolio-five.vercel.app</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
