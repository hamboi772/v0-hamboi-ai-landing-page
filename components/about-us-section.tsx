export function AboutUsSection() {
  const HAIRLINE = "1px solid rgba(255,255,255,0.07)"
  const MUTED = "#8B8B8B"
  const WHITE = "#F5F5F5"
  const TEAL = "#0CF2C8"

  return (
    <section
      style={{
        backgroundColor: "#06080F",
        borderTop: HAIRLINE,
        borderBottom: HAIRLINE,
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section Label */}
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: TEAL,
            marginBottom: 24,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          About Us
        </div>

        {/* Main Heading */}
        <h2
          style={{
            fontSize: 56,
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            color: WHITE,
            marginBottom: 24,
            lineHeight: 1.2,
          }}
        >
          Who We Are
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 18,
            fontFamily: "'DM Sans', sans-serif",
            color: MUTED,
            marginBottom: 32,
            lineHeight: 1.6,
            maxWidth: 800,
          }}
        >
          Hamboi Mindcare was built by teenagers who understand what teenagers go through. We're not here to replace therapy or crisis support. We're here to be the friend you wish you had when no one was listening.
        </p>

        {/* Mission Divider */}
        <div style={{ borderTop: HAIRLINE, margin: "48px 0" }} />

        {/* Mission Statement */}
        <p
          style={{
            fontSize: 24,
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            color: WHITE,
            marginBottom: 48,
            lineHeight: 1.8,
            maxWidth: 900,
          }}
        >
          Every teenager deserves a space that actually gets them. A place where they can be honest, find understanding, and know they're not alone.
        </p>

        {/* Why We Exist */}
        <div style={{ marginBottom: 48 }}>
          <h3
            style={{
              fontSize: 28,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              color: WHITE,
              marginBottom: 16,
            }}
          >
            Why We Exist
          </h3>
          <p
            style={{
              fontSize: 16,
              fontFamily: "'DM Sans', sans-serif",
              color: MUTED,
              lineHeight: 1.7,
              maxWidth: 800,
            }}
          >
            Mental health conversations among Nigerian teens often happen in whispers — if they happen at all. There's shame, misunderstanding, and a lot of silence. We built Hamboi to break that silence. Not with judgment. Not with prescriptions. Just with honest conversations from people who get it because they're living it.
          </p>
        </div>

        {/* Values Grid */}
        <div style={{ marginTop: 64 }}>
          <h3
            style={{
              fontSize: 28,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              color: WHITE,
              marginBottom: 32,
            }}
          >
            Our Values
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 0,
              border: HAIRLINE,
            }}
          >
            {[
              {
                title: "Compassion First",
                desc: "Every feature we build starts with empathy for the teens we serve.",
              },
              {
                title: "Community Driven",
                desc: "Built by teens, for teens. We understand because we've been there.",
              },
              {
                title: "Honest & Real",
                desc: "No corporate speak. No fake positivity. Just real conversations.",
              },
              {
                title: "Always Free",
                desc: "Mental health support should never be behind a paywall.",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                style={{
                  padding: 32,
                  borderRight: idx % 2 === 0 ? HAIRLINE : "none",
                  borderBottom: idx < 2 ? HAIRLINE : "none",
                  position: "relative",
                }}
              >
                {/* Teal accent bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 8,
                    height: 8,
                    backgroundColor: TEAL,
                  }}
                />
                <h4
                  style={{
                    fontSize: 18,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 400,
                    color: WHITE,
                    marginBottom: 12,
                    marginTop: 4,
                  }}
                >
                  {value.title}
                </h4>
                <p
                  style={{
                    fontSize: 14,
                    fontFamily: "'DM Sans', sans-serif",
                    color: MUTED,
                    lineHeight: 1.6,
                  }}
                >
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What We Do */}
        <div style={{ marginTop: 64 }}>
          <h3
            style={{
              fontSize: 28,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              color: WHITE,
              marginBottom: 32,
            }}
          >
            What We Do
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
            }}
          >
            {[
              {
                title: "Articles & Resources",
                desc: "Written by teens, for teens. Topics that actually matter to you.",
              },
              {
                title: "Daily Check-Ins",
                desc: "A safe space to reflect on how you're feeling, no judgment.",
              },
              {
                title: "AI Companion",
                desc: "Chat anytime. Someone who listens without lecturing.",
              },
              {
                title: "Community",
                desc: "Know you're not alone. Others are going through it too.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  borderTop: HAIRLINE,
                  paddingTop: 20,
                }}
              >
                <h4
                  style={{
                    fontSize: 16,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 400,
                    color: WHITE,
                    marginBottom: 8,
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontSize: 14,
                    fontFamily: "'DM Sans', sans-serif",
                    color: MUTED,
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: HAIRLINE,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 16,
              fontFamily: "'DM Sans', sans-serif",
              color: MUTED,
              lineHeight: 1.7,
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
            We're still learning. We're still growing. And we're always listening to the teens who use Hamboi. Every update, every new feature, every decision we make is guided by one simple question: How can we make this more helpful for you?
          </p>
        </div>
      </div>
    </section>
  )
}
