const HAIRLINE = "1px solid rgba(255,255,255,0.07)"
const MUTED = "#8B8B8B"
const WHITE = "#F5F5F5"
const TEAL = "#0CF2C8"

export function AboutUsSection() {
  return (
    <section
      style={{
        backgroundColor: "#06080F",
        borderTop: HAIRLINE,
        borderBottom: HAIRLINE,
        padding: "120px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Teal label */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: TEAL,
            marginBottom: 32,
          }}
        >
          Built in Nigeria, for Africa
        </p>

        {/* Main heading */}
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 7vw, 80px)",
            fontWeight: 400,
            color: WHITE,
            lineHeight: 1.1,
            marginBottom: 32,
            letterSpacing: "-0.01em",
          }}
        >
          About Hamboi Mindcare
        </h2>

        {/* Body */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17,
            color: MUTED,
            lineHeight: 1.75,
            maxWidth: 620,
            margin: "0 auto 64px",
          }}
        >
          A free, private, and always available mental health companion built specifically for African teenagers. By one of their own.
        </p>

        {/* Hairline divider */}
        <div style={{ borderTop: HAIRLINE, marginBottom: 64 }} />

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
          }}
        >
          {/* Stat 1 */}
          <div style={{ flex: 1, padding: "0 40px" }}>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(40px, 6vw, 64px)",
                fontWeight: 400,
                color: WHITE,
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              5.0
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: MUTED,
                letterSpacing: "0.04em",
              }}
            >
              on Google
            </p>
          </div>

          {/* Vertical hairline */}
          <div
            style={{
              width: 1,
              height: 64,
              backgroundColor: "rgba(255,255,255,0.07)",
              flexShrink: 0,
            }}
          />

          {/* Stat 2 */}
          <div style={{ flex: 1, padding: "0 40px" }}>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(40px, 6vw, 64px)",
                fontWeight: 400,
                color: WHITE,
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              200+
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: MUTED,
                letterSpacing: "0.04em",
              }}
            >
              customer interactions
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
